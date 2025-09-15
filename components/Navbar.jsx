import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // <-- Import useNavigate

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // --- 1. Imports and Logout Logic ---
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to homepage
    window.location.reload(); // Refresh to update navbar state
  };
  // ------------------------------------

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "Pricing", path: "/#pricing" },
  ];
  
  // Show Admin link only if logged in
  if (token) {
    navLinks.push({ name: "Dashboard", path: "/admin" });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-lg"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-2xl font-black text-gray-900 tracking-tight"
          >
            {/* ... your brand SVG and text (unchanged) ... */}
             <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <svg
                className="relative h-9 w-9 text-blue-600 group-hover:text-blue-700 transition-colors duration-200"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 6l10 5v6l-10 5-10-5v-6l10-5z" />
              </svg>
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-200">
              Xeno CRM
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`group relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 ${
                  isActive(link.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 group-hover:w-8 -translate-x-1/2 ${
                    isActive(link.path) ? "w-8" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* --- 2. Conditional Auth Buttons (Desktop) --- */}
          <div className="flex items-center gap-3">
            {token ? (
              // If logged in, show Logout button
              <button
                onClick={handleLogout}
                className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-all duration-200 rounded-lg hover:bg-red-50"
              >
                Logout
              </button>
            ) : (
              // If logged out, show Login and Register buttons
              <>
                <Link
                  to="/login"
                  className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 group-hover:from-blue-700 group-hover:to-purple-700"></div>
                  <span className="relative z-10">Register</span>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" } />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 text-base font-medium rounded-lg ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* --- 3. Conditional Auth Buttons (Mobile) --- */}
            <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
              {token ? (
                // If logged in
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left block px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              ) : (
                // If logged out
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;