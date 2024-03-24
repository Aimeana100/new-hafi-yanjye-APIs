import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./Scenes/AuthPages";
import ResetPassword from "./Scenes/AuthPages/ResetPassword";
import Signup from "./Scenes/AuthPages/Signup";
import Login from "./Scenes/AuthPages/Login";
// import { AnimatePresence } from "framer-motion";
import LogedInLayout from "./Scenes/LogedInShared/LogedInLayout";
import AdminDashboard from "./Scenes/AdminDashboard";
import Products from "./Scenes/Products";
import Categories from "./Scenes/Categories";
import Orders from "./Scenes/Orders";
import Agents from "./Scenes/Agents";
import Suppliers from "./Scenes/Suppliers";
import Locations from "./Scenes/Locations";
import Analytics from "./Scenes/Analytics";
import AllProducts from "./Scenes/Products/AllProducts";
import CreateProduct from "./Scenes/Products/CreateProduct";
import BulkCreateProducts from "./Scenes/Products/BulkCreateProducts";
import AllCategories from "./Scenes/Categories/AllCategories";
import CreateCategory from "./Scenes/Categories/CreateCategory";
import Page404 from "./Scenes/ErrorPages/Page404";
// import { PrivateRoutes } from "./shared/PrivateRoutes";
import AllDiscounts from "./Scenes/Discounts/AllDiscounts";
import DiscCoupLayout from "./Scenes/Discounts/DiscCoupLayout";
import AllCoupons from "./Scenes/Discounts/AllCoupons";
import CreateDiscount from "./Scenes/Discounts/CreateDiscount";
import DiscountDetails from "./Scenes/Discounts/DiscountDetails";
import CreateCoupon from "./Scenes/Discounts/CreateCoupon";
import CouponDetails from "./Scenes/Discounts/CouponDetails";
import AllOrders from "./Scenes/Orders/AllOrders";
import ViewOrder from "./Scenes/Orders/ViewOrder";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import AllAgents from "./Scenes/Agents/AllAgents";
import RegisterAgent from "./Scenes/Agents/RegisterAgent";
import AgentDetails from "./Scenes/Agents/AgentDetails";
import AllSuppliers from "./Scenes/Suppliers/AllSuppliers";
import RegisterSupplier from "./Scenes/Suppliers/RegisterSupplier";
import SupplierDetails from "./Scenes/Suppliers/SupplierDetails";
import Order from "./Scenes/Orders/Order";
import ProcessOrder from "./Scenes/Orders/ProcessOrder";
import AgentOrderDetails from "./Scenes/AgentsDashoard/AgentOrderDetails";
import AgentLayout from "./Scenes/AgentsDashoard/AgentLayout";
import AgentDashboard from "./Scenes/AgentsDashoard";
import AgentOrders from "./Scenes/AgentsDashoard/AgentOrders";
import AllAgentOrders from "./Scenes/AgentsDashoard/AllAgentOrders";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import CouponsLayout from "./Scenes/Discounts/CouponsLayout";
import AssignedItemsTab from "./Scenes/AgentsDashoard/AssignedItemsTab";
import AgentOrderProcess from "./Scenes/AgentsDashoard/AgentOrderProcess";
import CustomerLayout from "./Scenes/CustomerDashboard";
import CustomerDashboard from "./Scenes/CustomerDashboard/CustomerDashboard";
import CustomerOrders from "./Scenes/CustomerDashboard/CustomerOrders";
import AllCustomerOrders from "./Scenes/CustomerDashboard/AllCustomerOrders";
import CustomerOrderDetails from "./Scenes/CustomerDashboard/CustomerOrderDetails";
import DriverLayout from "./Scenes/DriverDashboard";
import DriverDashboard from "./Scenes/DriverDashboard/DriverDashboard";
import DriverOrders from "./Scenes/DriverDashboard/DriverOrders";
import AllDriverOrders from "./Scenes/DriverDashboard/AllDriverOrders";
import DriverOrderDetails from "./Scenes/DriverDashboard/DriverOrderDetails";
import FinanceUserLayout from "./Scenes/Finance";
import FinanceUserDashboard from "./Scenes/Finance/FinanceUserDashboard";
import NewPassword from "./Scenes/AuthPages/NewPassword";
import AllLocations from "./Scenes/Locations/AllLocations";
import CreateLocation from "./Scenes/Locations/CreateLocation";

function App() {
	return (
		<>
			<>
				<Toaster position="top-center" toastOptions={{ duration: 5000 }} />
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route index element={<Login />} />
						<Route path="register" element={<Signup />} />
						<Route path="reset-password" element={<ResetPassword />} />
						<Route path="/password/reset/:token" element={<NewPassword />} />
					</Route>
					<Route path="/admin" element={<LogedInLayout />}>
						<Route index element={<AdminDashboard />} />
						<Route path="products" element={<Products />}>
							<Route index element={<AllProducts />} />
							<Route path="create" element={<CreateProduct />} />
							<Route path="bulk-create" element={<BulkCreateProducts />} />
						</Route>
						<Route path="categories" element={<Categories />}>
							<Route index element={<AllCategories />} />
							<Route path="create" element={<CreateCategory />} />
						</Route>
						<Route path="orders" element={<Orders />}>
							<Route index element={<AllOrders />} />
							<Route path=":orderId" element={<Order />}>
								<Route index element={<ViewOrder />} />
								<Route path="process" element={<ProcessOrder />} />
							</Route>
						</Route>
						<Route path="discounts" element={<DiscCoupLayout />}>
							<Route index element={<AllDiscounts />} />
							<Route path="create" element={<CreateDiscount />} />
							<Route path=":id" element={<DiscountDetails />} />
							<Route path="coupons" element={<CouponsLayout />}>
								<Route index element={<AllCoupons />} />
								<Route path="create" element={<CreateCoupon />} />
								<Route path=":id" element={<CouponDetails />} />
							</Route>
						</Route>
						<Route path="agents" element={<Agents />}>
							<Route index element={<AllAgents />} />
							<Route path="create" element={<RegisterAgent />} />
							<Route path=":agentId" element={<AgentDetails />} />
						</Route>
						<Route path="suppliers" element={<Suppliers />}>
							<Route index element={<AllSuppliers />} />
							<Route path="create" element={<RegisterSupplier />} />
							<Route path=":supplierId" element={<SupplierDetails />} />
						</Route>
						<Route path="locations" element={<Locations />}>
							<Route index element={<AllLocations />} />
							<Route path="create" element={<CreateLocation />} />
						</Route>
						<Route path="analytics" element={<Analytics />} />
					</Route>
					<Route path="/agent" element={<AgentLayout />}>
						<Route index element={<AgentDashboard />} />
						<Route path="orders" element={<AgentOrders />}>
							<Route index element={<AllAgentOrders />} />
							<Route path=":id" element={<AgentOrderDetails />}>
								<Route index element={<AssignedItemsTab />} />
								<Route path="process" element={<AgentOrderProcess />} />
							</Route>
						</Route>
					</Route>
					<Route path="/customer" element={<CustomerLayout />}>
						<Route index element={<CustomerDashboard />} />
						<Route path="orders" element={<CustomerOrders />}>
							<Route index element={<AllCustomerOrders />} />
							<Route path=":id" element={<CustomerOrderDetails />} />
						</Route>
					</Route>
					<Route path="/driver" element={<DriverLayout />}>
						<Route index element={<DriverDashboard />} />
						<Route path="orders" element={<DriverOrders />}>
							<Route index element={<AllDriverOrders />} />
							<Route path=":id" element={<DriverOrderDetails />} />
						</Route>
					</Route>
					<Route path="/finance" element={<FinanceUserLayout />}>
						<Route index element={<FinanceUserDashboard />} />
						<Route path="orders" element={<AgentOrders />}>
							<Route index element={<AllAgentOrders />} />
							<Route path=":id" element={<AgentOrderDetails />}>
								<Route index element={<AssignedItemsTab />} />
								<Route path="process" element={<AgentOrderProcess />} />
							</Route>
						</Route>
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</>
		</>
	);
}

export default App;

// {
// 	<GoogleOAuthProvider clientId="789303875610-cuhkfvk71qohmmijih1d6tmp1dtdlsk1.apps.googleusercontent.com">
// <Login />
// 	</GoogleOAuthProvider>;
// }

// element={<PrivateRoutes />}
