import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUpdateCustomer from "./Pages/CreateUpdateCustomer";
import CreateUpdateInvoice from "./Pages/CreateUpdateInvoice";
import DatabaseQuery from "./Pages/DatabaseQuery";
import HomePage from "./Pages/HomePage";
import VATReturn from "./Pages/VATReturn";

const App = () => {
	return (
		<MantineProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/vat-return" element={<VATReturn />} />
					<Route path="/customer">
						<Route
							path="create"
							element={<CreateUpdateCustomer action="create" />}
						/>
						<Route
							path="update/:customer"
							element={<CreateUpdateCustomer action="update" />}
						/>
					</Route>
					<Route path="/invoice">
						<Route
							path="create"
							element={<CreateUpdateInvoice action="create" />}
						/>
						<Route
							path="update/:invoice"
							element={<CreateUpdateInvoice action="/update" />}
						/>
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
		</MantineProvider>
	);
};

// This file is the base of the whole application. It routes all of the different pages to the code each one should run.

export default App;
