import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import CreateButton from "../../shared/CreateButton";
import useFetchData from "../../Hooks/useFetchData";
import { ICoupon } from "../../shared/types";
import CouponTile from "./CouponTile";

function AllCoupons() {
	const { register } = useForm();
	const { data: coupons } = useFetchData("/coupons");

	return (
		<div>
			<div className="flex justify-between p-3 py-6 my-3 bg-white">
				<form className="flex col-span-2 gap-2">
					<div className=" flex-1 flex items-center gap-3 py-0 px-1 bg-white rounded-[8px] border-2 border-[#8A8A8A] ">
						<HiMagnifyingGlass className="w-3 h-3 text-gray-500 " />
						<input
							placeholder="Search"
							className="flex-1 bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-normal"
							{...register("query")}
						/>
					</div>
				</form>
				<CreateButton text="Add New" />
			</div>
			<div className="p-4">
				{coupons &&
					coupons.length !== 0 &&
					coupons.map((el: ICoupon) => <CouponTile key={el.id} coupon={el} />)}
			</div>
		</div>
	);
}

export default AllCoupons;
