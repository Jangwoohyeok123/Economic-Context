import styled from 'styled-components';
interface MenuButton_Props {
	$categoryColor: string;
}
export const TabMenuWrap = styled.div`
	width: 100%;
	text-align: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 15px;

	button {
		padding: 14px;
		padding-left: 15px;
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
			transform: scale(70%);
			right: -9px;
			bottom: -9px;
			transition: 0.3s;
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
	width: 120px;
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
