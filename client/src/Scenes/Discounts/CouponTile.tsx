import { useNavigate } from "react-router-dom";
import { isDatePast } from "../../shared/constants";
import { ICoupon } from "../../shared/types";

interface Props {
	coupon: ICoupon;
}

function CouponTile({ coupon }: Props) {
	const navigate = useNavigate();
	return (
		<div
			className="grid grid-cols-5 cursor-pointer"
			onClick={() => {
				navigate(`${coupon.id}`);
			}}>
			<div className="rounded-[8px] my-2">
				<p className="text-sm font-bold">CODE</p>
				<p className="text-sm">{coupon.code}</p>
			</div>
			<div className="rounded-[8px] my-2">
				<p className="text-sm font-bold">Start Date</p>
				<p className="text-sm">
					{new Date(coupon.startAt).toLocaleDateString("fr-FR")}
				</p>
			</div>
			<div className="rounded-[8px] my-2">
				<p className="text-sm font-bold">End Date</p>
				<p className="text-sm">
					{new Date(coupon.endAt).toLocaleDateString("fr-FR")}
				</p>
			</div>
			<div className="rounded-[8px] my-2">
				<p className="text-sm font-bold">Percentage</p>
				<p className="text-sm">{coupon.rate}</p>
			</div>
			<div className="rounded-[8px] my-2">
				<p className="text-sm font-bold">Status</p>

				{!isDatePast(new Date(coupon.endAt)) &&
				isDatePast(new Date(coupon.startAt)) ? (
					<p className="text-sm ps-2 font-bold py-1 text-[rgba(5,46,22,0.2)] bg-[rgba(20,83,45,0.2)]">
						On going
					</p>
				) : isDatePast(new Date(coupon.endAt)) &&
				  isDatePast(new Date(coupon.startAt)) ? (
					<p className="text-sm ps-2 font-bold py-1 text-[rgb(151,0,43)] bg-[rgb(240,136,153)]">
						Ended
					</p>
				) : (
					<p className="text-sm ps-2 font-bold py-1 text-[rgb(0,70,151)] bg-[rgb(163,205,251,0.5)]">
						Scheduled
					</p>
				)}
			</div>
		</div>
	);
}

export default CouponTile;
