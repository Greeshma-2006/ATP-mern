import { useRouteError } from "react-router-dom";

//error boundary component for route errors
function ErrorBoundary() {
  const error = useRouteError();

  console.error("Route Error:", error);

  return (
    <div className="text-center p-10">

      <img
        className="block mx-auto rounded-2xl w-80 mb-6"
        src="https://media.tenor.com/WqGTNFmFqjkAAAAM/saquontroll-saquonjudge26.gif"
        alt="error"
      />

      <h2 className="text-3xl font-bold text-red-500 mb-3">
        Something went wrong ⚠️
      </h2>

      <p className="text-lg text-gray-700">
        {error?.data || error?.message || "Unexpected error occurred"}
      </p>

      <p className="text-4xl text-red-400 mt-4">
        {error?.status} {error?.statusText}
      </p>

    </div>
  );
}

export default ErrorBoundary;