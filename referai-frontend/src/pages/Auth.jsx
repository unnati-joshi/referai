import { useState } from "react";
import BrandLogo from "../components/common/BrandLogo";
import ReferralGraph from "../components/common/ReferralGraph";
import { authLogin, authSignup, startPhoneAuth } from "../services/api";

const DARK_THEMES = new Set(["dark", "midnight", "violet"]);

const normalizePhoneInput = (phone) => {
  const trimmed = (phone || "").trim().replace(/[\s-]/g, "");
  if (/^\d{10}$/.test(trimmed)) return `+91${trimmed}`;
  if (/^91\d{10}$/.test(trimmed)) return `+${trimmed}`;
  return trimmed;
};

const Auth = ({ mode, onSubmit, onBack, theme, onToggleTheme }) => {
  const isDarkTheme = DARK_THEMES.has(theme);
  const [authMode, setAuthMode] = useState(mode);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    role: "employee",
    linkedin_url: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const isSignup = authMode === "signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");
    if (!form.email.trim()) { setError("Email address is required."); return; }
    if (!form.password) { setError("Password is required."); return; }
    if (isSignup && !form.name.trim()) { setError("Full name is required."); return; }
    const normalizedPhone = normalizePhoneInput(form.phone);
    if (isSignup && !normalizedPhone) { setError("Phone number is required. We use it to verify your identity."); return; }
    setLoading(true);
    try {
      const response = isSignup ? await authSignup({ ...form, phone: normalizedPhone }) : await authLogin(form);
      onSubmit(response.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    setError("");
    setStatus("");
    const normalizedPhone = normalizePhoneInput(form.phone);
    if (!normalizedPhone) {
      setError("Enter your phone number first. 10-digit India numbers are okay.");
      return;
    }
    try {
      const response = await startPhoneAuth({ phone: normalizedPhone });
      setForm((current) => ({ ...current, phone: normalizedPhone }));
      setStatus(response.message || "OTP sent.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-shell page-bg flex min-h-screen flex-col">
      <header className="auth-header mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <button onClick={onBack} className="flex items-center gap-3">
          <BrandLogo />
        </button>
        <button onClick={onToggleTheme} className="auth-theme-toggle px-3 py-2 text-sm">
          {isDarkTheme ? "Light" : "Dark"}
        </button>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="auth-panel grid w-full max-w-6xl overflow-hidden lg:grid-cols-[1.02fr_0.98fr]">
          <div className="auth-art hidden lg:block">
            <div className="auth-art-top">
              <div>
                <p className="text-sm font-black uppercase tracking-wide">ReferIn</p>
                <h1>Find your warmest way in.</h1>
              </div>
            </div>
            <ReferralGraph compact />
          </div>

          <form onSubmit={handleSubmit} className="auth-form p-6 md:p-10">
            <p className="text-sm font-black uppercase tracking-wide text-muted">
              {isSignup ? "Create account" : "Log in"}
            </p>
            <h2 className="mt-3 text-3xl font-black text-main md:text-4xl">
              {isSignup ? "Start with your network" : "Welcome back"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {isSignup ? "Build a profile that helps ReferIn find better referrers." : "Continue matching jobs to people who can actually help."}
            </p>

            <div className="mt-8 space-y-4">
              {isSignup && (
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-main">Full name</span>
                  <input
                    className="field"
                    value={form.name}
                    placeholder="Enter your name"
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-main">
                  Email <span className="text-rose-500">*</span>
                </span>
                <input
                  className="field"
                  type="email"
                  value={form.email}
                  placeholder="you@example.com"
                  required
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-main">Password</span>
                <input
                  className="field"
                  type="password"
                  value={form.password}
                  placeholder={isSignup ? "At least 8 characters" : "Enter your password"}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                />
              </label>

              {isSignup && (
                <>
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-main">LinkedIn profile</span>
                    <input
                      className="field"
                      value={form.linkedin_url}
                      placeholder="linkedin.com/in/your-profile"
                      onChange={(event) => setForm({ ...form, linkedin_url: event.target.value })}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-main">
                      Phone number <span className="text-rose-500">*</span>
                    </span>
                    <p className="mb-2 text-xs text-muted">Use +91 with country code, or type a 10-digit India number.</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        className="field"
                        value={form.phone}
                        placeholder="+919876543210"
                        required
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      />
                      <button type="button" onClick={sendOtp} className="btn-secondary px-4 py-3 text-sm">
                        Send OTP
                      </button>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-main">Phone OTP</span>
                    <input
                      className="field"
                      value={form.otp}
                      placeholder="Enter OTP"
                      onChange={(event) => setForm({ ...form, otp: event.target.value })}
                    />
                  </label>
                </>
              )}
            </div>

            {error && <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700">{error}</p>}
            {status && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{status}</p>}

            <button disabled={loading} className="btn-primary mt-6 w-full px-5 py-4">
              {loading ? "Checking" : isSignup ? "Create account" : "Log in"}
            </button>

            <p className="mt-6 text-center text-sm text-muted">
              {isSignup ? "Already have an account?" : "New to ReferIn?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStatus("");
                  setAuthMode(isSignup ? "login" : "signup");
                }}
                className="font-black text-[var(--primary)]"
              >
                {isSignup ? "Log in" : "Create one"}
              </button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Auth;
