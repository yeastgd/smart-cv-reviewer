"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result.split(",")[1];
        const response = await fetch("/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdfBase64: base64 }),
        });
        const data = await response.json();
        setResult(data);
        setLoading(false);
      };
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Smart CV Reviewer</h1>
        <p>Upload your CV and get instant AI-powered feedback</p>
      </div>

      <div className={styles.uploadZone}>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className={styles.hiddenInput}
          />
          {file ? (
            <span className={styles.filename}>📄 {file.name}</span>
          ) : (
            <span className={styles.uploadHint}>Drop your PDF here or click to browse</span>
          )}
        </label>
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={!file || loading}
        >
          {loading ? "Analysing..." : "Analyse CV"}
        </button>
      </div>

      {result && (
        <div className={styles.results}>
          <div className={styles.scoreCard}>
            <div className={styles.scoreCircle}>{result.score}</div>
            <div className={styles.scoreInfo}>
              <h2>Overall score</h2>
              <p>{result.summary}</p>
            </div>
          </div>

          <div className={styles.sectionsGrid}>
            {Object.entries(result.sections).map(([key, section]) => (
              <div key={key} className={styles.sectionCard}>
                <div className={styles.sectionLabel}>{key}</div>
                <div className={styles.sectionScore}>{section.score}</div>
                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
                <div className={styles.sectionFeedback}>{section.feedback}</div>
              </div>
            ))}
          </div>

          <div className={styles.card}>
            <h3>Top improvements</h3>
            {result.top_improvements.map((item, i) => (
              <div key={i} className={styles.improvementItem}>
                <div className={styles.improvementNum}>{i + 1}</div>
                <p>{item}</p>
              </div>
            ))}
          </div>

          {result.red_flags.length > 0 && (
            <div className={styles.redFlags}>
              <h3>⚠ Things to watch</h3>
              {result.red_flags.map((flag, i) => (
                <p key={i}>{flag}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}