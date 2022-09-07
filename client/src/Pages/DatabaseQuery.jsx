import { Title } from "@mantine/core";

const DatabaseQuery = ({ collection }) => {
	return <Title order={1}>This is the {collection} query page</Title>;
};

// This component will allow the user to query both the customers and invoices database.
// The results will be shown in a table with all relevant data displayed.

export default DatabaseQuery;
