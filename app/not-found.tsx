import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-4 text-center">
      <h1 className="text-9xl font-serif text-amber-900 opacity-20">404</h1>
      <div className="absolute">
        <h2 className="text-4xl font-bold text-amber-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
