import styled from 'styled-components';
import { roboto, poppins } from '@/pages/_app';
import clsx from 'clsx';

export default function MainImage() {
	return (
		<MainImageContainer className={clsx(poppins.variable, roboto.variable)}>
			{/* <Image className='backgroundImage' src={} /> */}
			<article>
				<h2>Create my own collection of economic indicators</h2>
			</article>
		</MainImageContainer>
	);
}

const MainImageContainer = styled.div`
	font-family: var(--baseFont);
	height: calc(var(--headerSize) + 40vh);
	padding-top: var(--headerSize);
	background: #333;
	width: 100%;

	> article {
		width: 80%;
		margin: 0 auto;

		h2 {
			width: 400px;
			color: #fff;
			font-size: 2rem;
			font-weight: 400;
		}
	}
`;
