import { useForm } from "react-hook-form";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import useFetchData from "../../Hooks/useFetchData";
import { ReactElement } from "react";
import { OrderStatus, order } from "../../shared/types";
import { formatDate } from "../../shared/constants";
import {
	MdOutlineConfirmationNumber,
	MdOutlinePendingActions,
} from "react-icons/md";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FcCancel, FcPaid } from "react-icons/fc";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function AllAgentOrders() {
	const { register } = useForm();
	const navigate = useNavigate();
	const { data: orders, loading } = useFetchData("/orders");

	console.log("orders", orders);

	const TableHead = (): ReactElement => (
		<div className="bg-white">
			<div className="grid grid-flow-col grid-cols-12">
				<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Date & Time
				</div>
				<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Order Id
				</div>
				<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Customer
				</div>
				<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Address
				</div>
				<div className="col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap">
					Status
				</div>
			</div>
		</div>
	);
	const OrderStatus = ({ status }: { status: OrderStatus }) => {
		if (status === "PENDING") {
			return (
				<div
					className={` flex gap-2 items-center col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap`}>
					<p className="text-xs text-sky-800">{status}</p>
					<MdOutlinePendingActions className="w-4 h-4 text-sky-800" />
				</div>
			);
		} else if (status === "PAID") {
			return (
				<div
					className={` flex gap-2 items-center col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap`}>
					<p className="text-xs text-teal-900">{status}</p>
					<FcPaid className="w-4 h-4 text-teal-900" />
				</div>
			);
		} else if (status === "DELIVERED") {
			return (
				<div
					className={` flex gap-2 items-center col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap`}>
					<p className="text-xs text-teal-900">{status}</p>
					<AiOutlineDeliveredProcedure className="w-4 h-4 text-teal-900" />
				</div>
			);
		} else if (status === "CANCELED") {
			return (
				<div
					className={` flex gap-2 items-center col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap`}>
					<p className="text-xs text-pink-900">{status}</p>
					<FcCancel className="w-4 h-4 " />
				</div>
			);
		} else if (status === "CONFIRMED") {
			return (
				<div
					className={` flex gap-2 items-center col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap`}>
					<p className="text-xs text-teal-900">{status}</p>

					<MdOutlineConfirmationNumber className="w-4 h-4 text-teal-900" />
				</div>
			);
		} else if (status === "COMPLETED") {
			return (
				<div
					className={` flex gap-2 items-center col-span-3 p-3 py-2 text-xs font-semibold tracking-wide text-left whitespace-nowrap`}>
					<p className="text-xs text-teal-900">{status}</p>

					<FaRegCircleCheck className="w-4 h-4 text-teal-900" />
				</div>
			);
		} else {
			return null;
		}
	};

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
			<TableHead />
			{loading && <p className="w-full text-xs font-medium">Loading ...</p>}
			<div className="bg-white ">
				{orders &&
					orders.map((order: order) => (
						<div
							onClick={() => {
								navigate(`${order.id}`);
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
							<OrderStatus status={order.status} />
						</div>
					))}
			</div>
		</div>
	);
}

export default AllAgentOrders;
