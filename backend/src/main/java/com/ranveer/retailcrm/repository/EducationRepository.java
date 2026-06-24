package com.ranveer.retailcrm.repository;

import com.ranveer.retailcrm.entity.Education;
import com.ranveer.retailcrm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EducationRepository
        extends JpaRepository<Education, Long> {

    Optional<Education> findByUser(User user);

    List<Education> findAllByUser(User user);

    void deleteByUser(User user);
}