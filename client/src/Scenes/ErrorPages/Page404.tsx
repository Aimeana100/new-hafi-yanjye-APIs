import { useNavigate } from "react-router-dom";

const Page404 = () => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div>
				<p className="my-8 text-[120px] text-center">404</p>
				<p className="my-8 text-xl text-center">Page not found !</p>
				<button
					onClick={() => {
						navigate("/");
					}}
					className="w-full py-2 text-xs border-1 border-slate-500 bg-slate-100">
					Return{" "}
				</button>
			</div>
		</div>
	);
};

export default Page404;
