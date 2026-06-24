import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/AppNavbar.jsx";
import EducationManager from "../components/EducationManager.jsx";
import { createProfile, getProfile, updateProfile, uploadProfilePhoto } from "../services/profileService";
import { buildEducationSummary, educationLevels, emptyProfile, normalizeProfile } from "./profileUtils";

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(emptyProfile);
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getProfile();
        setProfile(normalizeProfile(response.data));
        setHasProfile(true);
      } catch (exception) {
        if (exception.response?.status !== 404) {
          setError(exception.response?.data?.message || "Unable to load profile");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const nextProfile = { ...profile, [event.target.name]: event.target.value };
    setProfile(nextProfile);
  };

  const handleEducationsChange = (educations) => {
    setProfile((current) => ({ ...current, educations }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setMessage("");
    setUploading(true);

    try {
      const response = await uploadProfilePhoto(file);
      setProfile((current) => ({ ...current, photoUrl: response.data.photoUrl }));
      setMessage("Photo uploaded. Save profile to keep this photo.");
    } catch (exception) {
      setError(exception.response?.data?.message || "Unable to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = { ...profile };
      if (hasProfile) {
        await updateProfile(payload);
      } else {
        await createProfile(payload);
      }
      navigate("/profile", { replace: true, state: { message: "Profile updated successfully." } });
    } catch (exception) {
      setError(exception.response?.data?.message || "Unable to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AppNavbar />
      <main className="dashboard">
        <div className="container">
          <div className="edit-shell">
            <section className="crm-editor-hero">
              <div>
                <p className="text-uppercase small fw-bold text-primary mb-2">Profile workspace</p>
                <h1>{hasProfile ? "Edit Profile" : "Add Profile"}</h1>
                <p>Manage and maintain your professional information securely.</p>
              </div>
              <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/profile")}>Cancel</button>
            </section>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success toast-alert">✓ {message}</div>}
            {loading && <div className="loading-state"><span className="spinner-border spinner-border-sm" /> Loading profile...</div>}

            <form className="card crm-card editor-card" onSubmit={handleSubmit}>
              <div className="card-body p-4 p-lg-5">
                <div className="section-title">
                  <span>1</span>
                  <div>
                    <h3>Personal details</h3>
                    <p>Profile photo, full name, and address.</p>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Upload profile photo</label>
                    <div className="upload-panel">
                      <img className="upload-preview" src={profile.photoUrl || "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=500&q=80"} alt="Selected profile" />
                      <div className="flex-grow-1">
                        <input className="form-control" type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhotoUpload} />
                        <div className="form-text">Upload JPG, PNG, or WEBP up to 2 MB from your computer.</div>
                      </div>
                      {uploading && <span className="badge text-bg-info">Uploading...</span>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Full name</label>
                    <input className="form-control" name="fullName" value={profile.fullName || ""} onChange={handleChange} required />
                  </div>
                  <input type="hidden" name="photoUrl" value={profile.photoUrl || ""} readOnly />
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" rows="3" name="address" value={profile.address || ""} onChange={handleChange} required />
                  </div>
                </div>

                <div className="section-title mt-5 education-section-title">
                  <span>2</span>
                  <div>
                    <h3>Education & Academic Credentials</h3>
                    <p>Add all your education records from 10th, 12th, Diploma, Bachelor's, Master's, etc.</p>
                  </div>
                </div>

                <EducationManager 
                  educations={profile.educations || []} 
                  onEducationsChange={handleEducationsChange}
                />

                <div className="editor-actions">
                  <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/profile")}>Cancel</button>
                  <button className="btn btn-primary px-4" disabled={loading || uploading || saving}>
                    {saving ? "Saving..." : hasProfile ? "Update Profile" : "Save Profile"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

