import styled from 'styled-components';

interface Volatility_Props {
	volatility: number;
}

export const Volatility = styled.span<Volatility_Props>`
	font-size: 0.9rem;
	color: ${props => {
		const { volatility } = props;

		if (volatility > 0) return 'red';
		if (volatility === 0) return '#222';
		else return 'blue';
	}};
`;
