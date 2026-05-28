import { useState } from "react";
import UrlForm from "./components/UrlForm";
import ResultBox from "./components/ResultBox";
import History from "./components/History";
import api from "./api/axios";

function App() {
  const [formData, setFormData] = useState({
    originalUrl: "",
    customAlias: "",
    expiresAt: "",
  });

  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const [history, setHistory] = useState([]);

  const handleShorten = async (data) => {
    if (!data.originalUrl) return;

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data: response } = await api.post("/url/shorten", data);

      setMessage(response.message);
      setMessageType("success");

      const shortLink = `http://localhost:3000/${response.data.shortCode}`;

      setShortUrl(shortLink);

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) => item.long !== data.originalUrl
        );

        return [
          { long: data.originalUrl, short: shortLink },
          ...filtered,
        ];
      });

      // reset form after success
      setFormData({
        originalUrl: "",
        customAlias: "",
        expiresAt: "",
      });

    } catch (err) {
      const msg = err.response?.data?.message || "Server Error";

      setError(msg);
      setMessage(msg);
      setMessageType("error");
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">

      <div className="w-full max-w-2xl">

        {/* CARD */}
        <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40 transition-all duration-300 hover:shadow-blue-200">

          {/* HEADER */}
          <h1 className="text-4xl font-extrabold text-center text-gray-800">
            🔗 URL Shortener
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-6">
            Create short, clean and shareable links instantly
          </p>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* FORM */}
          <div className="space-y-4">
            <UrlForm handleShorten={handleShorten} loading={loading} error={error} />
          </div>

          {/* RESULT */}
          <div className="mt-6">
            <ResultBox
              shortUrl={shortUrl}
              handleCopy={handleCopy}
              copied={copied}
            />
          </div>

          {/* HISTORY */}
          <div className="mt-6">
            <History history={history} />
          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center text-gray-400 text-sm mt-5">
          Built using MERN Stack ⚡
        </p>

      </div>

    </div>
  );
}

export default App;