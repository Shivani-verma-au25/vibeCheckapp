import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { loading, signUpHandler } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  // image handler
  const imageHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // onchange handler
  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // create new instance of Formdata because we can't send file in normal objects 
      const newFormData = new FormData();
      // append all data into newFormdata
      newFormData.append("name", formData.name);
      newFormData.append("email", formData.email);
      newFormData.append("password", formData.password);
      newFormData.append("image", formData.image);
      // calling handler (api)
      const result = await signUpHandler(newFormData);

      if (result?.success) {
        // show toast ineasted of logg
        console.log("result", result?.message);
        navigate("/sign-in");
      } else {
        console.log("error", result?.message);
      }
    } catch (error) {
      console.log("error insign up", error);
    }
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
          Vibe Check
        </h1>

        <p className="mb-10 text-center text-gray-400">
          join the future of empathetic music discovery .Sync your soul with the
          rhythm.🎵
        </p>

        <form className="space-y-6" onSubmit={onSubmitHandler}>
          {/* Username */}

          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onchangeHandler}
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-white cusros-pointer"
            />
          </div>

          {/* Email */}

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onchangeHandler}
              placeholder="john@gmail.com"
              className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-white cusros-pointer"
            />
          </div>

          {/* Password */}

          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onchangeHandler}
              placeholder="Password"
              className=" cusros-pointer w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-white"
            />
          </div>

          {/* Profile Image */}

          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Profile Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={imageHandler}
              className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/40 text-sm text-gray-300 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:font-medium file:text-black hover:file:bg-gray-200 focus:border-white focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            {/* <label className="flex items-center gap-2 text-sm text-gray-400">
  
                <input type="checkbox" />
  
                Remember me
  
              </label> */}

            <button
              type="button"
              className="text-sm text-white transition hover:text-gray-300 cusros-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-4 font-semibold text-black transition hover:bg-gray-200 cusros-pointer"
          >
            Sign In
            <FiArrowRight />
          </motion.button>
        </form>

      

        <p className="mt-8 text-center text-gray-400">
          Already have an account?
          <Link to={"/sign-in"}>
            <span className="ml-2 cursor-pointer font-semibold text-white hover:underline cusros-pointer">
              Sign In
            </span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
