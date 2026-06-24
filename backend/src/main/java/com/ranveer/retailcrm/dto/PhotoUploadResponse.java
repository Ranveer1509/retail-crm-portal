package com.ranveer.retailcrm.dto;

public class PhotoUploadResponse {
    private String photoUrl;

    public PhotoUploadResponse(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }
}
