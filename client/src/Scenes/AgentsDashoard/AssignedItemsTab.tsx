import { OrderItem, order } from "../../shared/types";
import { useOutletContext } from "react-router-dom";

function AssignedItemsTab() {
	const order: order = useOutletContext();

	return (
		<div>
			<p className="my-3 font-bold"> Assigned Items</p>
			<div className="grid w-full grid-cols-5 mt-2 bg-white">
				<div className="p-3 py-2 text-xs font-semibold text-left ">Product</div>
				<div className="p-3 py-2 text-xs font-semibold text-left ">
					Size /Color
				</div>
				<div className="p-3 py-2 text-xs font-semibold text-left ">Price</div>
				<div className="p-3 py-2 text-xs font-semibold text-left ">
					Quantity
				</div>
				<div className="p-3 py-2 text-xs font-semibold text-left ">Total</div>
			</div>
			{order && (
				<div className="mt-2 bg-white">
					{order.orderDetails &&
						order.orderDetails.map((details: OrderItem) => (
							<div key={details.id} className="grid w-full grid-cols-5 ">
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
									{details.product
										? Number(
												details.product.cost * details.quantity
										  ).toLocaleString("fr-FR")
										: ""}
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	);
}

export default AssignedItemsTab;
