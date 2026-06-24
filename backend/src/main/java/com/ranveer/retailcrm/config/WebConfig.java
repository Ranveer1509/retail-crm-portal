package com.ranveer.retailcrm.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final String uploadPath;

    public WebConfig(
            @Value("${app.upload-dir:uploads}") String uploadDir
    ) {
        this.uploadPath = Path.of(uploadDir)
                .toAbsolutePath()
                .normalize()
                .toUri()
                .toString();
    }

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry
    ) {

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
}