import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { logout } from "../../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store";
const TopNavDropdown = () => {
	const user = useSelector(getUser);
	const dispatch = useDispatch();
	const [profileOn, setProfileOn] = useState(false);
	const handleLogoutUser = () => {
		dispatch(logout());
	};
	return (
		<div
			className="relative w-3/12 cursor-pointer"
			onClick={() => {
				setProfileOn(!profileOn);
			}}>
			<div className="flex items-center justify-between px-4 py-1 bg-white rounded-full ">
				<div className="flex items-center gap-3">
					<div className="flex items-center justify-center w-6 h-6 text-white rounded-full bg-theme-yellow">
						<CiUser />
					</div>
					<div>
						<p className="text-xs font-medium capitalize">{user?.fullname}</p>
						<p className="text-xs ">{user?.role}</p>
					</div>
				</div>

				<IoIosArrowDown
					className={` transition-all duration-300 ease-in-out w-3 h-3 ${
						profileOn ? " rotate-180" : ""
					}`}
				/>
			</div>
			<div
				className={`${profileOn ? "absolute" : "hidden"} w-full px-4 bg-white`}>
				<div
					onClick={handleLogoutUser}
					className="flex items-center gap-3 p-2 text-xs font-light ">
					<IoIosLogOut />
					<p className="cursor-pointer">Logout</p>
				</div>
			</div>
		</div>
	);
};

const TopBar = () => {
	const user = useSelector(getUser);
	const { pathname } = useLocation();
	const tab: string = pathname.split("/")[2];
	const { register } = useForm();

	return (
		<div className="flex items-center justify-between px-6 py-3 text-black bg-white ">
			{tab ? (
				<p className="text-sm font-bold capitalize">{tab}</p>
			) : (
				user &&
				user.role !== "CUSTOMER" && (
					<form className="flex border-2 border-[#8A8A8A] items-center gap-3 p-1 px-4 bg-search-bg rounded-[8px] ">
						<HiMagnifyingGlass className="w-3 h-3 text-login-blue" />
						<input
							placeholder="Search"
							className="text-xs bg-transparent focus:outline-none focus-border-none placeholder:text-xs placeholder:font-bold"
							{...register("query")}
						/>
					</form>
				)
			)}
			<div className="flex gap-3 ">
				<Link
					to="notifications"
					className="flex items-center gap-3 text-xs font-medium">
					<IoMdNotificationsOutline className="w-3 h-3" />
					Notifications
				</Link>
				<Link
					to="settings"
					className="flex items-center gap-3 text-xs font-medium">
					<IoIosSettings className="w-3 h-3" />
					Settings
				</Link>
			</div>

			<TopNavDropdown />
		</div>
	);
};

export default TopBar;
