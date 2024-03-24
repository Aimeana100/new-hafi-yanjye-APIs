import { Link } from "react-router-dom";
import Lock from "../../assets/images/Lock.svg";
import { motion } from "framer-motion";
import AuthTitle from "./AuthTitle";
import { HashLoader } from "react-spinners";
import { useState } from "react";
import instance from "../../API";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface resetPasswordType {
	email: string;
}
const ResetPassword = () => {
	const { register, handleSubmit } = useForm<resetPasswordType>();
	const [loading, setLoading] = useState<boolean>(false);
	const resetPassword = async (data: resetPasswordType) => {
		setLoading(true);
		await instance
			.post("/auth/reset-password", data)
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.response.data.message[0]);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<motion.div
			className="basis-5/6"
			initial={{ opacity: 0, x: -50 }}
			transition={{ duration: 0.5 }}
			animate={{ opacity: 1, x: 0 }}>
			<AuthTitle />
			<div className="flex justify-center">
				<img src={Lock} alt="computer login" className="block w-40 h-40" />
			</div>

			<form onSubmit={handleSubmit(resetPassword)} className="w-4/5 mx-auto ">
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					{...register("email")}
					placeholder="Email"
				/>

				<button
					disabled={loading}
					className={`  w-full py-2 mt-3 text-sm font-semibold text-center rounded-md ${
						!loading
							? " text-white bg-theme-yellow"
							: " text-yellow-700 bg-[#E4F1FE]"
					}`}>
					{!loading ? (
						"Reset Password"
					) : (
						<HashLoader color="#0C4981" loading={loading} size={15} />
					)}
				</button>
				<p className="mt-3 text-sm font-medium text-primary-violet">
					<Link to="/">Login</Link>
				</p>
			</form>
		</motion.div>
	);
};

export default ResetPassword;
