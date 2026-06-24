package com.ranveer.retailcrm.controller;

import com.ranveer.retailcrm.dto.AuthResponse;
import com.ranveer.retailcrm.dto.GoogleDemoLoginRequest;
import com.ranveer.retailcrm.dto.GoogleOAuthStatusResponse;
import com.ranveer.retailcrm.dto.LoginRequest;
import com.ranveer.retailcrm.dto.RegisterRequest;
import com.ranveer.retailcrm.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final boolean googleOAuthEnabled;

    public AuthController(
            AuthService authService,
            @Value("${app.google-oauth-enabled:false}")
            boolean googleOAuthEnabled,
            @Value("${spring.security.oauth2.client.registration.google.client-id:}")
            String googleClientId,
            @Value("${spring.security.oauth2.client.registration.google.client-secret:}")
            String googleClientSecret
    ) {
        this.authService = authService;
        this.googleOAuthEnabled = googleOAuthEnabled
                || hasRealGoogleCredentials(googleClientId, googleClientSecret);
    }

    private boolean hasRealGoogleCredentials(String clientId, String clientSecret) {
        return isConfigured(clientId)
                && isConfigured(clientSecret)
                && !clientId.startsWith("demo-")
                && !clientId.equals("your-google-client-id");
    }

    private boolean isConfigured(String value) {
        return value != null && !value.isBlank();
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @PostMapping("/google-demo")
    public ResponseEntity<AuthResponse> googleDemoLogin(
            @Valid @RequestBody GoogleDemoLoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.googleDemoLogin(
                        request.getEmail(),
                        request.getName()
                )
        );
    }

    @GetMapping("/google/status")
    public ResponseEntity<GoogleOAuthStatusResponse> googleStatus() {

        return ResponseEntity.ok(
                new GoogleOAuthStatusResponse(
                        googleOAuthEnabled
                )
        );
    }
}