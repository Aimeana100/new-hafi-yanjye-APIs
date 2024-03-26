import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import usePostData from "../../Hooks/usePostData";
import BackButton from "../../shared/BackButton";
import { district, province, sector, siteI } from "../../shared/types";
import useFetchData from "../../Hooks/useFetchData";

interface dataForm {
	name: string;
	description: string;
	price: number;
	sector: number;
	province: number;
	district: number;
}
function CreateLocation() {
	const { register, handleSubmit, reset } = useForm<dataForm>();

	const { postData, isLoading } = usePostData();
	const { data: provinces } = useFetchData("/site/address/province");
	const { data: districts } = useFetchData("/site/address/district");
	const { data: sectors } = useFetchData("/site/address/sector");

	// console.log("proivinces", provinces);
	// console.log("districts", districts);
	// console.log("sectors", sectors);

	const createSite = async (data: dataForm) => {
		const { sector, name, price, description }: siteI = data;
		await postData("/site", { sector, name, price, description });
		reset();
	};
	return (
		<div>
			<BackButton />
			<p className="w-full my-6 text-xs font-medium text-center">
				Create New Site
			</p>
			<div className="w-4/6 mx-auto bg-white rounded-[8px] p-6">
				<form
					onSubmit={handleSubmit(createSite)}
					className="w-4/5 mx-auto mt-4">
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Province
						</label>
						<select
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							{...register("province")}>
							<option value="">select province</option>
							{provinces &&
								provinces.length > 0 &&
								provinces.map((province: province) => (
									<option value={province.id}>{province.name}</option>
								))}
						</select>
					</div>
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							District
						</label>
						<select
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							{...register("district")}>
							<option value="">select district</option>
							{districts &&
								districts.length > 0 &&
								districts.map((district: district) => (
									<option value={district.id}>{district.name}</option>
								))}
						</select>
					</div>

					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Sector
						</label>
						<select
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							{...register("sector")}>
							<option value=""></option>
							{sectors &&
								sectors.length > 0 &&
								sectors.map((sector: sector) => (
									<option value={sector.id}>{sector.name}</option>
								))}
						</select>
					</div>

					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Site name
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="text"
							required
							placeholder="site name"
							{...register("name")}
						/>
					</div>
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Price
						</label>
						<input
							className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
							type="number"
							required
							placeholder="site price"
							{...register("price")}
						/>
					</div>
					<div>
						<label
							htmlFor=""
							className="block my-1 text-xs font-medium capitalize ">
							Description
						</label>
						<textarea
							{...register("description")}
							className="w-full border border-gray-300 rounded-md"
							rows={4}
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
							"Create site"
						) : (
							<HashLoader color="#0C4981" loading={isLoading} size={15} />
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateLocation;
