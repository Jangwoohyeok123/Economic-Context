// import clsx from 'clsx';
// import styles from './CategorySection.module.scss';
// import { categoryNames } from '@/pages/_app';

// export default function CategorySection() {
// 	return (
// 		<div className={clsx(styles.CategorySection)}>
// 			<div className={clsx(styles.categoryNames)}>
// 				{categoryNames.map((_, idx) => {
// 					return (
// 						<button
// 							className={clsx(categoryIndex === idx ? styles.on : '')}
// 							key={idx}
// 							onClick={() => {
// 								setCategoryIndex(idx);
// 								setCurrentPage(0);
// 							}}>
// 							{categoryNames[idx]}
// 						</button>
// 					);
// 				})}
// 			</div>
// 			{user.isLogin ? (
// 				<CategoryWithIsActive
// 					categoryData={category || []}
// 					currentPage={currentPage}
// 					itemsPerPage={itemsPerPage}
// 					categoryId={categoryId}
// 				/>
// 			) : (
// 				<Category
// 					categoryData={category || []}
// 					currentPage={currentPage}
// 					itemsPerPage={itemsPerPage}
// 					categoryId={categoryId}
// 					setIsAlertModalOpen={setIsAlertModalOpen}
// 				/>
// 			)}
// 			{category && (
// 				<ReactPaginate
// 					pageCount={Math.ceil(category.length / itemsPerPage)}
// 					previousAriaLabel='Prev'
// 					previousLabel='Prev'
// 					nextAriaLabel='Next'
// 					nextLabel='Next'
// 					pageRangeDisplayed={5}
// 					marginPagesDisplayed={0}
// 					onPageChange={event => setCurrentPage(event.selected)}
// 					containerClassName={styles.pagination}
// 					breakLabel={null}
// 					forcePage={currentPage}
// 					activeClassName={styles.paginationActive}
// 					previousClassName={currentPage === 0 ? styles.disabled : ''}
// 					nextClassName={currentPage === Math.ceil(category.length / itemsPerPage) ? styles.disabled : ''}
// 					disabledClassName={styles.disabled}
// 				/>
// 			)}
// 		</div>
// 	);
// }
