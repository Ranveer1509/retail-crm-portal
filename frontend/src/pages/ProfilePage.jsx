import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppNavbar from "../components/AppNavbar.jsx";
import { getProfile } from "../services/profileService";
import { useAuth } from "../context/AuthContext.jsx";
import { emptyProfile, formatDate, formatEducationDetail, normalizeProfile } from "./profileUtils";

export default function ProfilePage() {
  const { user } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(emptyProfile);
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const photo = profile.photoUrl || "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=500&q=80";
  const userInitial = (user?.name || user?.username || user?.email || "U")
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getProfile();
        console.log("Profile response:", response.data);
        setProfile(normalizeProfile(response.data));
        setHasProfile(true);
      } catch (exception) {
        if (exception.response?.status === 404) {
          setHasProfile(false);
        } else {
          setError(exception.response?.data?.message || "Unable to load profile");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <>
      <AppNavbar />
      <main className="dashboard">
        <div className="container">
          <div className="profile-page-shell">
            <div>
              <div className="crm-header profile-only-header">
                <div>
                  <p className="text-uppercase small fw-bold text-primary mb-2">Your Profile</p>
                  <h1 className="fw-bold mb-2">Customer Profile Management</h1>
                  <p className="text-muted mb-0">View your complete professional profile and credentials.</p>
                </div>
                <Link className="btn btn-primary px-4 py-3" to="/profile/edit">
                  {hasProfile ? "Edit Profile" : "Complete Profile"}
                </Link>
              </div>
            </div>

            {location.state?.message && <div className="alert alert-success toast-alert mb-0">✓ {location.state.message}</div>}
            {error && <div className="alert alert-danger mb-0">{error}</div>}
            {loading && <div className="loading-state"><span className="spinner-border spinner-border-sm" /> Loading profile...</div>}

            {!loading && !error && !hasProfile && (
              <section className="card crm-card empty-profile-card">
                <div className="card-body p-4 p-lg-5 text-center">
                  <h2>Welcome to Retail CRM Portal</h2>
                  <p>Please complete your profile information to continue.</p>
                  <Link className="btn btn-primary px-4" to="/profile/edit">Complete Profile</Link>
                </div>
              </section>
            )}

            {hasProfile && <section className="card crm-card profile-readonly-card">
              <div className="profile-banner" />
              <div className="card-body p-4 p-lg-5">
                {/* User Header Section */}
                <div className="profile-header-section mb-5">
                  <div className="profile-header-content">
                    <div className="profile-avatar-wrapper">
                      <img className="profile-avatar-xl" src={photo} alt="Profile" />
                    </div>
                    <div className="profile-header-info">
                      <div className="profile-status-badge">Saved Profile</div>
                      <h1 className="profile-name">{profile.fullName || "Profile not completed"}</h1>
                      <div className="profile-contact-info">
                        <p className="profile-email">{user?.email || "No email"}</p>
                        <p className="profile-institution">{profile.universityName || "University"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="profile-section professional-section">
                  <div className="profile-section-header">
                    <div className="section-icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h3 className="section-title">Personal Information</h3>
                      <p className="section-subtitle">Your basic profile details</p>
                    </div>
                  </div>
                  <div className="profile-info-grid">
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <strong className="info-value">{profile.fullName}</strong>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email Address</span>
                      <strong className="info-value">{user?.email}</strong>
                    </div>
                    <div className="info-item full-width">
                      <span className="info-label">Address</span>
                      <strong className="info-value">{profile.address}</strong>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="profile-section professional-section">
                  <div className="profile-section-header">
                    <div className="section-icon-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6m0 0v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4m0 0V9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v7m-2-4L12 5 2 10"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="section-title">Education</h3>
                      <p className="section-subtitle">Your academic background and credentials</p>
                    </div>
                  </div>
                  {profile.educations && profile.educations.length > 0 ? (
                    <div className="education-list">
                      {profile.educations.map((edu, idx) => (
                        <div key={idx} className="education-card">
                          <div className="education-card-header">
                            <div>
                              <h4 className="education-degree">{edu.degree}</h4>
                              <p className="education-stream-desc">{edu.stream}</p>
                            </div>
                            <span className="education-badge">{idx + 1}</span>
                          </div>
                          <div className="education-grid">
                            <div className="edu-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edu-icon">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                              </svg>
                              <span className="edu-label">Institution</span>
                              <strong className="edu-value">{edu.collegeName}</strong>
                            </div>
                            <div className="edu-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edu-icon">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                              </svg>
                              <span className="edu-label">Location</span>
                              <strong className="edu-value">{edu.educationAddress}</strong>
                            </div>
                            <div className="edu-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edu-icon">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              <span className="edu-label">Duration</span>
                              <strong className="edu-value">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</strong>
                            </div>
                            <div className="edu-item">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="edu-icon">
                                <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
                              </svg>
                              <span className="edu-label">Performance</span>
                              <strong className="edu-value">{edu.cgpa}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="education-placeholder-enhanced">
                      <div className="placeholder-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 10v6m0 0v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4m0 0V9c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v7m-2-4L12 5 2 10"></path>
                        </svg>
                      </div>
                      <p className="placeholder-text">No education records added yet</p>
                      <p className="placeholder-subtext">Add your academic credentials to complete your profile</p>
                    </div>
                  )}
                </div>
              </div>
            </section>}
          </div>
        </div>
      </main>
    </>
  );
}

