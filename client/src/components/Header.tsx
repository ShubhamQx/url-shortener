import { Link, useRevalidator } from "react-router";
import type { User } from "@/types/user";
import { logoutUser } from "@/api/auth";

interface HeaderProps {
  user: User | null;
}
const Header = ({ user }: HeaderProps) => {
  const revalidator = useRevalidator();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log("Logout failed", err);
    } finally {
      revalidator.revalidate();
    }
  };

  return (
    <header className="w-full bg-foreground">
      <div className="max-w-360 mx-auto py-4 px-6 flex justify-between items-center">
        <span className="font-extrabold text-2xl text-text-primary">
          Shawty
        </span>
        <div>
          {user ? (
            <div className="flex gap-4 items-center">
              <p className="text-base font-medium text-text-muted">
                {user.fullName}
              </p>
              <button
                className="text-base leading-none font-medium border border-border text-text-primary py-2 px-4 rounded-md cursor-pointer transition-colors hover:bg-bg-light"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="text-base leading-none font-medium border border-border text-text-primary py-2 px-4 rounded-md cursor-pointer transition-colors hover:bg-bg-light">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
