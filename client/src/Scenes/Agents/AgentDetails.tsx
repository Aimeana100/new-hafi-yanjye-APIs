import { useParams } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import BackButton from "../../shared/BackButton";
import { OrderItem, order } from "../../shared/types";

function AgentDetails() {
	const { agentId } = useParams();
	const { data: agent, loading } = useFetchData(`users/${agentId}`);
	console.log("agent", agent);

	const { register } = useForm();

	return (
		<div>
			<BackButton />
			{loading && <p className="text-xs">Loading...</p>}
			{agent && (
				<div className="flex w-full gap-3">
					<div className="w-2/5 p-4 bg-white">
						<form>
							<div className="flex justify-center">
								<div>
									<div className="flex items-center h-24">PROFILE</div>
									<p className="text-xs font-bold text-center">
										{agent.fullName}
									</p>
									<p className="text-xs text-center">rating</p>
									<p className="text-xs text-center">explanation</p>
								</div>
							</div>
							<div>
								<div>
									<label
										htmlFor=""
										defaultValue={agent.telphone}
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
										defaultValue={agent.email}
										placeholder="Email"
										required
										{...register("email")}
									/>
								</div>
								<div>
									<label
										htmlFor=""
										className="block my-1 text-xs font-medium capitalize ">
										Update Password
									</label>
									<input
										className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
										type="password"
										{...register("password")}
										placeholder="Password"
									/>
								</div>
								<div>
									<label
										htmlFor=""
										className="block my-1 text-xs font-medium capitalize ">
										Address
									</label>
									<input
										className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
										type="type"
										placeholder="Location"
										{...register("location")}
									/>
								</div>
							</div>
						</form>
						<button className=" my-1 text-xs text-white py-2 w-full rounded-[8px] bg-sky-800 ">
							Update Info
						</button>
						<button className=" my-1 text-xs text-white py-2 w-full rounded-[8px] bg-pink-900">
							Suspend{" "}
						</button>
					</div>

					<div className="w-3/5 max-h-screen p-4 overflow-y-scroll bg-white ">
						<div className="flex items-center justify-between w-full">
							<p className="text-sm font-bold">Delivery History</p>
							<form className="flex col-span-2 gap-2">
								<div className=" flex-1 flex items-center gap-3 py-0 px-1 bg-white rounded-[8px] border-2 border-[#8A8A8A] ">
									<HiMagnifyingGlass className="w-3 h-3 text-gray-500 " />
									<input
										placeholder="Search order"
										className="flex-1 bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
										{...register("query")}
									/>
								</div>
							</form>
						</div>
						{agent.orders ? (
							agent.orders.map((el: order) => (
								<div
									key={el.id}
									className="mt-3 px-4 py-4 rounded-[6px] border-[1.5px] border-gray-400">
									<div className="flex items-center gap-3">
										<p className="text-sm">Order {el.orderId}</p>
										<p className="text-xs">rating</p>
										<p className="text-xs">comment</p>
									</div>
									<div className="mt-1">
										<p className="py-1 text-xs font-bold">
											Customer:{" "}
											<span className="font-normal">
												{el.customer.fullName}
											</span>{" "}
										</p>
										<p className="py-1 text-xs font-bold">
											Location: <span className="font-normal">Location</span>{" "}
										</p>
									</div>
									<div className="mt-2">
										<p className="text-xs font-bold">Items</p>
										<div className="flex gap-2">
											{el.orderDetails &&
												el.orderDetails.map((prod: OrderItem) => (
													<p key={prod.id} className="text-xs">
														{prod && prod.product ? prod.product.name : ""}
													</p>
												))}
										</div>
									</div>
								</div>
							))
						) : (
							<p className="mt-12 text-xs text-center">
								No orders delivered agent yet
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default AgentDetails;
