import { useDispatch, useSelector } from "react-redux";
import { getSelectedProduct } from "../../store";
import { useForm } from "react-hook-form";
import useFetchData from "../../Hooks/useFetchData";
import { IoClose } from "react-icons/io5";
import { selectProduct } from "../../Redux/productsSlice";
import instance from "../../API";
import { motion } from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";
import { category, product } from "../../shared/types";
import toast from "react-hot-toast";
function EditProduct() {
	const { register } = useForm();
	const { data: categories } = useFetchData("/categories");
	const dispatch = useDispatch();
	const selectedProduct = useSelector(getSelectedProduct);
	const [product, setProduct] = useState<product | null>(selectedProduct);
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (product) {
			setProduct({ ...product, [name]: value });
		}
	};
	const deleteProduct = async () => {
		if (product) {
			await instance
				.delete(`/products/${product.id}`)
				.then(() => {
					toast.success("success !!!");
				})
				.catch((err) => {
					toast.error(err.code);
					console.log("err", err);
				});
		} else {
			toast.error("No product is selected !!");
		}
	};
	useEffect(() => {
		setProduct(selectedProduct);
	}, [selectedProduct]);

	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.2 }}
			className="w-full p-2 basis-1/3">
			{selectedProduct && (
				<>
					<p className=" flex items-center justify-between mb-1 p-2 w-full rounded-[4px] font-bold text-xs bg-theme-yellow text-white ">
						Edit Product
						<IoClose
							className="font-bold cursor-pointer text-md"
							onClick={() => {
								dispatch(selectProduct(null));
							}}
						/>
					</p>
					<div className="w-full p-4 text-xs bg-white rounded-[4px]">
						{selectedProduct && selectedProduct.name}
						<div>
							<label htmlFor="" className="block my-2 font-medium capitalize ">
								Name
							</label>
							<input
								type="text"
								name="name"
								onChange={handleChange}
								value={product?.name}
								className=" py-1 rounded-[4px] w-full text-xs bg-transparent border-2 border-gray-300"
							/>
						</div>
					</div>
					<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
						<div>
							<label htmlFor="" className="block my-2 font-medium capitalize">
								Description
							</label>
							<textarea
								onChange={handleChange}
								name="description"
								value={product?.description}
								id="description"
								rows={4}
								className=" py-1 rounded-[4px] w-full border-2 border-gray-300"></textarea>
						</div>
					</div>
					<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
						<div>
							<label htmlFor="" className="block my-2 font-medium">
								Price
							</label>
							<input
								type="number"
								name="price"
								value={product?.price}
								className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
							/>
						</div>
						<div>
							<label htmlFor="" className="block my-2 font-medium">
								Cost
							</label>
							<input
								type="number"
								name="cost"
								value={product?.cost}
								className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
							/>
						</div>
					</div>
					<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
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
										selected={cat.name === selectedProduct?.category.name}
										key={cat.id}
										value={cat.id}>
										{cat.name}
									</option>
								))}
						</select>
					</div>
					<div className="my-1 w-full p-4 text-xs bg-white rounded-[4px]">
						<label htmlFor="" className="block my-2 font-medium">
							Entry Quantity
						</label>
						<input
							type="number"
							value={product?.quatity}
							className=" py-1 rounded-[4px] w-full border-2 border-gray-300 "
							name="quatity"
						/>
					</div>
					<div className="w-5/6 mx-auto">
						<button className=" my-1 py-2 rounded-[4px] w-full text-center bg-teal-900 text-xs text-white font-bold ">
							Save changes
						</button>
						<button
							onClick={deleteProduct}
							className=" my-1 py-2 rounded-[4px] w-full text-center text-xs bg-pink-900 text-white font-bold ">
							Delete{" "}
						</button>
					</div>
				</>
			)}
		</motion.div>
	);
}

export default EditProduct;
