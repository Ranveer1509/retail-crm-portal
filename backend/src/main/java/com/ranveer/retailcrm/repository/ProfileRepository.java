package com.ranveer.retailcrm.repository;

import com.ranveer.retailcrm.entity.Profile;
import com.ranveer.retailcrm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(User user);
}
