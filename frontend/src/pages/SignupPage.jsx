import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";
import { register } from "../services/authService";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignupPage() {
  const navigate = useNavigate();
  const { saveSession } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await register(form);
      saveSession(response.data);
      navigate("/profile");
    } catch (exception) {
      setError(exception.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-hero d-none d-lg-flex">
        <div>
          <p className="text-uppercase fw-bold small text-primary">Customer profile management</p>
          <h1 className="display-4 fw-bold">Create your CRM account</h1>
          <p className="lead text-muted">
            Register once, complete your profile, and reload saved details from MySQL on the next login.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <div className="card border-0 shadow-sm auth-card">
          <div className="card-body p-4 p-md-5">
            <h2 className="fw-bold mb-2">Signup</h2>
            <p className="text-muted mb-4">Start with username, email, and password.</p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input className="form-control" name="username" value={form.username} onChange={handleChange} required minLength="3" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} required minLength="6" />
              </div>
              <button className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? "Creating account..." : "Signup"}
              </button>
            </form>

            <div className="divider">or</div>

            <GoogleSignInButton onError={setError} />

            <p className="text-center text-muted mt-4 mb-0">
              Already registered? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
