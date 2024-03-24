import { HiMagnifyingGlass } from "react-icons/hi2";
import CreateButton from "../../shared/CreateButton";
import { useForm } from "react-hook-form";
import useFetchData from "../../Hooks/useFetchData";
import { useMemo, useState } from "react";
import { HashLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { category, product } from "../../shared/types";

interface itemprops {
	el: category;
}

const Item = ({ el }: itemprops) => {
	return (
		<div
			key={el.id}
			className="my-2 text-xs p-4 flex md:flex-row  gap-2 flex-col items-center md:items-stretch  md:justify-between bg-white w-full rounded-[8px]">
			<div className="flex flex-1 gap-2 md:block ">
				{el.images && el.images[0].link ? (
					<img
						src={el.images && el.images[0].link}
						className="block object-contain w-12 h-12 "
					/>
				) : (
					<img
						src="https://placehold.co/600x400/png"
						className="block object-contain w-12 h-12 "
					/>
				)}
			</div>
			<div className="flex flex-1 gap-2 md:block ">
				<p className="font-medium ">Name</p>
				<p className="capitalize">{el.name}</p>
			</div>
			<div className="flex-1">
				<p className="font-medium text-center md:text-start">Items</p>
				<p className="capitalize">{el.products && el.products.length}</p>
			</div>
		</div>
	);
};

function AllCategories() {
	const { register, watch } = useForm();
	const query: string = watch("query");

	const { data, loading } = useFetchData("/categories");

	const [pageNumber, setPageNumber] = useState<number | null>(0);
	// const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const itemsPerPage = 10;
	const pagesVisited = pageNumber ? pageNumber * itemsPerPage : 0;

	const displayItems =
		data &&
		query === "" &&
		data
			.slice(pagesVisited, pagesVisited + itemsPerPage)
			.map((el: category) => {
				return <Item el={el} key={el.id} />;
			});

	const searchResults = useMemo(() => {
		if (query !== "" && data && data.length !== 0) {
			return data
				.filter((item: product) =>
					item.name.toLowerCase().includes(query.toLowerCase())
				)
				.slice(pagesVisited, pagesVisited + itemsPerPage)
				.map((el: category) => <Item key={el.id} el={el} />);
		} else {
			return [];
		}
	}, [data, query]);
	const pageCount = (): number | null => {
		if (searchResults.length === 0 && data) {
			return Math.ceil(data.length / itemsPerPage);
		} else if (searchResults.length !== 0) {
			return Math.ceil(searchResults.length / itemsPerPage);
		} else {
			return null;
		}
	};

	const pages: number | null = pageCount();

	const changePage = ({ selected }: { selected: number | null }) => {
		setPageNumber(selected);
	};
	const paginationComStyles: string =
		"text-xs  rounded-sm border border-purple-900 py-1 px-2 ";
	const pagNextPrevStyles: string =
		paginationComStyles +
		"text-purple-900 hover:text-white hover:bg-purple-900 ";

	return (
		<div>
			<CreateButton text="Add Category" />
			<div className="grid grid-cols-3 p-2 bg-white">
				<form className="grid gap-2 grid-col-3">
					<div className="flex items-center gap-3 py-0 px-1 bg-white rounded-[8px] border-2 border-[#8A8A8A] ">
						<HiMagnifyingGlass className="w-3 h-3 text-gray-500 " />
						<input
							placeholder="Search"
							className="flex-1 bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
							{...register("query")}
						/>
					</div>
				</form>
			</div>
			{loading && (
				<div className="flex items-center justify-center w-full min-h-screen">
					<HashLoader color="#0C4981" loading={loading} size={16} />
				</div>
			)}
			<div className="mt-2">
				{!loading && data && data.length !== 0 && query === ""
					? displayItems
					: query !== ""
					? searchResults
					: null}
			</div>
			<div className="flex justify-center w-full mt-2">
				{!loading && data && data.products && data.products.total == 0 ? (
					<p className="w-full mt-4 text-xs text-center"> No data available</p>
				) : !data ? null : (
					<ReactPaginate
						previousLinkClassName={`${pagNextPrevStyles} `}
						previousLabel="Previous"
						nextLabel="Next"
						activeLinkClassName="text-white bg-purple-900"
						nextLinkClassName={`${pagNextPrevStyles}`}
						pageCount={pages ? pages : 0}
						pageLinkClassName={`${paginationComStyles}`}
						onPageChange={changePage}
						containerClassName="rounded-sm p-3 bg-white flex gap-3 items-center "
					/>
				)}
			</div>
		</div>
	);
}

export default AllCategories;
