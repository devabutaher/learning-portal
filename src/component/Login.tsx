import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src="../assets/image/learningportal.svg"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Your Account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {isError && <p className="text-red-500">{error.data}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="login-input rounded-t-md"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="login-input rounded-b-md"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/register"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
