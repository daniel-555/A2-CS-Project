import { Button, Card, SimpleGrid, Title } from "@mantine/core";

const HomePage = () => {
	return (
		<Card className="card center">
			<Title order={1}>Welcome to &lt;PROJECT_NAME&gt;</Title>
			<br />
			<SimpleGrid cols={2}>
				<Button size="xl" color="yellow.6">
					Create An Invoice
				</Button>
				<Button size="xl" variant="outline" color="yellow.6">
					Search Invoices
				</Button>
				<Button size="xl" color="orange.6">
					Create A Customer
				</Button>
				<Button size="xl" color="orange.6" variant="outline">
					Search Customers
				</Button>
			</SimpleGrid>
		</Card>
	);
};

// This is the website's home page.
// The app's title and my stakeholder's business logo will be displayed here, along with links to all other pages.

export default HomePage;
