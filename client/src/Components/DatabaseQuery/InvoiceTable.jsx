import { Table } from "@mantine/core";
import EditButton from "./EditButton";

const InvoiceTable = ({ data, search }) => {
	// Filter the data by the search input
	// .toLowerCase() insures that the search is not case sensitive
	const filteredData = data.filter((invoice) =>
		invoice.id.toLowerCase().includes(search.toLowerCase())
	);

	// Show all the fields instead of none when the search is empty
	const rows = (search === "" ? data : filteredData).map((invoice) => (
		<tr key={invoice.id}>
			<td>{invoice.id}</td>
			<td>{invoice.companyName}</td>
			<td>{invoice.dateDue}</td>
			<td>£{invoice.totalPrice.toFixed(2)}</td>
			<td>
				<EditButton table="invoices" id={invoice.id} />
			</td>
		</tr>
	));
	return (
		<Table highlightOnHover>
			<thead>
				<tr>
					{/* These are the headers for the table */}
					<th>Invoice Number</th>
					<th>Customer</th>
					<th>Date Due</th>
					<th>Balance Due</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</Table>
	);
};

export default InvoiceTable;
