import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = {
  "Languages": ["JavaScript", "C#", "Python"],
  "Frontend": ["React.js", "HTML5", "CSS3", "jQuery", "Bootstrap"],
  "Backend & API": ["ASP.NET", "FastAPI", "REST API"],
  "Database": ["SQL Server", "MongoDB", "XML"],
  "Tools": ["Visual Studio", "Postman", "Git", "Debugging"],
};

const PROJECTS = [
  {
    title: "AI Chatbot Model",
    link: "https://ai-chatbot-p3n8.onrender.com/",
    desc: "Full-stack AI Chatbot with self-learning capabilities, integrating Weather & Search APIs for real-time accuracy.",
    tech: ["Python", "FastAPI", "MongoDB", "Groq LLM (Llama 3)", "REST API", "JavaScript"],
    color: "#00f5c4",
  },
  {
    title: "Employee Travel Portal",
    link: null,
    desc: "Self-service portal for travel allowance requests & reimbursement with expense tracking and status monitoring.",
    tech: ["C#", "ASP.NET", "SQL Server", "HTML5", "CSS3"],
    color: "#7c6af7",
  },
 {
  title: "Leave Portal",
  link: null,
  desc: "Designed and developed a Leave Planner System with a full-year calendar view (Jan–Dec) enabling multi-user leave visibility, color-coded date ranges, and an approval workflow. The system provides real-time leave tracking, efficient leave management, and improved planning transparency across the organization.",
  tech: ["C#", "ASP.NET", "SQL Server", "HTML5", "CSS3"],
  color: "#7c6af7",
},
];

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [typed, setTyped] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const roles = ["Software Developer", "Full-Stack Engineer", "AI App Builder", "MCA Student @ LPU"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          clearInterval(interval);
          setTimeout(() => startType(), 1400);
        }
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  function startType() {
    const interval = setInterval(() => {
      const current = roles[roleIdx.current];
      if (deleting.current) {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
          clearInterval(interval);
          setTimeout(() => startType(), 300);
        }
      } else {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          clearInterval(interval);
          setTimeout(() => startType(), 1400);
        }
      }
    }, deleting.current ? 45 : 80);
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div style={styles.root}>
      {/* Background grid */}
      <div style={styles.gridBg} />
      <div style={styles.glowOrb1} />
      <div style={styles.glowOrb2} />

      {/* NAV */}
      <nav style={styles.nav}>
        <span style={styles.logo}>DC<span style={{ color: "#00f5c4" }}>.</span></span>
        <div style={styles.navLinks}>
          {NAV_ITEMS.map((n) => (
            <button key={n} onClick={() => scrollTo(n)} style={{
              ...styles.navBtn,
              color: active === n ? "#00f5c4" : "#a0aec0",
              borderBottom: active === n ? "2px solid #00f5c4" : "2px solid transparent",
            }}>{n}</button>
          ))}
        </div>
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </nav>
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_ITEMS.map((n) => (
            <button key={n} onClick={() => scrollTo(n)} style={styles.mobileBtn}>{n}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="About" style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.greeting}>👋 Hello, I'm</p>
          <h1 style={styles.name}>Dharmendra<br /><span style={styles.nameAccent}>Chaudhary</span></h1>
          <div style={styles.typeRow}>
            <span style={styles.typeText}>{typed}</span>
            <span style={styles.cursor}>|</span>
          </div>
          <p style={styles.summary}>
            Software Developer with hands-on experience building scalable web applications using <b style={{ color: "#00f5c4" }}>C#, ASP.NET, React</b> & <b style={{ color: "#00f5c4" }}>Python</b>. Passionate about AI-powered solutions and clean architecture.
          </p>
          <div style={styles.heroActions}>
            <a href="https://github.com/Chaudhary4000" target="_blank" style={styles.btnPrimary}>GitHub</a>
            <a href="https://linkedin.com/in/dharmendra4000" target="_blank" style={styles.btnOutline}>LinkedIn</a>
            <button onClick={() => scrollTo("Contact")} style={styles.btnGhost}>Contact Me</button>
          </div>
          <div style={styles.statRow}>
            {[["1+", "Year Exp."], ["2", "Projects"], ["5+", "Tech Stacks"], ["MCA", "@ LPU"]].map(([val, label]) => (
              <div key={label} style={styles.stat}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.avatarRing}>
            <div style={styles.avatar}>DC</div>
            <div style={styles.ringLabel1}>FastAPI</div>
            <div style={styles.ringLabel2}>React</div>
            <div style={styles.ringLabel3}>C#</div>
            <div style={styles.ringLabel4}>MongoDB</div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="Skills" style={styles.section}>
        <SectionTitle>Technical Skills</SectionTitle>
        <div style={styles.skillsGrid}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} style={styles.skillCard}>
              <div style={styles.skillCat}>{cat}</div>
              <div style={styles.skillTags}>
                {items.map(s => <span key={s} style={styles.tag}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="Experience" style={styles.section}>
        <SectionTitle>Work Experience</SectionTitle>
        <div style={styles.expCard}>
          <div style={styles.expDot} />
          <div style={styles.expBody}>
            <div style={styles.expHeader}>
              <div>
                <div style={styles.expRole}>Software Developer</div>
                <div style={styles.expCompany}>4CPLUS (INTERNET) Ltd — Ghaziabad</div>
              </div>
              <span style={styles.expDate}>Oct 2024 – Present</span>
            </div>
            <ul style={styles.expList}>
              {[
                "Built full-stack modules: auth systems, real-time status tracking & user dashboards",
                "Integrated REST APIs for improved functionality and real-time data processing",
                "Optimized application performance with clean, maintainable code",
                "Collaborated across frontend & backend teams to ship production features on time",
              ].map((p, i) => <li key={i} style={styles.expItem}><span style={{ color: "#00f5c4", marginRight: 8 }}>▸</span>{p}</li>)}
            </ul>
            <div style={styles.expTechRow}>
              {["C#", "ASP.NET", "JavaScript", "SQL Server", "REST API"].map(t => <span key={t} style={styles.smallTag}>{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="Projects" style={styles.section}>
        <SectionTitle>Projects</SectionTitle>
        <div style={styles.projectsGrid}>
          {PROJECTS.map((p) => (
            <div key={p.title} style={{ ...styles.projectCard, borderColor: p.color + "44" }}>
              <div style={{ ...styles.projectAccent, background: p.color }} />
              <div style={styles.projectTop}>
                <span style={{ ...styles.projectTitle, color: p.color }}>{p.title}</span>
                {p.link && <a href={p.link} target="_blank" style={{ ...styles.liveBadge, color: p.color, borderColor: p.color }}>↗ Live</a>}
              </div>
              <p style={styles.projectDesc}>{p.desc}</p>
              <div style={styles.projectTags}>
                {p.tech.map(t => <span key={t} style={{ ...styles.smallTag, borderColor: p.color + "66", color: p.color }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="Education" style={styles.section}>
        <SectionTitle>Education</SectionTitle>
        <div style={styles.eduGrid}>
          {[
            { deg: "Master of Computer Applications (MCA)", school: "Lovely Professional University (LPU), Punjab", year: "2025 – 2027", status: "Pursuing" },
            { deg: "Bachelor of Computer Applications (BCA)", school: "GLA University, Mathura", year: "2025" },
            { deg: "Intermediate", school: "Delhi Public School, Mathura", year: "2022" },
            { deg: "High School", school: "Delhi Public School, Mathura", year: "2020" },
          ].map((e, i) => (
            <div key={i} style={styles.eduCard}>
              <div style={styles.eduYear}>{e.year}</div>
              <div style={styles.eduDeg}>{e.deg}</div>
              <div style={styles.eduSchool}>{e.school}</div>
              {e.status && <span style={styles.statusBadge}>{e.status}</span>}
            </div>
          ))}
        </div>
        <div style={styles.certCard}>
          <span style={{ fontSize: 22 }}>🏅</span>
          <span style={{ color: "#e2e8f0", fontSize: 15 }}>Certificate of Appreciation — Workshop on <b style={{ color: "#00f5c4" }}>Web Development Technologies</b></span>
        </div>
      </section>

      {/* CONTACT */}
      <section id="Contact" style={styles.section}>
        <SectionTitle>Get In Touch</SectionTitle>
        <div style={styles.contactGrid}>
          {[
            { icon: "📧", label: "Email", val: "Dharmendrachaudhary4000@gmail.com", href: "mailto:Dharmendrachaudhary4000@gmail.com" },
            { icon: "📞", label: "Phone", val: "+91 8171601828", href: "tel:+918171601828" },
            { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/dharmendra4000", href: "https://linkedin.com/in/dharmendra4000" },
            { icon: "💻", label: "GitHub", val: "github.com/Chaudhary4000", href: "https://github.com/Chaudhary4000" },
          ].map((c) => (
            <a key={c.label} href={c.href} target="_blank" style={styles.contactCard}>
              <span style={styles.contactIcon}>{c.icon}</span>
              <div>
                <div style={styles.contactLabel}>{c.label}</div>
                <div style={styles.contactVal}>{c.val}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={{ color: "#4a5568" }}>Designed & Built by </span>
        <span style={{ color: "#00f5c4", fontWeight: 700 }}>Dharmendra Chaudhary</span>
        <span style={{ color: "#4a5568" }}> · 2025</span>
      </footer>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: 40, textAlign: "center" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f7fafc", fontFamily: "'Syne', sans-serif", letterSpacing: -1 }}>
        {children}
      </h2>
      <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#00f5c4,#7c6af7)", borderRadius: 4, margin: "10px auto 0" }} />
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#050d1a",
    color: "#e2e8f0",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  gridBg: {
    position: "fixed", inset: 0, zIndex: 0,
    backgroundImage: "linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px)",
    backgroundSize: "50px 50px",
    pointerEvents: "none",
  },
  glowOrb1: {
    position: "fixed", top: -120, right: -120, width: 400, height: 400,
    borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,196,0.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  glowOrb2: {
    position: "fixed", bottom: -100, left: -100, width: 350, height: 350,
    borderRadius: "50%", background: "radial-gradient(circle, rgba(124,106,247,0.12) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  nav: {
    position: "sticky", top: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 48px", height: 64,
    background: "rgba(5,13,26,0.92)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0,245,196,0.08)",
  },
  logo: { fontSize: 24, fontWeight: 900, fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: -1 },
  navLinks: { display: "flex", gap: 8 },
  navBtn: {
    background: "none", border: "none", cursor: "pointer", padding: "4px 12px",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
    letterSpacing: 0.3,
  },
  hamburger: {
    display: "none", background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
  },
  mobileMenu: {
    position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
    background: "#0a1628", borderBottom: "1px solid rgba(0,245,196,0.1)",
    display: "flex", flexDirection: "column", padding: "12px 0",
  },
  mobileBtn: {
    background: "none", border: "none", color: "#a0aec0", padding: "12px 32px",
    fontSize: 16, cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif",
  },
  hero: {
    position: "relative", zIndex: 1,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "80px 10vw", minHeight: "92vh", gap: 40,
    flexWrap: "wrap",
  },
  heroContent: { flex: 1, minWidth: 280, maxWidth: 600 },
  greeting: { fontSize: 18, color: "#00f5c4", fontWeight: 600, marginBottom: 8, letterSpacing: 1 },
  name: {
    fontSize: "clamp(40px,6vw,72px)", fontWeight: 900, lineHeight: 1.1,
    fontFamily: "'Syne', sans-serif", color: "#f7fafc", marginBottom: 16, letterSpacing: -2,
  },
  nameAccent: { color: "#00f5c4", WebkitTextStroke: "1px #00f5c4" },
  typeRow: { display: "flex", alignItems: "center", gap: 2, marginBottom: 24, height: 36 },
  typeText: { fontSize: 22, fontWeight: 600, color: "#a0aec0" },
  cursor: { fontSize: 24, color: "#00f5c4", animation: "blink 1s infinite" },
  summary: { color: "#718096", lineHeight: 1.8, fontSize: 16, marginBottom: 32, maxWidth: 500 },
  heroActions: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 },
  btnPrimary: {
    background: "linear-gradient(135deg,#00f5c4,#00c9a7)", color: "#050d1a",
    padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none",
    fontSize: 14, letterSpacing: 0.5, transition: "transform 0.2s",
  },
  btnOutline: {
    border: "1.5px solid #7c6af7", color: "#7c6af7",
    padding: "12px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none",
    fontSize: 14, background: "transparent", transition: "all 0.2s",
  },
  btnGhost: {
    border: "1.5px solid #2d3748", color: "#a0aec0",
    padding: "12px 28px", borderRadius: 8, fontWeight: 600,
    fontSize: 14, background: "transparent", cursor: "pointer", transition: "all 0.2s",
  },
  statRow: { display: "flex", gap: 32, flexWrap: "wrap" },
  stat: { display: "flex", flexDirection: "column" },
  statVal: { fontSize: 28, fontWeight: 900, color: "#00f5c4", fontFamily: "'Syne', sans-serif" },
  statLabel: { fontSize: 12, color: "#4a5568", letterSpacing: 1, textTransform: "uppercase" },
  heroVisual: { flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" },
  avatarRing: { position: "relative", width: 280, height: 280 },
  avatar: {
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
    width: 120, height: 120, borderRadius: "50%",
    background: "linear-gradient(135deg,#00f5c4,#7c6af7)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 36, fontWeight: 900, color: "#050d1a", fontFamily: "'Syne', sans-serif",
    boxShadow: "0 0 40px rgba(0,245,196,0.3)",
  },
  ringLabel1: { position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", ...ringLabelBase("#00f5c4") },
  ringLabel2: { position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", ...ringLabelBase("#7c6af7") },
  ringLabel3: { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", ...ringLabelBase("#f6ad55") },
  ringLabel4: { position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", ...ringLabelBase("#68d391") },
  section: {
    position: "relative", zIndex: 1,
    padding: "80px 10vw", borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 },
  skillCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,245,196,0.1)",
    borderRadius: 12, padding: "24px 20px", backdropFilter: "blur(10px)",
    transition: "border-color 0.3s",
  },
  skillCat: { fontSize: 13, fontWeight: 700, color: "#00f5c4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 },
  skillTags: { display: "flex", flexWrap: "wrap", gap: 8 },
  tag: {
    background: "rgba(0,245,196,0.08)", border: "1px solid rgba(0,245,196,0.2)",
    color: "#a0aec0", borderRadius: 6, padding: "4px 12px", fontSize: 13, fontWeight: 500,
  },
  expCard: {
    display: "flex", gap: 0, position: "relative",
    borderLeft: "2px solid rgba(0,245,196,0.3)", paddingLeft: 28, marginLeft: 8,
  },
  expDot: {
    position: "absolute", left: -7, top: 8, width: 12, height: 12, borderRadius: "50%",
    background: "#00f5c4", boxShadow: "0 0 12px #00f5c4",
  },
  expBody: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14, padding: "28px 28px", flex: 1,
  },
  expHeader: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 },
  expRole: { fontSize: 20, fontWeight: 800, color: "#f7fafc", fontFamily: "'Syne', sans-serif" },
  expCompany: { fontSize: 14, color: "#7c6af7", fontWeight: 600, marginTop: 4 },
  expDate: { fontSize: 13, color: "#4a5568", background: "rgba(124,106,247,0.1)", border: "1px solid rgba(124,106,247,0.2)", borderRadius: 6, padding: "4px 12px", alignSelf: "flex-start" },
  expList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 },
  expItem: { fontSize: 14, color: "#a0aec0", lineHeight: 1.7, display: "flex", alignItems: "flex-start" },
  expTechRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 },
  projectCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid",
    borderRadius: 16, padding: "28px", position: "relative", overflow: "hidden",
    transition: "transform 0.3s",
  },
  projectAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "16px 16px 0 0" },
  projectTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  projectTitle: { fontSize: 19, fontWeight: 800, fontFamily: "'Syne', sans-serif" },
  liveBadge: { fontSize: 12, fontWeight: 700, border: "1px solid", borderRadius: 20, padding: "3px 12px", textDecoration: "none" },
  projectDesc: { color: "#718096", fontSize: 14, lineHeight: 1.8, marginBottom: 18 },
  projectTags: { display: "flex", flexWrap: "wrap", gap: 8 },
  smallTag: { fontSize: 11, fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", color: "#a0aec0", borderRadius: 4, padding: "3px 9px" },
  eduGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, marginBottom: 24 },
  eduCard: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12, padding: "22px 20px",
  },
  eduYear: { fontSize: 13, color: "#7c6af7", fontWeight: 700, marginBottom: 6, letterSpacing: 1 },
  eduDeg: { fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 },
  eduSchool: { fontSize: 13, color: "#718096" },
  statusBadge: { display: "inline-block", marginTop: 10, background: "rgba(0,245,196,0.1)", border: "1px solid rgba(0,245,196,0.3)", color: "#00f5c4", borderRadius: 20, padding: "2px 12px", fontSize: 11, fontWeight: 700 },
  certCard: {
    display: "flex", alignItems: "center", gap: 14, background: "rgba(246,173,85,0.05)",
    border: "1px solid rgba(246,173,85,0.2)", borderRadius: 12, padding: "18px 24px",
  },
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 },
  contactCard: {
    display: "flex", alignItems: "center", gap: 16,
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 12, padding: "20px 24px", textDecoration: "none", transition: "all 0.3s",
  },
  contactIcon: { fontSize: 28 },
  contactLabel: { fontSize: 12, color: "#4a5568", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  contactVal: { fontSize: 14, color: "#a0aec0" },
  footer: { textAlign: "center", padding: "28px 20px", fontSize: 14, borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 },
};

function ringLabelBase(color) {
  return {
    background: `rgba(${hexToRgb(color)},0.12)`,
    border: `1px solid ${color}44`,
    color: color,
    borderRadius: 6,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
  };
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}