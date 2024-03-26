import { LuLayoutDashboard } from "react-icons/lu";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { LiaSitemapSolid } from "react-icons/lia";
import { PiNotepadThin } from "react-icons/pi";
import { CiDiscount1, CiMap } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import CryptoJS from "crypto-js";
import { navitem } from "./types";
import { IoAnalytics } from "react-icons/io5";
export const serverUrl: string = "http://108.181.195.65:5000";
//export const serverUrl: string = "https://hafi-yanjye-api.onrender.com/";
export const localServer: string = "http://localhost:3000/";
export const testingUrl: string = "https://dummyjson.com/";
const mySecret: string = "hafi-yanjye-secret";

export const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "admin",
	},
	{
		page: "products",
		link: "products",
		icon: <TfiShoppingCartFull />,
		location: "products",
	},
	{
		page: "Categories",
		link: "categories",
		icon: <LiaSitemapSolid />,
		location: "categories",
	},
	{
		page: "Orders",
		link: "orders",
		icon: <PiNotepadThin />,
		location: "orders",
	},
	{
		page: "Discounts",
		link: "discounts",
		icon: <CiDiscount1 />,
		location: "discounts",
	},
	{
		page: "Agents",
		link: "agents",
		icon: <CiDeliveryTruck />,
		location: "agents",
	},
	{
		page: "Suppliers",
		link: "suppliers",
		icon: <CiUser />,
		location: "suppliers",
	},
	{
		page: "Collecation sites",
		link: "locations",
		icon: <CiMap />,
		location: "locations",
	},
	{
		page: "Analytics",
		link: "analytics",
		icon: <IoAnalytics />,
		location: "analytics",
	},
];

export const customerNavs: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "admin",
	},
	{
		page: "All Orders",
		link: "orders",
		icon: <PiNotepadThin />,
		location: "orders",
	},
];

export const agentNavs: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "admin",
	},
	{
		page: "Orders",
		link: "orders",
		icon: <PiNotepadThin />,
		location: "orders",
	},
	{
		page: "Analytics",
		link: "analytics",
		icon: <IoAnalytics />,
		location: "analytics",
	},
	{
		page: "Collecation sites",
		link: "locations",
		icon: <CiMap />,
		location: "locations",
	},
];
export const DriverNavs: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "admin",
	},
	{
		page: "Orders",
		link: "orders",
		icon: <PiNotepadThin />,
		location: "orders",
	},
];
export const FinanceNavs: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <LuLayoutDashboard />,
		location: "admin",
	},
	{
		page: "Sales",
		link: "sales",
		icon: <PiNotepadThin />,
		location: "sales",
	},
	{
		page: "Reports",
		link: "reports",
		icon: <PiNotepadThin />,
		location: "reports",
	},
];

export const fileToDataURL = (file: File): Promise<any> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
};

export const encryptTokenAndStoreToLocalStorage = (data: string): void => {
	const encrypted = CryptoJS.AES.encrypt(data, mySecret).toString();
	localStorage.setItem("token", encrypted);
};

export const decryptAndRetrieveToken = (): string => {
	const encrypted = localStorage.getItem("token");

	const decrypted = encrypted
		? CryptoJS.AES.decrypt(encrypted, mySecret).toString(CryptoJS.enc.Utf8)
		: "";
	return decrypted;
};

export function formatDate(customDateString: string): string {
	const date = new Date(customDateString);

	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear().toString();
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function isDatePast(inputDate: Date): boolean {
	const currentDate = new Date();
	return inputDate < currentDate;
}
export function randomStringGenerator(): string {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@";
	let randomString = "";

	for (let i = 0; i < 8; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		randomString += charset[randomIndex];
	}

	return randomString;
}
