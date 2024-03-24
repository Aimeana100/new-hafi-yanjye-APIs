import { Link } from "react-router-dom";

interface createButtonProps {
	text: string;
}

function CreateButton({ text }: createButtonProps) {
	return (
		<div>
			<Link
				to="create"
				className="px-4 py-1 text-xs text-white rounded-sm bg-theme-yellow">
				{" "}
				{text}
			</Link>
		</div>
	);
}

export default CreateButton;
