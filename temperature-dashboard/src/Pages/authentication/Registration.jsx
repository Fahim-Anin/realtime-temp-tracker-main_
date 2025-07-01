import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../Components/AxiosInstance";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

const Registration = ({ setShowLoginForm, setShowRegistration}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });


  console.log("Registration Form")

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("confirm_password", formData.confirm_password);

    try {
      const response = await AxiosInstance.post("/register/", form);
      alert("Registration Successful");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });
      setShowRegistration(false);

    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response?.data) {
        setErrorMessage(
          error.response.data.detail || "Registration failed. Please try again."
        );
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-4 bg-teal-50 rounded-md shadow-md">
      {/* Cross button (Top right) */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Sign Up</h2>
        <div className="flex gap-4">
         <button
             onClick={() => {
                setShowRegistration(false);
                setShowLoginForm(true);
              }}
            title="Back to Login"
            className="text-blue-500 hover:text-black text-sm underline"
            >
            Login
         </button>

          {/* <div
            onClick={() => setShowRegistration(false)}
            className="text-red-500 hover:text-black text-xl cursor-pointer"
            title="Close"
          >
            <MdOutlineClose />
          </div> */}
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-1 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-1 border rounded"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block font-semibold text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
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

        <div className="mb-4 relative">
          <label className="block font-semibold text-sm mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword2 ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              autoComplete="current-password"
              onChange={handleChange}
              className="w-full px-4 py-1 border rounded"
              required
            />
            <span
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-teal-600 to-blue-700 text-white text-sm font-semibold py-2 w-full rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
