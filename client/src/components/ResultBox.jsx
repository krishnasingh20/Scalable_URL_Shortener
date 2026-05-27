function ResultBox({ shortUrl, handleCopy, copied }) {
  if (!shortUrl) return null;

  return (
    <div className="mt-6 p-4 bg-green-50 border rounded-lg">

      <p className="text-sm text-gray-600">Your Short URL:</p>

      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline break-all"
      >
        {shortUrl}
      </a>

      <button
        onClick={handleCopy}
        className="mt-3 ml-3 bg-blue-100 px-3 py-1 rounded"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

    </div>
  );
}

export default ResultBox;