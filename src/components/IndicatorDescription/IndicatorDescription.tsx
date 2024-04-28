import { Indicator_Type } from '@/types/fred';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import { FaRegStar } from 'react-icons/fa6';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleLoginModal } from '@/actions/actions';
import { Volatility } from '@/styles/Volatility.style';
import { useRef } from 'react';
import { BsBookmarkDashFill } from 'react-icons/bs';
import { changeCategoryIdToColor } from '@/utils/changeNameToCategoryId';

interface IndicatorDescription_Props {
	indicator: Indicator_Type;
	lastData: number;
	volatility: number;
	categoryId: number;
}

interface IndicatorCardDescriptionContainer_Props {
	categoryId: number;
}

const IndicatorCardDescriptionContainer = styled.div<IndicatorCardDescriptionContainer_Props>`
	width: 100%;
	height: 35%;

	.topDescription {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 55%;
		border-bottom: 2px solid #ddd;

		.titleWrapper {
			flex: 3;
			height: 100%; // textWrapper의 height는 100%가 돼야한다.
			display: flex;
			align-items: center;
			overflow: hidden;

			h3 {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				text-overflow: ellipsis;
				overflow: hidden;
				line-height: 1.2rem; // 좀 더 세밀한 조정을 하고싶다면 line-height를 지정하는 방법이 있다. 이 방법은 wrapper의 100% height의 크기가 바뀔때마다 재설정해야하는 단점이 있다.
				font-size: 1.1rem;
				font-weight: 400;
			}
		}

		.buttonWrapper {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.starWrapper {
				.star {
					width: 35px;
					height: 100%;
					cursor: pointer;
					fill: #ccc;
				}
			}
		}
	}

	.midDescription {
		display: flex;
		height: 45%;

		.bookmarkWrapper {
			flex: 1;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.bookmark {
				width: 40px;
				height: 40px;
				fill: ${props => changeCategoryIdToColor(props.categoryId)};
			}
		}

		.values {
			flex: 6;
			display: flex;
			flex-direction: column;
			justify-content: center;

			> div:nth-of-type(1) {
				span {
					font-size: 1.3rem;
					font-weight: 500;
				}

				span:nth-of-type(2) {
					padding-left: 5px;
					font-size: 0.9rem;
				}
			}

			> div:nth-of-type(2) {
				font-size: 0.8rem;
				padding-top: 2px;
				opacity: 0.9;
			}
		}
	}
`;

export default function IndicatorDescription({ indicator, lastData, volatility, categoryId }: IndicatorDescription_Props) {
	const titleRef = useRef<HTMLDivElement>(null);
	const { title, observation_end } = indicator;
	const dispatch = useDispatch();

	return (
		<IndicatorCardDescriptionContainer categoryId={categoryId}>
			<div className='topDescription'>
				<div className='titleWrapper'>
					<h3 ref={titleRef}>{title}</h3>
				</div>

				<div className='buttonWrapper'>
					<BubblePopButton clickHandler={() => dispatch(toggleLoginModal())}>
						<div className='starWrapper'>
							<FaRegStar className='star' />
						</div>
					</BubblePopButton>
				</div>
			</div>

			<div className='midDescription'>
				<div className='bookmarkWrapper'>
					<BsBookmarkDashFill className='bookmark' />
				</div>
				<div className='values'>
					<div>
						<span>{lastData.toFixed(2)}</span>
						<Volatility volatility={volatility}>{volatility >= 0 ? `(+${volatility.toFixed(2)}%)` : `(${volatility.toFixed(2)}%)`}</Volatility>
					</div>
					<div>last_updated: {observation_end}</div>
				</div>
			</div>
		</IndicatorCardDescriptionContainer>
	);
}
