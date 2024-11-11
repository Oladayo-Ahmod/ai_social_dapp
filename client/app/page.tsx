import { useState } from 'react';

export default function AnalyzePost() {
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState("");

  const analyzeContent = async () => {
    const response = await fetch("/api/analyzePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    setAnalysis(data.analysis || "Error analyzing content");
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter content to analyze"
      />
      <button onClick={analyzeContent}>Analyze</button>
      <p>Analysis: {analysis}</p>
    </div>
  );
}
