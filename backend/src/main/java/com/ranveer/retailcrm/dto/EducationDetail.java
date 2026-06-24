package com.ranveer.retailcrm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EducationDetail {
    @NotBlank(message = "Degree is required")
    @Size(max = 80, message = "Degree cannot exceed 80 characters")
    private String degree;

    @NotBlank(message = "Stream is required")
    @Size(max = 120, message = "Stream cannot exceed 120 characters")
    private String stream;

    @NotBlank(message = "College name is required")
    @Size(max = 160, message = "College name cannot exceed 160 characters")
    private String collegeName;

    @NotBlank(message = "Education address is required")
    @Size(max = 160, message = "Education address cannot exceed 160 characters")
    private String educationAddress;

    @NotBlank(message = "Start date is required")
    @Size(max = 20, message = "Start date cannot exceed 20 characters")
    private String startDate;

    @NotBlank(message = "End date is required")
    @Size(max = 20, message = "End date cannot exceed 20 characters")
    private String endDate;

    @NotBlank(message = "CGPA is required")
    @Size(max = 20, message = "CGPA cannot exceed 20 characters")
    private String cgpa;

    public EducationDetail() {
    }

    public EducationDetail(String degree, String stream, String collegeName, String educationAddress, String startDate, String endDate, String cgpa) {
        this.degree = degree;
        this.stream = stream;
        this.collegeName = collegeName;
        this.educationAddress = educationAddress;
        this.startDate = startDate;
        this.endDate = endDate;
        this.cgpa = cgpa;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getStream() {
        return stream;
    }

    public void setStream(String stream) {
        this.stream = stream;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getEducationAddress() {
        return educationAddress;
    }

    public void setEducationAddress(String educationAddress) {
        this.educationAddress = educationAddress;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getCgpa() {
        return cgpa;
    }

    public void setCgpa(String cgpa) {
        this.cgpa = cgpa;
    }
}
