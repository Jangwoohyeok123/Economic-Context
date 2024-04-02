import clsx from 'clsx';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import styles from './Home.module.scss';
import Footer from '@/components/footer/Footer';
import dynamic from 'next/dynamic';
import Category from '@/components/category/Category';
import mainImage from '../../public/mainImage.jpg';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import { Store_Type } from '@/types/redux';
import { useQueries } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { getCategory_List } from '@/api/fred';
import { useSelector } from 'react-redux';
import const_categoryId from '@/const/categoryId';
import { categoryNames } from './_app';
import { Indicator_Type } from '@/types/fred';
import CategoryWithIsActive from '@/components/categoryWithIsAcitve/CategoryWithIsActive';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { roboto, poppins, frontUrl } from './_app';

const DynamicAlertModal = dynamic(() => import('@/components/modals/alertModal/AlertModal'), { ssr: false });

interface Home_Props {
	interest: Indicator_Type[];
	exchange: Indicator_Type[];
	production: Indicator_Type[];
	consume: Indicator_Type[];
}

export default function Home({ interest, exchange, production, consume }: Home_Props) {
	const user = useSelector((state: Store_Type) => state.user);
	const router = useRouter();

	const [categoryIndex, setCategoryIndex] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

	const initialStates = [interest, exchange, production, consume];
	const indicatorsPerPage = 12;
	const categoryId = changeNameToCategoryId(categoryNames[categoryIndex]);

	const categoryQueries = useQueries({
		queries: categoryNames.map((_, idx) => ({
			queryKey: [const_queryKey.category, 'getCategory', changeNameToCategoryId(categoryNames[idx])],
			queryFn: () => getCategory_List(changeNameToCategoryId(categoryNames[idx])),
			staleTime: 1000 * 60 * 10,
			initialData: initialStates[idx]
		}))
	});
	const category = categoryQueries[categoryIndex].data;

	return (
		<>
			<Head>
				<title>Economic-context</title>
			</Head>

			<div className={clsx(styles.mainImage)}>
				<Image
					src={mainImage}
					alt='mainImage'
					aria-label='mainImage'
					placeholder='blur'
					objectFit='cover'
					quality={80}
					fill
					priority
				/>
			</div>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
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
						itemsPerPage={indicatorsPerPage}
						categoryId={categoryId}
					/>
				) : (
					<Category
						categoryData={category || []}
						currentPage={currentPage}
						itemsPerPage={indicatorsPerPage}
						categoryId={categoryId}
						setIsAlertModalOpen={setIsAlertModalOpen}
					/>
				)}
				{category && (
					<ReactPaginate
						pageCount={Math.ceil(category.length / indicatorsPerPage)}
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
						nextClassName={currentPage === Math.ceil(category.length / indicatorsPerPage) ? styles.disabled : ''}
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
				rightButtonHandler={() => router.push(`${frontUrl}/login`)} // link
			/>
		</>
	);
}

export async function getStaticProps() {
	const baseUrl = 'https://api.stlouisfed.org/fred/';

	const requests = [
		axios.get(
			`${baseUrl}category/series?category_id=${const_categoryId.interest}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
		),
		axios.get(
			`${baseUrl}category/series?category_id=${const_categoryId.exchange}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
		),
		axios.get(
			`${baseUrl}category/series?category_id=${const_categoryId.production}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
		),
		axios.get(
			`${baseUrl}category/series?category_id=${const_categoryId.consume}&api_key=${process.env.NEXT_PUBLIC_FREDKEY}&file_type=json`
		)
	];

	try {
		const [interest, exchange, production, consume] = await Promise.all(requests);

		return {
			props: {
				interest: interest.data.seriess,
				exchange: exchange.data.seriess,
				production: production.data.seriess,
				consume: consume.data.seriess
			}
		};
	} catch (error) {
		console.error('API 호출 중 오류가 발생했습니다:', error);
		return {
			props: {
				error: '데이터를 불러오는 데 실패했습니다.'
			}
		};
	}
}
