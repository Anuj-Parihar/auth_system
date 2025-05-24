
import Link from "next/link";
export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-indigo-700">Profile Details</h1>
          <p className="text-gray-500">User information</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div className="bg-indigo-50 px-4 py-2 rounded-lg">
            <p className="text-lg font-medium text-indigo-700">
              User ID:{" "}
              <span className="font-bold bg-indigo-100 px-2 py-1 rounded">
                {params.id}
              </span>
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/profile"
            className="text-indigo-600 hover:underline font-medium"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}