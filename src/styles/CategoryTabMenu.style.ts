import styled from 'styled-components';

export const TabMenu = styled.div`
	width: 100%;
	padding-top: 50px;
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;

	button {
		border: 1px solid #ccc;
		padding: 10px 20px;
		cursor: pointer;
		transition: 0.3s;

		&:hover {
			color: #fff;
			background: #111;
		}

		&.on {
			color: #fff;
			background: #111;
		}
	}
	@media screen and (max-width: 1024px) {
		.CategoryTabMenu {
			flex-direction: row;

			button {
				width: 40%;
			}
		}
	}
`;
