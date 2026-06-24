import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function OAuthRedirectPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { saveSession } = useAuth();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      saveSession({
        token,
        email: params.get("email") || "",
        username: params.get("username") || "Google user",
        id: params.get("id") ? Number(params.get("id")) : null,
        provider: params.get("provider") || "GOOGLE"
      });
      navigate("/profile", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [params, saveSession, navigate]);

  return (
    <main className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <h5 className="fw-bold">Completing Google login</h5>
          <p className="text-muted mb-0">Redirecting to your profile...</p>
        </div>
      </div>
    </main>
  );
}
