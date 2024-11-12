import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="text-6xl font-semibold italic">Not Found</h2>
        <p className="text-wrap text-center md:w-1/2">
          Something seems to have gone wrong, refresh your browser or return
          home if issue persists.
        </p>
        <Link
          href="/"
          className="text-2xl transition-all duration-300 ease-in-out hover:italic"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
