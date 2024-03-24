import { useParams } from "react-router-dom";
import BackButton from "../../shared/BackButton";
import {
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useMemo, useState } from "react";
import useFetchData from "../../Hooks/useFetchData";
import { OrderItem, agent, identityPerson } from "../../shared/types";
import instance from "../../API";
import { toast } from "react-hot-toast";

interface orderAssign {
	agentId: number;
	items: number[];
}

function ProcessOrder() {
	const { orderId } = useParams();
	const { data: order } = useFetchData(`/orders/${orderId}`);

	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [selectedAgent, setSelectedAgent] = useState<identityPerson | null>(
		null
	);
	const [assignedAgents, setAssignedAgents] = useState<orderAssign[]>([]);
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const handleSelectAll = () => {
		setSelectAll(true);
		const orderDetailIds: number[] = order.orderDetails.map(
			(detail: OrderItem) => detail.id
		);
		setSelectedItems((prev) => [...prev, ...orderDetailIds]);
		if (selectedAgent !== null) {
			if (targettedAssign) {
				setAssignedAgents((prev) =>
					prev.map((el) =>
						el.agentId === targettedAssign.agentId
							? { ...el, items: orderDetailIds }
							: el
					)
				);
			} else {
				setAssignedAgents((prev) => [
					...prev,
					{ agentId: selectedAgent.id, items: orderDetailIds },
				]);
			}
		}
	};

	const toggleSelectItem = (id: number) => {
		if (selectedItems.includes(id) && selectedAgent) {
			setSelectedItems((prev) => prev.filter((el) => el !== id));
			const agent = assignedAgents.filter(
				(el) => el.agentId === selectedAgent.id
			)[0];
			const newItems = agent.items.filter((el) => el !== id);
			const newAssigns = assignedAgents.map((el) =>
				el.agentId === selectedAgent.id ? { ...el, items: newItems } : el
			);
			setAssignedAgents(() => newAssigns);
		} else {
			setSelectedItems((prev) => [...prev, id]);
			if (selectedAgent !== null) {
				if (
					assignedAgents.length !== 0 &&
					assignedAgents.some((el) => el.agentId == selectedAgent.id)
				) {
					if (!targettedAssign) {
						const newAssigned = assignedAgents.map((el) =>
							el.agentId === selectedAgent.id && !el.items.includes(id)
								? { ...el, items: [...el.items, id] }
								: el
						);
						setAssignedAgents(() => [...newAssigned]);
					} else {
						setAssignedAgents((prev) =>
							prev.map((el) =>
								el.agentId === targettedAssign.agentId
									? { ...el, items: [...targettedAssign.items, id] }
									: el
							)
						);
					}
				} else {
					setAssignedAgents((prev) => [
						...prev,
						{ agentId: selectedAgent.id, items: [id] },
					]);
				}
			}
		}
	};
	const toggleSelectAll = () => {
		if (selectAll) {
			setSelectedItems([]);
			setSelectAll(false);
			setAssignedAgents((prev) =>
				prev.map((el) =>
					el.agentId === targettedAssign?.agentId ? { ...el, items: [] } : el
				)
			);
		} else {
			setSelectAll(true);
			handleSelectAll();
		}
	};
	const toggleSelectAgent = (person: identityPerson) => {
		if (selectedAgent !== null && selectedAgent.id == person.id) {
			setSelectedAgent(null);
		} else {
			setSelectedAgent({ id: person.id, fullName: person.fullName });
		}
	};
	const targettedAssign = useMemo(() => {
		if (selectedAgent && assignedAgents.length !== 0) {
			const assign = assignedAgents.filter(
				(el) => el.agentId === selectedAgent.id
			)[0];
			return assign;
		}
	}, [selectedAgent, selectedItems, assignedAgents, selectAll]);
	const { data: agents } = useFetchData("/users");

	const Summary = () => {
		const modifiedAssigned =
			assignedAgents &&
			assignedAgents.map((el) => ({
				agent:
					agents &&
					agents.filter((ag: agent) => ag.id == el.agentId)[0].fullName,
				items:
					order &&
					order.orderDetails
						.filter((det: OrderItem) => el.items.includes(det.id))
						.map((el: OrderItem) => (el.product ? el.product.name : "")),
			}));

		return (
			<div className="p-2 mt-3 bg-white">
				<p className="mb-2 text-xs font-bold">Summary</p>
				<div className="grid w-full grid-cols-2">
					<p className="py-2 text-xs font-bold">Agent</p>
					<p className="py-2 text-xs font-bold">Items</p>
				</div>
				<div>
					{modifiedAssigned &&
						modifiedAssigned.map((el) =>
							el.items.length !== 0 ? (
								<div className="grid grid-cols-2 text-xs" key={el.agent}>
									<p>{el.agent}</p>
									<div>
										{el.items.map((item: string) => (
											<p key={crypto.randomUUID()}>{item}</p>
										))}
									</div>
								</div>
							) : null
						)}
				</div>
			</div>
		);
	};
	const handleReset = () => {
		setAssignedAgents([]);
		setSelectedItems([]);
		setSelectedAgent(null);
	};

	const assignAgents = async () => {
		const submitData = assignedAgents
			.map((el) =>
				el.items.length !== 0
					? {
							agentId: el.agentId,
							orderItems: el.items,
					  }
					: null
			)
			.filter((el) => (el ? el : null));

		await instance
			.post("/orders/assign/agent", {
				agentId: submitData[0]?.agentId,
				orderItems: submitData[0]?.orderItems,
			})
			.then(() => {
				toast.success("success !!!!");
			})
			.catch((err) => {
				toast.error(err.code);
				console.log("errr", err);
			});
	};

	return (
		<div>
			<BackButton />
			{order && (
				<>
					<div className="grid w-full grid-cols-4 gap-3 my-2 ">
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
					<div className="flex justify-between gap-3">
						<div className="w-1/2 ">
							<p className="my-2 text-xs font-medium">List of items</p>
							<div className="grid grid-cols-3 p-2 my-1  bg-white rounded-[4px]">
								<div className="flex items-center gap-2 text-xs font-bold cursor-pointer">
									{selectedAgent !== null ? (
										selectAll &&
										targettedAssign &&
										targettedAssign.items.length ===
											order.orderDetails.length ? (
											<MdOutlineCheckBox
												onClick={toggleSelectAll}
												className="w-4 h-4"
											/>
										) : (
											<MdOutlineCheckBoxOutlineBlank
												onClick={toggleSelectAll}
												className="w-4 h-4"
											/>
										)
									) : null}
									<p>Name</p>
								</div>
								<p className="text-xs font-bold">Quantity</p>
								<p className="text-xs font-bold">Price</p>
							</div>
							<div className="my-1 bg-white rounded-[4px] p-2">
								{order.orderDetails &&
									order.orderDetails.map((det: OrderItem) => (
										<div
											onClick={() => {
												toggleSelectItem(det.id);
											}}
											key={crypto.randomUUID()}
											className="grid items-center grid-cols-3 py-2 cursor-pointer hover:bg-slate-200 ">
											<div className="flex items-center gap-2">
												{selectedAgent && targettedAssign ? (
													targettedAssign.items.includes(det.id) ? (
														<MdOutlineCheckBox className="w-4 h-4" />
													) : (
														<MdOutlineCheckBoxOutlineBlank className="w-4 h-4" />
													)
												) : null}

												<p className="text-xs">
													{det.product ? det.product.name : ""}
												</p>
											</div>
											<p className="text-xs">{det.quantity}</p>
											<p className="text-xs">
												{det.product ? det.product.price : ""}
											</p>
										</div>
									))}
							</div>
						</div>
						<div className="w-1/2">
							<p className="my-2 text-xs font-medium">Assign Order</p>
							<div className="w-full p-2 bg-white">
								{agents &&
									agents
										.filter((el: agent) => el.role === "AGENT")
										.map((agent: agent) => (
											<div
												onClick={() => {
													toggleSelectAgent(agent);
												}}
												key={agent.id}
												className={`${
													selectedAgent && selectedAgent.id === agent.id
														? "border-[1.5px] border-theme-yellow"
														: " "
												} mb-2  w-full cursor-pointer  p-2 rounded-[6px] bg-slate-100`}>
												<p className="text-xs font-medium">{agent.fullName}</p>
												<p className="text-xs">{agent.telephone}</p>
												<p className="text-xs">{agent.location}</p>
											</div>
										))}
							</div>
							<Summary />
							<button
								onClick={assignAgents}
								className="w-full rounded-[4px] py-2 bg-teal-800 my-2 text-white text-xs font-bold">
								Assign order{" "}
							</button>
							<button
								onClick={handleReset}
								className="w-full rounded-[4px] py-2 bg-pink-800 my-2 text-white text-xs font-bold">
								Reset{" "}
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ProcessOrder;
