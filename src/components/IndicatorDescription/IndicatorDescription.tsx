import { Indicator_Type } from '@/types/fred';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import { FaRegStar } from 'react-icons/fa6';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleLoginModal } from '@/actions/actions';

interface IndicatorDescription_Props {
	indicator: Indicator_Type;
	lastData: number;
	volatility: number;
}

const StarCotainer = styled.div`
	height: 30px;

	.star {
		width: 25px;
		height: 100%;
		cursor: pointer;
	}
`;

export default function IndicatorDescription({ indicator, lastData, volatility }: IndicatorDescription_Props) {
	const { title, observation_end } = indicator;
	const dispatch = useDispatch();

	return (
		<div className='notChart'>
			<h3>{title}</h3>
			<div className='right'>
				<BubblePopButton clickHandler={() => dispatch(toggleLoginModal())}>
					<StarCotainer>
						<FaRegStar className='star' />
					</StarCotainer>
				</BubblePopButton>
				<div className='values'>
					<span>{lastData}</span>
					<span>{volatility >= 0 ? `(+${volatility}%)` : `(${volatility}%)`}</span>
					<div>last_updated: {observation_end}</div>
				</div>
			</div>
		</div>
	);
}
