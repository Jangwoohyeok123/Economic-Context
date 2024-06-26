import styled from 'styled-components';

interface CateogoryName_Props {
	$categoryColor: string;
}

export const CategoryName = styled.span<CateogoryName_Props>`
	background: ${Props => Props.$categoryColor};
	color: #fff;
	font-size: 0.8rem;
	display: flex;
	justify-content: center;
	padding: 3px 5px;
	border-radius: 20px;
`;
