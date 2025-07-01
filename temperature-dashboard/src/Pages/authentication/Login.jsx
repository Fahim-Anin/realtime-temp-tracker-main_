import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../Components/AxiosInstance';
import { MdOutlineClose } from "react-icons/md";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Registration from './Registration';

const LoginDrop = ({ setShowLoginForm, showLoginForm }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const form = new FormData();
    form.append("username", formData.username);
    form.append("password", formData.password);

    try {
      setLoading(true);
      const response = await AxiosInstance.post('/token/', form);

      if (response.data.access) {
        localStorage.setItem("accessToken", response.data.access);
        setFormData({ username: "", password: "" });
        setShowLoginForm(false);
        alert("Login Successful!");
        window.dispatchEvent(new Event("tokenChanged")); 
        navigate("/room");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm mx-auto">
      {/* Close Button */}
      <div className="flex justify-end">
        <div
          className="text-red-500 text-xl font-bold hover:text-black cursor-pointer"
          onClick={() => {
            if (showRegistration) {
              setShowRegistration(false);
            } else {
              setShowLoginForm(false);
            }
          }}
        >
          <MdOutlineClose />
        </div>
      </div>

      {showRegistration ? (
        <Registration
          setShowLoginForm={setShowLoginForm}
          setShowRegistration={setShowRegistration}
        />
      ) : (
        <>
          <form onSubmit={handleSubmit} className="pt-2">
            <h2 className="text-center font-semibold text-lg mb-4">Sign In</h2>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <div className="mb-4">
              <label htmlFor="username" className="block font-semibold mb-2 text-sm">
                Username:
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-1 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold mb-2 text-sm">
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-1 border rounded"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-teal-600 to-blue-700 text-white text-sm font-semibold py-2 w-full rounded"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm font-semibold p-4 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => {
                setShowRegistration(true);
              }}
              className="text-blue-700 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginDrop;
