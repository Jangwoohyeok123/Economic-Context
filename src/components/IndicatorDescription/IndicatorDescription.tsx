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

const IndicatorCardDescriptionContainer = styled.div`
	.topDescription {
		display: flex;
		height: 60px;
		border-bottom: 2px solid #ddd;

		h3 {
			max-width: calc(100% - 60px);
			flex-shrink: 0;
			font-size: 1.2rem;
			font-weight: 400;
		}

		.starWrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;

			.star {
				width: 35px;
				height: 100%;
				cursor: pointer;
				fill: #ccc;
			}
		}
	}

	.midDescription {
		.tag {
		}
		.values {
		}
	}
`;

export default function IndicatorDescription({ indicator, lastData, volatility, categoryId }: IndicatorDescription_Props) {
	const { title, observation_end } = indicator;
	const dispatch = useDispatch();

	return (
		<IndicatorCardDescriptionContainer>
			<div className='topDescription'>
				<h3>{title}</h3>
				<BubblePopButton clickHandler={() => dispatch(toggleLoginModal())}>
					<div className='starWrapper'>
						<FaRegStar className='star' />
					</div>
				</BubblePopButton>
			</div>

			<div className='midDescription'>
				<span className='tag'>tag</span>
				<div className='values'>
					<span>{lastData.toFixed(2)}</span>
					<Volatility volatility={volatility}>{volatility >= 0 ? `(+${volatility.toFixed(2)}%)` : `(${volatility.toFixed(2)}%)`}</Volatility>
					<div>last_updated: {observation_end}</div>
				</div>
			</div>
		</IndicatorCardDescriptionContainer>
	);
}
