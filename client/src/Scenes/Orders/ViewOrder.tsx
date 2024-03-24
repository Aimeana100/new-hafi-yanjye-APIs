import { useNavigate, useParams } from "react-router-dom";
import { OrderItem } from "../../shared/types";
import React, { useState } from "react";
import BackButton from "../../shared/BackButton";
import instance from "../../API";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getUser } from "../../store";
import useFetchData from "../../Hooks/useFetchData";

function ViewOrder() {
	const navigate = useNavigate();
	const { orderId } = useParams();
	const user = useSelector(getUser);
	const { data: order } = useFetchData(`/orders/${orderId}`);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const total: number | null =
		order && order.orderDetails
			? order.orderDetails.reduce((acc: number, ord: OrderItem) => {
					const prod = ord.product ? ord.product.cost * ord.quantity : 0;

					return acc + prod;
			  }, 0)
			: null;

	const cancelOrder = async () => {
		setLoading(true);
		await instance
			.patch(`/orders/${orderId}`, { status: "CANCELED" })
			.then((res) => {
				setSuccess(true);
				return res;
			})
			.catch((err) => {
				console.log("err", err);

				for (let i = 0; i < err.response.data.message.length; i++) {
					toast.error(err.response.data.message[i]);
				}
			})
			.finally(() => {
				setLoading(false);
				if (success) {
					toast.success("order updated !!!");
				}
			});
	};
	console.log("order", order);

	return (
		<div>
			<BackButton />
			{order && (
				<React.Fragment>
					<div className="flex items-center justify-between p-4 bg-white">
						<p className="w-1/2 text-xs font-bold uppercase">
							{order && order.orderId}
						</p>

						{user && user.role === "ADMIN" && order.status === "PENDING" && (
							<div className="flex justify-end w-1/2 gap-2">
								<button
									onClick={() => {
										navigate("process");
									}}
									className="p-2 px-4 rounded-[6px]  text-xs text-white bg-teal-900">
									Process
								</button>
								<button
									onClick={cancelOrder}
									className="p-2 px-4 rounded-[6px]  text-xs text-white bg-pink-900">
									{loading ? "loading" : "Cancel"}{" "}
								</button>
							</div>
						)}
					</div>
					<div className="grid w-full grid-cols-4 gap-3">
						<div className="p-2 text-xs bg-white rounded-[6px]">
							<p className="mb-2 text-xs font-medium uppercase">Customer</p>
							<p className="py-1">{order.customer.fullName}</p>
							<p className="py-1">{order.customer.telphone}</p>
							<p className="py-1">address</p>
						</div>
						<div className="p-2 text-xs bg-white rounded-[6px]">
							<p className="mb-2 text-xs font-medium uppercase">Date</p>
							<p className="py-1">
								{new Date(order.orderDate).toLocaleDateString("fr-FR")}
							</p>
							<p className="py-1">{new Date(order.orderDate).toTimeString()}</p>
						</div>
						<div className="p-2 text-xs bg-white rounded-[6px]">
							<p className="mb-2 text-xs font-medium uppercase">Payment</p>
						</div>
						<div className="p-2 text-xs bg-white rounded-[6px]">
							<p className="mb-2 text-xs font-medium uppercase">Status</p>
							<p
								className={`py-1 ${
									order.status === "PENDING"
										? " text-sky-900 "
										: order.status === "CANCELED"
										? "text-pink-900"
										: "text-teal-900"
								}`}>
								{order.status}
							</p>
						</div>
					</div>
					<div className="grid w-full grid-cols-5 mt-2 bg-white">
						<div className="p-3 py-2 text-xs font-semibold text-left ">
							Product
						</div>
						<div className="p-3 py-2 text-xs font-semibold text-left ">
							Size /Color
						</div>
						<div className="p-3 py-2 text-xs font-semibold text-left ">
							Price
						</div>
						<div className="p-3 py-2 text-xs font-semibold text-left ">
							Quantity
						</div>
						<div className="p-3 py-2 text-xs font-semibold text-left ">
							Total
						</div>
					</div>
					<div className="mt-2 bg-white">
						{order.orderDetails &&
							order.orderDetails.map((details: OrderItem) => (
								<div className="grid w-full grid-cols-5 ">
									<div className="p-3 py-2 text-xs font-semibold text-le ">
										{details.product ? details.product.name : ""}
									</div>
									<div className="p-3 py-2 text-xs font-semibold text-le "></div>
									<div className="p-3 py-2 text-xs font-semibold text-left ">
										{details.product ? details.product.cost : ""}
									</div>
									<div className="p-3 py-2 text-xs font-semibold text-left ">
										{details.quantity ? details.quantity : ""}
									</div>
									<div className="p-3 py-2 text-xs font-semibold text-left ">
										{details.product
											? Number(
													details.product.cost * details.quantity
											  ).toLocaleString("fr-FR")
											: ""}
									</div>
								</div>
							))}
					</div>
					<div className="p-6 my-2 bg-white ">
						<div className="flex justify-between text-xs font-bold">
							<p className="py-1">Subtotal</p>
							<p className="py-1">{Number(total).toLocaleString("fr-FR")}</p>
						</div>
						<div className="flex justify-between text-xs font-bold">
							<p className="py-1">Coupon Code</p>
							<p className="py-1">{Number(total).toLocaleString("fr-FR")}</p>
						</div>
						<div className="flex justify-between text-xs font-bold">
							<p className="py-1">Coupon Code</p>
							<p className="py-1">{Number(total).toLocaleString("fr-FR")}</p>
						</div>
					</div>
					<div className="my-2">
						<p className="text-xs font-bold">Comments</p>
						<p className="mt-3 text-xs">Comments on order are posted here</p>
					</div>
				</React.Fragment>
			)}
		</div>
	);
}

export default ViewOrder;
