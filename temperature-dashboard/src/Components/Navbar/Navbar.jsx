import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LoginDrop from "../../Pages/authentication/Login";

const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("accessToken"));

  // Update token status on login/logout event
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      setHasToken(!!token);
    };

    window.addEventListener("tokenChanged", checkToken); // Listen for token changes
    return () => window.removeEventListener("tokenChanged", checkToken); // Cleanup
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    setHasToken(false);
    alert("Logged out!");
    window.dispatchEvent(new Event("tokenChanged")); // Trigger event for UI sync
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-100 shadow-md">
      {/* Title */}
      <div className="text-xl font-bold text-gray-800">
        <NavLink to="/">Live Temp Tracker</NavLink>
      </div>

      {/* Auth Button */}
      <div className="text-base font-medium text-cyan-600 cursor-pointer relative">
        {hasToken ? (
          <div onClick={handleSignOut} className="hover:text-cyan-400">
            Sign Out
          </div>
        ) : (
          <div
            onClick={() => setShowLoginForm(!showLoginForm)}
            className="hover:text-cyan-400"
          >
            Sign In
          </div>
        )}

        {/* Login Form */}
        {!hasToken && showLoginForm && (
          <div className="absolute top-12 right-0 bg-white border p-4 rounded-md shadow-md w-80 z-50">
            <LoginDrop
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
