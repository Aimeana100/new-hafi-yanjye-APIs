import { HiMagnifyingGlass } from "react-icons/hi2";
import CreateButton from "../../shared/CreateButton";
import { useForm } from "react-hook-form";
import useFetchData from "../../Hooks/useFetchData";
import { useEffect, useMemo, useState } from "react";
import { HashLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../Redux/productsSlice";
import { getSelectedProduct } from "../../store";
import EditProduct from "./EditProduct";
import { category, product } from "../../shared/types";

interface itemprops {
	el: product;
}

const Item = ({ el }: itemprops) => {
	const dispatch = useDispatch();
	const selectedProduct = useSelector(getSelectedProduct);
	return (
		<div
			key={el.id}
			onClick={() => {
				dispatch(selectProduct(el));
			}}
			className={` ${
				selectedProduct && selectedProduct.id === el.id
					? " border-2 border-theme-yellow "
					: " "
			} hover:cursor-pointer transition duration-150 ease-out my-2 text-xs p-4 flex md:flex-row  gap-2 flex-col items-center md:items-stretch  md:justify-between bg-white w-full rounded-[8px]`}>
			<div className="flex flex-1 gap-2 md:block ">
				{/* <img
					src={el?.images && el.images.length !== 0 && el.images[0].link}
					className="block object-contain "
				/> */}
			</div>
			<div className="flex flex-1 gap-2 md:block ">
				<p className="font-medium ">Product Name</p>
				<p className="capitalize">{el.name}</p>
			</div>
			<div className="flex-1">
				<p className="font-medium text-center md:text-start">Category</p>
				<p className="capitalize">{el.category.name}</p>
			</div>
			<div className="flex-1">
				<p className="font-medium text-center md:text-start">Price</p>
				<p>{el.price} </p>
				<p>{el.price}</p>
			</div>
			<div className="flex-1">
				<p className="flex gap-3 font-medium text-center md:text-start">
					Inventory
				</p>
				<p>{el.quatity}</p>
				<p>
					{el.quatity < 10
						? "running out "
						: el.quatity < 20
						? "Please check"
						: null}
				</p>
			</div>
		</div>
	);
};

function AllProducts() {
	const { register, watch } = useForm();
	const selectedProduct = useSelector(getSelectedProduct);
	const query: string = watch("query");
	const category: string = watch("category") || "";
	const { data: categories, loading } = useFetchData("/categories");
	const { data: products } = useFetchData("/products");
	console.log("products", products);

	const [pageNumber, setPageNumber] = useState<number | null>(0);
	// const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const itemsPerPage = 10;
	const pagesVisited = pageNumber ? pageNumber * itemsPerPage : 0;

	const displayItems =
		products && query === "" && (!categories || category === "")
			? products
					.slice(pagesVisited, pagesVisited + itemsPerPage)
					.map((el: product) => {
						return <Item el={el} key={el.id} />;
					})
			: categories && products && query === "" && category !== ""
			? products
					.filter((el: product) => el.category.id == Number(category))
					.slice(pagesVisited, pagesVisited + itemsPerPage)
					.map((el: product) => {
						return <Item el={el} key={el.id} />;
					})
			: [];

	const searchResults = useMemo(() => {
		if (query !== "" && products && products.length !== 0) {
			return products
				.filter((item: product) =>
					item.name.toLowerCase().includes(query.toLowerCase())
				)
				.slice(pagesVisited, pagesVisited + itemsPerPage)
				.map((el: product) => <Item key={el.id} el={el} />);
		} else {
			return [];
		}
	}, [products, query]);
	const pageCount = (): number | null => {
		if (
			(!categories || category === "") &&
			searchResults.length === 0 &&
			products
		) {
			return Math.ceil(products.length / itemsPerPage);
		} else if (searchResults.length !== 0) {
			return Math.ceil(searchResults.length / itemsPerPage);
		} else if (categories && category !== "" && searchResults.length === 0) {
			return Math.ceil(
				categories.filter((cat: category) => cat.id === Number(category))[0]
					.products.length / itemsPerPage
			);
		} else {
			return null;
		}
	};

	const pages: number | null = useMemo(() => pageCount(), [category]);

	const changePage = ({ selected }: { selected: number }) => {
		setPageNumber(selected);
	};
	const paginationComStyles: string =
		"text-xs  rounded-sm border border-purple-900 py-1 px-2 ";
	const pagNextPrevStyles: string =
		paginationComStyles +
		"text-purple-900 hover:text-white hover:bg-purple-900 ";

	console.log("all-products-and-stuff", products);

	useEffect(() => {
		setPageNumber(0);
	}, [category]);

	return (
		<div>
			<div className="flex">
				<div className="flex-1">
					<CreateButton text="Add Product" />
					<div className="grid grid-cols-3 p-2 bg-white">
						<form className="flex col-span-2 gap-2">
							<div className=" flex-1 flex items-center gap-3 py-0 px-1 bg-white rounded-[8px] border-2 border-[#8A8A8A] ">
								<HiMagnifyingGlass className="w-3 h-3 text-gray-500 " />
								<input
									placeholder="Search"
									className="flex-1 bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
									{...register("query")}
								/>
							</div>
							<div className="flex items-center flex-1 gap-2">
								<label
									htmlFor="description"
									className="block my-2 text-xs font-medium text-gray-700 ">
									Category
								</label>
								<select
									className="w-full py-1 text-xs border border-gray-500 rounded-sm"
									{...register("category", { required: false })}>
									<option
										selected={category === ""}
										value=""
										className="text-xs">
										Select category
									</option>
									{categories &&
										categories.map((cat: category) => (
											<option
												className="capitalize"
												selected={cat.id == Number(category)}
												key={crypto.randomUUID()}
												value={cat.id}>
												{cat.name}
											</option>
										))}
								</select>
							</div>
						</form>
					</div>
					{loading && (
						<div className="flex items-center justify-center w-full min-h-screen">
							<HashLoader color="#0C4981" loading={loading} size={16} />
						</div>
					)}
					<div className="mt-2">
						{!loading && products && products.length !== 0 && query === ""
							? displayItems
							: query !== ""
							? searchResults
							: null}
					</div>
					<div className="flex justify-center w-full mt-2">
						{!loading && products && products.length == 0 ? (
							<p className="w-full mt-4 text-xs text-center">
								{" "}
								No data available
							</p>
						) : !products ? null : (
							<ReactPaginate
								previousLinkClassName={`${pagNextPrevStyles} `}
								previousLabel="Previous"
								nextLabel="Next"
								activeLinkClassName="text-white bg-purple-900"
								nextLinkClassName={`${pagNextPrevStyles}`}
								pageCount={pages ? pages : 1}
								pageLinkClassName={`${paginationComStyles}`}
								onPageChange={changePage}
								containerClassName="rounded-sm p-3 bg-white flex gap-3 items-center "
							/>
						)}
					</div>
					{selectedProduct && selectedProduct.name}
				</div>
				{selectedProduct && <EditProduct />}
			</div>
		</div>
	);
}

export default AllProducts;
