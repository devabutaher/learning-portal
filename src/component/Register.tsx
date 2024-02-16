import { useState } from "react";
import { useRegisterMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isMatchPass, setIsMatchPass] = useState(null);

  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword, name, email } = formData;

    // Check if password matches
    if (password !== confirmPassword) {
      setIsMatchPass("Password is not match");
      return;
    }

    // Make the API call to register the user
    register({
      name,
      email,
      role: "student",
      password,
    });
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="../assets/image/learningportal.svg"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          {(isError || isMatchPass) && (
            <p className="text-red-500">{error?.data || isMatchPass}</p>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                value={formData.name}
                onChange={handleChange}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Student Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input "
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                value={formData.confirmPassword}
                onChange={handleChange}
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
