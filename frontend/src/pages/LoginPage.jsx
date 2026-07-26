import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { Button, Card, Loader } from "../components/ui";

function LoginPage() {
  // -----------------------------
  // Hooks
  // -----------------------------
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  // -----------------------------
  // State
  // -----------------------------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // Redirect if already logged in
  // -----------------------------
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // -----------------------------
  // Form Submission
  // -----------------------------
  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const tokens = await loginUser({
        username,
        password,
      });

      login(tokens);

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="login-page">
      <Card className="login-card">
        <h1>Welcome Back</h1>
        <p>Sign in to continue to ProductPilot AI</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;