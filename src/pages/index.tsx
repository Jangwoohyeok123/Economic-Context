import clsx from 'clsx';
import User from '@/types/userInterface';
import Image from 'next/image';
import axios from 'axios';
import styles from './Home.module.scss';
import Footer from '@/components/footer/Footer';
import dynamic from 'next/dynamic';
import Category from '@/components/category/Category';
import { Store } from '@/types/redux';
import { login } from '@/actions/actions';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import const_queryKey from '@/const/queryKey';
import { getIndicators } from '@/backendApi/fred';
import { Category_Type } from '@/types/fredInterface';
import { roboto, poppins } from './_app';
import CategoryWithIsActive from '@/components/categoryWithIsAcitve/CategoryWithIsActive';
import { useEffect, useState } from 'react';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useDispatch, useSelector } from 'react-redux';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });
const DynamicChartModal = dynamic(() => import('@/components/modals/chartModal/ChartModal'), { ssr: false });

export default function Pages({ interest }: { interest: Category_Type }) {
	const user = useSelector((state: Store) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const categoryNames = ['interest', 'exchange', 'production', 'consume'];
	const [categoryIndex, setCategoryIndex] = useState(0);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
	const [isChartModalOpen, setIsChartModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 9;
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);

	const { data: category, isSuccess: isCategorySuccess } = useQuery({
		queryKey: [const_queryKey.category, categoryId],
		queryFn: () => getIndicators(categoryId)
	});

	const setJwtAndUserData = (authCode: string) => {
		const backendUrl = 'http://localhost:4000';
		if (authCode) {
			axios
				.post(`${backendUrl}/auth/google`, { code: authCode })
				.then(response => {
					const jwt = response.data[0];
					const userData: User = response.data[1];
					sessionStorage.setItem('token', jwt);
					dispatch(login(userData));
				})
				.catch(error => {
					console.error('Error:', error);
				});
		}
	};

	useEffect(() => {
		const authCode = router.query.code;
		if (authCode) setJwtAndUserData(authCode as string);
	}, []);

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
				{user.isLogin
					? category && (
							<CategoryWithIsActive
								categoryData={category}
								currentPage={currentPage}
								itemsPerPage={itemsPerPage}
								categoryId={changeNameToCategoryId(categoryNames[categoryIndex])}
							/>
					  )
					: category && (
							<Category
								categoryData={category}
								currentPage={currentPage}
								itemsPerPage={itemsPerPage}
								categoryId={changeNameToCategoryId(categoryNames[categoryIndex])}
								setIsAlertModalOpen={setIsAlertModalOpen}
							/>
					  )}
				{category && (
					<ReactPaginate
						pageCount={Math.ceil(category.length / itemsPerPage)}
						previousAriaLabel='이전'
						previousLabel='Prev'
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
				rightButtonHandler={() => (window.location.href = 'http://localhost:3000/login')}
			/>
			<DynamicChartModal isChartModalOpen={isChartModalOpen} setIsChartModalOpen={setIsChartModalOpen} />
		</>
	);
}

// 초기 애플리케이션 실행시에만 서버사이드 렌더링을 진행
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
