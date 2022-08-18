import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUpdateCustomer from "./Pages/CreateUpdateCustomer";
import CreateUpdateInvoice from "./Pages/CreateUpdateInvoice";
import DatabaseQuery from "./Pages/DatabaseQuery";
import HomePage from "./Pages/HomePage";
import VATReturn from "./Pages/VATReturn";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/vat-return" element={<VATReturn />} />
				<Route
					path="/customer/:action"
					element={<CreateUpdateCustomer />}
				/>
				<Route path="/invoice/:action" element={<CreateUpdateInvoice />} />
				<Route path="/database/:collection" element={<DatabaseQuery />} />
			</Routes>
		</BrowserRouter>
	);
};

// This file is the base of the whole application. It routes all of the different pages to the code each one should run.

export default App;
