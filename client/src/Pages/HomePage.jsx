// UI-Related
import { Button, Card, SimpleGrid, Title } from "@mantine/core";

const HomePage = () => {
	return (
		<Card className="card center">
			{/* <PROJECT_NAME> will be replaced with the actual project name once my stakeholders come up with a name in either prototype 3 or 4 */}
			<Title order={1}>Welcome to &lt;PROJECT_NAME&gt;</Title>
			<br />
			<SimpleGrid cols={2}>
				{/* Displays 4 buttons to direct the user to each page of the website */}
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

export default HomePage;
