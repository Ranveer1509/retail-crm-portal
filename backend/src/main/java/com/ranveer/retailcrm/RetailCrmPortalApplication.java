package com.ranveer.retailcrm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class RetailCrmPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(RetailCrmPortalApplication.class, args);
    }
}