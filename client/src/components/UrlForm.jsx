function UrlForm({ url, setUrl, handleShorten, loading, error }) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleShorten()}
          className="flex-1 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleShorten}
          disabled={!url || loading}
          className={`px-6 py-3 rounded-lg ${
            url && !loading
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </>
  );
}

export default UrlForm;