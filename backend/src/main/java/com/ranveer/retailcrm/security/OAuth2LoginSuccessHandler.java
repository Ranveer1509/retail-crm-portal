package com.ranveer.retailcrm.security;

import com.ranveer.retailcrm.entity.AuthProvider;
import com.ranveer.retailcrm.entity.User;
import com.ranveer.retailcrm.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final String frontendUrl;

    public OAuth2LoginSuccessHandler(
            UserRepository userRepository,
            JwtService jwtService,
            @Value("${app.frontend-url}") String frontendUrl
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null || email.isBlank()) {
            response.sendRedirect(frontendUrl + "/login?error=google_email_missing");
            return;
        }

        String normalizedEmail = email.toLowerCase();
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseGet(() -> createGoogleUser(normalizedEmail, name));
        String token = jwtService.generateToken(UserPrincipal.from(user));

        String redirectUrl = frontendUrl + "/oauth2/redirect"
                + "?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
                + "&email=" + URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8)
                + "&username=" + URLEncoder.encode(user.getUsername(), StandardCharsets.UTF_8)
                + "&id=" + user.getId()
                + "&provider=GOOGLE";
        response.sendRedirect(redirectUrl);
    }

    private User createGoogleUser(String email, String name) {
        User user = new User();
        user.setEmail(email.toLowerCase());
        user.setUsername(name == null || name.isBlank() ? email.substring(0, email.indexOf("@")) : name);
        user.setGoogleId(email.toLowerCase());
        user.setProvider(AuthProvider.GOOGLE);
        return userRepository.save(user);
    }
}
