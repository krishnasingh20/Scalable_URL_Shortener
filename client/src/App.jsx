import { useState } from "react";

function App() {
  
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleShorten = () => {
    if (!url) return;

    if (!url.startsWith("http")) {
      setError("Please enter a valid URL (must start with http/https)");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      const generated = "https://short.ly/demo123";

      setShortUrl(generated);

      setHistory((prev) => [
        { long: url, short: generated },
        ...prev,
      ]);

      setLoading(false);
    }, 1200);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-gray-100 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-gray-100 transition-all duration-300">

        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          URL Shortener
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Paste your long URL and get a short link instantly
        </p>

        {/* Input */}
        <div className="flex flex-col md:flex-row gap-4">

          <input
            autoFocus
            type="text"
            placeholder="https://example.com/very-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleShorten();
            }}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleShorten}
            disabled={!url || loading}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              url && !loading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? "⏳ Shortening..." : "Shorten"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}

        {/* Result */}
        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">

            <p className="text-sm text-gray-600 mb-1">
              Your Short URL:
            </p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium underline break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={handleCopy}
              className="mt-3 ml-0 md:ml-3 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6">

            <h2 className="font-semibold mb-2 text-gray-700">
              Recent Links
            </h2>

            <div className="space-y-2 max-h-40 overflow-y-auto">

              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="text-sm p-3 border rounded-lg bg-gray-50"
                >
                  <p className="text-gray-500 break-all">
                    {item.long}
                  </p>
                  <p className="text-blue-600 break-all">
                    {item.short}
                  </p>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;