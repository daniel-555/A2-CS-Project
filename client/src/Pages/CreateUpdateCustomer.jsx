import { Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const CreateUpdateCustomer = () => {
	const { action } = useParams();
	return <Title order={1}>This is the {action} customer page</Title>;
};

// This component will allow the user to create a new customer or edit the details of an existing one

export default CreateUpdateCustomer;
