import BrandLogo from "./BrandLogo";

const navByRole = {
  employee: [
    { id: "opportunities", label: "Find Intros", hint: "Match roles to referrers" },
    { id: "jobs",          label: "Job Search",   hint: "Discover openings" },
    { id: "profile",       label: "Profile",      hint: "Proof, targets, resume" },
  ],
};

const Sidebar = ({ setPage, currentPage, user }) => {
  const navItems = navByRole[user?.role] || navByRole.employee;

  return (
    <aside className="app-sidebar sticky top-0 hidden h-screen w-64 shrink-0 border-r border-app px-4 py-6 lg:flex lg:flex-col">
      {/* Brand */}
      <BrandLogo className="mb-8 px-2" />

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`group relative w-full rounded-lg px-3 py-2.5 text-left transition-all ${
                active
                  ? "bg-[var(--primary-soft)] text-main"
                  : "text-muted hover:bg-[var(--surface-soft)] hover:text-main"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-[var(--primary)]" />
              )}
              <span className={`block text-sm font-black ${active ? "text-[var(--primary)]" : ""}`}>
                {item.label}
              </span>
              <span className="mt-0.5 block text-[10px] text-muted">{item.hint}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
            style={{ background: `hsl(${[...(user?.name || "U")].reduce((a, c) => a + c.charCodeAt(0), 0) % 360}, 60%, 50%)` }}
          >
            {(user?.name || "U")[0]}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-black text-main">{user?.name || "Student"}</p>
            <p className="truncate text-[10px] text-muted">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
