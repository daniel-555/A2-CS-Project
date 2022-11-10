// Page routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import CreateUpdateCustomer from "../../Pages/CreateUpdateCustomer";
import CreateUpdateInvoice from "../../Pages/CreateUpdateInvoice";
import ViewInvoice from "../../Pages/ViewInvoice";
import DatabaseQuery from "../../Pages/DatabaseQuery";
import HomePage from "../../Pages/HomePage";
import VATReturn from "../../Pages/VATReturn";
import SignOutButton from "../SignOutButton";

const SignedIn = () => {
	return (
		<>
			<SignOutButton />
			<BrowserRouter>
				{/* Directory of all routes on the site */}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/vat-return" element={<VATReturn />} />
					{/* Routes can be nested for organisation as shown below */}
					<Route path="/customer">
						<Route
							path="create"
							element={<CreateUpdateCustomer action="create" />}
						/>
						<Route
							path="update/:customerID"
							element={<CreateUpdateCustomer action="update" />}
						/>
					</Route>
					<Route path="/invoice">
						<Route
							path="create"
							element={<CreateUpdateInvoice action="create" />}
						/>
						<Route
							// the :invoice parameter is a user input in the url
							path="update/:invoice"
							element={<CreateUpdateInvoice action="update" />}
						/>
						<Route path="view/:invoice" element={<ViewInvoice />} />
					</Route>
					<Route path="/database">
						<Route
							path="customers"
							element={<DatabaseQuery collection="customers" />}
						/>
						<Route
							path="invoices"
							element={<DatabaseQuery collection="invoices" />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default SignedIn;
