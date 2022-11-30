import { Table } from "@mantine/core";

const CustomerTable = ({ data, search }) => {
	// The .filter method takes in an array and outputs a new array
	// of all items that meet a certain criteria
	let filteredData = data.filter((customer) =>
		customer.companyName.toLowerCase().includes(search.toLowerCase())
	);

	// This formats the data into that which the table can display
	let rows = (search === "" ? data : filteredData).map((customer) => (
		<tr key={customer.id}>
			<td>{customer.companyName}</td>
			<td>{customer.postcode}</td>
			<td>{customer.email}</td>
			<td>{customer.contactNo}</td>
		</tr>
	));
	return (
		<>
			<Table>
				<thead>
					<tr>
						{/* These are the headers for the table */}
						<th>Company Name</th>
						<th>Postcode</th>
						<th>Email</th>
						<th>Contact Number</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	);
};

export default CustomerTable;
