import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../shared/BackButton";
import useFetchData from "../../Hooks/useFetchData";
import React from "react";

function AgentOrderDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
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
										navigate("process");
									}}
									className="p-2 px-4 rounded-[6px]  text-xs text-white bg-teal-900">
									Process
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
					<React.Fragment>
						<Outlet context={order} />
					</React.Fragment>
				</React.Fragment>
			)}
		</div>
	);
}

export default AgentOrderDetails;
