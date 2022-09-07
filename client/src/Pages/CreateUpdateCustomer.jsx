import { Card, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const CreateUpdateCustomer = ({ action }) => {
	const { customer } = useParams();
	return (
		<Card className="card center">
			<Title order={1}>
				{action === "create"
					? "Create a Customer"
					: `Update ${customer}'s Details`}
			</Title>
		</Card>
	);
};

// This component will allow the user to create a new customer or edit the details of an existing one

export default CreateUpdateCustomer;
