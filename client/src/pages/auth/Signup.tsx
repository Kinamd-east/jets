import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (form.password.length < 8) {
      console.log("Password must to be 8 letters long");
      setLoading(false);
      return;
    }
    if (!form.email.endsWith("@lmu.edu.ng")) {
      alert("Sorry, only available for landmark university students");
      setLoading(false);
      return;
    }
    if (form.username.length < 3) {
      console.log("Username must to be 3 letters long");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important for session cookies
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        // toast(errorData.message);
        throw new Error(errorData.message || "Signup failed");
        setLoading(false);
      }

      // Redirect to dashboard or home after successful signup
      setLoading(false);
      // toast("Signup successful, redirecting user....");
      navigate("/");
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="">
      {/*<motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Card className="bg-black/4 backdrop-blur-md shadow-2xl border-white/10 text-black">
          <CardContent className="p-6">*/}
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create your account
      </h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className=""
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className=""
          required
        />
        <button type="submit" className="w-full mt-2 cursor-pointer">
          {loading ? "Please wait..." : "Sign up"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {/*</CardContent>
        </Card>
      </motion.div>*/}
    </div>
  );
};

export default Signup;
