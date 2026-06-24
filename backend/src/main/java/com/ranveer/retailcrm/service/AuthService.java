package com.ranveer.retailcrm.service;

import com.ranveer.retailcrm.dto.AuthResponse;
import com.ranveer.retailcrm.dto.LoginRequest;
import com.ranveer.retailcrm.dto.RegisterRequest;
import com.ranveer.retailcrm.entity.AuthProvider;
import com.ranveer.retailcrm.entity.User;
import com.ranveer.retailcrm.exception.BadRequestException;
import com.ranveer.retailcrm.repository.UserRepository;
import com.ranveer.retailcrm.security.JwtService;
import com.ranveer.retailcrm.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String username = clean(request.getUsername());
        String email = clean(request.getEmail()).toLowerCase();
        String password = clean(request.getPassword());

        if (username.isBlank()) {
            throw new BadRequestException("Username is required");
        }

        if (email.isBlank()) {
            throw new BadRequestException("Email is required");
        }

        if (password.isBlank()) {
            throw new BadRequestException("Password is required");
        }

        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException(
                    "Email is already registered"
            );
        }

        User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(
                passwordEncoder.encode(password)
        );
        user.setProvider(AuthProvider.LOCAL);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                UserPrincipal.from(savedUser)
        );

        return toResponse(savedUser, token);
    }

    public AuthResponse login(LoginRequest request) {

        String email = clean(request.getEmail())
                .toLowerCase();

        String password = clean(request.getPassword());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new BadRequestException(
                                "Invalid email or password"
                        ));

        String token = jwtService.generateToken(
                UserPrincipal.from(user)
        );

        return toResponse(user, token);
    }

    @Transactional
    public AuthResponse loginOrRegisterGoogleUser(
            String email,
            String name
    ) {

        String normalizedEmail = clean(email)
                .toLowerCase();

        if (normalizedEmail.isBlank()) {
            throw new BadRequestException(
                    "Google account email not found"
            );
        }

        User user = userRepository.findByEmail(
                normalizedEmail
        ).orElseGet(() -> {

            User newUser = new User();

            newUser.setEmail(normalizedEmail);

            newUser.setUsername(
                    buildUsername(
                            normalizedEmail,
                            name
                    )
            );

            newUser.setGoogleId(normalizedEmail);

            newUser.setProvider(
                    AuthProvider.GOOGLE
            );

            return userRepository.save(newUser);
        });

        String token = jwtService.generateToken(
                UserPrincipal.from(user)
        );

        return toResponse(user, token);
    }

    @Transactional
    public AuthResponse googleDemoLogin(
            String email,
            String name
    ) {
        return loginOrRegisterGoogleUser(
                email,
                name
        );
    }

    private String buildUsername(
            String email,
            String name
    ) {

        if (name != null &&
                !name.isBlank()) {

            return name.trim();
        }

        int atIndex = email.indexOf("@");

        if (atIndex > 0) {
            return email.substring(0, atIndex);
        }

        return "google-user";
    }

    private String clean(String value) {

        return value == null
                ? ""
                : value.trim();
    }

    private AuthResponse toResponse(
            User user,
            String token
    ) {

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getProvider(),
                user.getCreatedAt()
        );
    }
}