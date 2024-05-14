import moveViewPort from '@/utils/moveViewPort';
import styled from 'styled-components';

interface Pagination_Props<T> {
	data_List: T[];
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	itemsPerPage: number;
	pageRangeDisplayed: number;
}

export default function Pagination<T>({ data_List, currentPage, setCurrentPage, itemsPerPage, pageRangeDisplayed }: Pagination_Props<T>) {
	const totalPage = Math.ceil(data_List.length / itemsPerPage);
	const startPage = Math.max(currentPage - Math.floor(pageRangeDisplayed / 2), 1);
	const endPage = Math.min(currentPage + Math.floor(pageRangeDisplayed / 2), data_List.length / itemsPerPage + 1);
	const page_List = [];

	if (currentPage < Math.ceil(pageRangeDisplayed / 2) && totalPage >= pageRangeDisplayed) {
		// 현재 페이지가 중간보다 작은 경우
		for (let i = 1; i <= pageRangeDisplayed; i++) {
			page_List.push(i);
		}
	} else if (currentPage > totalPage - Math.ceil(pageRangeDisplayed / 2) && totalPage >= pageRangeDisplayed) {
		// 현재 페이지가 pageRangeDisplay의 중간보다 적은 경우
		for (let i = totalPage - pageRangeDisplayed + 1; i <= totalPage; i++) {
			page_List.push(i);
		}
	} else {
		for (let i = startPage; i <= endPage; i++) page_List.push(i);
	}

	const moveToPrevPage = () => {
		if (currentPage === 1) return;
		setCurrentPage(currentPage - 1);
		moveViewPort();
	};

	const moveToNextPage = () => {
		if (currentPage === totalPage) return;
		setCurrentPage(currentPage + 1);
		moveViewPort();
	};

	const clickPage = (pageIndex: number) => {
		setCurrentPage(pageIndex);
		moveViewPort();
	};

	return (
		<PaginationContainer>
			<li onClick={moveToPrevPage} className={currentPage === 1 ? 'disabled' : ''}>
				Prev
			</li>
			{page_List.map((pageIndex, index) => {
				return (
					<li key={index} onClick={() => clickPage(pageIndex)} className={currentPage === pageIndex ? 'on' : ''}>
						{pageIndex}
					</li>
				);
			})}
			<li onClick={moveToNextPage} className={currentPage === totalPage ? 'disabled' : ''}>
				Next
			</li>
		</PaginationContainer>
	);
}

const PaginationContainer = styled.ul`
	bottom: 0;
	height: 50px;
	padding: 100px 0 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;

	li {
		font-size: 1.1rem;
	}

	li:hover {
		cursor: pointer;
	}

	li:first-child {
		font-weight: 500;
	}

	li:last-child {
		font-weight: 500;
	}

	li.on {
		font-weight: 500;
		border-bottom: 1px solid #111;
	}

	li.disabled {
		cursor: default;
	}
`;
