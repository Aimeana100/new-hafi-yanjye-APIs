import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CreateButton from "../../shared/CreateButton";
import useFetchData from "../../Hooks/useFetchData";
import { agent } from "../../shared/types";
import { useNavigate } from "react-router-dom";

function AllAgents() {
	const { register } = useForm();
	const navigate = useNavigate();
	const { data: agents, loading } = useFetchData("/users");
	console.log("agents", agents);

	return (
		<div>
			<div className="flex justify-between p-3 py-6 my-3 bg-white">
				<form className="flex col-span-2 gap-2">
					<div className=" flex-1 flex items-center gap-3 py-0 px-1 bg-white rounded-[8px] border-2 border-[#8A8A8A] ">
						<HiMagnifyingGlass className="w-3 h-3 text-gray-500 " />
						<input
							placeholder="Search"
							className="flex-1 bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
							{...register("query")}
						/>
					</div>
				</form>
				<CreateButton text="Add New" />
			</div>

			<div className="grid grid-cols-4 p-4 bg-white">
				<p className="p-1 text-xs font-bold ">Name</p>
				<p className="p-1 text-xs font-bold ">Location</p>
				<p className="p-1 text-xs font-bold ">Contact</p>
				<p className="p-1 text-xs font-bold ">Orders completed</p>
			</div>
			{loading && <p className="text-xs">Loading ....</p>}

			{agents &&
				agents
					.filter((el: agent) => el.role === "AGENT")
					.map((agent: agent) => (
						<div
							onClick={() => {
								navigate(`${agent.id}`);
							}}
							key={agent.id}
							className="grid grid-cols-4 p-4 bg-white cursor-pointer">
							<p className="p-1 text-xs ">{agent.fullName}</p>
							<p className="p-1 text-xs "></p>
							<p className="p-1 text-xs ">{agent.telephone}</p>
							<p className="p-1 text-xs "></p>
						</div>
					))}
		</div>
	);
}

export default AllAgents;
