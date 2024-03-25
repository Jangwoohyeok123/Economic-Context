import clsx from 'clsx';
import styles from './CategoryWithIsActive.module.scss';
import { SeriessWithIsActiveType, SeriessType } from '@/types/fredType';
import IndicatorCard from '../cards/indicatorCard/IndicatorCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getFavorite } from '@/backendApi/user';
import const_queryKey from '@/const/queryKey';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BubblePopButton from '../bubblePopButton/BubblePopButton';
import { Store } from '@/types/reduxType';
import { IndicatorWithIsActive } from '@/types/userType';
import useFavoriteMutation from '@/hooks/useFavoriteMutation';

interface CategoryWithIsActive_Intercae {
	categoryData: SeriessType[];
	currentPage: number;
	itemsPerPage: number;
	categoryId: number;
}

export default function CategoryWithIsActive({
	categoryData,
	currentPage,
	itemsPerPage,
	categoryId
}: CategoryWithIsActive_Intercae) {
	const user = useSelector((state: Store) => state.user);
	const [categoryWithIsActive, setCategoryWithActive] = useState<SeriessWithIsActiveType[]>([]);

	// useQuery
	const { data: favorite, isSuccess: isFavoriteExist } = useQuery({
		queryKey: [const_queryKey.favorite, categoryId],
		queryFn: () => getFavorite(user.id, categoryId)
	});

	const { addFavoriteMutation, deleteFavoriteMutation } = useFavoriteMutation(categoryId);

	const saveButtonToggle = (userId: number, isActive: boolean, seriesId: string) => {
		if (isActive) deleteFavoriteMutation?.mutate({ userId, seriesId });
		else addFavoriteMutation?.mutate({ userId, seriesId });
	};

	/** 현 cateogoryData 에 isActive 속성을 붙이고 backend 에 저장됐던 데이터는 true 처리 */
	useEffect(() => {
		if (categoryData && isFavoriteExist && favorite) {
			const categoryWithIsActive = categoryData.map((item: SeriessType) => ({
				...item,
				isActive: false
			}));

			favorite.forEach((favoriteIndicator: IndicatorWithIsActive) => {
				categoryWithIsActive.forEach((categoryIndicator: SeriessWithIsActiveType) => {
					if (favoriteIndicator.seriesId === categoryIndicator.id) categoryIndicator.isActive = true;
				});
			});

			setCategoryWithActive(categoryWithIsActive);
		}
	}, [currentPage, favorite, categoryData]);

	return (
		<figure className={clsx(styles.CategoryWithIsActive)}>
			{categoryWithIsActive
				.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
				.map((series: SeriessWithIsActiveType, idx: number) => {
					const { title, id: seriesId, frequency, popularity, observation_start, observation_end, isActive } = series;
					const notes = series.notes ?? '';
					return (
						<IndicatorCard
							key={idx}
							title={title}
							seriesId={seriesId}
							categoryId={categoryId}
							frequency={frequency as string}
							popularity={popularity as number}
							notes={notes}
							observation_end={observation_end as string}
							observation_start={observation_start as string}
							className={styles.IndicatorCard}>
							<div>
								<p>{notes ? notes : 'This indicator does not have information about the indicator description.'}</p>
							</div>
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
								{isActive ? 'remove' : 'save'}
							</BubblePopButton>
						</IndicatorCard>
					);
				})}
		</figure>
	);
}
