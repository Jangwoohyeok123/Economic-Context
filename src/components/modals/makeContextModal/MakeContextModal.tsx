import clsx from 'clsx';
import styles from './MakeContextModal.module.scss';
import ReactDOM from 'react-dom';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { roboto, poppins } from '@/pages/_app';
import { useSelector } from 'react-redux';
import { Store_Type } from '@/types/redux';
import { useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/react-query';
import const_queryKey from '@/const/queryKey';
import { FavoriteIndicatorWithIsPick_Type, FavoriteIndicator_Type } from '@/types/favorite';
import { addContext, getContextNameWithKey_List } from '@/api/context';
import { ContextNameWithKey_Type } from '@/types/context';

interface MakeModalProps {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	children?: React.ReactNode;
	pickedFavorites_List: FavoriteIndicator_Type[];
}

// MakeContextModal컴포넌트는 true인 데이터를 전달받는다.
export default function MakeContextModal({ pickedFavorites_List, isModalOpen, setIsModalOpen, children }: MakeModalProps) {
	const userId = useSelector((state: Store_Type) => state.user.id);
	const refInput = useRef<HTMLInputElement>(null);
	const queryClient = useQueryClient();

	// 나중에 훅으로 처리할 부분
	const { data: contextNamesWithKey, isLoading } = useQuery({
		queryKey: [const_queryKey.context, 'names'],
		queryFn: () => getContextNameWithKey_List(userId)
	});

	const addContextMutation = useMutation({
		mutationFn: (favoritesForContext: FavoriteIndicator_Type[]) =>
			addContext(userId, refInput?.current?.value as string, favoritesForContext as FavoriteIndicator_Type[]),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.context]
			});
			setIsModalOpen(false);
		}
	});

	const makeContext = () => {
		addContextMutation.mutate(pickedFavorites_List);
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
							<ul>{pickedFavorites_List.length}개의 지표를 선택하셨습니다.</ul>
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
