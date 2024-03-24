import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";

interface PaymentModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PaymentForm {
	paymentMethod: string;
	telephone: string;
}

function PaymentModal({ open, setOpen }: PaymentModalProps) {
	const { register } = useForm<PaymentForm>();

	function onCloseModal() {
		setOpen(false);
	}

	return (
		<>
			<Modal show={open} size="md" onClose={onCloseModal} popup>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<div>
							<div className="block mb-2">
								<Label htmlFor="methods" value="Select Payment Method" />
							</div>
							<Select {...register("paymentMethod")} required>
								<option value="mobile money">Mobile Money</option>
								{/* {<option value='visacard'></option>} */}
							</Select>
						</div>
						<div>
							<div className="block mb-2">
								<Label htmlFor="telephone" value="Telephone" />
							</div>
							<TextInput {...register("telephone")} type="text" required />
						</div>
						<Button>Submit</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default PaymentModal;
