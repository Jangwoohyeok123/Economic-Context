import styled from 'styled-components';

const PickedTableWrapper = styled.table``;

export default function PickedTable() {
	return (
		<PickedTableWrapper>
			<tr>
				<th>Indicator</th>
				<th>volality</th>
				<th>category</th>
			</tr>
			<tr>
				<td>test1</td>
				<td>test1</td>
				<td>test1</td>
			</tr>
		</PickedTableWrapper>
	);
}
