import { FavoriteIndicator_Type } from '@/types/favorite';
import ContextTable from '../contextTable/ContextTable';
import ContextTableMethods from '../tableFeatures/TableFeatures';
import React, { useState } from 'react';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';
import AlertModal from '../modals/alertModal/AlertModal';

interface CreateContextSection_Props {
	checkedFavorite_List: FavoriteIndicator_Type[];
	setCheckedFavorite_List: React.Dispatch<React.SetStateAction<FavoriteIndicator_Type[]>>;
	isValidateModal: boolean;
	setIsValidateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateContextSection({
	checkedFavorite_List,
	setCheckedFavorite_List,
	isValidateModal,
	setIsValidateModalOpen
}: CreateContextSection_Props) {
	const [finalCheckedFavorite_List, setFinalCheckedFavorite_List] = useState<FavoriteIndicator_Type[]>([]);

	return (
		<>
			<ContextTableMethods
				checkedFavorite_List={checkedFavorite_List}
				setCheckedFavorite_List={setCheckedFavorite_List}
				finalCheckedFavorite_List={finalCheckedFavorite_List}
				setFinalCheckedFavorite_List={setFinalCheckedFavorite_List}
			/>
			<ContextTable
				checkedFavorite_List={checkedFavorite_List}
				finalCheckedFavorite_List={finalCheckedFavorite_List}
				setFinalCheckedFavorite_List={setFinalCheckedFavorite_List}
			/>
			<div className='createButtonWrapper'>
				<button>Create Context</button>
			</div>

			{/* favorite개수로 에러핸들링하는 로직은 위에서 처리한다. true이면 makeContext open, false이면 makeContext false */}
			{/* {checkedFavorite_List.length > 0 ? <MakeContextModal /> : <AlertModal />} */}
		</>
	);
}
