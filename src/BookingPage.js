import "./BookingPage.css";
import mhdcLogoImg from "./assets/mhdclogo.jpg";

/* ─────────────────────────────────────────────────────────────────────────────
   BOOKING PAGE
   Shows the Google Form + Google Calendar side by side,
   styled to match the main MHDC site palette.

   USAGE (in App.js or your router):
   ─────────────────────────────────
   1. Import and add state:
        import BookingPage from "./BookingPage";
        const [showBooking, setShowBooking] = useState(false);

   2. Render conditionally (or use React Router):
        {showBooking
          ? <BookingPage onBack={() => setShowBooking(false)} />
          : <YourMainApp />}

   3. In your "Book Now" button / nav link:
        onClick={() => setShowBooking(true)}
─────────────────────────────────────────────────────────────────────────────── */

/* ── Shared Navbar (mirrors App.js Navbar in .scrolled state) ── */
function BookingNavbar({ onBack }) {
  return (
    <nav className="navbar scrolled">
      <div className="logo-container" onClick={onBack} style={{ cursor: "pointer" }}>
        <img
          src={mhdcLogoImg}
          alt="MHDC Logo"
          className="logo-img"
          style={{ height: 44, width: "auto", objectFit: "contain", borderRadius: "10px" }}
        />
        <div className="logo-text">
          <span className="main">MaPSA Holistic Development Center</span>
        </div>
      </div>
      <div className="nav-links">
        <button className="booking-nav-back" onClick={onBack}>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Home
        </button>
      </div>
    </nav>
  );
}

/* ── Shared Footer (mirrors App.js Footer exactly) ── */
function BookingFooter({ onBack }) {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <div
            className="footer-logo-text"
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
            onClick={onBack}
          >
            <img
              src={mhdcLogoImg}
              alt="MHDC Logo"
              style={{ height: "48px", width: "auto", borderRadius: "10px" }}
            />
            MHDC
          </div>
          <p className="footer-tagline">MaPSA Holistic Development Center</p>
          <p className="footer-addr">
            Brgy. Pasong Langka, Sta. Rosa–Tagaytay Road,
            <br />
            Silang, Cavite, Philippines
          </p>
        </div>
        <div className="footer-nav">
          <p className="footer-nav-title">Navigation</p>
          <div className="footer-links">
            <button className="footer-back-link" onClick={onBack}>Home</button>
            <button className="footer-back-link" onClick={onBack}>About</button>
            <button className="footer-back-link" onClick={onBack}>Facilities</button>
            <button className="footer-back-link" onClick={onBack}>Experience</button>
            <button className="footer-back-link" onClick={onBack}>Gallery</button>
            <button className="footer-back-link" onClick={onBack}>Location</button>
            <button className="footer-back-link" onClick={onBack}>FAQ</button>
          </div>
        </div>
        <div className="footer-contact">
          <p className="footer-nav-title">Contact</p>
          <a href="tel:09086198471" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 013 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
             09278876230 Globe/ Viber
            <br></br>09619152153 Smart
          </a>
          <a href="mailto:mhdc@mapsa.edu.ph" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            mhdc@mapsa.edu.ph
          </a>
          <a href="https://www.mapsahdc.com" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            www.mapsahdc.com
          </a>
          <a href="https://www.facebook.com/mapsahdc" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            facebook.com/mapsahdc
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MaPSA Holistic Development Center. All rights reserved.</p>
        <p>
          Developed by:{" "}
          <a
            href="https://sean-m.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-dev-link"
          >
            Sean Morales
          </a>
        </p>
      </div>
    </footer>
  );
}

export default function BookingPage({ onBack }) {
  const FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSfHz8PXEdgZu6n9eab-6m1fP-B3AW7tpkKysnrAdQtCBD6_tw/viewform?embedded=true";

  const CALENDAR_URL =
    "https://calendar.google.com/calendar/embed?color=%2316a765&color=%23f7ce02&src=75f3174ed194057d452174b82e5516f77650c975b4342becc7ee0bcc814a09c4%40group.calendar.google.com&src=en.philippines%23holiday%40group.v.calendar.google.com&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH";

  return (
    <div className="booking-page">

      {/* ── Navbar (shared with App) ─────────── */}
      <BookingNavbar onBack={onBack} />

      {/* ── Hero Banner ──────────────────────── */}
      <header className="booking-hero">
        <div className="booking-hero-deco" aria-hidden>
          <div className="booking-hero-deco-ring" />
          <div className="booking-hero-deco-ring" />
          <div className="booking-hero-deco-ring" />
        </div>

        <div className="booking-hero-inner">
          <div className="booking-hero-content">
            <h1 className="booking-hero-title">
              Reserve Your
              <span className="booking-hero-title-accent">Experience</span>
            </h1>
            <p className="booking-hero-sub">
              Fill out the booking form and check the calendar for available dates.
            </p>
          </div>
        </div>
      </header>

      {/* ── Gold divider ─────────────────────── */}
      <div className="booking-divider" />

      {/* ── Main Content ─────────────────────── */}
      <main className="booking-main">

        {/* ── Section intro ── */}
        <div className="booking-intro">
          <div>
            <span className="booking-section-label">Book a Stay</span>
            <h2 className="booking-section-title">Plan Your Visit</h2>
          </div>
        </div>

        <div className="booking-grid">

          {/* ── LEFT: Booking Form ── */}
          <div className="booking-form-col">
            <div className="booking-panel">
              <div className="booking-panel-header">
                <div className="booking-panel-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <div className="booking-panel-title">Reservation Form</div>
                  <div className="booking-panel-sub">Powered by Google Forms</div>
                </div>
              </div>
              <div className="booking-panel-body">
                <iframe
                  className="booking-iframe"
                  src={FORM_URL}
                  height="900"
                  title="MHDC Booking Inquiry Form"
                  loading="lazy"
                  allowFullScreen
                >
                  Loading form…
                </iframe>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Calendar + tip ── */}
          <div className="booking-calendar-sticky">

            <div className="booking-panel">
              <div className="booking-panel-header">
                <div className="booking-panel-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="booking-panel-title">Availability Calendar</div>
                  <div className="booking-panel-sub">Live · Updated in real time</div>
                </div>
              </div>
              <div className="booking-panel-body">
                <iframe
                  className="booking-iframe"
                  src={CALENDAR_URL}
                  height="540"
                  title="MHDC Availability Calendar"
                  loading="lazy"
                  scrolling="no"
                  frameBorder="0"
                  style={{ borderRadius: "0 0 24px 24px" }}
                >
                  Loading calendar…
                </iframe>
              </div>
            </div>

            {/* Legend note */}
            <div className="booking-calendar-note">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <div className="booking-calendar-legend">
                  <span className="booking-calendar-legend-item">
                    <span className="booking-calendar-legend-dot green" />
                    Booked dates
                  </span>
                  <span className="booking-calendar-legend-item">
                    <span className="booking-calendar-legend-dot yellow" />
                    Public holidays
                  </span>
                </div>
                <p style={{ marginTop: "8px" }}>
                  Choose a date on the form that does not conflict with existing events.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Contact Strip ─────────────────────── */}
        {/* <div className="booking-contact-strip">
          <div className="booking-contact-text">
            <p className="booking-section-label">Need Help?</p>
            <h3 className="booking-section-title">Reach Us Directly</h3>
            <p>
              Have questions before booking? Our team is happy to walk you
              through the process and help you plan the perfect event.
            </p>
            <a href="mailto:mhdc@mapsa.edu.ph" className="booking-contact-btn">
              Send Us an Email
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="booking-contact-actions">
            <a href="tel:09086198471" className="booking-contact-item">
              <div className="booking-contact-item-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0112 18.69a19.5 19.5 0 01-4.81-4.81A19.79 19.79 0 014.1 5.18 2 2 0 016.11 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L10.09 10.9a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              0908 619 8471
            </a>
            <a href="mailto:mhdc@mapsa.edu.ph" className="booking-contact-item">
              <div className="booking-contact-item-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              mhdc@mapsa.edu.ph
            </a>
            <a href="https://www.facebook.com/mapsahdc" target="_blank" rel="noopener noreferrer" className="booking-contact-item">
              <div className="booking-contact-item-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </div>
              facebook.com/mapsahdc
            </a>
          </div>
        </div> */}

      </main>

      {/* ── Footer (shared with App) ──────────── */}
      <BookingFooter onBack={onBack} />

    </div>
  );
}