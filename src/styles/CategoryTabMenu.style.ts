import styled from 'styled-components';
interface MenuButton_Props {
	$categoryColor: string;
}
export const TabMenuWrap = styled.div`
	width: 100%;
	padding-top: 50px;
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;

	button {
		padding: 14px 30px;
		transition: 0.3s;
		border-radius: 3px;
		cursor: pointer;
		font-size: 0.8rem;
		display: flex;
		justify-content: space-between;
		position: relative;
		overflow: hidden;
		> span.icon {
			position: absolute;
			right: -5px;
			bottom: -5px;
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
export const MenuButton = styled.button<MenuButton_Props>`
	border: 1px solid ${props => props.$categoryColor};
	color: ${props => props.$categoryColor};
	&:hover {
		color: #fff;
		background: ${props => props.$categoryColor};
	}

	&.on {
		color: #fff;
		background: ${props => props.$categoryColor};
	}
`;
