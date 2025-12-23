"use client";

import { useState, useEffect } from "react";

type Feedback = {
  id: string;
  message: string;
  name?: string; 
  created_at: string;
};

export default function Home() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [name, setName] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const mockFeedback = [
      { id: "1", message: "This is awesome!", name: "Alice", created_at: "2025-12-22T12:00:00Z" },
      { id: "2", message: "Could use more features.", created_at: "2025-12-22T13:00:00Z" }, // anonymous
    ];

    setTimeout(() => {
      setFeedback(mockFeedback);
    }, 500);
  }, []);
  // Step 1: Submit message to trigger name prompt
  function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    setSubmitMessage(message.trim());
    setMessage("");
    setShowNamePrompt(true);
  }

  function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    setLoading(true);

    const finalName = name.trim() || "Anonymous";

    setTimeout(() => {
      const newFeedback: Feedback = {
        id: (Math.random() * 100000).toFixed(0),
        message: submitMessage,
        name: finalName === "Anonymous" ? undefined : finalName,
        created_at: new Date().toISOString(),
      };
      setFeedback([newFeedback, ...feedback]);
      setName("");
      setSubmitMessage("");
      setShowNamePrompt(false);
      setLoading(false);
    }, 800);
  }

  function cancelNamePrompt() {
    setShowNamePrompt(false);
    setName("");
    setSubmitMessage("");
  }

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Anonymous Feedback Board</h1>

      {!showNamePrompt && (
        <form onSubmit={handleInitialSubmit} style={{ marginBottom: "1rem" }}>
          <textarea
            rows={4}
            placeholder="Write your anonymous feedback here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
            disabled={loading}
          />
          <button type="submit" disabled={loading} style={{ marginTop: "0.5rem", padding: "0.5rem 1rem" }}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}

      {showNamePrompt && (
        <form onSubmit={handleFinalSubmit} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
          <p>Would you like to add your name or remain anonymous?</p>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem", marginBottom: "0.5rem" }}
          />

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: "0.5rem" }}>
              Submit with Name
            </button>
            <button
              type="button"
              onClick={() => {
                setName("Anonymous");
                handleFinalSubmit(new Event("submit") as unknown as React.FormEvent);
              }}
              disabled={loading}
              style={{ flex: 1, padding: "0.5rem" }}
            >
              Remain Anonymous
            </button>
            <button
              type="button"
              onClick={cancelNamePrompt}
              disabled={loading}
              style={{ flex: 1, padding: "0.5rem", backgroundColor: "#eee" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section>
        <h2>Recent Feedback</h2>
        {feedback.length === 0 && <p>No feedback yet. Be the first to submit!</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {feedback.map((fb) => (
            <li
              key={fb.id}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "0.5rem 0",
                fontStyle: "italic",
              }}
            >
              <p>"{fb.message}"</p>
              <small>
                — {fb.name ?? "Anonymous"}, {new Date(fb.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
