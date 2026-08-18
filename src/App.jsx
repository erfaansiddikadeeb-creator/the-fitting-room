import { useState } from "react";
import { Scissors, Pin, Loader2, Sparkles, RotateCcw } from "lucide-react";

// Placeholder ad slot. Once your AdSense account is approved, replace the
// contents of this div with your <ins class="adsbygoogle"> unit code (and
// load the AdSense script once in index.html — see README).
function AdSlot({ label = "Advertisement", height = 90 }) {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "10px 32px",
      }}
    >
      <div
        style={{
          height: `${height}px`,
          border: "1px dashed #c9c3b4",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a39d8d",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          background: "#e4e0d3",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function TailorApp() {
  const [resume, setResume] = useState("");
  const [posting, setPosting] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  const canSubmit = resume.trim().length > 40 && posting.trim().length > 40 && !loading;

  async function handleTailor() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, posting }),
      });
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || "Request failed");
      }
      const parsed = await response.json();
      setResult(parsed);
    } catch (e) {
      setError(e.message && e.message !== "Request failed" ? e.message : "Something snagged on that thread. Try again — or trim your inputs if they're very long.");
    } finally {
      setLoading(false);
    }
  }

  function copyText(label, text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(""), 1500);
    } catch (e) {}
  }

  function reset() {
    setResult(null);
    setError("");
  }

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        background: "#EDEAE2",
        color: "#2B2E33",
        minHeight: "100%",
        padding: "0",
      }}
    >
      <style>{`
        .tailor-input::placeholder { color: #8b8578; }
        .tailor-input:focus { outline: none; border-color: #B5493D !important; }
        .pin-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(27,36,48,0.25); }
        .pin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .stitch {
          background-image: repeating-linear-gradient(to bottom, #B8935A 0, #B8935A 6px, transparent 6px, transparent 12px);
          width: 2px;
        }
        @keyframes pinDrop {
          0% { transform: translateY(-6px) rotate(-8deg); opacity: 0; }
          60% { transform: translateY(2px) rotate(4deg); opacity: 1; }
          100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        }
        .pin-anim { animation: pinDrop 0.5s ease-out; }
        .copy-btn { transition: background 0.15s ease; }
        .copy-btn:hover { background: #1B2430 !important; color: #EDEAE2 !important; }
        @media (prefers-reduced-motion: reduce) {
          .pin-anim { animation: none; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "#1B2430",
          color: "#EDEAE2",
          padding: "28px 32px 24px",
          borderBottom: "3px solid #B8935A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <Scissors size={22} color="#B5493D" />
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#B8935A",
              textTransform: "uppercase",
            }}
          >
            The Fitting Room
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: "32px",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Tailor your application to the role
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#b9b4a8", maxWidth: "560px" }}>
          Paste your resume and the job posting. We'll take the measurements and pin your
          experience to what they're actually asking for.
        </p>
      </div>

      <AdSlot label="Advertisement" height={90} />

      {/* Body */}
      <div
        style={{
          display: "flex",
          minHeight: "560px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Left: inputs */}
        <div style={{ flex: 1, padding: "28px 28px 28px 32px", minWidth: 0 }}>
          <label
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6b6558",
              display: "block",
              marginBottom: "6px",
            }}
          >
            01 — Your resume
          </label>
          <textarea
            className="tailor-input"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume text here..."
            style={{
              width: "100%",
              height: "150px",
              padding: "12px 14px",
              borderRadius: "6px",
              border: "1.5px solid #d6d1c4",
              background: "#fff",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "13px",
              lineHeight: 1.5,
              resize: "vertical",
              boxSizing: "border-box",
              color: "#2B2E33",
            }}
          />

          <label
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6b6558",
              display: "block",
              margin: "18px 0 6px",
            }}
          >
            02 — The job posting
          </label>
          <textarea
            className="tailor-input"
            value={posting}
            onChange={(e) => setPosting(e.target.value)}
            placeholder="Paste the job description here..."
            style={{
              width: "100%",
              height: "150px",
              padding: "12px 14px",
              borderRadius: "6px",
              border: "1.5px solid #d6d1c4",
              background: "#fff",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "13px",
              lineHeight: 1.5,
              resize: "vertical",
              boxSizing: "border-box",
              color: "#2B2E33",
            }}
          />

          <button
            className="pin-btn"
            onClick={handleTailor}
            disabled={!canSubmit}
            style={{
              marginTop: "20px",
              width: "100%",
              background: "#B5493D",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "13px 18px",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="spin" style={{ animation: "spin 1s linear infinite" }} />
                Pinning the pattern...
              </>
            ) : (
              <>
                <Pin size={16} />
                Tailor it
              </>
            )}
          </button>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

          {error && (
            <p style={{ color: "#B5493D", fontSize: "13px", marginTop: "10px" }}>{error}</p>
          )}

          {!canSubmit && !loading && (resume.length > 0 || posting.length > 0) && (
            <p style={{ color: "#8b8578", fontSize: "12px", marginTop: "10px" }}>
              A little more detail in both fields helps us take an accurate measurement.
            </p>
          )}
        </div>

        {/* Stitched divider */}
        <div className="stitch" style={{ margin: "28px 0" }} />

        {/* Right: output */}
        <div style={{ flex: 1, padding: "28px 32px 28px 28px", minWidth: 0 }}>
          {!result && !loading && (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#a39d8d",
                padding: "40px 20px",
              }}
            >
              <Sparkles size={28} strokeWidth={1.5} style={{ marginBottom: "12px" }} />
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", fontStyle: "italic", margin: 0 }}>
                Your tailored bullets and cover letter will appear here.
              </p>
            </div>
          )}

          {loading && (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#8b8578",
              }}
            >
              <Loader2 size={24} style={{ animation: "spin 1s linear infinite", marginBottom: "10px" }} />
              <p style={{ fontSize: "13px" }}>Measuring your experience against the role...</p>
            </div>
          )}

          {result && (
            <div className="pin-anim">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "18px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6b6558",
                    }}
                  >
                    Fit
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "36px",
                        fontWeight: 600,
                        color: "#1B2430",
                      }}
                    >
                      {result.fitScore}
                    </span>
                    <span style={{ color: "#8b8578", fontSize: "13px" }}>/ 100</span>
                  </div>
                </div>
                <button
                  onClick={reset}
                  style={{
                    background: "none",
                    border: "1.5px solid #d6d1c4",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontSize: "12px",
                    color: "#6b6558",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <RotateCcw size={12} /> Start over
                </button>
              </div>

              <p
                style={{
                  fontSize: "13px",
                  color: "#4a453c",
                  background: "#fff",
                  border: "1px solid #e2ddd0",
                  borderLeft: "3px solid #B8935A",
                  borderRadius: "4px",
                  padding: "10px 12px",
                  marginBottom: "20px",
                  lineHeight: 1.5,
                }}
              >
                {result.fitNote}
              </p>

              <div style={{ marginBottom: "22px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6b6558",
                    }}
                  >
                    Tailored bullets
                  </span>
                  <button
                    className="copy-btn"
                    onClick={() => copyText("bullets", result.tailoredBullets.map((b) => `• ${b}`).join("\n"))}
                    style={{
                      background: "#EDEAE2",
                      border: "1px solid #d6d1c4",
                      borderRadius: "4px",
                      padding: "4px 9px",
                      fontSize: "11px",
                      color: "#2B2E33",
                      cursor: "pointer",
                    }}
                  >
                    {copied === "bullets" ? "Copied" : "Copy"}
                  </button>
                </div>
                <ul style={{ margin: 0, paddingLeft: "18px" }}>
                  {result.tailoredBullets.map((b, i) => (
                    <li key={i} style={{ fontSize: "13.5px", lineHeight: 1.6, marginBottom: "6px", color: "#2B2E33" }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#6b6558",
                    }}
                  >
                    Cover letter
                  </span>
                  <button
                    className="copy-btn"
                    onClick={() => copyText("letter", result.coverLetter)}
                    style={{
                      background: "#EDEAE2",
                      border: "1px solid #d6d1c4",
                      borderRadius: "4px",
                      padding: "4px 9px",
                      fontSize: "11px",
                      color: "#2B2E33",
                      cursor: "pointer",
                    }}
                  >
                    {copied === "letter" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e2ddd0",
                    borderRadius: "4px",
                    padding: "14px 16px",
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    whiteSpace: "pre-wrap",
                    color: "#2B2E33",
                  }}
                >
                  {result.coverLetter}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdSlot label="Advertisement" height={90} />
    </div>
  );
}
