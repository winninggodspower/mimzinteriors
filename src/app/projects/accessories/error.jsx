"use client";

import { useEffect } from "react";

export default function AccessoriesError({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: "620px" }}>
        <h2 style={{ margin: 0, fontSize: "2rem" }}>Unable to load accessories</h2>
        <p style={{ marginTop: "0.8rem", lineHeight: 1.6 }}>
          Something went wrong while loading accessories. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1rem",
            minHeight: "44px",
            padding: "0.7rem 1.2rem",
            border: "1px solid #c28831",
            background: "#c28831",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    </main>
  );
}
