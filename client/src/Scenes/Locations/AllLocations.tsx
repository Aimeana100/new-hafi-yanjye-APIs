import { Link } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";
import { siteFull } from "../../shared/types";

function AllLocations() {
	const { data: sites } = useFetchData("/site");
	console.log("sites", sites);

	return (
		<div>
			<div className="flex items-center justify-between my-2">
				<p className="my-3 text-sm font-bold">All Locations</p>
				<Link
					className="px-3 py-1 text-sm  rounded-[4px] font-semibold text-white bg-theme-yellow"
					to="create">
					Add location
				</Link>
			</div>
			<div className="grid grid-cols-5 p-3 bg-white">
				<p className="p-1 text-xs font-bold ">Site name</p>
				<p className="p-1 text-xs font-bold ">Price</p>
				<p className="p-1 text-xs font-bold ">Sector</p>
				<p className="p-1 text-xs font-bold ">District</p>
				<p className="p-1 text-xs font-bold ">Province</p>
			</div>

			{sites &&
				sites.length !== 0 &&
				sites.map((site: siteFull) => (
					<div key={site.id} className="grid grid-cols-5 p-3 bg-white">
						<p className="p-1 text-xs ">{site.name}</p>
						<p className="p-1 text-xs ">{site.price ? site.price : ""}</p>
						<p className="p-1 text-xs ">{site.sector.name}</p>
						<p className="p-1 text-xs ">{site.sector.district.name}</p>
						<p className="p-1 text-xs ">{site.sector.district.province.name}</p>
					</div>
				))}
		</div>
	);
}

export default AllLocations;
