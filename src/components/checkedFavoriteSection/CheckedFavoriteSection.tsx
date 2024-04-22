import { FavoriteIndicator_Type } from '@/types/favorite';
import PickedTable from '../pickedTable/PickedTable';
import TableFeatures from '../tableFeatures/TableFeatures';
import React, { useState } from 'react';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import AlertModal from '../modals/alertModal/AlertModal';

interface CheckedFavoriteSection_Props {
	checkedFavorite_List: FavoriteIndicator_Type[];
	isValidateModal: boolean;
	setIsValidateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CheckedFavoriteSection({ checkedFavorite_List, isValidateModal, setIsValidateModalOpen }: CheckedFavoriteSection_Props) {
	// isChecked_List는 checkedFavorite_List가 변경돼도 변경되지 않는다. (마운트시 한번만 초기값 설정이 된다.)
	const [isChecked_List, setIsChecked_List] = useState<boolean[]>(new Array(checkedFavorite_List.length).fill(false));

	return (
		<>
			<TableFeatures checkedFavorite_List={checkedFavorite_List} />
			<PickedTable checkedFavorite_List={checkedFavorite_List} isChecked_List={isChecked_List} setIsChecked_List={setIsChecked_List} />
			<div className='createButtonWrapper'>
				<button>Create Context</button>
			</div>

			{/* favorite개수로 에러핸들링하는 로직은 위에서 처리한다. true이면 makeContext open, false이면 makeContext false */}
			{/* {checkedFavorite_List.length > 0 ? <MakeContextModal /> : <AlertModal />} */}
		</>
	);
}
