import { Button } from "@mantine/core";
import { HiHome } from "react-icons/hi";
// This component has the sole purpose of sending the user back to the home page,
// regardless of where they are on the site.

const HomeButton = ({ size }) => {
	const handleClick = () => {};
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
