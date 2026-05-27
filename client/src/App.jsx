import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ResultBox from "./components/ResultBox";
import History from "./components/History";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleShorten = () => {
    if (!url) return;

    if (!url) {
      setError("Please enter a valid URL");
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