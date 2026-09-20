import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-foreground py-8 px-6 rounded-xl border border-border">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
