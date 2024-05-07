import styled from 'styled-components';
import { roboto, poppins } from '@/pages/_app';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import moveViewPort from '@/utils/moveViewPort';

export default function MainImage() {
	const router = useRouter();

	return (
		<MainImageContainer className={clsx(poppins.variable, roboto.variable)}>
			<Image alt='mainpage_Image' src='/mainImage.jpg' fill priority={true} />
			<article>
				<h2>Trusted economic indicator</h2>
				<p>make your economic context</p>
				<div className='top'>
					<div className='item'>
						<span>8</span>
						<div>Category</div>
					</div>
					<div className='lineWrapper item'>
						<div className='line'></div>
					</div>
					<div className='item'>
						<span>160</span>
						<div>Indicators</div>
					</div>
				</div>

				<div className='buttons'>
					<button onClick={() => moveViewPort()}>About</button>
					<button onClick={() => router.push('/login')}>Login</button>
				</div>
			</article>
		</MainImageContainer>
	);
}

const MainImageContainer = styled.div`
	font-family: var(--baseFont);
	height: calc(100vh);
	width: 100%;
	position: relative;
	display: flex;
	padding-top: var(--headerSize);
	justify-content: center;
	align-items: center;

	img {
		width: 100%;
		height: 100%;
	}

	article {
		position: relative;
		color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;

		h2 {
			font-size: 40px;
			font-weight: 500;
		}

		p {
			opacity: 0.7;
			font-size: 1.3rem;
		}

		.top {
			display: flex;
			width: 250px;

			.item {
				flex: 1;
				width: 33%;
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				> span {
					font-size: 4rem;
				}

				.line {
					margin: 0 auto;
					width: 1px;
					height: 50px;
					background: #aaa;
					display: flex;
					justify-content: center;
				}
			}
		}

		.buttons {
			padding-top: 15px;
			display: flex;
			gap: 30px;

			button {
				width: 190px;
				height: 50px;
				border: none;
				color: #fff;
				cursor: pointer;
				font-weight: 500;
			}

			button:nth-of-type(1) {
				background: #ab958b;
			}

			button:nth-of-type(2) {
				background: #5f5755;
			}
		}
	}
`;
