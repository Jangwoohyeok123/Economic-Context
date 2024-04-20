import clsx from 'clsx';
import styles from './CategoryWithIsActive.module.scss';
import { Indicator_Type } from '@/types/fred';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useQuery } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import { Store_Type } from '@/types/redux';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';
import { getFavoriteCateogry_List } from '@/api/favorite';
import { FavoriteIndicatorWithIsActive_Type, FavoriteIndicator_Type } from '@/types/favorite';
import FavoriteIndicatorCard from '../cards/favoriteIndicatorCard/FavoriteIndicatorCard';
import styled from 'styled-components';
import { FaRegStar } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa6';

interface CategoryWithIsActive_Props {
	categoryData: Indicator_Type[];
	currentPage: number;
	itemsPerPage: number;
	categoryId: number;
}

const StarCotainer = styled.div`
	height: 30px;
	transition: 0.3s;

	.star {
		width: 30px;
		height: 100%;
		fill: #dddddd;
		transition: 0.2s;
	}

	.activeStar {
		fill: var(--yellowColor);
	}
`;

export default function CategoryWithIsActive({ categoryData, currentPage, itemsPerPage, categoryId }: CategoryWithIsActive_Props) {
	const user = useSelector((state: Store_Type) => state.user);
	const [categoryWithIsActive, setCategoryWithActive] = useState<FavoriteIndicatorWithIsActive_Type[]>([]);

	// useQuery
	const { data: favorite, isSuccess: isFavoriteExist } = useQuery({
		queryKey: [const_queryKey.favorite, categoryId],
		queryFn: () => getFavoriteCateogry_List(user.id, categoryId)
	});

	const { addFavoriteMutation, deleteFavoriteMutation } = useFavoriteMutation(categoryId);

	const saveButtonToggle = (userId: number, isActive: boolean, seriesId: string) => {
		if (isActive) deleteFavoriteMutation?.mutate({ userId, seriesId });
		else addFavoriteMutation?.mutate({ userId, seriesId });
	};

	/** 현 cateogoryData 에 isActive 속성을 붙이고 backend 에 저장됐던 데이터는 true 처리 */
	useEffect(() => {
		if (categoryData && isFavoriteExist && favorite) {
			const favoriteCategoryWithIsActive = categoryData.map((indicator: Indicator_Type) => {
				const { id: seriesId, frequency, notes, observation_end, observation_start, popularity, title } = indicator;
				return {
					frequency,
					notes,
					observation_end,
					observation_start,
					popularity,
					title,
					seriesId,
					categoryId: categoryId,
					isActive: false
				};
			});

			favorite.forEach((favoriteIndicator: FavoriteIndicator_Type) => {
				favoriteCategoryWithIsActive.forEach((favoriteCategoryIndicator: FavoriteIndicatorWithIsActive_Type) => {
					if (favoriteIndicator.seriesId === favoriteCategoryIndicator.seriesId) favoriteCategoryIndicator.isActive = true;
				});
			});

			setCategoryWithActive(favoriteCategoryWithIsActive);
		}
	}, [currentPage, favorite, categoryData]);

	if (!isFavoriteExist) {
		return <div>loading ui</div>;
	}

	return (
		<section className={clsx(styles.CategoryWithIsActive)}>
			{categoryWithIsActive
				.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
				.map((seriess: FavoriteIndicatorWithIsActive_Type, idx: number) => {
					const { title, seriesId, frequency, popularity, observation_start, observation_end, isActive } = seriess;
					const notes = seriess.notes ?? '';
					return (
						<FavoriteIndicatorCard
							key={idx}
							categoryId={categoryId}
							favoriteIndicator={seriess}
							currentPage={currentPage}
							className={styles.IndicatorCard}>
							<BubblePopButton
								className={clsx(isActive ? styles.on : '')}
								clickHandler={() => {
									saveButtonToggle(user.id, isActive, seriesId);
									setCategoryWithActive(prevArray => {
										return prevArray.map((item, mapIndex) => {
											return mapIndex === idx ? { ...item, isActive: !item.isActive } : item;
										});
									});
								}}>
								<StarCotainer>
									<FaStar className={clsx('star', isActive ? 'activeStar' : '')} />
								</StarCotainer>
							</BubblePopButton>
						</FavoriteIndicatorCard>
					);
				})}
		</section>
	);
}
