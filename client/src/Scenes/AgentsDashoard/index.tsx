import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getUser } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import instance from "../../API";
import { CiCreditCard1 } from "react-icons/ci";
import OrdersTableHeader from "../Orders/OrdersTableHeader";
import { OrderProcessI } from "../../shared/types";
import { formatDate } from "../../shared/constants";
import OrderStatusComponent from "../Orders/OrderStatusComponent";

function AgentDashboard() {
	const user = useSelector(getUser);
	const { control } = useForm();
	const navigate = useNavigate();
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

	useEffect(() => {
		if (user && user.role === "AGENT" && user.id) {
			getAllAgentOrders(user.id);
		}
	}, []);

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
						<div className=" bg-white rounded-[12px] p-4">
							<CiCreditCard1 className="w-10 h-10" />
							<p className="py-1 font-bold ">
								{user.role === "ADMIN"
									? "Total Orders"
									: user.role === "AGENT"
									? "Completed Orders"
									: "Orders created"}
							</p>
							<p className="py-3">{agentOrders.length}</p>
						</div>
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
									{agentOrders &&
										agentOrders.map((order: OrderProcessI) => (
											<div
												onClick={() => {
													navigate(`orders/${order.orderItem.order.id}`);
												}}
												key={crypto.randomUUID()}
												className="grid grid-flow-col grid-cols-12 cursor-pointer ">
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{formatDate(order.orderItem.order.orderDate)}
												</div>
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{order.orderItem.order.id}
												</div>
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap"></div>
												<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap"></div>
												<OrderStatusComponent
													status={order.orderItem.order.status}
												/>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AgentDashboard;
