package com.ranveer.retailcrm.service;

import com.ranveer.retailcrm.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final long MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
    );

    private final Path uploadDir;

    public FileStorageService(
            @Value("${app.upload-dir:uploads}") String uploadDir
    ) {
        this.uploadDir = Path.of(uploadDir)
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(this.uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize upload directory", e);
        }
    }

    public String storeProfilePhoto(MultipartFile file) {

        validateFile(file);

        try {

            String originalFileName =
                    StringUtils.cleanPath(
                            file.getOriginalFilename() == null
                                    ? "profile-photo"
                                    : file.getOriginalFilename());

            String extension = getExtension(originalFileName);

            String storedFileName =
                    UUID.randomUUID() + extension;

            Path targetLocation =
                    uploadDir.resolve(storedFileName)
                            .normalize();

            if (!targetLocation.startsWith(uploadDir)) {
                throw new BadRequestException("Invalid file path");
            }

            Files.copy(
                    file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING
            );

            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/uploads/")
                    .path(storedFileName)
                    .toUriString();

        } catch (IOException e) {
            throw new BadRequestException(
                    "Unable to upload photo. Please try again."
            );
        }
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException(
                    "Please select a profile photo"
            );
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BadRequestException(
                    "Photo size must not exceed 2 MB"
            );
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                !ALLOWED_CONTENT_TYPES.contains(contentType)) {

            throw new BadRequestException(
                    "Only JPG, JPEG, PNG and WEBP images are allowed"
            );
        }

        String extension = getExtension(
                file.getOriginalFilename()
        );

        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException(
                    "Invalid image format"
            );
        }
    }

    private String getExtension(String fileName) {

        if (fileName == null || fileName.isBlank()) {
            return ".jpg";
        }

        int lastDot = fileName.lastIndexOf('.');

        if (lastDot < 0) {
            return ".jpg";
        }

        return fileName.substring(lastDot)
                .toLowerCase();
    }
}