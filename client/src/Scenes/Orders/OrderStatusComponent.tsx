import { OrderStatus } from "../../shared/types";
import {
	MdOutlineConfirmationNumber,
	MdOutlinePendingActions,
} from "react-icons/md";
import { FcCancel, FcPaid } from "react-icons/fc";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaRegCircleCheck } from "react-icons/fa6";

const OrderStatusComponent = ({ status }: { status: OrderStatus }) => {
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

export default OrderStatusComponent;
