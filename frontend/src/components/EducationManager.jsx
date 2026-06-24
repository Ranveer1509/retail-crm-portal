import { useState } from "react";
import { emptyEducation, educationLevels } from "../pages/profileUtils";

export default function EducationManager({ educations = [], onEducationsChange }) {
  const [educationList, setEducationList] = useState(educations || []);

  const handleAddEducation = () => {
    const newEducations = [...educationList, { ...emptyEducation }];
    setEducationList(newEducations);
    onEducationsChange(newEducations);
  };

  const handleRemoveEducation = (index) => {
    const newEducations = educationList.filter((_, i) => i !== index);
    setEducationList(newEducations);
    onEducationsChange(newEducations);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educationList];
    newEducations[index] = { ...newEducations[index], [field]: value };
    setEducationList(newEducations);
    onEducationsChange(newEducations);
  };

  return (
    <div className="education-manager">
      <div className="education-manager-header">
        <div>
          <h3>Education Records</h3>
          <p>Add all your education credentials (10th, 12th, Diploma, Bachelor's, Master's, etc.)</p>
        </div>
        <button
          className="btn btn-success btn-sm"
          type="button"
          onClick={handleAddEducation}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Education
        </button>
      </div>

      <div className="education-entries-container">
        {educationList.length === 0 ? (
          <div className="education-empty-state">
            <p>No education records added yet. Click "Add Education" to get started.</p>
          </div>
        ) : (
          educationList.map((edu, index) => (
            <div key={index} className="education-entry-card">
              <div className="education-entry-header">
                <span className="entry-number">Record {index + 1}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Remove
                </button>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Degree</label>
                  <select
                    className="form-select"
                    value={edu.degree || "Bachelors"}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  >
                    {educationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8">
                  <label className="form-label">Stream/Field of Study</label>
                  <input
                    className="form-control"
                    type="text"
                    value={edu.stream || ""}
                    onChange={(e) => handleEducationChange(index, "stream", e.target.value)}
                    placeholder="e.g., Information Technology, Commerce, Science"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">College/School Name</label>
                  <input
                    className="form-control"
                    type="text"
                    value={edu.collegeName || ""}
                    onChange={(e) => handleEducationChange(index, "collegeName", e.target.value)}
                    placeholder="e.g., ABC University"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    type="text"
                    value={edu.educationAddress || ""}
                    onChange={(e) => handleEducationChange(index, "educationAddress", e.target.value)}
                    placeholder="City, State"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Start Date</label>
                  <input
                    className="form-control"
                    type="date"
                    value={edu.startDate || ""}
                    onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">End Date</label>
                  <input
                    className="form-control"
                    type="date"
                    value={edu.endDate || ""}
                    onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">CGPA/Percentage</label>
                  <input
                    className="form-control"
                    type="text"
                    value={edu.cgpa || ""}
                    onChange={(e) => handleEducationChange(index, "cgpa", e.target.value)}
                    placeholder="e.g., 8.5 or 85%"
                    required
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
