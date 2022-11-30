import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const EditButton = ({ table, id }) => {
	const navigate = useNavigate();

	const handlePressed = () => {
		if (table === "customers") {
			navigate(`/customer/update/${id}`);
		} else if (table === "invoices") {
			navigate(`/invoice/update/${id}`);
		}
	};

	return (
		<Button variant="outline" color="yellow.6" onClick={handlePressed}>
			Edit
		</Button>
	);
};

export default EditButton;
