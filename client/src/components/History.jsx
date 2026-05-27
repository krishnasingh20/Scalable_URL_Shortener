function History({ history }) {
  if (!history.length) return null;

  return (
    <div className="mt-6">

      <h2 className="font-semibold text-gray-700 mb-2">
        Recent Links
      </h2>

      <div className="space-y-2 max-h-40 overflow-y-auto">

        {history.map((item, idx) => (
          <div key={idx} className="p-3 bg-gray-50 border rounded-lg">

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
  );
}

export default History;