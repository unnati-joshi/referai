const BrandMark = ({ className = "" }) => (
  <span className={`brand-mark ${className}`} aria-hidden="true">
    <svg viewBox="0 0 48 48" role="img">
      <path className="brand-loop" d="M14 30c-4-5-3.3-12.4 1.5-16.5 5.2-4.5 13-4 17.6 1.1 4.5 5.2 4 13-1 17.5" />
      <path className="brand-arrow" d="M30.4 32.7h7.4v-7.4" />
      <circle className="brand-node brand-node-main" cx="24" cy="25" r="5.2" />
      <circle className="brand-node" cx="17" cy="17" r="3.2" />
      <circle className="brand-node" cx="31" cy="17" r="3.2" />
      <path className="brand-link" d="M19.6 19.6 22 22m6.4-2.4L26 22" />
      <path className="brand-base" d="M14.5 37c1.9-5.4 5.1-8.1 9.5-8.1s7.6 2.7 9.5 8.1" />
    </svg>
  </span>
);

const BrandLogo = ({ compact = false, className = "" }) => (
  <div className={`brand-logo flex items-center gap-3 ${className}`}>
    <BrandMark />
    {!compact && (
      <div className="brand-logo-copy">
        <p className="brand-logo-title text-main">ReferIn</p>
        <p className="brand-logo-subtitle text-muted">Referral network</p>
      </div>
    )}
  </div>
);

export { BrandMark };
export default BrandLogo;
