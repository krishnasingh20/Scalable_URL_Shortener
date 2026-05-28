import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ResultBox from "./components/ResultBox";
import History from "./components/History";
import api from "./api/axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleShorten = async () => {
    if (!url) return;

    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/url/shorten", {
        originalUrl: url,
      });

      const shortLink = `http://localhost:3000/${data.data.shortCode}`;

      setShortUrl(shortLink);

      setHistory((prev) => {
      const filtered = prev.filter(item => item.long !== url);

        return [
          { long: url, short: shortLink },
          ...filtered,
        ];
        
      });

    }
    catch (err) {
      setError(err.response?.data?.message || "Server Error");
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-white to-gray-100 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center text-blue-600">
          URL Shortener
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Paste your long URL and get a short link instantly
        </p>

        <UrlForm
          url={url}
          setUrl={setUrl}
          handleShorten={handleShorten}
          loading={loading}
          error={error}
        />

        <ResultBox
          shortUrl={shortUrl}
          handleCopy={handleCopy}
          copied={copied}
        />

        <History history={history} />

      </div>
    </div>
  );
}

export default App;