export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <h1 className="text-4xl font-bold text-center">URL Shortner</h1>
      <input
        type="text"
        className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your url"
      />
      <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Shorten URL
      </button>
      <div>
        <h2 className="text-2xl font-bold text-center">Shortened URL</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-500 rounded-lg">
          <span className="text-lg font-mono">https://short.url/abc123</span>
          <span className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg">
            Shortned
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
