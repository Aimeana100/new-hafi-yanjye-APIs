// import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../store";
import { useSelector } from "react-redux";

// interface privateRoutesProps {
// 	allowedPositions?: string[];
// }
export const PrivateRoutes = () => {
	const user = useSelector(getUser);
	console.log("user", user);

	const localHostUser = localStorage.getItem("user");
	const token = localStorage.getItem("token");
	if (!user && !token && !localHostUser) {
		return <Navigate to="/" />;
	} else if (user) {
		if (user.role === "AGENT") {
			return <Navigate to={`/agent`} />;
		} else if (user.role === "CUSTOMER") {
			return <Navigate to={`/customer`} />;
		} else {
			console.log("here-bro");

			return <Navigate to={`/admin`} />;
		}
	}
};
