import { Logo } from "../../shared/Logo";
import { navitem } from "../../shared/types";
import { NavItem } from "./NavItem";

interface SideBarNavProps {
	navlinks: navitem[];
	backgroundColor: string;
}

const SideBar = ({ navlinks, backgroundColor }: SideBarNavProps) => {
	return (
		<aside
			className={`sticky top-0 self-start min-h-screen col-span-2 ${backgroundColor} `}>
			<div className=" flex flex-col min-w-[24vw]">
				<div className="p-4 basis-1/8">
					<Logo textColor="text-primary-white" />
				</div>
				<div className="w-full">
					{navlinks.map((el) => (
						<NavItem
							key={crypto.randomUUID()}
							page={el.page}
							link={el.link}
							defaultColor="theme-yellow"
							location={el.location}>
							{el.icon}
						</NavItem>
					))}
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
