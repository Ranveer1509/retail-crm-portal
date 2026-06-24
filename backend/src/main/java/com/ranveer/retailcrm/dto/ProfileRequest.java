package com.ranveer.retailcrm.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class ProfileRequest {
    @NotBlank(message = "Full name is required")
    @Size(max = 120, message = "Full name cannot exceed 120 characters")
    private String fullName;

    @Size(max = 500, message = "Photo URL cannot exceed 500 characters")
    private String photoUrl;

    @NotBlank(message = "Address is required")
    @Size(max = 500, message = "Address cannot exceed 500 characters")
    private String address;

    @Size(max = 500, message = "Education cannot exceed 500 characters")
    private String education;

    // Old single-education fields (for backward compatibility)
    @Size(max = 80, message = "Degree cannot exceed 80 characters")
    private String educationLevel;

    @Size(max = 120, message = "Stream cannot exceed 120 characters")
    private String fieldOfStudy;

    @Size(max = 20, message = "Start date cannot exceed 20 characters")
    private String fromYear;

    @Size(max = 20, message = "End date cannot exceed 20 characters")
    private String tillYear;

    @Size(max = 20, message = "CGPA cannot exceed 20 characters")
    private String cgpa;

    @Size(max = 160, message = "College name cannot exceed 160 characters")
    private String universityName;

    @Size(max = 160, message = "Education address cannot exceed 160 characters")
    private String educationPlace;

    // New multiple education records
    @Valid
    private List<EducationDetail> educations;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public void setFieldOfStudy(String fieldOfStudy) {
        this.fieldOfStudy = fieldOfStudy;
    }

    public String getFromYear() {
        return fromYear;
    }

    public void setFromYear(String fromYear) {
        this.fromYear = fromYear;
    }

    public String getTillYear() {
        return tillYear;
    }

    public void setTillYear(String tillYear) {
        this.tillYear = tillYear;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getEducationPlace() {
        return educationPlace;
    }

    public void setEducationPlace(String educationPlace) {
        this.educationPlace = educationPlace;
    }

    public List<EducationDetail> getEducations() {
        return educations;
    }

    public void setEducations(List<EducationDetail> educations) {
        this.educations = educations;
    }

    // Backward compatibility
    public List<EducationDetail> getEducationDetails() {
        return educations;
    }

    public void setEducationDetails(List<EducationDetail> educationDetails) {
        this.educations = educationDetails;
    }
}
