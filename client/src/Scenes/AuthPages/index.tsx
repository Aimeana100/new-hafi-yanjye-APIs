import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="relative flex items-center w-full min-h-screen p-0 m-0 font-nunito">
			<div className="flex flex-col w-full p-6 md:w-1/2 md:mx-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
