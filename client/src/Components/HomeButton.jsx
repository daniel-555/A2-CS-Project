import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
// This component has the sole purpose of sending the user back to the home page,
// regardless of where they are on the site.

const HomeButton = ({ size }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/");
	};
	return (
		<Button
			fullWidth
			size={size || "lg"}
			color="gray.7"
			variant="outline"
			onClick={handleClick}
		>
			Home
		</Button>
	);
};

export default HomeButton;
