import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { motion } from "framer-motion";
import AuthTitle from "./AuthTitle";
import instance from "../../API";
import toast from "react-hot-toast";

interface signupType {
	fullName: string;
	email: string;
	telephone: string;
	password: string;
	confirmPassword: string;
}

const Signup = () => {
	const { register, handleSubmit, watch, reset } = useForm<signupType>();
	const password = watch("password") || "";
	const confirmPassword = watch("confirmPassword") || "";
	const [loading, setLoading] = useState<boolean>(false);

	const signup = async (data: signupType) => {
		setLoading(true);
		await instance
			.post("/auth/register", { ...data })
			.then(() => {
				toast.success("User signup success");
			})
			.catch((err) => {
				console.log(err);
				if (err.response.data.statusCode !== 500) {
					toast.error(err.response.data.message);
				} else {
					toast.error("Internal Server Error");
				}
			})
			.finally(() => {
				setLoading(false);
				reset();
			});
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className="basis-5/6">
			<AuthTitle />

			<form onSubmit={handleSubmit(signup)} className="w-4/5 mx-auto mt-8">
				<p className="w-full text-sm font-medium text-center">Create Account</p>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Fullname"
					{...register("fullName")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Telephone"
					{...register("telephone")}
				/>

				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="email"
					placeholder="Email"
					{...register("email")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Password"
					{...register("password")}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="password"
					placeholder="Confirm Password"
					{...register("confirmPassword")}
				/>

				<button
					type="submit"
					disabled={loading || confirmPassword !== password}
					className={`  w-full py-2 mt-3 text-sm font-semibold text-center rounded-md ${
						!loading
							? " text-white bg-theme-yellow"
							: " text-yellow-700 bg-[#E4F1FE]"
					}`}>
					{!loading ? (
						"Signup"
					) : (
						<HashLoader color="#0C4981" loading={loading} size={15} />
					)}
				</button>
				<Link
					to="/"
					className="block my-2 mt-4 text-xs font-bold text-primary-violet">
					Login
				</Link>
			</form>

			{password != confirmPassword && (
				<p className="w-full text-xs text-center text-pink-900">
					Passwords don't match
				</p>
			)}
		</motion.div>
	);
};

export default Signup;

// <select
// 	{...register("role")}
// 	className="w-full px-3 py-1 my-3 text-xs font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900">
// 	<option value="" className="text-xs">
// 		Select role
// 	</option>
// 	<option value="ADMIN">ADMIN</option>
// 	<option value="AGENT">AGENT</option>
// 	<option value="AGENT">DRIVER</option>
// 	<option value="CUSTOMER">CUSTOMER</option>
// </select>;
