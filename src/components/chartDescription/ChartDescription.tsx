import { Indicator_Type } from '@/types/fred';
import styled from 'styled-components';

const DescriptionWrapper = styled.div``;

const Head = styled.h2`
	font-weight: 500;
	font-size: 1.5rem;
	width: 100%;
`;

const Body = styled.div``;

const Section = styled.p`
	padding-bottom: 15px;
	font-size: 0.85rem;
	opacity: 0.9;
	width: 60%;
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
			<Body>
				{sections?.map((section, index) => {
					if (section.length > 1) {
						return <Section key={index}>{section}</Section>;
					}
				})}
			</Body>
		</DescriptionWrapper>
	);
}
