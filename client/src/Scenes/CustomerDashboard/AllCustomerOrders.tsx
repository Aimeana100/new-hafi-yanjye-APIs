import { useForm } from "react-hook-form";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { order } from "../../shared/types";
import { formatDate } from "../../shared/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../API";
import { useSelector } from "react-redux";
import { getUser } from "../../store";
import CustomersOrdersTableHeader from "./CustomersOrdersTableHeader";
import OrderStatusComponent from "../Orders/OrderStatusComponent";

function AllCustomerOrders() {
	const user = useSelector(getUser);
	const [orders, setOrders] = useState([]);
	const { register } = useForm();
	const navigate = useNavigate();
	const getAllCustomerOrders = async (userId: number) => {
		await instance
			.get(`/users/${userId}`)
			.then((res) => {
				console.log("res", res);
				setOrders(res.data.orders);
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

	return (
		<div>
			<div className="flex items-center w-full px-3 py-2 bg-white rounded-md">
				<div className="flex-1">
					<form className=" w-2/5 flex items-center gap-3 p-2 px-4 bg-slate-100 rounded-[8px] ">
						<HiOutlineMagnifyingGlass className="w-5 h-5 text-login-blue" />
						<input
							placeholder="Search"
							className="w-full bg-transparent focus:outline-none focus-border-none placeholder:text-sm placeholder:font-normal"
							{...register("query")}
						/>
					</form>
				</div>
			</div>
			<CustomersOrdersTableHeader />
			<div className="bg-white ">
				{orders &&
					orders.map((order: order) => (
						<div
							onClick={() => {
								navigate(`${order.id}`);
							}}
							key={order.id}
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
	);
}

export default AllCustomerOrders;
