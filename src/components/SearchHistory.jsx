function SearchHistory({ history, onHistoryItemClick }) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Searches</h3>
        <div className="flex flex-wrap gap-2">
          {history.map((city, index) => (
            <button
              key={index}
              onClick={() => onHistoryItemClick(city)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-sm transition-colors duration-300"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default SearchHistory;