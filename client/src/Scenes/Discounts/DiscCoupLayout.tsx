import { Link, Outlet, useLocation } from "react-router-dom";

type Props = {};

function DiscCoupLayout({}: Props) {
	const { pathname } = useLocation();
	const paths = pathname.split("/");
	console.log("paths", paths);

	return (
		<div>
			<div className="flex justify-between w-1/3 my-3">
				<Link
					className={`text-xs font-bold pb-2 ${
						paths[3] !== "coupons" && paths[2] === "discounts"
							? "border-b-2 border-b-sky-900"
							: " "
					}`}
					to="">
					Discounts
				</Link>
				<Link
					className={`text-xs font-bold pb-2 ${
						paths.length == 4 && paths[3] === "coupons"
							? "border-b-2 border-b-sky-900"
							: " "
					}`}
					to="coupons">
					Coupons
				</Link>
			</div>
			<Outlet />
		</div>
	);
}

export default DiscCoupLayout;
