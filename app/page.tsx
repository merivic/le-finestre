"use client";
import React, { useState } from "react";

const UNAVAILABLE: string[] = [
  // Aggiungi date non disponibili nel formato "YYYY-MM-DD"
  // Es: "2026-08-15"
]

const MONTHS = [
  "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
  "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"
]

const DAYS = ["Lu","Ma","Me","Gi","Ve","Sa","Do"]

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
      <p style={{ fontSize: "0.75rem", color: "#AAA", marginTop: "20px", textAlign: "center" }}>Per prenotare contattaci direttamente</p>
    </div>
  )
}

export default function Home() {
  const [activeWindow, setActiveWindow] = useState<number | null>(null);

  const windows = [
    { view: "/view1.jpeg", label: "Il monumento" },
    { view: "/view2.jpeg", label: "La rocca Medievale" },
    { view: "/view3.jpeg", label: "Il centro storico" },
    { view: "/view4.jpeg", label: "Il lago Trasimeno" },
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
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .window-frame { height: 320px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ background: "#2A2A2A", color: "#FAF8F4", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <img src="/logo.png" alt="Le Finestre" style={{ height: "40px", objectFit: "contain" }} />
        <div style={{ display: "flex", gap: "24px", fontSize: "0.8rem", letterSpacing: "0.12em" }} className="nav-links">
          <a href="#views" style={{ color: "#FAF8F4", textDecoration: "none" }}>Le viste</a>
          <a href="#amenities" style={{ color: "#FAF8F4", textDecoration: "none" }}>Servizi</a>
          <a href="#location" style={{ color: "#FAF8F4", textDecoration: "none" }}>Posizione</a>
          <a href="#rates" style={{ color: "#FAF8F4", textDecoration: "none" }}>Tariffe</a>
          <a href="#contact" style={{ color: "#FAF8F4", textDecoration: "none" }}>Contatto</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="/" style={{ fontSize: "1.2rem", textDecoration: "none", opacity: 1 }} title="Italiano">🇮🇹</a>
          <a href="/en" style={{ fontSize: "1.2rem", textDecoration: "none", opacity: 0.5 }} title="English">🇬🇧</a>
          <a href="#contact" style={{ border: "1px solid #FAF8F4", color: "#FAF8F4", padding: "10px 24px", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "none" }}>Prenota</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ height: "100vh", background: "url('/exterior.jpeg') center 70%/cover no-repeat", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(42,42,42,0.7) 0%, rgba(42,42,42,0.1) 60%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "#FAF8F4", padding: "0 24px" }}>
          <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "none", marginBottom: "16px", opacity: 0.7 }}>Citta della Pieve · Umbria · Italia</p>
          <img src="/logo.png" alt="Le Finestre" style={{ width: "40vw", maxWidth: "500px", objectFit: "contain", display: "block", margin: "0 auto 8px auto", mixBlendMode: "normal" }} />
          <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(0.85rem, 1.1vw, 1rem)", fontWeight: 300, fontStyle: "normal", opacity: 0.9, marginBottom: "40px" }}>Appartamento in affitto mensile con vista sull'Umbria.</p>
          <a href="#views" style={{ border: "1px solid rgba(250,248,244,0.6)", color: "#FAF8F4", padding: "14px 40px", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "none" }}>Scopri</a>
        </div>
      </section>

      {/* APARTMENT */}
      <section id="apartment" style={{ padding: "60px 24px", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.82rem", lineHeight: 1.9, color: "#4A4A4A", marginBottom: "24px", fontStyle: "normal" }}>
          Le Finestre è un appartamento di 85 mq recentemente rinnovato, situato all’ingresso del centro storico di Città della Pieve, all’ultimo piano di un elegante palazzo storico dei primi del Novecento. L’appartamento dispone di due ampie camere da letto, di cui una con scrivania, due bagni, un grande soggiorno e una cucina completamente attrezzata, offrendo spazi confortevoli e funzionali per ogni tipo di soggiorno. L’appartamento si trova al secondo piano, senza ascensore. Un montascale a poltroncina favorisce l’accesso all’appartamento.
        </p>
        <p style={{ fontSize: "0.82rem", lineHeight: 1.9, color: "#4A4A4A", marginBottom: "48px" }}>
          La sua caratteristica più distintiva è la straordinaria vista a 360° su Città della Pieve e sul paesaggio umbro circostante. Le sue grandi finestre regalano luminosità e freschezza agli ambienti e offrono scorci unici sul Lago Trasimeno, Monteleone, Monte Arale, la Rocca medievale e il centro storico. A completare l’esperienza, l’appartamento dispone di un posto auto privato e sicuro, una comodità rara e preziosa nel cuore della città.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", maxWidth: "400px", margin: "0 auto" }}>
          {[{label:"Dimensioni",value:"85 m²"},{label:"Camere",value:"2"},{label:"Bagni",value:"2"},{label:"Ospiti",value:"Fino a 4"},{label:"Soggiorno min.",value:"4 settimane"},{label:"Piano",value:"2° piano"}].map((item) => (
            <div key={item.label} style={{ borderTop: "1px solid #D4C9B0", paddingTop: "16px" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none", color: "#999", marginBottom: "6px" }}>{item.label}</p>
              <p style={{ fontSize: "0.82rem", fontWeight: 400, color: "#2A2A2A" }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WINDOWS / GALLERY */}
      <section id="views" style={{ padding: "40px 24px", background: "#2A2A2A" }}>
        <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.85rem", color: "rgba(250,248,244,0.5)", textAlign: "center", marginBottom: "48px", letterSpacing: "0.05em" }}>Clicca su una finestra per esplorare la stanza</p>
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
                  <p style={{ color: "#FAF8F4", fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.85rem", fontStyle: "normal", textAlign: "center", opacity: 0.8 }}>Foto delle stanze in arrivo</p>
                  <p style={{ color: "#7A9FB0", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none" }}>Clicca per chiudere</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* VIRTUAL TOUR */}
      <div style={{ background: "#2A2A2A", textAlign: "center", padding: "20px 48px" }}>
        <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", color: "rgba(250,248,244,0.5)" }}>Visita virtuale disponibile su richiesta · <a href="#contact" style={{ color: "#7A9FB0", textDecoration: "none" }}>Contattaci</a></p>
      </div>

      {/* AMENITIES */}
      <section id="amenities" style={{ padding: "60px 24px", maxWidth: "1300px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Servizi</p>
        <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#2A2A2A", marginBottom: "48px" }}>Tutto il necessario per un lungo soggiorno.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
          {[
            {cat:"Lavoro",items:["WiFi 1Gbps","Scrivania dedicata"]},
            {cat:"Cucina",items:["Completamente attrezzata","Lavastoviglie","Mercato settimanale e supermercato a due passi"]},
            {cat:"Comfort",items:["Ventilazione e riscaldamento","Lavatrice","Divano letto nel soggiorno per 1 o 2 ospiti aggiuntivi","Televisione"]},
            {cat:"Extra",items:["Parcheggio privato e sicurizzato","Deposito biciclette","Montascale a poltroncina"]},
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
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Posizione</p>
            <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#2A2A2A", marginBottom: "24px" }}>Città della Pieve, Umbria.</h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.9, color: "#4A4A4A", marginBottom: "32px" }}>Città della Pieve, in Umbria, sorge arroccata su un colle a circa 508 metri di altitudine, affacciata sulla Val di Chiana e a pochi chilometri dal confine con la Toscana. È un borgo medievale autentico, costruito in gran parte in mattoni a vista, con vicoli silenziosi, scorci suggestivi e un’atmosfera elegante e senza tempo. Città natale del Perugino, conserva un forte legame con l’arte e la tradizione.

Pur mantenendo il fascino di un segreto umbro ancora poco conosciuto, Città della Pieve è un paese vivo e ricco di eventi durante tutto l’anno: dall’Infiorata al Palio dei Terzieri, da Zafferiamo a molte altre manifestazioni culturali e gastronomiche. Il borgo offre inoltre ristoranti di qualità dove scoprire la cucina umbra, tra sapori autentici, prodotti locali e ospitalità genuina.

Uno dei suoi grandi vantaggi è la posizione strategica, ideale per scoprire l’Umbria, la Toscana e alcune delle città più belle del Centro Italia. Città della Pieve si trova a circa 10 minuti dall’uscita dell’autostrada A1 e vicino alla stazione ferroviaria di Chiusi-Chianciano Terme. In macchina si raggiungono facilmente:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Siena in circa 45 minuti","Perugia in circa 45 minuti","Firenze in circa 1h30","Roma in circa 1h30"].map((item) => (
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
      <section id="rates" style={{ padding: "60px 24px", maxWidth: "1300px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Tariffe</p>
        <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 400, color: "#2A2A2A", marginBottom: "48px" }}>Prezzi mensili con utenze incluse.</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px", maxWidth: "400px", margin: "0 auto" }}>
          {[
            {period:"Bassa stagione",months:"Nov - Mar",price:"900",featured:false},
            {period:"Media stagione",months:"Apr-Giu e Set-Ott",price:"1.000",featured:true},
            {period:"Alta stagione",months:"Lug - Ago",price:"1.200",featured:false},
          ].map((rate) => (
            <div key={rate.period} style={{ background: rate.featured ? "#2A2A2A" : "#EDE7DB", padding: "40px 32px", color: rate.featured ? "#FAF8F4" : "#2A2A2A" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "none", color: rate.featured ? "#7A9FB0" : "#38596d", marginBottom: "8px" }}>{rate.period}</p>
              <p style={{ fontSize: "0.9rem", color: rate.featured ? "rgba(250,248,244,0.5)" : "#888", marginBottom: "24px" }}>{rate.months}</p>
              <p style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "3rem", fontWeight: 300, marginBottom: "8px" }}>{"€" + rate.price}</p>
              <p style={{ fontSize: "0.85rem", color: rate.featured ? "rgba(250,248,244,0.5)" : "#888", marginBottom: "32px" }}>al mese, utenze incluse</p>

            </div>
          ))}
        </div>
        <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "24px", textAlign: "center" }}>Soggiorno minimo: 1 mese · Utenze incluse</p>
      </section>

      {/* CONTATTO + CALENDARIO */}
      <section id="contact" style={{ padding: "60px 24px", background: "#2A2A2A", color: "#FAF8F4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 400, marginBottom: "60px", textAlign: "center" }}>Pianifica il tuo soggiorno</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
            
            {/* Calendario */}
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Controlla disponibilità</p>
              <CalendarWidget />
            </div>

            {/* Formulario */}
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: "#38596d", marginBottom: "16px" }}>Contatto</p>
              <p style={{ fontSize: "0.9rem", color: "rgba(250,248,244,0.6)", marginBottom: "32px", lineHeight: 1.8 }}>Dicci le tue date e ti risponderemo entro 24 ore.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[{label:"Il tuo nome",type:"text",placeholder:"Marco Rossi"},{label:"Email",type:"email",placeholder:"marco@email.com"},{label:"Date",type:"text",placeholder:"Dal — Al"}].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#7A9FB0", display: "block", marginBottom: "8px" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} style={{ width: "100%", background: "rgba(250,248,244,0.06)", border: "1px solid rgba(250,248,244,0.15)", padding: "14px 16px", color: "#FAF8F4", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#7A9FB0", display: "block", marginBottom: "8px" }}>Messaggio</label>
                  <textarea placeholder="Parlaci del tuo soggiorno..." rows={4} style={{ width: "100%", background: "rgba(250,248,244,0.06)", border: "1px solid rgba(250,248,244,0.15)", padding: "14px 16px", color: "#FAF8F4", fontSize: "0.85rem", resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                </div>
                <a href="mailto:lefinestrecdp@gmail.com?subject=Richiesta soggiorno Le Finestre" style={{ display: "block", textAlign: "center", background: "#38596d", color: "#FAF8F4", padding: "16px 32px", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.1em", marginTop: "8px" }}>Invia richiesta</a>
                
              </div>
            </div>

          </div>
        </div>
      </section>

            {/* FOOTER */}
      <footer style={{ background: "#1A1A1A", color: "rgba(250,248,244,0.4)", padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
        <span style={{ fontFamily: "'Tenor Sans', Georgia, sans-serif", fontSize: "0.82rem", letterSpacing: "0.4em", fontWeight: 300, color: "rgba(250,248,244,0.7)" }}>Le Finestre</span>
        <span>2026 · Città della Pieve · Tutti i diritti riservati</span>
      </footer>

    </main>
  );
}
