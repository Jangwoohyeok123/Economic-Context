import clsx from 'clsx';
import Image from 'next/image';
import styles from './Home.module.scss';
import Footer from '@/components/footer/Footer';
import dynamic from 'next/dynamic';
import Category from '@/components/category/Category';
import { Store_Type } from '@/types/redux';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import const_queryKey from '@/const/queryKey';
import { getCategory_List } from '@/api/fred';
import { Category_Type } from '@/types/fred';
import CategoryWithIsActive from '@/components/categoryWithIsAcitve/CategoryWithIsActive';
import { useState } from 'react';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useSelector } from 'react-redux';
import { roboto, poppins, frontUrl } from './_app';
import { categoryNames } from './_app';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });

export default function Home({ interest }: { interest: Category_Type }) {
	const user = useSelector((state: Store_Type) => state.user);
	const router = useRouter();
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 12;
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);

	const { data: category, isLoading } = useQuery({
		queryKey: [const_queryKey.category, categoryId],
		queryFn: () => getCategory_List(categoryId),
		staleTime: 1000 * 60 * 10
		// initialData: interest => 여기 나중에 고쳥
	});

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<div className={clsx(styles.mainImage)}>
					<Image src='/mainImage.jpg' alt='mainImage' layout='fill' objectFit='cover' />
				</div>
				<div className={clsx(styles.categoryNames)}>
					{categoryNames.map((_, idx) => {
						return (
							<button
								className={clsx(categoryIndex === idx ? styles.on : '')}
								key={idx}
								onClick={() => {
									setCategoryIndex(idx);
									setCurrentPage(0);
								}}>
								{categoryNames[idx]}
							</button>
						);
					})}
				</div>
				{user.isLogin ? (
					<CategoryWithIsActive
						categoryData={category || []}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						categoryId={categoryId}
					/>
				) : (
					<Category
						categoryData={category || []}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						categoryId={categoryId}
						setIsAlertModalOpen={setIsAlertModalOpen}
					/>
				)}
				{category && (
					<ReactPaginate
						pageCount={Math.ceil(category.length / itemsPerPage)}
						previousAriaLabel='Prev'
						previousLabel='Prev'
						nextAriaLabel='Next'
						nextLabel='Next'
						pageRangeDisplayed={5}
						marginPagesDisplayed={0}
						onPageChange={event => setCurrentPage(event.selected)}
						containerClassName={styles.pagination}
						breakLabel={null}
						forcePage={currentPage}
						activeClassName={styles.paginationActive}
						previousClassName={currentPage === 0 ? styles.disabled : ''}
						nextClassName={currentPage === Math.ceil(category.length / itemsPerPage) ? styles.disabled : ''}
						disabledClassName={styles.disabled}
					/>
				)}
			</main>
			<Footer />
			<DynamicAlertModal
				isModalOpen={isAlertModalOpen}
				setIsModalOpen={setIsAlertModalOpen}
				size='small'
				header='You need to login!'
				body='Our service is required to login'
				leftButtonContent='Cancle'
				leftButtonHandler={() => setIsAlertModalOpen(false)}
				rightButtonContent='Login'
				rightButtonHandler={() => router.push(`${frontUrl}/login`)}
			/>
		</>
	);
}

// CDN 제공
export async function getServerSideProps() {
	const baseUrl = 'https://api.stlouisfed.org/fred/';
	const fetchInterestCategory = await fetch(
		`${baseUrl}category/series?category_id=114&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
	);
	const interest = await fetchInterestCategory.json();

	return {
		props: {
			interest
		}
	};
}
