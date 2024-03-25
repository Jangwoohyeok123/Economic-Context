import clsx from 'clsx';
import styles from './MakeContextModal.module.scss';
import ReactDOM from 'react-dom';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { roboto, poppins } from '@/pages/_app';
import { ContextIdWithName_Type, IndicatorWithIsPick_Type } from '@/types/userType';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { changeCategoryIdToName, changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { addContext, getContextIdsWithNames } from '@/api/backend';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/reduxType';
import { useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { Favorite_Type } from '@/types/backendType';

interface MakeModalProps {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	children?: React.ReactNode;
	favorites: IndicatorWithIsPick_Type[];
}

export default function MakeContextModal({ favorites, isModalOpen, setIsModalOpen, children }: MakeModalProps) {
	const userId = useSelector((state: Store_Type) => state.user.id);
	const [selectedFavorites, setSelectedFavorites] = useState<IndicatorWithIsPick_Type[]>();
	const refInput = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();

	// 나중에 훅으로 처리할 부분
	const { data: contextNamesWithKey, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextIdsWithNames(userId)
	});

	const addContextMutation = useMutation({
		mutationFn: (favoritesForContext: Favorite_Type[]) =>
			addContext(userId, refInput?.current?.value as string, favoritesForContext as Favorite_Type[]),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.context]
			});
			setIsModalOpen(false);
		}
	});

	useEffect(() => {
		const pickedFavorites = favorites?.filter(favorite => favorite.isPick);
		setSelectedFavorites(pickedFavorites);
	}, [favorites]);

	const makeContext = () => {
		const favoritesForContext = selectedFavorites?.map(({ isPick, ...favorite }) => favorite);
		if (
			refInput.current &&
			favoritesForContext &&
			!contextNamesWithKey?.some((context: ContextIdWithName_Type) => refInput?.current?.value === context.name)
		) {
			addContextMutation.mutate(favoritesForContext);
		} else {
			alert('title 이 중복됩니다.');
		}
	};

	return isModalOpen
		? ReactDOM.createPortal(
				<>
					<div className={clsx(styles.Overlay)}></div>
					<div className={clsx(styles.MakeContextModal, roboto.variable, poppins.variable)}>
						<div className={clsx(styles.header)}>
							<h3>Create Context</h3>
							<span>Make your custom context</span>
						</div>
						<div className={clsx(styles.name)}>
							<h5>Name</h5>
							<input ref={refInput} type='text' placeholder='Name of your context'></input>
						</div>
						<div className={clsx(styles.pickedFavorites)}>
							<h5>Indicators</h5>
							<ul>{selectedFavorites?.length}개의 지표를 선택하셨습니다.</ul>
						</div>
						<div className={clsx(styles.buttons)}>
							<button
								className={clsx(styles.leftButton)}
								onClick={() => {
									setIsModalOpen(false);
								}}>
								Cancel
							</button>
							<button className={clsx(styles.rightButton)} onClick={makeContext}>
								Create
							</button>
						</div>
					</div>
				</>,
				document.body
		  )
		: null;
}
