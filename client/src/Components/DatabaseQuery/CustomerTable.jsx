import { Table } from "@mantine/core";

const CustomerTable = ({ data, search }) => {
	// The .filter method takes in an array and outputs a new array
	// of all items that meet a certain criteria
	let filteredData = data.filter((customer) =>
		customer.customerName.includes(search)
	);

	// This formats the data into that which the table can display
	let rows = (search === "" ? data : filteredData).map((customer) => (
		<tr key={customer.id}>
			<td>{customer.customerName}</td>
			<td>{customer.postcode}</td>
			<td>{customer.email}</td>
			<td>{customer.mobileNo}</td>
		</tr>
	));
	return (
		<>
			<Table>
				<thead>
					<tr>
						{/* These are the headers for the table */}
						<th>Customer Name</th>
						<th>Postcode</th>
						<th>Email</th>
						<th>Mobile Number</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</>
	);
};

export default CustomerTable;
