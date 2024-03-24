import { useParams } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { IoCalendar } from "react-icons/io5";
import { category, product } from "../../shared/types";
import BackButton from "../../shared/BackButton";

function CouponDetails() {
	const { id } = useParams();
	const { data: coupon } = useFetchData(`/coupons/${id}`);

	const { register, handleSubmit, control } = useForm();
	const updateCoupon = () => {
		console.log("update-coupon");
	};

	return (
		<div className="w-full">
			<BackButton />
			<p className="w-full my-3 text-xs font-bold text-center">
				Coupon details
			</p>
			{coupon && (
				<form onSubmit={handleSubmit(updateCoupon)} className="p-4 bg-white ">
					<div className="w-2/3 mx-auto ">
						<div className="w-1/2">
							<label
								htmlFor=""
								className="block my-2 text-xs font-medium capitalize ">
								CODE
							</label>
							<div className="flex gap-4">
								<input
									type="text"
									defaultValue={coupon.code}
									className="block py-1 rounded-[6px] w-full text-xs bg-transparent border-[1px] border-black"
								/>
								{/* {<button
								type="button"
								onClick={() => {
									const newCode = randomStringGenerator();
									setCode(newCode);
								}}
								className="px-6 py-1 text-sm font-bold text-white rounded-[12px] bg-theme-yellow">
								Generate
							</button>} */}
							</div>
						</div>
						<div className="flex w-full ">
							<div className="w-1/2">
								<label
									htmlFor=""
									className="block my-2 text-xs font-medium capitalize ">
									Starts
								</label>
								<Controller
									name="startAt"
									control={control}
									defaultValue={new Date(coupon.startAt)}
									render={({ field }) => (
										<DatePicker
											placeholderText="select received date"
											onChange={(date: Date) => field.onChange(date)}
											selected={field.value}
											showIcon
											className="w-full border-[1.5px] text-xs border-gray-800 rounded-[4px]"
											icon={<IoCalendar className="w-3 h-3 " />}
										/>
									)}
								/>
							</div>
							<div className="w-1/2">
								<label
									htmlFor=""
									className="block my-2 text-xs font-medium capitalize ">
									Ends
								</label>
								<Controller
									name="endAt"
									control={control}
									defaultValue={new Date(coupon.endAt)}
									render={({ field }) => (
										<DatePicker
											placeholderText="select received date"
											onChange={(date: Date) => field.onChange(date)}
											selected={field.value}
											showIcon
											className="w-full border-[1.5px] text-xs border-gray-800 rounded-[4px]"
											icon={<IoCalendar className="w-3 h-3 " />}
										/>
									)}
								/>
							</div>
						</div>
						<div className="w-1/2">
							<label
								htmlFor=""
								className="block my-2 text-xs font-medium capitalize ">
								Percentage
							</label>
							<div className="flex items-center gap-3">
								<input
									type="number"
									step="any"
									defaultValue={coupon.rate}
									{...register("rate")}
									className=" block py-1 rounded-[6px] w-11/12 text-xs bg-transparent border-[1px] border-black"
								/>
								<p className="font-bold">%</p>
							</div>
						</div>
						<div className="flex w-full gap-3 ">
							<div className="w-1/2">
								<label
									htmlFor=""
									className="block my-2 text-xs font-medium capitalize ">
									Minimum number of items on order
								</label>

								<input
									type="number"
									defaultValue={coupon.minItem}
									{...register("minItems")}
									className=" block py-1 rounded-[6px] border-[1px] border-black w-full text-xs bg-transparent "
								/>
							</div>
							<div className="w-1/2">
								<label
									htmlFor=""
									className="block my-2 text-xs font-medium capitalize ">
									Minimum total cost of order
								</label>
								<div className="flex items-center gap-3">
									<input
										type="number"
										defaultValue={coupon.minCost}
										{...register("minCost")}
										className=" block py-1 rounded-[6px] w-full text-xs bg-transparent border-[1px] border-black"
									/>
								</div>
							</div>
						</div>

						<p className="my-3 text-xs font-bold">Applied to</p>
						<p className="text-sm font-bold text-blue-900">
							{coupon.type === "ALL_PRODUCTS" && "All products"}
						</p>
						{coupon.products && coupon.products.length !== 0 && (
							<div>
								<p className="mt-2 text-sm font-bold text-blue-900">
									Selected products
								</p>
								<div className="grid grid-cols-4 gap-3 mt-4">
									{coupon.products.map((el: product) => (
										<p className="px-3 text-black bg-slate-400 ">{el.name}</p>
									))}
								</div>
							</div>
						)}

						{coupon.categories && coupon.categories.length !== 0 && (
							<div>
								<p className="mt-2 text-sm font-bold text-blue-900">
									Selected categories
								</p>
								<div className="grid grid-cols-4 gap-3 mt-4">
									{coupon.categories.map((el: category) => (
										<p className="px-3 text-black bg-slate-400 ">{el.name}</p>
									))}
								</div>
							</div>
						)}
						{/* {<div className="grid grid-cols-3 gap-6">
						{types &&
							types.map((ty: string) => (
								<div
									onClick={() => setSelectedType(ty)}
									className={`${
										selectedType === ty && " border-[2px] border-theme-yellow "
									}  rounded-[6px] cursor-pointer p-4  h-24 my-3 text-xs font-bold capitalize bg-slate-50`}>
									<div className="flex justify-end">
										{selectedType === ty && (
											<FaCircleCheck className="text-theme-yellow" />
										)}
									</div>
									<div className="flex items-center justify-center">{ty}</div>
								</div>
							))}
					</div>

					<div className="flex w-full gap-3">
						<div className="w-full">
							{selectedType === "categories" && (
								<div className="grid grid-cols-3 gap-3 my-2">
									{categories && (
										<div className="w-full">
											<label
												htmlFor="description"
												className="block my-2 text-xs font-medium text-gray-700 ">
												Select categories
											</label>
											<select
												onChange={onSelectItem}
												className="w-full py-1 text-xs border border-gray-300 rounded-[4px]">
												<option value="" className="text-xs">
													Select ...
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
									)}
								</div>
							)}

							{selectedType === "products" && (
								<div className="grid grid-cols-2 gap-4 ">
									<div className="w-full">
										<label
											htmlFor="description"
											className="block my-2 text-xs font-medium text-gray-700 ">
											Select products
										</label>
										<select
											onChange={onSelectItem}
											className="w-full py-1 text-xs border border-gray-300 rounded-[4px]">
											<option value="" className="text-xs">
												Select products
											</option>
											{products &&
												products.map((prod: product) => (
													<option
														className="capitalize"
														key={prod.id}
														value={prod.id}>
														{prod.name}
													</option>
												))}
										</select>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="grid w-full grid-cols-3 gap-3">
						{selectedType === "products"
							? selectedProducts.length !== 0 &&
							  selectedProducts.map((prod: product) => (
									<div
										className="flex items-center  rounded-[6px] justify-between p-2 my-1 text-xs font-medium bg-[#f0f0f0]"
										key={prod.id}>
										<p className="px-3 ">{prod.name}</p>
										<p
											className="py-0 font-bold text-pink-900 cursor-pointer"
											onClick={() => {
												setSelectedProducts(
													selectedProducts.filter((el) => el.id !== prod.id)
												);
											}}>
											remove
										</p>
									</div>
							  ))
							: selectedType === "categories"
							? selectedCategories.length !== 0 &&
							  selectedCategories.map((cat: category) => (
									<div
										className="flex items-center  rounded-[6px] justify-between p-2 my-1 text-xs font-medium bg-[#f0f0f0]"
										key={cat.id}>
										<p className="px-3 ">{cat.name}</p>
										<p
											className="py-0 font-bold text-pink-900 cursor-pointer"
											onClick={() => {
												setSelectedCategories(
													selectedCategories.filter((el) => el.id !== cat.id)
												);
											}}>
											remove
										</p>
									</div>
							  ))
							: null}
					</div>

					<button
						type="submit"
						className={`  px-6 py-1  mt-3 text-xs font-semibold text-center rounded-[4px] ${
							!loading
								? " text-white bg-teal-900"
								: " text-teal-900 bg-[#E4F1FE]"
						}`}>
						{!loading ? (
							"Create "
						) : (
							<HashLoader color="#0C4981" loading={loading} size={15} />
						)}
					</button>} */}
					</div>
				</form>
			)}
		</div>
	);
}

export default CouponDetails;
