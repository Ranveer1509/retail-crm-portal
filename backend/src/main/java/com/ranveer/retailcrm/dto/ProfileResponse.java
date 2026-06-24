package com.ranveer.retailcrm.dto;

import java.util.List;

public class ProfileResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String photoUrl;
    private String address;
    private String education;
    private String educationLevel;
    private String fieldOfStudy;
    private String fromYear;
    private String tillYear;
    private String cgpa;
    private String universityName;
    private String educationPlace;
    private List<EducationDetail> educations;

    public ProfileResponse(
            Long id,
            Long userId,
            String fullName,
            String photoUrl,
            String address,
            String education,
            String educationLevel,
            String fieldOfStudy,
            String fromYear,
            String tillYear,
            String cgpa,
            String universityName,
            String educationPlace,
            List<EducationDetail> educations
    ) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.photoUrl = photoUrl;
        this.address = address;
        this.education = education;
        this.educationLevel = educationLevel;
        this.fieldOfStudy = fieldOfStudy;
        this.fromYear = fromYear;
        this.tillYear = tillYear;
        this.cgpa = cgpa;
        this.universityName = universityName;
        this.educationPlace = educationPlace;
        this.educations = educations;
    }

    // Legacy constructor for backward compatibility
    public ProfileResponse(
            Long id,
            Long userId,
            String fullName,
            String photoUrl,
            String address,
            String education,
            String educationLevel,
            String fieldOfStudy,
            String fromYear,
            String tillYear,
            String cgpa,
            String universityName,
            String educationPlace
    ) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.photoUrl = photoUrl;
        this.address = address;
        this.education = education;
        this.educationLevel = educationLevel;
        this.fieldOfStudy = fieldOfStudy;
        this.fromYear = fromYear;
        this.tillYear = tillYear;
        this.cgpa = cgpa;
        this.universityName = universityName;
        this.educationPlace = educationPlace;
        this.educations = List.of();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public String getAddress() {
        return address;
    }

    public String getEducation() {
        return education;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public String getFromYear() {
        return fromYear;
    }

    public String getTillYear() {
        return tillYear;
    }

    public String getCgpa() {
        return cgpa;
    }

    public String getUniversityName() {
        return universityName;
    }

    public String getEducationPlace() {
        return educationPlace;
    }

    public List<EducationDetail> getEducations() {
        return educations;
    }

    public void setEducations(List<EducationDetail> educations) {
        this.educations = educations;
    }
}
