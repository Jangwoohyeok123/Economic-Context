import clsx from 'clsx';
import styles from './MakeContextModal.module.scss';
import ReactDOM from 'react-dom';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { roboto, poppins } from '@/pages/_app';
import { Indicator, IndicatorWithIsPick } from '@/types/userType';
import useFavoriteQuery from '@/hooks/useFavoriteQuery';
import { changeCategoryIdToName, changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { addContext, getContextNamesAndKey } from '@/backendApi/user';
import { useSelector } from 'react-redux';
import { Store } from '@/types/reduxType';
import { useMutation, useMutationState, useQueryClient } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';

interface MakeModalProps {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	children?: React.ReactNode;
	favorites: IndicatorWithIsPick[];
}

export default function MakeContextModal({ favorites, isModalOpen, setIsModalOpen, children }: MakeModalProps) {
	const userId = useSelector((state: Store) => state.user.id);
	const [selectedFavorites, setSelectedFavorites] = useState<IndicatorWithIsPick[]>();
	const refInput = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();

	const addContextMutation = useMutation({
		mutationFn: (favoritesForContext: Indicator[]) =>
			addContext(userId, refInput?.current?.value as string, favoritesForContext as Indicator[]),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.context]
			});
		}
	});

	// pick 할 때마다 새로운 selectedFavorites 만들기
	useEffect(() => {
		const pickedFavorites = favorites?.filter(favorite => favorite.isPick);
		setSelectedFavorites(pickedFavorites);
	}, [favorites]);

	const makeContext = () => {
		const favoritesForContext = selectedFavorites?.map(({ isPick, ...favorite }) => favorite);
		if (refInput.current && favoritesForContext) {
			addContextMutation.mutate(favoritesForContext);
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
