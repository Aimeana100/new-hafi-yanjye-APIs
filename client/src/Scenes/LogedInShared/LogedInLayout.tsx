import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { navitem, user } from "../../shared/types";
import TopBar from "./TopBar";
import { getUser } from "../../store";
import { useSelector } from "react-redux";
import { agentNavs, customerNavs, navlinks } from "../../shared/constants";

const LogedInLayout = () => {
	const user = useSelector(getUser);
	console.log("is logged in");

	const role: string = "ADMIN";
	const navs: navitem[] =
		role === "ADMIN"
			? navlinks
			: navlinks.filter((el) => el.link === "orders" || el.link === "");

	if (user) {
		const sideNavs = (user: user) => {
			if (user) {
				if (user.role === "ADMIN") {
					return navs;
				} else if (user.role === "AGENT") {
					return agentNavs;
				} else if (user.role === "CUSTOMER") {
					return customerNavs;
				} else {
					return navs;
				}
			} else {
				return navs;
			}
		};

		return (
			<div className="grid w-full grid-cols-8 bg-primary-backg">
				<SideBar navlinks={sideNavs(user)} backgroundColor="bg-sidebar-bg" />
				<div className="col-span-6 ">
					<TopBar />
					<div className="px-6 py-1">
						<Outlet context={{ userRole: role }} />
					</div>
				</div>
			</div>
		);
	} else {
		return <Navigate to="/" />;
	}
};

export default LogedInLayout;
