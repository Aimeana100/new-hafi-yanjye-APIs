import { useForm } from "react-hook-form";
import usePostData from "../../Hooks/usePostData";
import { ChangeEvent, useState } from "react";
import { fileToDataURL } from "../../shared/constants";
import { HashLoader } from "react-spinners";
import { BsFileExcel } from "react-icons/bs";
import { IoRemoveCircleOutline } from "react-icons/io5";
import BackButton from "../../shared/BackButton";

interface catalog {
	data: string;
	url: string;
	name: string;
}

interface registerSupplierType {
	fullName: string;
	telphone: string;
	email: string;
	location?: string;
}

function RegisterSupplier() {
	const { isLoading } = usePostData();
	const { register, handleSubmit } = useForm<registerSupplierType>();
	const [catalog, setCatalog] = useState<catalog | null>(null);
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		let sheetsArray: catalog[] = [];
		if (files) {
			sheetsArray = await Promise.all(
				Array.from(files).map(async (file) => {
					const dataUrl: string = await fileToDataURL(file);
					return {
						url: URL.createObjectURL(file),
						data: dataUrl,
						name: file.name,
					};
				})
			);
		}

		setCatalog(sheetsArray[0]);
	};
	const registerSupplier = (data: registerSupplierType) => {
		console.log("data", data);
	};

	return (
		<div>
			<BackButton />
			<p className="w-full my-6 text-xs font-medium text-center">
				Register Supplier
			</p>
			<div className="w-4/6 mx-auto bg-white rounded-[8px] p-6">
				<form
					onSubmit={handleSubmit(registerSupplier)}
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
							{...register("telphone")}
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
							Location
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="type"
							placeholder="Location"
							{...register("location")}
						/>
					</div>
					<div>
						<p className="mb-2 text-xs">Upload catalog</p>
						<div className="flex gap-4">
							<div>
								<label
									htmlFor="catalog"
									className=" cursor-pointer rounded-[4px] px-6 py-1 text-xs  text-white capitalize bg-purple-900 ">
									Browse
								</label>
								<input
									id="catalog"
									onChange={handleFileChange}
									className="hidden w-full px-3 py-2 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
									type="file"
								/>
							</div>
						</div>
						{catalog && (
							<div className="my-2">
								<button
									type="button"
									onClick={() => setCatalog(null)}
									className="py-2 text-xs items-center rounded-[4px] px-4 bg-teal-100 flex gap-2">
									<BsFileExcel className="w-4 h-4 text-emerald-800" />
									<p className="text-xs">{catalog.name}</p>
									<IoRemoveCircleOutline className="text-pink-900" />
								</button>
							</div>
						)}
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

export default RegisterSupplier;
