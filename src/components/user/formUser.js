import { useState } from "react";

export default function FormUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin= async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3030/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Email ou mot de passe invalide");
        } else {
          setMessage("Signup failed");
        }
        return;
      }

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="card-body" style={{ marginTop: "-5%" }}>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Adresse email"
            aria-label="Email"
            aria-describedby="email-addon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            aria-label="Password"
            aria-describedby="password-addon"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-gradient-dark w-100 my-4 mb-2"
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Creer"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
