export const emptyProfile = {
  fullName: "",
  photoUrl: "",
  address: "",
  education: "",
  educations: [],
  educationLevel: "Bachelors",
  fieldOfStudy: "",
  fromYear: "",
  tillYear: "",
  cgpa: "",
  universityName: "",
  educationPlace: ""
};

export const emptyEducation = {
  degree: "Bachelors",
  stream: "",
  collegeName: "",
  educationAddress: "",
  startDate: "",
  endDate: "",
  cgpa: ""
};

export const educationLevels = ["10th", "12th", "Diploma", "Bachelors", "Masters", "PhD", "Other"];

export function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export function formatDateRange(startDate, endDate) {
  if (startDate && endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
  return "";
}

export function buildEducationSummary(profile) {
  return [
    profile.educationLevel,
    profile.fieldOfStudy,
    profile.universityName,
    profile.educationPlace,
    formatDateRange(profile.fromYear, profile.tillYear),
    profile.cgpa ? `CGPA: ${profile.cgpa}` : ""
  ].filter(Boolean).join(" | ");
}

export function formatEducationDetail(edu) {
  return [
    edu.degree,
    edu.stream,
    edu.collegeName,
    edu.educationAddress,
    formatDateRange(edu.startDate, edu.endDate),
    edu.cgpa ? `CGPA: ${edu.cgpa}` : ""
  ].filter(Boolean).join(" | ");
}

export function normalizeProfile(profile) {
  const merged = { ...emptyProfile, ...profile };
  if (!merged.educationLevel && merged.education) {
    merged.educationLevel = merged.education.split("|")[0]?.trim() || "";
  }
  // Ensure educations is an array
  if (!Array.isArray(merged.educations)) {
    merged.educations = [];
  }
  return merged;
}
