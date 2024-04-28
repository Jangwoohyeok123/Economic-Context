import { FavoriteIndicator_Type } from '@/types/favorite';
import ContextTable from '../contextTable/ContextTable';
import ContextTableMethods from '../tableFeatures/TableFeatures';
import React, { useState } from 'react';
import MakeContextModal from '../modals/makeContextModal/MakeContextModal';

interface CreateContextSection_Props {
	checkedFavorite_List: FavoriteIndicator_Type[];
	setCheckedFavorite_List: React.Dispatch<React.SetStateAction<FavoriteIndicator_Type[]>>;
}

export default function CreateContextSection({ checkedFavorite_List, setCheckedFavorite_List }: CreateContextSection_Props) {
	const [finalCheckedFavorite_List, setFinalCheckedFavorite_List] = useState<FavoriteIndicator_Type[]>([]);
	const [isValidateModal, setIsValidateModal] = useState<boolean>(false);

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

			<MakeContextModal
				contextName='contextName'
				checkedFavorite_List={checkedFavorite_List}
				isModalOpen={isValidateModal}
				setIsModalOpen={setIsValidateModal}
			/>
			<div className='createButtonWrapper' onClick={() => setIsValidateModal(!isValidateModal)}>
				<button>Create Context</button>
			</div>
		</>
	);
}
