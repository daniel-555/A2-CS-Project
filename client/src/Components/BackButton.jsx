import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
// This component has the purpose of sending the user back to the page specified when rendered

const BackButton = ({ size, to }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(to);
	};
	return (
		<Button
			fullWidth
			size={size || "lg"}
			color="gray.7"
			variant="outline"
			onClick={handleClick}
		>
			Back
		</Button>
	);
};

export default BackButton;
