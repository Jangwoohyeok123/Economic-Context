import { Indicator_Type } from '@/types/fred';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import { FaRegStar } from 'react-icons/fa6';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleLoginModal } from '@/actions/actions';
import { Volatility } from '@/styles/Volatility.style';

interface IndicatorDescription_Props {
	indicator: Indicator_Type;
	lastData: number;
	volatility: number;
	categoryId: number;
}

const IndicatorCardDescriptionContainer = styled.div``;

const StarCotainer = styled.div`
	height: 30px;

	.star {
		width: 25px;
		height: 100%;
		cursor: pointer;
	}
`;

export default function IndicatorDescription({ indicator, lastData, volatility, categoryId }: IndicatorDescription_Props) {
	const { title, observation_end } = indicator;
	const dispatch = useDispatch();

	return (
		<IndicatorCardDescriptionContainer>
			<div>
				<h3>{title}</h3>
				<BubblePopButton clickHandler={() => dispatch(toggleLoginModal())}>
					<StarCotainer>
						<FaRegStar className='star' />
					</StarCotainer>
				</BubblePopButton>
			</div>

			<div>
				<span>tag</span>
				<div className='values'>
					<span>{lastData.toFixed(2)}</span>
					<Volatility volatility={volatility}>{volatility >= 0 ? `(+${volatility.toFixed(2)}%)` : `(${volatility.toFixed(2)}%)`}</Volatility>
					<div>last_updated: {observation_end}</div>
				</div>
			</div>
		</IndicatorCardDescriptionContainer>
	);
}
