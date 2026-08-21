import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Signin = () => {
  const { user, signInHandler, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // onchange handler

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInHandler(formData);

      if (result?.success) {
        toast.success(result.message);
        navigate("/");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      throw error;
    };

    // reset states
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5">
      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-white/5 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-white/5 blur-[180px]" />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <h1 className="mb-2 text-center text-4xl font-black text-white">
          Welcome Back
        </h1>

        <p className="mb-10 text-center text-gray-400">
          Reconnect with your music mood 🎵
        </p>

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Email */}

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              name="email"
              type="email"
              placeholder="john@gmail.com"
              value={formData.email}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-white cursor-pointer"
            />
          </div>

          {/* Password */}

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChangeHandler}
              className=" cursor-pointer w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-white"
            />
          </div>

          <div className="flex items-center justify-between">
            {/* <label className="flex items-center gap-2 text-sm text-gray-400">

              <input type="checkbox" />

              Remember me

            </label> */}

            <button
              type="button"
              className="text-sm text-white transition hover:text-gray-300 cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 font-semibold text-black transition hover:bg-gray-200 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <FiArrowRight />
              </>
            )}
          </motion.button>
        </form>

        {/* <div className="my-8 flex items-center gap-4">

          <div className="h-px flex-1 bg-white/10" />

          <span className="text-sm text-gray-500">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div> */}

        {/* <button className="w-full rounded-xl border border-white/10 py-4 text-white transition hover:bg-white hover:text-black">

          Continue with Google

        </button> */}

        <p className="mt-8 text-center text-gray-400">
          Don't have an account?
          <Link to={"/sign-up"}>
            <span className="ml-2 cursor-pointer font-semibold text-white hover:underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signin;
