import { Outlet, Link } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full max-w-360 mx-auto min-h-screen bg-background flex items-center justify-center p-4 relative">
      <span className="absolute right-16 top-12">
        <Link to="/">❌</Link>
      </span>
      <div className="w-full max-w-sm mx-auto bg-foreground py-8 px-6 rounded-xl border border-border">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
