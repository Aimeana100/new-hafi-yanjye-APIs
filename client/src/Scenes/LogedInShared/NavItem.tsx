import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
	page: string;
	link: string;
	location: string;
	defaultColor: string;
	children: ReactNode;
}

export const NavItem = ({
	page,
	link,
	location,
	defaultColor,
	children,
}: Props) => {
	const { pathname } = useLocation();
	const url = pathname.split("/");

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`flex text-sm items-center gap-3 p-2 capitalize font-medium ${
					isActive && location === url[2]
						? `text-white bg-${defaultColor} rounded-tr-[6px] rounded-bl-[6px]`
						: "  hover:bg-tab-hover duration-300 ease-in-out delay-50"
				} `
			}>
			{children}
			{page}
		</NavLink>
	);
};
