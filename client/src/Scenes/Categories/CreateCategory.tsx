import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { img } from "../../shared/types";
import { fileToDataURL } from "../../shared/constants";
import BackButton from "../../shared/BackButton";
import usePostData from "../../Hooks/usePostData";
import { HashLoader } from "react-spinners";

function CreateCategory() {
	const { register, control, getValues, reset, handleSubmit } = useForm();
	const { postData, isLoading: loading } = usePostData();
	const [images, setImages] = useState<img[]>([]);
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		let imagesArray: img[] = [];

		if (files) {
			imagesArray = await Promise.all(
				Array.from(files).map(async (file) => {
					const dataUrl: string = await fileToDataURL(file);
					return {
						url: URL.createObjectURL(file),
						data: dataUrl,
					};
				})
			);
		}
		setImages([...imagesArray]);
	};
	const getSubmitData = () => {
		const formData = getValues();
		const submitImages: string[] = images.map((img) => img.data);
		const submitData = { ...formData, image: submitImages[0] };
		//const submitData = { ...formData, };
		console.log("submitted", submitData);
		return submitData;
	};

	const createCategory = async () => {
		const data = getSubmitData();
		await postData("/categories", data);
		reset();
		setImages([]);
	};

	return (
		<div>
			<div className="my-2 ">
				<BackButton />
			</div>
			<p className="my-2 text-xs font-bold text-center">Create category</p>
			<form
				onSubmit={handleSubmit(createCategory)}
				className="w-full p-4 mx-auto text-xs bg-white rounded-md md:w-2/3">
				<div>
					<label htmlFor="" className="block my-2 font-medium capitalize ">
						Name
					</label>
					<input
						type="text"
						{...register("name")}
						className=" py-1 rounded-[4px] w-full text-xs bg-transparent border-2 border-gray-300"
					/>
				</div>
				<div>
					<label htmlFor="" className="block my-2 font-medium capitalize">
						Description
					</label>
					<textarea
						{...register("description")}
						id="description"
						rows={8}
						className=" py-1 rounded-[4px] w-full border-2 border-gray-300"></textarea>
				</div>
				<div className="w-full p-4 text-xs bg-white rounded-[4px]">
					<p className="my-2 text-xs font-bold">Picture</p>
					<div className="flex gap-2">
						{images.length !== 0 && (
							<div className="grid grid-cols-3 gap-2 ">
								{images.map((image, index) => (
									<img
										key={index}
										src={image.url}
										alt={`Uploaded Image ${index}`}
										className="cursor-pointer"
										onClick={() => {
											setImages([
												...images.filter((img) => img.url !== image.url),
											]);
										}}
										style={{
											maxWidth: "100px",
											maxHeight: "100px",
											margin: "5px",
										}}
									/>
								))}
							</div>
						)}

						<div className="flex-shrink-0 ms-2">
							<Controller
								name="image"
								control={control}
								defaultValue={null}
								render={({ field }) => (
									<input
										type="file"
										id="image"
										accept="image/*"
										onChange={(e) => {
											field.onChange(e);
											handleFileChange(e);
										}}
										style={{ display: "none" }}
									/>
								)}
							/>
							<label
								htmlFor="image"
								className="flex items-center justify-center p-6 text-2xl bg-gray-300 rounded-md text-sky-800"
								style={{ cursor: "pointer" }}>
								+
							</label>
						</div>
					</div>
				</div>
				<div className="flex justify-end w-full">
					<button
						type="submit"
						disabled={loading}
						className={`px-12  py-1 my-1 text-xs ${
							!loading ? "text-white bg-teal-900" : "bg-teal-100"
						} rounded-[4px] `}>
						{!loading ? (
							"Create"
						) : (
							<HashLoader color="#022c22" loading={loading} size={15} />
						)}
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreateCategory;
