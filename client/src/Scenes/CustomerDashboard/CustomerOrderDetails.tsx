import { useLocation, useParams } from "react-router-dom";
import BackButton from "../../shared/BackButton";
import useFetchData from "../../Hooks/useFetchData";
import React, { useState } from "react";
import { OrderItem } from "../../shared/types";
import PaymentModal from "./PaymentModel";

function CustomerOrderDetails() {
	const [open, setOpen] = useState<boolean>(false);
	const { id } = useParams();
	const { data: order } = useFetchData(`/orders/${id}`);
	const { pathname } = useLocation();
	const paths = pathname.split("/");

	return (
		<div>
			<BackButton />
			{order && (
				<React.Fragment>
					<div className="flex items-center justify-between p-4 bg-white">
						<p className="w-1/2 text-xs font-bold uppercase">
							{order && order.orderId}
						</p>
						{!paths.includes("process") && (
							<div className="flex justify-end w-1/2 gap-2">
								<button
									onClick={() => {
										setOpen(true);
									}}
									className="p-2 px-4 rounded-[6px]  text-xs text-white bg-teal-900">
									Add Payment
								</button>
							</div>
						)}
					</div>
					<div>
						<div className="grid w-full grid-cols-3 gap-3">
							<div className="p-2 text-xs bg-white rounded-[6px]">
								<p className="mb-2 text-xs font-medium uppercase">Date</p>
								<p className="py-1">
									{new Date(order.orderDate).toLocaleDateString("fr-FR")}
								</p>
								<p className="py-1">
									{new Date(order.orderDate).toTimeString()}
								</p>
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
											{details.quantity}
										</div>
										<div className="p-3 py-2 text-xs font-semibold text-left ">
											{details.product &&
												Number(
													details.product.cost * details.quantity
												).toLocaleString("fr-FR")}
										</div>
									</div>
								))}
						</div>
						<div className="p-6 my-2 bg-white ">
							<div className="flex justify-between text-xs font-bold">
								<p className="py-1">Subtotal</p>
								<p className="py-1">
									{Number(order.total).toLocaleString("fr-FR")}
								</p>
							</div>
							<div className="flex justify-between text-xs font-bold">
								<p className="py-1">Coupon Code</p>
								<p className="py-1">
									{Number(order.total).toLocaleString("fr-FR")}
								</p>
							</div>
							<div className="flex justify-between text-xs font-bold">
								<p className="py-1">Coupon Code</p>
								<p className="py-1">
									{Number(order.total).toLocaleString("fr-FR")}
								</p>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
			<PaymentModal open={open} setOpen={setOpen} />
		</div>
	);
}

export default CustomerOrderDetails;
