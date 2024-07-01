import styled from 'styled-components';

export const FavoriteContainer = styled.section`
	display: flex;
	width: 100%;
	height: calc(100vh - var(--headerSize));
	padding: 20px 40px;
	justify-content: space-between;
`;

export const LeftContainer = styled.div`
	width: 50%;
	overflow: hidden;

	// Tabmenu는 고정px
	.categoryTabMenuWrapper {
		width: 550px;
		min-height: 140px;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	// favoriteList는 나머지 여백
	.favoriteList {
		height: calc(100% - 180px);
		overflow-y: auto;
		transition: 0.5s;

		> .item {
			padding: 0 20px;
			width: 100%;
			height: 50px;
			display: flex;
			align-items: center;
			border-top: 1px solid #ccc;
			gap: 20px;

			input[type='checkbox'] {
				transform: scale(1.2);
			}

			&:hover {
				cursor: pointer;
				background: var(--bgColor);
			}

			h4 {
				font-weight: 500;
			}
		}

		> .favoriteListHeader {
			padding: 0 20px;
			display: flex;
			align-items: center;
			gap: 20px;
			width: 100%;
			height: 35px;
			background: var(--bgColor2);

			input[type='checkbox'] {
				transform: scale(1.2);
			}

			h4 {
				width: 100%;
				display: flex;
				justify-content: center;
				font-weight: 500;
			}
		}

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
	}

	.item:last-child {
		border-bottom: 1px solid #ccc;
	}
`;

// 위아래패딩은 30px로 가봅시다.
export const RightContainer = styled.div`
	width: 40%;
	height: 100%;
	overflow: hidden;
	background-color: var(--bgColor);
	padding: 20px 40px;

	// 100 85 60
	> .header {
		height: 100px;

		h2 {
			font-weight: 500;
			font-size: 2rem;
		}
		span {
			opacity: 0.8;
		}
	}

	> .contextName {
		height: 85px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		> div {
			display: flex;
			justify-content: space-between;
			margin-bottom: 1px;
			position: relative;
			height: 40px;

			h3 {
				display: flex;
				align-items: center;
				font-weight: 500;
			}
		}

		input {
			width: 100%;
			padding: 10px 10px;
			border-radius: 8px;
			border: 1px solid var(--bgColor2);

			&::placeholder {
				opacity: 0.8;
			}

			&:focus {
				outline: none;
			}
		}
	}

	> .createButtonWrapper {
		text-align: right;

		button {
			height: 40px;
			padding: 0 10px;
			border: none;
			background: #222;
			color: white;

			&:hover {
				cursor: pointer;
			}
		}
	}
`;
