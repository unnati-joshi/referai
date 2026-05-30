import BrandLogo from "../components/common/BrandLogo";
import ReferralGraph from "../components/common/ReferralGraph";

const DARK_THEMES = new Set(["dark", "midnight", "violet"]);

const Landing = ({ onAuth, theme, onToggleTheme }) => {
  const isDarkTheme = DARK_THEMES.has(theme);

  return (
    <div className="page-bg landing-page">
      <header className="landing-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 rounded-lg">
            <BrandLogo />
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-muted md:flex">
            <a href="#product" className="hover:text-main">Workflow</a>
            <a href="#signals" className="hover:text-main">Signals</a>
            <button type="button" onClick={() => onAuth("signup")} className="font-semibold hover:text-main">
              Get Started
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={onToggleTheme} className="btn-secondary px-3 py-2 text-sm" aria-label="Toggle theme">
              {isDarkTheme ? "Light" : "Dark"}
            </button>
            <button onClick={() => onAuth("login")} className="hidden px-4 py-2 text-sm font-bold text-main sm:block">
              Log in
            </button>
            <button onClick={() => onAuth("signup")} className="btn-primary px-4 py-2 text-sm">
              Sign up
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="landing-hero mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pb-16 lg:pt-12">
          <div className="flex flex-col justify-center">
            <p className="hero-kicker mb-4 w-fit rounded-full px-3 py-1 text-xs font-bold">
              Referral intelligence for job seekers
            </p>
            <h1 className="hero-title max-w-3xl font-black leading-[1.04] text-main">
              Find the right person inside the company.
            </h1>
            <p className="hero-subtitle mt-3 max-w-xl font-black leading-tight text-main">
              Turn any job post into ranked referrers and a specific outreach draft.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted md:text-base">
              ReferIn connects your skills, target companies, and shared background so every referral request feels easier to trust.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => onAuth("signup")} className="btn-primary px-5 py-3 text-sm">
                Create account
              </button>
              <button onClick={() => onAuth("login")} className="btn-secondary px-5 py-3 text-sm">
                Log in
              </button>
            </div>
            <div className="hero-proof mt-6 grid max-w-xl grid-cols-3 gap-3">
              <ProofStat value="Match" label="Ranked referrers" />
              <ProofStat value="Context" label="Why they fit" />
              <ProofStat value="Outreach" label="Drafted message" />
            </div>
          </div>

          <ReferralGraph />
        </section>

        <section id="product" className="border-y border-app bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-3 md:px-8">
            <Feature title="Parse any job post" body="Paste the listing and ReferIn identifies the role, company, location, skills, and seniority." />
            <Feature title="Find relevant employees" body="Review people whose public background and shared signals make them better referral targets." />
            <Feature title="Write a stronger request" body="Start from a personal message that connects your profile to the actual opening." />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="landing-wide-card">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-muted">One simple flow</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-main md:text-4xl">
                Paste a job. See who can help. Send a better referral request.
              </h2>
            </div>
            <div className="landing-steps">
              <Step number="01" title="Paste the job" body="Use any listing from LinkedIn, Greenhouse, Lever, Workday, or a company careers page." />
              <Step number="02" title="Review matches" body="See why each person is relevant, including shared skills, background, and source context." />
              <Step number="03" title="Reach out" body="Edit the generated message, send your request, and keep track of the referral status." />
            </div>
          </div>
        </section>

        <section id="signals" className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-muted">Why matches feel relevant</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-main md:text-4xl">Every recommendation is tied to a reason.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Skill overlap", "Highlights where your profile lines up with the role requirements."],
                ["Shared background", "Surfaces common colleges, companies, communities, and work areas."],
                ["Public profiles", "Adds context from visible profiles when available, so cards feel grounded."],
                ["Request tracking", "Keeps your outreach, replies, and next steps in one place."],
              ].map(([item, body]) => (
                <div key={item} className="surface-flat landing-signal-card p-5">
                  <p className="font-black text-main">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="surface landing-cta flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-muted">Ready to apply smarter</p>
              <h2 className="mt-2 text-2xl font-black text-main md:text-3xl">Build your profile once, then turn roles into referral paths.</h2>
            </div>
            <button onClick={() => onAuth("signup")} className="btn-primary px-6 py-4">
              Start now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

const Feature = ({ title, body }) => (
  <div className="surface-flat app-card-polished p-6">
    <h3 className="text-xl font-black text-main">{title}</h3>
    <p className="mt-3 leading-7 text-muted">{body}</p>
  </div>
);

const Step = ({ number, title, body }) => (
  <div className="landing-step">
    <span>{number}</span>
    <div>
      <p>{title}</p>
      <small>{body}</small>
    </div>
  </div>
);

const ProofStat = ({ value, label }) => (
  <div className="proof-stat">
    <p>{value}</p>
    <span>{label}</span>
  </div>
);

export default Landing;
