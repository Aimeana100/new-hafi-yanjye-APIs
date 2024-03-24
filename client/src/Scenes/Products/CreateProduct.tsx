import { useForm, Controller } from "react-hook-form";
import BackButton from "../../shared/BackButton";
import useFetchData from "../../Hooks/useFetchData";
import { ChangeEvent, useState } from "react";
import { GoCheck } from "react-icons/go";
import { fileToDataURL } from "../../shared/constants";
import { useNavigate } from "react-router-dom";
import { MdOutlineCloudUpload } from "react-icons/md";
import { category, img } from "../../shared/types";
import usePostData from "../../Hooks/usePostData";
import { HashLoader } from "react-spinners";

function CreateProduct() {
	const { postData, isLoading: loading } = usePostData();
	const { data: categories } = useFetchData("/categories");
	const { register, control, getValues, reset, handleSubmit } = useForm();
	const [images, setImages] = useState<img[]>([]);
	const navigate = useNavigate();
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
		setImages((prevImages) => [...prevImages, ...imagesArray]);
	};

	const getSubmitData = () => {
		const formData = getValues();
		const submitImages = images.map((img, i) => ({
			name: `image${i}`,
			link: img.data,
		}));
		delete formData.image;
		delete formData.size;
		delete formData.videoLink;
		delete formData.datasheetLink;
		delete formData.color;
		const submitData = {
			...formData,

			images: submitImages,
			categoryId: Number(formData.categoryId),
			price: Number(formData.price),
			cost: Number(formData.cost),
			quatity: Number(formData.quatity),
		};
		return submitData;
	};

	const createProduct = async () => {
		const data = getSubmitData();
		console.log("create-product", data);

		await postData("/products", data);
		reset();
		setImages([]);
	};

	return (
		<div>
			<div className="flex justify-between w-full my-2 ">
				<BackButton />
				<button
					onClick={() => {
						navigate("/admin/products/bulk-create");
					}}
					className="flex items-center h-full gap-3 px-4 py-1 my-1 text-xs text-white rounded-sm bg-theme-yellow">
					Bulk Upload <MdOutlineCloudUpload />
				</button>
			</div>
			<form onSubmit={handleSubmit(createProduct)}>
				<div className="flex w-full gap-3">
					<div className="basis-1/2">
						<div className="w-full p-4 text-xs bg-white rounded-[4px]">
							<p className="font-bold">Basic Information</p>
							<div>
								<label
									htmlFor=""
									className="block my-2 font-medium capitalize ">
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
						</div>
						<div className="w-full p-4 my-2 text-xs bg-white rounded-[4px]">
							<p className="font-bold">Price and Quantity</p>
							<div>
								<label htmlFor="" className="block my-2 font-medium">
									Price
								</label>
								<input
									type="number"
									className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
									{...register("price")}
								/>
							</div>
							<div>
								<label htmlFor="" className="block my-2 font-medium">
									Cost
								</label>
								<input
									type="number"
									className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
									{...register("cost")}
								/>
							</div>
							<div>
								<label htmlFor="" className="block my-2 font-medium">
									Entry Quantity
								</label>
								<input
									type="number"
									className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
									{...register("quatity")}
								/>
							</div>
						</div>
					</div>
					<div className="h-full basis-1/2">
						<div className="w-full p-4 text-xs bg-white rounded-[4px]">
							<p className="my-2 font-bold">Product Images</p>
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
												multiple
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
						<div className="w-full p-4 my-2 text-xs bg-white rounded-[4px]">
							<p className="font-bold">Product category</p>
							<div className="flex items-center flex-1 gap-2">
								<label
									htmlFor="description"
									className="block my-2 text-xs font-medium text-gray-700 ">
									Category
								</label>
								<select
									className="w-full py-1 text-xs border border-gray-300 rounded-[4px]"
									{...register("categoryId", { required: false })}>
									<option value="" className="text-xs">
										Select category
									</option>
									{categories &&
										categories.map((cat: category) => (
											<option
												className="capitalize"
												key={cat.id}
												value={cat.id}>
												{cat.name}
											</option>
										))}
								</select>
							</div>
						</div>
						<div className="w-full p-4 my-2 text-xs bg-white rounded-[4px]">
							<p className="font-bold">Size and Color</p>
							<div>
								<label htmlFor="" className="block my-1 font-medium">
									Size
								</label>
								<input
									type="text"
									className="w-full py-1 border-2 border-gray-300 rounded-[4px] "
									{...register("size")}
								/>
							</div>
							<div>
								<label htmlFor="" className="block my-1 font-medium">
									Color
								</label>
								<select
									className="w-full py-1 text-xs border border-gray-300 rounded-[4px]"
									{...register("color", { required: false })}>
									<option value="" className="text-xs">
										Select color
									</option>
								</select>
							</div>
						</div>
						<div className="flex w-full gap-4 p-4 my-2 text-xs bg-white rounded-[4px]">
							<div className="flex-1">
								<label htmlFor="" className="block my-2 font-medium">
									Datasheet Link
								</label>
								<input
									type="text"
									className="w-full py-1 border-2 border-gray-300 rounded-[4px] "
									{...register("datasheet_link")}
								/>
							</div>
							<div className="flex-1">
								<label htmlFor="" className="block my-2 font-medium">
									Video Link
								</label>
								<input
									type="text"
									className="w-full py-1 border-2 border-gray-300 rounded-[4px] "
									{...register("video_link")}
								/>
							</div>
						</div>
						<div className="flex justify-end w-full">
							<button
								type="submit"
								disabled={loading}
								className={`px-4  py-1 my-1 text-xs ${
									!loading ? "text-white bg-teal-900" : "bg-teal-100"
								} rounded-[4px] `}>
								{!loading ? (
									<p className="flex items-center gap-3">
										Submit <GoCheck />
									</p>
								) : (
									<HashLoader color="#022c22" loading={loading} size={15} />
								)}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default CreateProduct;
