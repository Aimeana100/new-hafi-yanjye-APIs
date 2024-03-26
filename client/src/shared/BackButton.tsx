//jshint esversion:9
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
function BackButton() {
	const navigate = useNavigate();

	return (
		<button
			className="flex items-center gap-2 px-4 py-1 text-xs font-medium bg-purple-900 rounded rounded-2 text-slate-100"
			onClick={() => navigate(-1)}>
			<HiOutlineArrowLeftCircle className="text-white" />
			Back
		</button>
	);
}

export default BackButton;
