// import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../store";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import useFetchData from "../../Hooks/useFetchData";
import React, { useEffect, useState } from "react";
import { CiDollar } from "react-icons/ci";
import { RiUserAddLine } from "react-icons/ri";
import { CiCreditCard1 } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import OrdersTableHeader from "../Orders/OrdersTableHeader";
import { formatDate } from "../../shared/constants";
import { agent, order, product } from "../../shared/types";
import OrderStatusComponent from "../Orders/OrderStatusComponent";
import instance from "../../API";

const AdminDashboard = () => {
	const user = useSelector(getUser);
	const { control } = useForm();
	const navigate = useNavigate();
	const { data: orders, loading } = useFetchData("/orders");
	const { data: agents, loading: loading2 } = useFetchData("/users");
	const { data: products, loading: loading3 } = useFetchData("/products");
	const [agentOrders, setAgentOrders] = useState([]);
	const getAllAgentOrders = async (userId: number) => {
		await instance
			.get(`/users/${userId}`)
			.then((res) => {
				setAgentOrders(res.data.orderProcessor);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const [numberOfCustomers, setNumberOfCustomers] = useState<number | null>(
		null
	);

	console.log("agent-orders", agentOrders);

	useEffect(() => {
		if (agents && agents.length !== 0) {
			const customers = agents.filter(
				(agent: agent) => agent.role === "CUSTOMER"
			);
			setNumberOfCustomers(customers.length);
		}
		if (user && user.role === "AGENT" && user.id) {
			getAllAgentOrders(user.id);
		}
	}, [agents]);

	return (
		<div className="h-[90vh] flex flex-col">
			{user && (
				<div className="flex flex-col flex-1 gap-3">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-lg font-bold">Welcome Back {user.fullname}</p>
							<p className="mt-3 text-xs font-semibold">Latest updates</p>
						</div>
						<div className="">
							<Controller
								name="date"
								control={control}
								defaultValue={new Date()}
								render={({ field }) => (
									<DatePicker
										onChange={(date: Date) => field.onChange(date)}
										selected={new Date()}
										placeholderText={new Date().toLocaleDateString("fr-FR")}
									/>
								)}
							/>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-4 ">
						{user.role === "ADMIN" && (
							<div className=" bg-white rounded-[12px] p-4">
								<CiDollar className="w-10 h-10" />
								<p className="py-1 font-bold ">Total Revevenue</p>
								<p className="py-3">Numbers</p>
							</div>
						)}

						<div className=" bg-white rounded-[12px] p-4">
							<CiCreditCard1 className="w-10 h-10" />
							<p className="py-1 font-bold ">
								{user.role === "ADMIN"
									? "Total Orders"
									: user.role === "AGENT"
									? "Completed Orders"
									: "Orders created"}
							</p>
							<p className="py-3">{loading ? "...." : orders.length}</p>
						</div>
						{user.role === "ADMIN" && (
							<React.Fragment>
								<div className=" bg-white rounded-[12px] p-4">
									<RiUserAddLine className="w-10 h-10" />
									<p className="py-1 font-bold ">Total Customer</p>
									<p className="py-3">
										{loading2 ? "...." : numberOfCustomers}
									</p>
								</div>
								<div className=" bg-white rounded-[12px] p-4">
									<BsBoxSeam className="w-10 h-10" />
									<p className="py-1 font-bold ">Total Products</p>
									<p className="py-3">{loading3 ? "...." : products.length}</p>
								</div>
							</React.Fragment>
						)}
					</div>
					<div className="flex flex-col flex-1">
						<div className="grid flex-1 w-full grid-cols-12 gap-3">
							<div
								className={`flex-1  ${
									user.role === "ADMIN" ? "col-span-8" : "col-span-12"
								}   p-4 bg-white `}>
								<div className="flex items-center justify-between my-6 ">
									<p className="text-sm font-bold">
										{user.role === "ADMIN"
											? "Latest Orders"
											: "Assigned Orders"}{" "}
									</p>
									{user.role === "ADMIN" && (
										<Link
											to="orders"
											className="w-1/4 py-2 px-4 rounded-[8px] text-white bg-black ">
											View All
										</Link>
									)}
								</div>
								<div>
									<OrdersTableHeader />
									{orders &&
										orders.map((order: order) => (
											<div
												onClick={() => {
													navigate(`orders/${order.id}`);
												}}
												key={order.id}
												className="grid grid-flow-col grid-cols-12 cursor-pointer ">
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{formatDate(order.orderDate)}
												</div>
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{order.orderId}
												</div>
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{order.customer && order.customer.fullName}
												</div>
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap"></div>
												<OrderStatusComponent status={order.status} />
											</div>
										))}
								</div>
							</div>
							{user.role === "ADMIN" && (
								<div className="col-span-4 p-4 bg-white">
									<p className="font-bold">Top products</p>
									{products &&
										products.length !== 0 &&
										products.map((product: product) => (
											<div
												key={product.id}
												onClick={() => navigate(`products/${product.id}`)}
												className="flex items-center rounded-[4px] justify-between p-2 cursor-pointer  hover:bg-gray-200">
												<div className="flex gap-2">
													<p>image</p>
													<div>
														<p className="font-bold ">{product.name}</p>
														<p className="text-sm">{product.category.name}</p>
													</div>
												</div>
												<div>
													<p>Number</p>
													<p>Sold</p>
												</div>
											</div>
										))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
