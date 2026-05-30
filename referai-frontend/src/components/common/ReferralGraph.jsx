const candidates = [
  ["A", "Platform engineer", "Shared skills", "94%"],
  ["B", "Backend lead", "Company match", "88%"],
  ["C", "Data engineer", "Strong overlap", "81%"],
];

const ReferralGraph = ({ compact = false }) => (
  <div className={`referral-visual ${compact ? "referral-visual-compact" : ""}`} aria-hidden="true">
    <div className="referral-grid" />
    <div className="referral-scan" />

    {compact ? (
      <div className="referral-compact-stage">
        <div className="compact-job-card">
          <p>Job post</p>
          <h3>Backend Engineer</h3>
          <small>Stripe · Platform APIs</small>
          <div className="compact-skills">
            <span>Role</span>
            <span>Skills</span>
            <span>Company</span>
          </div>
        </div>

        <div className="compact-match-card">
          <div className="matches-title">
            <p>Best referrers</p>
            <span>Live</span>
          </div>
          {candidates.slice(0, 2).map(([initial, title, reason, score]) => (
            <div className="candidate-row" key={initial}>
              <span>{initial}</span>
              <div>
                <strong>{title}</strong>
                <small>{reason}</small>
              </div>
              <em>{score}</em>
            </div>
          ))}
        </div>

        <div className="compact-message-card">
          <p>Outreach draft</p>
          <strong>Personalized and ready to edit</strong>
          <button type="button">Ready to send</button>
        </div>
      </div>
    ) : (
      <div className="referral-stage">
      <div className="referral-doc">
        <div className="doc-header" aria-hidden="true">
          <span className="dot-red" />
          <span className="dot-gold" />
          <span className="dot-green" />
        </div>
        <p>Job post</p>
        <h3>Senior Backend Engineer</h3>
        <small>Stripe · Platform APIs · Remote</small>
        <div className="doc-line wide" />
        <div className="doc-line" />
        <div className="doc-line short" />
        <div className="doc-tags">
          <span>Role</span>
          <span>Skills</span>
          <span>Company</span>
        </div>
      </div>

      <div className="referral-arrow" />

      <div className="referral-matches">
        <div className="matches-title">
          <p>Matched referrers</p>
          <span>Live rank</span>
        </div>
        {candidates.map(([initial, title, reason, score]) => (
          <div className="candidate-row" key={initial}>
            <span>{initial}</span>
            <div>
              <strong>{title}</strong>
              <small>{reason}</small>
            </div>
            <em>{score}</em>
          </div>
        ))}
      </div>

      <div className="referral-message-card">
        <div>
          <p>Outreach draft</p>
          <span>Personalized with shared skills and company context.</span>
        </div>
        <div className="message-line wide" />
        <div className="message-line" />
        <div className="message-line short" />
        <button type="button">Ready to send</button>
      </div>
    </div>
    )}
  </div>
);

export default ReferralGraph;
