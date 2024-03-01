export interface ModalProps {
	isModalOpen: boolean; // 모달의 보여짐/숨김 상태를 제어하는 boolean 값
	setIsModalOpen: (isModalOpen: boolean) => void; // 모달 상태를 업데이트하는 함수
	size: string;
	children?: React.ReactNode; // 모달 내부에 렌더링될 자식 컴포넌트들
	header: string;
	body: string;
	leftButtonContent: string;
	leftButtonHandler: () => void;
	rightButtonContent: string;
	rightButtonHandler: () => void;
}
