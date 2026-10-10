import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen bg-background text-text-muted flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col  justify-center items-center">
        <span className="text-error text-4xl font-bold">404</span>{" "}
        <p className="text-lg font-medium">Error: Page not found</p>
      </div>
      <Link to="/" replace className="text-sm font-normal cursor-pointer underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
