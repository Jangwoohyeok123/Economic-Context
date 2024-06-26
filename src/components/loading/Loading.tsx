import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	> .clipLoader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export default function Loading() {
	return (
		<LoadingWrapper>
			<ClipLoader className='clipLoader' />
		</LoadingWrapper>
	);
}
