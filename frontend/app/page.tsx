"use client";

import React, { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Async function to handle file upload and API communication
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Create a FormData object to send the file to the backend
      const formData = new FormData();
      formData.append("file", file);

      // Send the POST request to the FastAPI OCR endpoint
      const res = await fetch("http://localhost:8000/ocr/parse", {
        method: "POST",
        body: formData,
      });
      console.log(res);

      if (!res.ok) throw new Error(`Server Error: ${res.status}`);

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render the component's UI
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-xl bg-white shadow-md rounded-2xl p-6 border">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Analizzatore di scontrini
        </h1>

        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
            loading || !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Elaborazione..." : "Carica ed Analizza"}
        </button>

        {error && (
          <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Risultato OCR:</h2>
            <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded-lg text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
