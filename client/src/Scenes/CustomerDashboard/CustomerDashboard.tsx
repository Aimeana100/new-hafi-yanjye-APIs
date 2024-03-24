import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getUser } from "../../store";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import instance from "../../API";
import { CiCreditCard1 } from "react-icons/ci";

import { order } from "../../shared/types";
import { formatDate } from "../../shared/constants";
import OrderStatusComponent from "../Orders/OrderStatusComponent";
import CustomersOrdersTableHeader from "./CustomersOrdersTableHeader";
import { HiMagnifyingGlass } from "react-icons/hi2";
// import { OrderProcessI } from "../../shared/types";
// import { formatDate } from "../../shared/constants";
// import OrderStatusComponent from "../Orders/OrderStatusComponent";

function CustomerDashboard() {
	const user = useSelector(getUser);
	const { control, register, watch } = useForm();
	const query = watch("query") || "";
	const navigate = useNavigate();
	const [customerOrders, setCustomerOrders] = useState([]);
	const [fetchedOrders, setFetchedOrders] = useState([]);
	const getAllCustomerOrders = async (userId: number) => {
		await instance
			.get(`/users/${userId}`)
			.then((res) => {
				console.log("res", res);
				setCustomerOrders(res.data.orders);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	const queryOrders = async (orderId: number) => {
		await instance
			.get(`/orders?orderId=${orderId}`)
			.then((res) => {
				console.log("res", res);
				setFetchedOrders(res.data.orders);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	useEffect(() => {
		if (user && user.id) {
			getAllCustomerOrders(user.id);
		}
	}, []);
	useEffect(() => {
		if (query && query !== "") {
			queryOrders(query);
		}
	}, [query]);

	return (
		<div className="h-[90vh] flex flex-col">
			{user && (
				<div className="flex flex-col flex-1 gap-3">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-lg font-bold">Welcome Back {user.fullname}</p>
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
							<p className="py-3">{customerOrders.length}</p>
						</div>
					</div>
					<div className="flex flex-col flex-1">
						<div className="grid flex-1 w-full grid-cols-12 gap-3">
							<div
								className={`flex-1  ${
									user.role === "ADMIN" ? "col-span-8" : "col-span-12"
								}   p-4 bg-white `}>
								<div className="flex items-center justify-between my-6 ">
									<p className="text-sm font-bold">My orders</p>
									<div className="flex items-center gap-3">
										<p className="text-xs font-bold ">Track Order</p>
										<form className=" flex border-2 border-[#8A8A8A] items-center gap-3 p-1 px-4 bg-search-bg rounded-[8px] ">
											<HiMagnifyingGlass className="w-3 h-3 text-login-blue" />
											<input
												placeholder="Search"
												defaultValue={""}
												className="text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
												{...register("query")}
											/>
										</form>
									</div>
								</div>
								<div>
									<CustomersOrdersTableHeader />
									{query == "" &&
										customerOrders &&
										customerOrders.map((order: order) => (
											<div
												onClick={() => {
													navigate(`orders/${order.id}`);
												}}
												key={crypto.randomUUID()}
												className="grid grid-flow-col grid-cols-12 cursor-pointer ">
												<div className="col-span-4 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{formatDate(order.orderDate)}
												</div>
												<div className="col-span-4 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{order.orderId}
												</div>

												<OrderStatusComponent status={order.status} />
											</div>
										))}
									{query &&
										query !== "" &&
										fetchedOrders &&
										fetchedOrders.map((order: order) => (
											<div
												onClick={() => {
													navigate(`orders/${order.id}`);
												}}
												key={crypto.randomUUID()}
												className="grid grid-flow-col grid-cols-12 cursor-pointer ">
												<div className="col-span-4 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{formatDate(order.orderDate)}
												</div>
												<div className="col-span-4 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
													{order.orderId}
												</div>

												<OrderStatusComponent status={order.status} />
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

export default CustomerDashboard;
