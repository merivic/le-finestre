"use client";
import React, { useState } from "react";

const UNAVAILABLE: string[] = [
  // Aggiungi date non disponibili nel formato "YYYY-MM-DD"
  // Es: "2026-08-15"
]

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]

const DAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"]

function CalendarWidget() {
  const [current, setCurrent] = React.useState(new Date(2026, 6, 1))

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = firstDay === 0 ? 6 : firstDay - 1

  const today = new Date()
  today.setHours(0,0,0,0)
  const startAvailable = new Date(2026, 6, 1)

  const isUnavailable = (d: number) => {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    const date = new Date(year, month, d)
    return UNAVAILABLE.includes(dateStr) || date < startAvailable
  }

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div style={{ background: "#FAF8F4", border: "1px solid #D4C9B0", padding: "32px", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <button onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#2A2A2A", padding: "4px 12px" }}>←</button>
        <span style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "1rem", letterSpacing: "0.1em", color: "#2A2A2A" }}>{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#2A2A2A", padding: "4px 12px" }}>→</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.1em", color: "#999", paddingBottom: "8px" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
        {cells.map((d, i) => (
          <div key={i} style={{
            textAlign: "center",
            padding: "8px 4px",
            fontSize: "0.85rem",
            color: d === null ? "transparent" : isUnavailable(d!) ? "#CCC" : "#2A2A2A",
            background: d === null ? "transparent" : isUnavailable(d!) ? "#F0EDE8" : "transparent",
            cursor: d === null || isUnavailable(d!) ? "default" : "pointer",
            borderRadius: "2px",
          }}>
            {d || ""}
          </div>
        ))}
      </div>
      <p style={{ fontSize: "0.75rem", color: "#AAA", marginTop: "20px", textAlign: "center" }}>Contact us directly to book</p>
    </div>
  )
}

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<number | null>(null);

  const windows = [
    { view: "/view1.jpeg", label: "The monument" },
    { view: "/view2.jpeg", label: "The medieval fortress" },
    { view: "/view3.jpeg", label: "The historic centre" },
    { view: "/view4.jpeg", label: "Lake Trasimeno" },
  ];

  return (
    <main style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", color: "#2A2A2A", background: "#F5F0E8", margin: 0, padding: 0 }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Tenor+Sans&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        .window-frame {
          cursor: pointer;
          overflow: hidden;
          border: 8px solid #2A2A2A;
          border-radius: 2px;
          height: 720px;
          width: 100%;
          position: relative;
          transition: all 0.4s ease;
        }
        .window-frame:hover { border-color: #38596d; }
        .window-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
        }
        .window-frame:hover img { transform: scale(1.03); }
        .window-label {
          position: absolute;
          bottom: 16px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.3s ease;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .window-frame:hover .window-label { opacity: 1; }
        .window-cross {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
          background: rgba(42,42,42,0.25);
          pointer-events: none;
        }
        .window-bar {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 100%;
          height: 1px;
          background: rgba(42,42,42,0.25);
          pointer-events: none;
        }
        nav a:hover { color: #38596d !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .window-frame { height: 320px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: "#2A2A2A", color: "#FAF8F4", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <img src="/logo.png" alt="Le Finestre" style={{ height: "40px", objectFit: "contain" }} />
        <div style={{ display: "flex", gap: "24px", fontSize: "0.8rem", letterSpacing: "0.12em" }} className="nav-links">
          <a href="#views" style={{ color: "#FAF8F4", textDecoration: "none" }}>Views</a>
          <a href="#amenities" style={{ color: "#FAF8F4", textDecoration: "none" }}>Amenities</a>
          <a href="#location" style={{ color: "#FAF8F4", textDecoration: "none" }}>Location</a>
          <a href="#rates" style={{ color: "#FAF8F4", textDecoration: "none" }}>Rates</a>
          <a href="#contact" style={{ color: "#FAF8F4", textDecoration: "none" }}>Contact</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="/" style={{ fontSize: "1.2rem", textDecoration: "none", opacity: 0.5 }} title="Italiano">🇮🇹</a>
          <a href="/en" style={{ fontSize: "1.2rem", textDecoration: "none", opacity: 1 }} title="English">🇬🇧</a>
          <a href="#contact" style={{ border: "1px solid #FAF8F4", color: "#FAF8F4", padding: "10px 24px", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "none" }}>Book Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ height: "100vh", background: "url('/exterior.jpeg') center 70%/cover no-repeat", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(42,42,42,0.7) 0%, rgba(42,42,42,0.1) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "#FAF8F4", padding: "0 24px" }}>
          <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "none", marginBottom: "16px", opacity: 0.7 }}>Citta della Pieve · Umbria · Italy</p>
          <img src="/logo.png" alt="Le Finestre" style={{ width: "40vw", maxWidth: "500px", objectFit: "contain", display: "block", margin: "0 auto 8px auto", mixBlendMode: "normal" }} />
          <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(0.85rem, 1.1vw, 1rem)", fontWeight: 300, fontStyle: "normal", opacity: 0.9, marginBottom: "40px" }}>Monthly rental apartment with views over Umbria.</p>
          <a href="#views" style={{ border: "1px solid rgba(250,248,244,0.6)", color: "#FAF8F4", padding: "14px 40px", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "none" }}>Discover</a>
        </div>
      </section>

      {/* APARTMENT */}
      <section id="apartment" style={{ padding: "60px 24px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.82rem", lineHeight: 1.9, color: "#4A4A4A", marginBottom: "24px", fontStyle: "normal" }}>
          Le Finestre is a recently renovated 85 sqm apartment located at the entrance of the historic centre of Città della Pieve, on the top floor of an elegant early 20th-century building. The apartment features two spacious bedrooms, one of which has a desk, two bathrooms, a large living room and a fully equipped kitchen. The apartment is on the second floor, with no lift. A stairlift is available to assist access for people with reduced mobility.
        </p>
        <p style={{ fontSize: "0.82rem", lineHeight: 1.9, color: "#4A4A4A", marginBottom: "48px" }}>
          Its most distinctive feature is the extraordinary view over Città della Pieve and the surrounding Umbrian landscape. Its large windows flood the rooms with light and offer unique glimpses of Lake Trasimeno, Monte Cetona, Montegabbione, Monte Arale, the medieval fortress and the historic centre. The apartment also includes a private and secure parking space.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", maxWidth: "400px", margin: "0 auto" }}>
          {[{label:"Size",value:"85 m²"},{label:"Bedrooms",value:"2"},{label:"Bathrooms",value:"2"},{label:"Guests",value:"Up to 4"},{label:"Min. Stay",value:"4 weeks"},{label:"Floor",value:"2nd and top floor"}].map((item) => (
            <div key={item.label} style={{ borderTop: "1px solid #D4C9B0", paddingTop: "16px" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none", color: "#999", marginBottom: "6px" }}>{item.label}</p>
              <p style={{ fontSize: "0.82rem", fontWeight: 400, color: "#2A2A2A" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WINDOWS / GALLERY */}
      <section id="views" style={{ padding: "40px 24px", background: "#2A2A2A" }}>
        <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,244,0.5)", textAlign: "center", marginBottom: "48px", letterSpacing: "0.05em" }}>Click a window to explore the room</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", maxWidth: "600px", margin: "0 auto" }}>
          {windows.map((w, i) => (
            <div
              key={i}
              className="window-frame"
              onClick={() => setActiveWindow(activeWindow === i ? null : i)}
              style={{ borderColor: activeWindow === i ? "#38596d" : "#2A2A2A", borderWidth: activeWindow === i ? "8px" : "8px" }}
            >
              <img src={w.view} alt={w.label} />
              <div className="window-cross" />
              <div className="window-bar" />
              <div className="window-label">{w.label}</div>
              {activeWindow === i && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(42,42,42,0.85)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "12px", padding: "20px" }}>
                  <p style={{ color: "#FAF8F4", fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.85rem", fontStyle: "normal", textAlign: "center", opacity: 0.8 }}>Room photos coming soon</p>
                  <p style={{ color: "#7A9FB0", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none" }}>Click to close</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VIRTUAL TOUR */}
      <div style={{ background: "#2A2A2A", textAlign: "center", padding: "20px 48px" }}>
        <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", color: "rgba(250,248,244,0.5)" }}>Virtual tour available on request · <a href="#contact" style={{ color: "#7A9FB0", textDecoration: "none" }}>Contact us</a></p>
      </div>

      {/* AMENITIES */}
      <section id="amenities" style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Amenities</p>
        <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#2A2A2A", marginBottom: "48px" }}>Everything you need for a long stay.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
          {[
            {cat:"Work",items:["WiFi","Dedicated desk"]},
            {cat:"Kitchen",items:["Fully equipped","Professional gas hob and oven","Dishwasher","Weekly market and supermarket nearby"]},
            {cat:"Comfort",items:["Independent A/C & heating","Washing machine","Sofa bed in living room for 1 or 2 extra guests"]},
            {cat:"Extras",items:["Free parking with private access","Bike storage","Stairlift"]},
          ].map((group) => (
            <div key={group.cat}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none", color: "#38596d", marginBottom: "16px", fontWeight: 600 }}>{group.cat}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {group.items.map((item) => (
                  <li key={item} style={{ fontSize: "0.82rem", color: "#4A4A4A", paddingBottom: "10px", borderBottom: "1px solid #E8E0D0", marginBottom: "10px" }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" style={{ padding: "60px 24px", background: "#EDE7DB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Location</p>
            <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#2A2A2A", marginBottom: "24px" }}>Città della Pieve, Umbria.</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "#4A4A4A", marginBottom: "32px" }}>Perched on a hilltop at 508m, Città della Pieve is one of Umbria's best-kept secrets. A medieval town built largely in exposed brick, with quiet alleys, evocative views and a timeless, elegant atmosphere. Birthplace of the painter Pietro Perugino, it retains a strong connection with art and tradition.

While retaining its charm as a little-known Umbrian village, Città della Pieve is a lively town with events throughout the year: from the Infiorata to the Palio dei Terzieri, from Zafferiamo to many other cultural and gastronomic events. The town also offers quality restaurants to discover Umbrian cuisine.

One of its great advantages is its strategic location, ideal for exploring Umbria, Tuscany and some of the most beautiful cities in Central Italy. Città della Pieve is about 15 minutes from the Fabro or Chiusi-Chianciano exits of the A1 motorway (Milan-Naples) and close to Chiusi-Chianciano Terme train station. By car you can easily reach:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Siena in about 45 minutes","Perugia in about 45 minutes","Florence in about 1h30","Rome in about 1h30"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.82rem", color: "#4A4A4A" }}>
                  <span style={{ width: "6px", height: "6px", background: "#38596d", borderRadius: "50%", flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: "480px", borderRadius: "2px", overflow: "hidden" }}><iframe src="https://maps.google.com/maps?q=Via+Marconi+1,+06062+Citta+della+Pieve+PG,+Italy&z=16&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"></iframe></div>
        </div>
      </section>

      {/* RATES */}
      <section id="rates" style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Rates</p>
        <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#2A2A2A", marginBottom: "48px" }}>Monthly rates</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", maxWidth: "400px", margin: "0 auto" }}>
          {[
            {period:"Low Season",months:"Nov - Mar",price:"900",note:"per month, utilities extra",featured:false},
            {period:"Mid Season",months:"Apr-Jun & Sep-Oct",price:"1.000",note:"per month, utilities extra",featured:true},
            {period:"High Season",months:"Jul - Aug",price:"1.200",note:"per month, utilities included",featured:false},
          ].map((rate) => (
            <div key={rate.period} style={{ background: rate.featured ? "#2A2A2A" : "#EDE7DB", padding: "40px 32px", color: rate.featured ? "#FAF8F4" : "#2A2A2A" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none", color: rate.featured ? "#7A9FB0" : "#38596d", marginBottom: "8px" }}>{rate.period}</p>
              <p style={{ fontSize: "0.9rem", color: rate.featured ? "rgba(250,248,244,0.5)" : "#888", marginBottom: "24px" }}>{rate.months}</p>
              <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "3rem", fontWeight: 300, marginBottom: "8px" }}>{"€" + rate.price}</p>
              <p style={{ fontSize: "0.85rem", color: rate.featured ? "rgba(250,248,244,0.5)" : "#888", marginBottom: "32px" }}>{rate.note}</p>

            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "24px", textAlign: "center" }}>Minimum stay: 1 month · No pets · Price on request for 12-month contracts or longer</p>
      </section>

      {/* CONTATTO + CALENDARIO */}
      <section id="contact" style={{ padding: "60px 24px", background: "#2A2A2A", color: "#FAF8F4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 400, marginBottom: "60px", textAlign: "center" }}>Plan your stay</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
            
            {/* Calendario */}
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Check availability</p>
              <CalendarWidget />
            </div>

            {/* Formulario */}
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Contact</p>
              <p style={{ fontSize: "0.9rem", color: "rgba(250,248,244,0.6)", marginBottom: "32px", lineHeight: 1.8 }}>Tell us your dates and we will get back to you within 24 hours.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[{label:"Your name",type:"text",placeholder:"Marco Rossi"},{label:"Email",type:"email",placeholder:"marco@email.com"},{label:"Dates",type:"text",placeholder:"From — To"}].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#7A9FB0", display: "block", marginBottom: "8px" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} style={{ width: "100%", background: "rgba(250,248,244,0.06)", border: "1px solid rgba(250,248,244,0.15)", padding: "14px 16px", color: "#FAF8F4", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#7A9FB0", display: "block", marginBottom: "8px" }}>Messaggio</label>
                  <textarea placeholder="Tell us about your stay..." rows={4} style={{ width: "100%", background: "rgba(250,248,244,0.06)", border: "1px solid rgba(250,248,244,0.15)", padding: "14px 16px", color: "#FAF8F4", fontSize: "0.85rem", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                </div>
                <a href="mailto:lefinestrecdp@gmail.com?subject=Booking%20request%20Le%20Finestre" style={{ display: "block", textAlign: "center", background: "#38596d", color: "#FAF8F4", padding: "16px 32px", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", marginTop: "8px", cursor: "pointer" }}>Send enquiry</a>
                
              </div>
            </div>

          </div>
        </div>
      </section>

            {/* FOOTER */}
      <footer style={{ background: "#1A1A1A", color: "rgba(250,248,244,0.4)", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
        <span style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.82rem", letterSpacing: "0.4em", fontWeight: 300, color: "rgba(250,248,244,0.7)" }}>Le Finestre</span>
        <span>2026 · Città della Pieve · All rights reserved</span>
      </footer>

    </main>
  );
}
