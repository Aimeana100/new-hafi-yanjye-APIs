import { ReactElement } from "react";

const OrdersTableHeader = (): ReactElement => (
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

export default OrdersTableHeader;
