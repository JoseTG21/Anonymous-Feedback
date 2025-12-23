"use client";

import { useState, useEffect } from "react";

type Feedback = {
  id: string;
  message: string;
  created_at: string;
};

export default function Home() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // replace this with real API call 
  useEffect(() => {
    const mockFeedback = [
      { id: "1", message: "This is awesome!", created_at: "2025-12-22T12:00:00Z" },
      { id: "2", message: "Could use more features.", created_at: "2025-12-22T13:00:00Z" },
    ];

    // simulate delay
    setTimeout(() => {
      setFeedback(mockFeedback);
    }, 500);
  }, []);
  
  
  // Fetch real feedback
//const response = await fetch("/api/feedback");
//const data = await response.json();
//setFeedback(data);

// Submit real feedback
//await fetch("/api/feedback", {
 // method: "POST",
 // headers: { "Content-Type": "application/json" },
 // body: JSON.stringify({ message }),
//});


  // replace this with real API call 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    setLoading(true);

    // server
    setTimeout(() => {
      // add 
      const newFeedback = {
        id: (Math.random() * 100000).toFixed(0),
        message: message.trim(),
        created_at: new Date().toISOString(),
      };
      setFeedback([newFeedback, ...feedback]);
      setMessage("");
      setLoading(false);
    }, 800);
  }

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Anonymous Feedback Board</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
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
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
              <small>{new Date(fb.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
