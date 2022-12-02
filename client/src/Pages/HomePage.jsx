// UI-Related
import { Button, Card, SimpleGrid, Title } from "@mantine/core";

// React Router
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<Card className="card center">
			<Title order={1}>Welcome to &lt;PROJECT_NAME&gt;</Title>
			<br />
			<SimpleGrid cols={2}>
				<Button
					size="xl"
					color="yellow.6"
					onClick={() => navigate("/invoice/create")}
				>
					Create An Invoice
				</Button>
				<Button
					size="xl"
					variant="outline"
					color="yellow.6"
					onClick={() => navigate("/database/invoices")}
				>
					Search Invoices
				</Button>
				<Button
					size="xl"
					color="orange.6"
					onClick={() => navigate("/customer/create")}
				>
					Create A Customer
				</Button>
				<Button
					size="xl"
					color="orange.6"
					variant="outline"
					onClick={() => navigate("/database/customers")}
				>
					Search Customers
				</Button>
			</SimpleGrid>
			<br />
			<Button
				fullWidth
				size="xl"
				variant="gradient"
				gradient={{ from: "yellow.6", to: "orange.6" }}
				onClick={() => navigate("/vat-return")}
			>
				Submit A VAT Return
			</Button>
		</Card>
	);
};

// This is the website's home page.
// The app's title and my stakeholder's business logo will be displayed here, along with links to all other pages.

export default HomePage;
