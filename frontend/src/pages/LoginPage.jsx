import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { saveSession } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (oauthError === "google_email_missing") {
      setError("Google did not return an email address. Try another Google account.");
    }
  }, [searchParams]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login(form);
      saveSession(response.data);
      navigate("/profile");
    } catch (exception) {
      setError(exception.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-hero d-none d-lg-flex">
        <div>
          <p className="text-uppercase fw-bold small text-primary">Zoho CRM inspired retail workflow</p>
          <h1 className="display-4 fw-bold">Retail CRM Portal</h1>
          <p className="lead text-muted">
            Secure customer profile management with Spring Boot, JWT, Google OAuth2, MySQL, and React.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="card border-0 shadow-sm auth-card">
          <div className="card-body p-4 p-md-5">
            <h2 className="fw-bold mb-2">Login</h2>
            <p className="text-muted mb-4">Access your retail CRM profile dashboard.</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <button className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="divider">or</div>

            <GoogleSignInButton onError={setError} />

            <p className="text-center text-muted mt-4 mb-0">
              New user? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
