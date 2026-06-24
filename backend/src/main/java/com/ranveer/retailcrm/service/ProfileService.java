package com.ranveer.retailcrm.service;

import com.ranveer.retailcrm.dto.EducationDetail;
import com.ranveer.retailcrm.dto.ProfileRequest;
import com.ranveer.retailcrm.dto.ProfileResponse;
import com.ranveer.retailcrm.entity.Education;
import com.ranveer.retailcrm.entity.Profile;
import com.ranveer.retailcrm.entity.User;
import com.ranveer.retailcrm.exception.ResourceNotFoundException;
import com.ranveer.retailcrm.repository.EducationRepository;
import com.ranveer.retailcrm.repository.ProfileRepository;
import com.ranveer.retailcrm.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProfileService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final EducationRepository educationRepository;

    public ProfileService(
            UserRepository userRepository,
            ProfileRepository profileRepository,
            EducationRepository educationRepository
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.educationRepository = educationRepository;
    }

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(String email) {

        User user = getUser(email);

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Profile details are not added yet"));

        var educations = educationRepository.findAllByUser(user);
        
        // For backward compatibility, try to get first education
        Education firstEducation = educations.isEmpty() ? null : educations.get(0);
        
        if (firstEducation == null) {
            // Still throw for old API compatibility if needed
            firstEducation = educationRepository.findByUser(user)
                    .orElseGet(() -> new Education());
        }

        return toResponse(profile, firstEducation, educations);
    }

    @Transactional
    public ProfileResponse saveProfile(
            String email,
            ProfileRequest request
    ) {

        User user = getUser(email);

        Profile profile = profileRepository.findByUser(user)
                .orElseGet(Profile::new);

        profile.setUser(user);

        applyProfile(profile, request);

        Profile savedProfile = profileRepository.save(profile);
        
        // Delete existing education records
        var existingEducations = educationRepository.findAllByUser(user);
        educationRepository.deleteAll(existingEducations);
        
        // Save new education records from the array
        var educationDetails = request.getEducations();
        if (educationDetails != null && !educationDetails.isEmpty()) {
            for (EducationDetail detail : educationDetails) {
                Education education = new Education();
                education.setUser(user);
                education.setDegree(clean(detail.getDegree()));
                education.setStream(clean(detail.getStream()));
                education.setCollegeName(clean(detail.getCollegeName()));
                education.setEducationAddress(clean(detail.getEducationAddress()));
                education.setStartDate(clean(detail.getStartDate()));
                education.setEndDate(clean(detail.getEndDate()));
                education.setCgpa(clean(detail.getCgpa()));
                educationRepository.save(education);
            }
        }
        
        var educations = educationRepository.findAllByUser(user);
        Education firstEducation = educations.isEmpty() ? new Education() : educations.get(0);

        return toResponse(savedProfile, firstEducation, educations);
    }

    @Transactional
    public ProfileResponse updateProfile(
            String email,
            ProfileRequest request
    ) {

        User user = getUser(email);

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Profile details are not added yet"));

        applyProfile(profile, request);

        Profile updatedProfile = profileRepository.save(profile);
        
        // Delete existing education records
        var existingEducations = educationRepository.findAllByUser(user);
        educationRepository.deleteAll(existingEducations);
        
        // Save new education records from the array
        var educationDetails = request.getEducations();
        if (educationDetails != null && !educationDetails.isEmpty()) {
            for (EducationDetail detail : educationDetails) {
                Education education = new Education();
                education.setUser(user);
                education.setDegree(clean(detail.getDegree()));
                education.setStream(clean(detail.getStream()));
                education.setCollegeName(clean(detail.getCollegeName()));
                education.setEducationAddress(clean(detail.getEducationAddress()));
                education.setStartDate(clean(detail.getStartDate()));
                education.setEndDate(clean(detail.getEndDate()));
                education.setCgpa(clean(detail.getCgpa()));
                educationRepository.save(education);
            }
        }
        
        var educations = educationRepository.findAllByUser(user);
        Education firstEducation = educations.isEmpty() ? new Education() : educations.get(0);

        return toResponse(updatedProfile, firstEducation, educations);
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));
    }

    private void applyProfile(
            Profile profile,
            ProfileRequest request
    ) {

        profile.setFullName(clean(request.getFullName()));
        profile.setPhotoUrl(clean(request.getPhotoUrl()));
        profile.setAddress(clean(request.getAddress()));
    }

    private ProfileResponse toResponse(
            Profile profile,
            Education education,
            java.util.List<Education> educations
    ) {
        java.util.List<EducationDetail> educationDetails = educations.stream()
                .map(edu -> new EducationDetail(
                        edu.getDegree(),
                        edu.getStream(),
                        edu.getCollegeName(),
                        edu.getEducationAddress(),
                        edu.getStartDate(),
                        edu.getEndDate(),
                        edu.getCgpa()
                ))
                .collect(Collectors.toList());

        ProfileResponse response = new ProfileResponse(
                profile.getId(),
                profile.getUser().getId(),
                profile.getFullName(),
                profile.getPhotoUrl(),
                profile.getAddress(),
                summary(education),
                education.getDegree(),
                education.getStream(),
                education.getStartDate(),
                education.getEndDate(),
                education.getCgpa(),
                education.getCollegeName(),
                education.getEducationAddress(),
                educationDetails
        );
        return response;
    }

    private ProfileResponse toResponse(
            Profile profile,
            Education education
    ) {

        return new ProfileResponse(
                profile.getId(),
                profile.getUser().getId(),
                profile.getFullName(),
                profile.getPhotoUrl(),
                profile.getAddress(),
                summary(education),
                education.getDegree(),
                education.getStream(),
                education.getStartDate(),
                education.getEndDate(),
                education.getCgpa(),
                education.getCollegeName(),
                education.getEducationAddress()
        );
    }

    private String clean(String value) {

        return value == null ? "" : value.trim();
    }

    private String summary(Education education) {

        return Stream.of(
                        education.getDegree(),
                        education.getStream(),
                        education.getCollegeName(),
                        education.getEducationAddress(),
                        buildDateRange(education),
                        buildCgpa(education)
                )
                .filter(value ->
                        value != null && !value.isBlank())
                .collect(Collectors.joining(" | "));
    }

    private String buildDateRange(Education education) {

        String start = formatDate(education.getStartDate());
        String end = formatDate(education.getEndDate());

        if (start.isBlank() && end.isBlank()) {
            return "";
        }

        return start + " - " + end;
    }

    private String buildCgpa(Education education) {

        if (education.getCgpa() == null ||
                education.getCgpa().isBlank()) {
            return "";
        }

        return "CGPA: " + education.getCgpa();
    }

    private String formatDate(String value) {

        if (value == null || value.isBlank()) {
            return "";
        }

        String[] parts = value.split("-");

        if (parts.length != 3) {
            return value;
        }

        return parts[2] + "/" + parts[1] + "/" + parts[0];
    }
}