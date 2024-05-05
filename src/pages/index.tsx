import clsx from 'clsx';
import styles from './Home.module.scss';
import Footer from '@/components/footer/Footer';
import dynamic from 'next/dynamic';
import Category from '@/components/category/Category';
import { useState } from 'react';
import { Store_Type } from '@/types/redux';
import { useQueries } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { getCategory_List } from '@/api/fred';
import { useSelector } from 'react-redux';
import { categoryIdList } from './_app';
import { Indicator_Type } from '@/types/fred';
import CategoryWithIsActive from '@/components/categoryWithIsAcitve/CategoryWithIsActive';
import { roboto, poppins } from './_app';
import Pagination from '@/components/pagination/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import SEO from '@/components/seo/SEO';
import styled from 'styled-components';
import MainImage from '@/components/mainImage/MainImage';

const DynamicLoginAlertModal = dynamic(() => import('@/components/modals/loginAlertModal/LoginAlertModal'), { ssr: false });
const CategoryTabMenu = dynamic(() => import('@/components/categoryTabMenu/CategoryTabMenu'), { ssr: false });

const CategoryTabMenuWrapper = styled.div`
	padding-top: 35px;
	margin: 0 auto;
	width: 550px;

	> div {
		text-align: center;
		margin: 30px auto;

		h3 {
			padding-bottom: 15px;
			font-weight: 500;
			font-size: 2rem;
		}
	}
`;

type ChartData_Type = {
	date: string;
	value: number;
};

interface Home_Props {
	seriesId_List: string[];
	exchangeChartData_List: ChartData_Type[][];
}

export default function Home() {
	const user = useSelector((state: Store_Type) => state.user);

	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategoryId, setSelectedCategoryId] = useState(categoryIdList[0]);
	const [selectedCategoryIdIndex, setSelectedCategoryIdIndex] = useState(0);
	const indicatorsPerPage = 12;

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
			<MainImage />
			<main className={clsx(styles.Home, poppins.variable, roboto.variable)}>
				<CategoryTabMenuWrapper>
					<div>
						<h3>Categorys</h3>
						<span>Please choose one of the eight main categories.</span>
					</div>
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
