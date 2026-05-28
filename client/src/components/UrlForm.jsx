import { useState } from "react";

function UrlForm({ handleShorten, loading, error }) {
  const [formData, setFormData] = useState({
    originalUrl: "",
    customAlias: "",
    expiresAt: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    handleShorten(formData);
  };

  return (
    <div className="space-y-4">

      {/* LONG URL */}
      <input
        type="text"
        name="originalUrl"
        placeholder="Enter long URL (https://example.com)"
        value={formData.originalUrl}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      {/* CUSTOM ALIAS */}
      <input
        type="text"
        name="customAlias"
        placeholder="Custom alias (optional)"
        value={formData.customAlias}
        onChange={handleChange}
        className="w-full border border-gray-200 p-3 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
      />

      {/* EXPIRY */}
      <input
        type="datetime-local"
        name="expiresAt"
        value={formData.expiresAt}
        onChange={handleChange}
        className="w-full border border-gray-200 p-3 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
      />

      {/* BUTTON */}
      <button
        onClick={onSubmit}
        disabled={loading || !formData.originalUrl}
        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
          loading || !formData.originalUrl
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:from-blue-600 hover:to-indigo-600"
        }`}
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

    </div>
  );
}

export default UrlForm;