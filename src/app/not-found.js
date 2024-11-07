import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-lg text-center">
        {/* 404 Title */}
        <h1 className="text-8xl font-extrabold text-orange-600 dark:text-orange-400">
          404
        </h1>
        
        {/* Error message */}
        <p className="mt-4 text-xl font-medium text-gray-800 dark:text-gray-200">
          Sorry, the page you’re looking for doesn’t exist.
        </p>

        {/* Additional explanation */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          It seems like you've followed a broken link or typed the URL incorrectly.
        </p>
        
        {/* Button to go back home */}
        <div className="mt-8">
          <Link href="/" passHref>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-md shadow-md hover:bg-blue-700 transition-all duration-200">
              Go Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
