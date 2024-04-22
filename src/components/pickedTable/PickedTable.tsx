import styled from 'styled-components';

const PickedTableContainer = styled.div`
	height: 55%;
	width: 100%;
	margin-bottom: 10px;

	div {
		height: 35px;
		border-bottom: 1px solid var(--bgColor);
	}

	.tableHead {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background: var(--bgColor);
		border-bottom: none;

		span {
			width: 60%;
			display: inline-block;
			text-align: center;
		}

		span:nth-of-type(2) {
			width: 20%;
		}

		span:nth-of-type(3) {
			width: 20%;
		}
	}

	/* 
		transition: 0.5s;

		&::-webkit-scrollbar {
			width: 3px;
		}

		&::-webkit-scrollbar-thumb {
			width: 3px;
			background: #ccc;
			visibility: hidden;
		}

		&:hover::-webkit-scrollbar-thumb {
			visibility: visible;
		}
	*/

	.tableBody {
		overflow-y: scroll;
		height: calc(100% - 35px);

		&::-webkit-scrollbar {
			width: 3px;
		}

		&::-webkit-scrollbar-thumb {
			width: 3px;
			background: #ccc;
			visibility: hidden;
		}

		&:hover::-webkit-scrollbar-thumb {
			visibility: visible;
		}

		.row {
			display: flex;
			align-items: center;
			span {
				width: 60%;
				display: inline-block;
				text-align: center;
			}

			span:nth-of-type(2) {
				width: 20%;
			}

			span:nth-of-type(3) {
				width: 20%;
			}
		}
	}
`;

export default function PickedTable() {
	return (
		<PickedTableContainer>
			<div className='tableHead'>
				<span>Indicator</span>
				<span>volality</span>
				<span>category</span>
			</div>
			<div className='tableBody'>
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>{' '}
				<div className='row'>
					<span>Indicator</span>
					<span>volality</span>
					<span>category</span>
				</div>
			</div>
		</PickedTableContainer>
	);
}
