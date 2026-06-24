import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext.jsx";
import { googleDemoLogin, googleLoginUrl } from "../services/authService";

export default function GoogleSignInButton({ onError, label = "Continue with Google" }) {
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [demoForm, setDemoForm] = useState({ email: "", name: "" });
  const [demoLoading, setDemoLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    onError?.("");
    setLoading(true);
    try {
      // Send the JWT token to the backend
      const token = credentialResponse.credential;
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(`${baseUrl}/login/oauth2/code/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("OAuth login failed");
      }

      const data = await response.json();
      saveSession(data);
      navigate("/profile");
    } catch (error) {
      onError?.(error.message || "Google login failed. Please try again.");
      // Fallback to demo mode
      setShowDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    onError?.("Google login failed. Please try again or use the demo mode.");
    setShowDemo(true);
  };

  const handleDemoChange = (event) => {
    setDemoForm({ ...demoForm, [event.target.name]: event.target.value });
  };

  const handleDemoSubmit = async (event) => {
    event.preventDefault();
    onError?.("");
    setDemoLoading(true);
    try {
      const response = await googleDemoLogin({
        email: demoForm.email,
        name: demoForm.name || demoForm.email.split("@")[0]
      });
      saveSession(response.data);
      setShowDemo(false);
      navigate("/profile");
    } catch (exception) {
      onError?.(exception.response?.data?.message || "Google login failed");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <>
      <div className="google-signin-wrapper">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          width="100%"
          text="signin_with"
          theme="outline"
        />
      </div>

      {showDemo && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Continue with Google (demo mode)</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDemo(false)} />
              </div>
              <form onSubmit={handleDemoSubmit}>
                <div className="modal-body">
                  <p className="text-muted small">
                    Google OAuth is not configured yet. Enter your Google email to simulate sign-in, or set
                    {" "}
                    <code>GOOGLE_CLIENT_ID</code>
                    {" "}
                    and
                    {" "}
                    <code>GOOGLE_CLIENT_SECRET</code>
                    {" "}
                    on the backend for real Google login.
                  </p>
                  <div className="mb-3">
                    <label className="form-label">Google email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={demoForm.email}
                      onChange={handleDemoChange}
                      placeholder="you@gmail.com"
                      required
                    />
                  </div>
                  <div className="mb-0">
                    <label className="form-label">Display name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={demoForm.name}
                      onChange={handleDemoChange}
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowDemo(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={demoLoading}>
                    {demoLoading ? "Signing in..." : "Continue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}
