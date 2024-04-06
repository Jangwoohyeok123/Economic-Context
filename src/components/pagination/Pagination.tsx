import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface Pagination_Props<T> {
	data_List: T[];
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	itemsPerPage: number;
	pageRangeDisplayed: number;
}

export default function Pagination<T>({
	data_List,
	currentPage,
	setCurrentPage,
	itemsPerPage,
	pageRangeDisplayed
}: Pagination_Props<T>) {
	const totalPage = Math.ceil(data_List.length / itemsPerPage);
	const startPage = Math.max(currentPage - Math.floor(pageRangeDisplayed / 2), 1);
	const endPage = Math.min(currentPage + Math.floor(pageRangeDisplayed / 2), data_List.length / itemsPerPage + 1);
	const page_List = [];

	for (let i = startPage; i <= endPage; i++) page_List.push(i);

	const moveToPrevPage = () => {
		if (currentPage === 1) return;
		setCurrentPage(currentPage - 1);
	};

	const moveToNextPage = () => {
		if (currentPage === totalPage) return;
		setCurrentPage(currentPage + 1);
	};

	return (
		<ul className={clsx(styles.Pagination)}>
			<li onClick={moveToPrevPage}>Prev</li>
			{page_List.map((page, index) => {
				return (
					<li
						key={index}
						onClick={() => setCurrentPage(page)}
						className={currentPage === index + 1 ? clsx(styles.on) : ''}>
						{page}
					</li>
				);
			})}
			<li onClick={moveToNextPage}>Next</li>
		</ul>
	);
}
