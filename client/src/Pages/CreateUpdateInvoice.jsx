import { Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const CreateUpdateInvoice = () => {
	const { action } = useParams();
	return <Title order={1}>This is the {action} invoice page</Title>;
};

// This page will allow the user to create a new invoice or edit details on an existing one

export default CreateUpdateInvoice;
