import React, { useEffect, useState } from "react";
import { FiCamera, FiLock, FiLogOut, FiMail, FiUser } from "react-icons/fi";
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, updateUserProfileHandler, loading, signOutHandler } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {

        if (!user) return;

        setProfile({
            name: user.name || "",
            email: user.email || "",
            password: "",
            confirmPassword: "",
        });

        setPreview(user.image || "");

    }, [user]);

    // image handler
    const handleImageChange = (e) => {
        const file = e.target?.files[0];
        if (!file) return;

        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
    }


    // onchange handler
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // submit handler
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        //create new form data
        const formData = new FormData();

        formData.append("name", profile?.name);
        formData.append("email", profile?.email);

        if (profile.password) {
            formData.append("password", profile?.password)
        };

        if (profile.confirmPassword) {
            formData.append("confirmPassword", profile?.confirmPassword)
        };

        if (imageFile) {
            formData.append("image", imageFile);
        };

        const result = await updateUserProfileHandler(formData);

        if (result.success) {
            toast.success(result?.message)

            setProfile((prev) => ({
                ...prev,
                password: "",
                confirmPassword: "",
            }));

            setImageFile(null);

        } else {
            toast.error(result?.message)
        };
    }

    //signout handler
    const handleSignOut = async () => {
        const result = await signOutHandler();

        if (!result?.success) {
            toast.error(result?.message || "Failed to sign out");
            return;
        }

        toast.success(result?.message || "Signed out successfully");

        navigate("/sign-in");
    };

    return (
        <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm text-gray-500">
                        Account settings
                    </p>

                    <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                        Your Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage your personal information and account security.
                    </p>
                </div>

                {/* Profile Card */}
                <form
                    onSubmit={onSubmitHandler}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                >

                    {/* Profile Image */}
                    <div className="relative border-b border-white/10 p-6 sm:p-8">

                        {/* Sign Out Button - Top Left */}
                        <button
                            type="button"
                            onClick={handleSignOut}
                            className=" cursor-pointer absolute right-5 top-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white px-3 py-2 text-sm text-gray-500 transition hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                            <FiLogOut size={16} />

                            <span className="hidden sm:block">
                                Sign out
                            </span>
                        </button>


                        <div className="flex flex-col items-center gap-5 sm:flex-row">

                            <div className="relative">

                                <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 bg-white/5">

                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                                            <FiUser size={40} />
                                        </div>
                                    )}

                                </div>

                                <label
                                    htmlFor="profile-image"
                                    className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
                                >
                                    <FiCamera size={16} />
                                </label>

                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />

                            </div>

                            <div className="text-center sm:text-left">

                                <h2 className="text-lg font-semibold">
                                    Profile picture
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Choose a new profile image.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Personal Information */}
                    <div className="border-b border-white/10 p-6 sm:p-8">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold">
                                Personal Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Update your basic account information.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm text-gray-400">
                                    Name
                                </label>

                                <div className="relative">

                                    <FiUser
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        value={profile?.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-white/30"
                                    />

                                </div>
                            </div>


                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm text-gray-400">
                                    Email
                                </label>

                                <div className="relative">

                                    <FiMail
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={profile?.email}
                                        onChange={handleChange}
                                        placeholder="Your email"
                                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-white/30"
                                    />

                                </div>
                            </div>

                        </div>

                    </div>


                    {/* Password */}
                    <div className="p-6 sm:p-8">

                        <div className="mb-6">
                            <h2 className="flex items-center gap-2 text-lg font-semibold">
                                <FiLock />
                                Change Password
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Leave these fields empty if you don't want to
                                change your password.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm text-gray-400">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={profile?.password}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-white/30"
                                />
                            </div>


                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm text-gray-400">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={profile?.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm new password"
                                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-white/30"
                                />
                            </div>

                        </div>

                    </div>


                    {/* Footer */}
                    <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.02] p-6 mb-20 sm:flex-row sm:items-center sm:justify-end sm:p-10 sm:mb-0">

                        {/*save changes  */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 cursor-pointer"
                        >
                            {loading
                                ? "Saving..."
                                : "Save Changes"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Profile;