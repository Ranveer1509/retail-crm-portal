package com.ranveer.retailcrm.dto;

import com.ranveer.retailcrm.entity.AuthProvider;

import java.time.LocalDateTime;

public class AuthResponse {

    private final String token;
    private final String tokenType;
    private final Long id;
    private final String username;
    private final String email;
    private final AuthProvider provider;
    private final LocalDateTime createdAt;

    public AuthResponse(
            String token,
            Long id,
            String username,
            String email,
            AuthProvider provider,
            LocalDateTime createdAt
    ) {
        this.token = token;
        this.tokenType = "Bearer";
        this.id = id;
        this.username = username;
        this.email = email;
        this.provider = provider;
        this.createdAt = createdAt;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}