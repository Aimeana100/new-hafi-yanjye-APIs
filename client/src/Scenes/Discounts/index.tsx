import { Link, Outlet } from "react-router-dom";

function Discounts() {
	return (
		<div>
			<div className="flex justify-between w-1/3 my-2">
				<Link to="" className="text-xs font-bold">
					Discounts
				</Link>
				<Link to="coupons" className="text-xs font-bold">
					Coupons
				</Link>
			</div>
			<Outlet />
		</div>
	);
}

export default Discounts;
