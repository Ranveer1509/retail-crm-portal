package com.ranveer.retailcrm.dto;

public class GoogleOAuthStatusResponse {
    private boolean enabled;

    public GoogleOAuthStatusResponse(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
