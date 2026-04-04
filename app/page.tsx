"use client";
import React, { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const shortenUrl = async () => {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error ?? "Failed to shorten URL");
      return;
    }

    setShortenedUrl(`${window.location.origin}/${data.id}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden font-sans cursor-crosshair text-[#F8F8FF]">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#2E1A47] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#1A0B2E] rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl p-8 backdrop-blur-md bg-black/40 border border-[#2E1A47] rounded-none shadow-[0_0_50px_rgba(0,255,255,0.05)]">
        
        {/* Header styling matching Chronos visual language */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-mono tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#F8F8FF] drop-shadow-[0_0_15px_rgba(0,255,255,0.6)] uppercase mb-4">
            Chronos
          </h1>
          <p className="text-[#00FFFF] font-mono text-sm tracking-widest opacity-80 uppercase">
            Data Construct / Dimensional Link
          </p>
        </div>

        <div className="w-full space-y-8">
          {/* Input field */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF] to-[#2E1A47] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              className="relative w-full p-5 bg-[#05020a]/80 text-[#F8F8FF] border border-[#2E1A47] focus:outline-none focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] transition-all font-mono tracking-wide placeholder-[#F8F8FF]/30 shadow-inner"
              placeholder="ENTER SPATIAL COORDINATES (URL)..."
            />
          </div>

          {/* Action button */}
          <button
            onClick={shortenUrl}
            className="group relative w-full px-8 py-5 bg-transparent border-2 border-[#00FFFF] text-[#00FFFF] font-mono tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:text-black hover:shadow-[0_0_40px_rgba(0,255,255,0.7)]"
          >
            <div className="absolute inset-0 w-full h-full bg-[#00FFFF] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
            <span className="relative z-10 flex items-center justify-center gap-3">
              Generate Temporal Anchor
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        </div>

        {/* Results */}
        {shortenedUrl && (
          <div className="w-full mt-10 transition-all duration-700 ease-in-out">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full animate-ping"></div>
              <div className="text-xs font-mono text-[#FF6B00] uppercase tracking-[0.2em] opacity-90">
                Quantum Entity Established
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 p-5 bg-[#05020a]/90 border border-[#FF6B00]/40 border-l-4 border-l-[#FF6B00] shadow-[0_0_30px_rgba(255,107,0,0.15)] relative overflow-hidden group">
              <div className="absolute block w-full h-full top-0 left-0 bg-gradient-to-r from-[#FF6B00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-lg font-mono text-[#F8F8FF] truncate tracking-wide relative z-10 selection:bg-[#FF6B00] selection:text-white">
                {shortenedUrl}
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                className="relative z-10 p-3 bg-transparent text-[#F8F8FF]/50 border border-[#F8F8FF]/20 hover:text-[#00FFFF] hover:border-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300"
                title="Copy to clipboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Decorative lattice background element */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMkUxQTQ3IiBzdHJva2Utd2lkdGg9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20 pointer-events-none mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
    </div>
  );
}
