import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../../store";
import SideBar from "../LogedInShared/SideBar";
import { DriverNavs } from "../../shared/constants";
import TopBar from "../LogedInShared/TopBar";

const DriverLayout = () => {
	const user = useSelector(getUser);

	if (user) {
		return (
			<div className="grid w-full grid-cols-8 bg-primary-backg">
				<SideBar navlinks={DriverNavs} backgroundColor="bg-sidebar-bg" />
				<div className="col-span-6 ">
					<TopBar />
					<div className="px-6 py-1">
						<Outlet context={{ userRole: user.role }} />
					</div>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/" />;
	}
};

export default DriverLayout;
