import clsx from 'clsx';
import Image from 'next/image';
import axios from 'axios';
import styles from './Home.module.scss';
import Footer from '@/components/footer/Footer';
import dynamic from 'next/dynamic';
import Category from '@/components/category/Category';
import mainImage from '@/public/mainImage.jpg';
import { useState } from 'react';
import { Store_Type } from '@/types/redux';
import { useQueries } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { getCategory_List, getChartData } from '@/api/fred';
import { useSelector } from 'react-redux';
import const_categoryId from '@/const/categoryId';
import { categoryIdList } from './_app';
import { Indicator_Type } from '@/types/fred';
import CategoryWithIsActive from '@/components/categoryWithIsAcitve/CategoryWithIsActive';
import { roboto, poppins } from './_app';
import Pagination from '@/components/pagination/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import SEO from '@/components/seo/SEO';
import styled from 'styled-components';
import { fixDataArray } from '@/utils/fixDataArray';

const DynamicLoginAlertModal = dynamic(() => import('@/components/modals/loginAlertModal/LoginAlertModal'), { ssr: false });
const CategoryTabMenu = dynamic(() => import('@/components/categoryTabMenu/CategoryTabMenu'), { ssr: false });

const CategoryTabMenuWrapper = styled.div`
	padding-top: 35px;
	margin: 0 auto;
	width: 550px;
`;

type ChartData_Type = {
	date: string;
	value: number;
};

interface Home_Props {
	seriesId_List: string[];
	exchangeChartData_List: ChartData_Type[];
}

export default function Home({ seriesId_List, exchangeChartData_List }: Home_Props) {
	useQueries({
		queries: seriesId_List.map((seriesId: string, index: number) => {
			return {
				queryKey: [const_queryKey.fred, 'getChartData', 'Exchange', seriesId],
				queryFn: () =>
					getChartData(seriesId).then(data => {
						const { dataArray } = data;
						return dataArray;
					}),
				initialData: exchangeChartData_List[index].map(item => ({
					...item,
					date: new Date(item.date)
				})),
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60
			};
		})
	});

	const user = useSelector((state: Store_Type) => state.user);

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategoryId, setSelectedCategoryId] = useState(categoryIdList[0]);
	const [selectedCategoryIdIndex, setSelectedCategoryIdIndex] = useState(0);
	const indicatorsPerPage = 9;

	const categoryQueries = useQueries({
		queries: categoryIdList.map((categoryId: number) => ({
			queryKey: [const_queryKey.category, `getCategory_List`, categoryId],
			queryFn: () => getCategory_List(categoryId, 20),
			staleTime: 1000 * 60 * 30
		}))
	});

	const category_List = categoryQueries[selectedCategoryIdIndex].data as Indicator_Type[];

	const selectCategory = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
		e.preventDefault();
		const newIndex = categoryIdList.indexOf(id);
		setSelectedCategoryId(id);
		setSelectedCategoryIdIndex(newIndex);
		setCurrentPage(1);
	};

	if (!category_List) return <ClipLoader />;

	return (
		<>
			<SEO title='Economic-Context' description='Economic indicators can be selected and utilized within myContext' />
			<div className={clsx(styles.mainImage)}>
				<Image src={mainImage} alt='mainImage for mainpage' aria-label='mainImage' placeholder='blur' objectFit='cover' quality={80} fill priority />
			</div>
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<CategoryTabMenuWrapper>
					<CategoryTabMenu
						selectedCategoryId={selectedCategoryId}
						setSelectedCategoryId={setSelectedCategoryId}
						selectCategory={selectCategory}
						categoryIdList={categoryIdList}
					/>
				</CategoryTabMenuWrapper>

				{user.isLogin ? (
					<CategoryWithIsActive
						categoryData={category_List || []}
						currentPage={currentPage}
						itemsPerPage={indicatorsPerPage}
						categoryId={selectedCategoryId}
					/>
				) : (
					<Category categoryData={category_List || []} currentPage={currentPage} itemsPerPage={indicatorsPerPage} categoryId={selectedCategoryId} />
				)}
				<Pagination
					data_List={category_List}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					itemsPerPage={indicatorsPerPage}
					pageRangeDisplayed={5}
				/>
			</main>
			<Footer />
			<DynamicLoginAlertModal size='small' header='You need to login!' body='Our service is required to login' />
		</>
	);
}

export async function getStaticProps() {
	const baseUrl = process.env.NEXT_PUBLIC_FRED_BASEURL;
	const apiKey = process.env.NEXT_PUBLIC_FREDKEY;

	try {
		const response1 = await fetch(`${baseUrl}category/series?category_id=${const_categoryId.exchange}&api_key=${apiKey}&file_type=json&limit=20`);
		const exchangeCategory_List = await response1.json();
		const seriesId_List = exchangeCategory_List.seriess.map((series: Indicator_Type) => series.id);

		const json = await axios.get(`${baseUrl}series/observations?series_id=${seriesId_List[0]}&api_key=${apiKey}&file_type=json`);
		const promises = seriesId_List.map((seriesId: string) => {
			return axios.get(`${baseUrl}series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json`);
		});

		const chartDataSets = await Promise.all(promises);

		const dataArray = chartDataSets.map(chartData => {
			return fixDataArray(chartData.data.observations);
		});

		return {
			props: {
				seriesId_List: seriesId_List,
				exchangeChartData_List: dataArray
			}
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				exchangeDatas: 'error'
			}
		};
	}
}
