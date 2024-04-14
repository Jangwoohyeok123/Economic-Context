import styled from 'styled-components';

const AnotherIndicatorsContainer = styled.section`
	padding-top: 50px;

	> h3 {
		border-bottom: 1px solid #ccc;
		height: 50px;
		padding: 0 20px;
		font-size: 1.5rem;
		font-weight: 500;
		display: flex;
		justify-content: left;
		align-items: center;
	}

	> div {
		padding: 20px;
		height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export default function AnotherIndicators() {
	return (
		<AnotherIndicatorsContainer>
			<h3>Another Indicators</h3>
			<div>AnotherIndicators</div>
		</AnotherIndicatorsContainer>
	);
}
