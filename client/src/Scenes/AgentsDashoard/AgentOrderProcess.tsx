import { ReactElement, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OrderItem, order } from "../../shared/types";
import toast from "react-hot-toast";
import instance from "../../API";

function AgentOrderProcess(): ReactElement {
	const order: order = useOutletContext();
	const [itemsChecked] = useState<number[]>([]);
	const markItemAsDone = async (itemId: number) => {
		await instance
			.patch(`/orders/item/done/${itemId}`)
			.then(() => {
				toast.success("success !!!");
			})
			.catch((err) => {
				console.log("err", err);
				toast.error(err.code);
			});
	};

	return order ? (
		<div>
			<p className="mt-4 font-bold text-center"> Items Checklist </p>

			<div className="relative">
				<p className="sticky top-0 text-sm font-bold">
					Items Checked {itemsChecked.length} / {order.orderDetails.length}{" "}
				</p>

				{order &&
					order.orderDetails &&
					order.orderDetails.map((item: OrderItem) => (
						<div className="bg-white  flex items-center justify-between  rounded-[8px] p-4">
							<div className="grid flex-1 grid-cols-3 gap-5 ">
								<p className="py-1 font-bold">{item.product?.name}</p>
								<p className="py-1">Requested Quantity : {item.quantity}</p>
								<p className="py-1">
									Product cost : {item.product?.cost.toLocaleString()}
								</p>
							</div>
							<div className="flex justify-center ">
								<button
									onClick={() => {
										markItemAsDone(item.id);
									}}
									className="px-2 py-1 text-xs font-bold text-white rounded-md bg-sky-800">
									{itemsChecked.includes(item.id) ? "Done" : "Mark as done"}
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	) : (
		<div>Data not Available</div>
	);
}

export default AgentOrderProcess;
