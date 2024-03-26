import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import usePostData from "../../Hooks/usePostData";
import BackButton from "../../shared/BackButton";
import { agent } from "../../shared/types";

function RegisterAgent() {
	const { register, handleSubmit, reset } = useForm<agent>();
	const { postData, isLoading } = usePostData();
	const registerAgent = async (data: agent) => {
		data.role = "AGENT";
		await postData("/users", data);
		reset();
	};
	return (
		<div>
			<BackButton />
			<p className="w-full my-6 text-xs font-medium text-center">
				Register agent
			</p>
			<div className="w-4/6 mx-auto bg-white rounded-[8px] p-6">
				<form
					onSubmit={handleSubmit(registerAgent)}
					className="w-4/5 mx-auto mt-4">
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Full name
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="text"
							required
							placeholder="Fullname"
							{...register("fullName")}
						/>
					</div>
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Telephone
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="text"
							required
							placeholder="Telephone"
							{...register("telephone")}
						/>
					</div>
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Email
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="email"
							placeholder="Email"
							required
							{...register("email")}
						/>
					</div>

					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Address
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="type"
							placeholder="Location"
							{...register("location")}
						/>
					</div>

					<button
						type="submit"
						className={`  px-6 py-1  mt-3 text-xs font-semibold text-center rounded-[4px] ${
							!isLoading
								? " text-white bg-theme-yellow"
								: " text-yellow-700 bg-[#E4F1FE]"
						}`}>
						{!isLoading ? (
							"Create agent"
						) : (
							<HashLoader color="#0C4981" loading={isLoading} size={15} />
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterAgent;
