import clsx from 'clsx';
import styles from './Pagination.module.scss';
import moveViewPort from '@/utils/moveViewPort';

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

	// pagiantion 예외처리
	if (currentPage < Math.ceil(pageRangeDisplayed / 2) && totalPage >= pageRangeDisplayed) {
		for (let i = 1; i <= pageRangeDisplayed; i++) {
			page_List.push(i);
		}
	} else if (currentPage > totalPage - Math.ceil(pageRangeDisplayed / 2) && totalPage >= pageRangeDisplayed) {
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
		<ul className={clsx(styles.Pagination)}>
			<li onClick={moveToPrevPage} className={currentPage === 1 ? clsx(styles.disabled) : ''}>
				Prev
			</li>
			{page_List.map((pageIndex, index) => {
				return (
					<li key={index} onClick={() => clickPage(pageIndex)} className={currentPage === pageIndex ? clsx(styles.on) : ''}>
						{pageIndex}
					</li>
				);
			})}
			<li onClick={moveToNextPage} className={currentPage === totalPage ? clsx(styles.disabled) : ''}>
				Next
			</li>
		</ul>
	);
}
