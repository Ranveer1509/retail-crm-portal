package com.ranveer.retailcrm.controller;

import com.ranveer.retailcrm.dto.PhotoUploadResponse;
import com.ranveer.retailcrm.dto.ProfileRequest;
import com.ranveer.retailcrm.dto.ProfileResponse;
import com.ranveer.retailcrm.security.UserPrincipal;
import com.ranveer.retailcrm.service.FileStorageService;
import com.ranveer.retailcrm.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final FileStorageService fileStorageService;

    public ProfileController(
            ProfileService profileService,
            FileStorageService fileStorageService
    ) {
        this.profileService = profileService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {

        return ResponseEntity.ok(
                profileService.getProfile(
                        userPrincipal.getEmail()
                )
        );
    }

    @PostMapping
    public ResponseEntity<ProfileResponse> saveProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ProfileRequest request
    ) {

        return ResponseEntity.ok(
                profileService.saveProfile(
                        userPrincipal.getEmail(),
                        request
                )
        );
    }

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ProfileRequest request
    ) {

        return ResponseEntity.ok(
                profileService.updateProfile(
                        userPrincipal.getEmail(),
                        request
                )
        );
    }

    @PostMapping("/photo")
    public ResponseEntity<PhotoUploadResponse> uploadProfilePhoto(
            @RequestPart("photo") MultipartFile photo
    ) {

        String photoUrl =
                fileStorageService.storeProfilePhoto(photo);

        return ResponseEntity.ok(
                new PhotoUploadResponse(photoUrl)
        );
    }
}