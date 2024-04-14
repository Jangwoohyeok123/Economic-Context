import { Indicator_Type } from '@/types/fred';
import styled from 'styled-components';

const DescriptionWrapper = styled.div`
	padding-top: 30px;

	h3 {
		/* border-top: 1px solid #ccc; */
		border-bottom: 1px solid #ccc;
		height: 50px;
		padding: 0 20px;
		font-size: 1.5rem;
		font-weight: 500;
		display: flex;
		justify-content: left;
		align-items: center;
	}
`;

const Section = styled.p`
	opacity: 0.85;
	width: 100%;
	padding: 20px;
`;

interface ChartDescription_Props {
	indicator: Indicator_Type;
	children?: React.ReactNode;
}

export default function ChartDescription({ indicator, children }: ChartDescription_Props) {
	const { notes } = indicator;

	const sections = notes?.split('\n');
	return (
		<DescriptionWrapper>
			<h3>notes</h3>
			{sections?.map((section, index) => {
				if (section.length > 1) {
					return <Section key={index}>{section}</Section>;
				}
			})}
		</DescriptionWrapper>
	);
}
