import styled from 'styled-components';

/* 
  CategoryContainer컴포넌트가 해줘야할일은 Layout을 구획하고
  Indicator카드의 비율을 유지시키는 역할을 해야한다. (7:8)
*/
export const CategoryContainer = styled.section`
	padding-top: 50px;
	display: grid;
	grid-template-columns: 31% 31% 31%;
	grid-auto-rows: 55vh;
	justify-content: space-between;
	row-gap: 50px;

	@media screen and (max-width: 1400px) {
		padding-top: 50px;
		display: grid;
		grid-template-columns: 48% 48%;
		grid-auto-rows: 400px;
		justify-content: space-between;
		row-gap: 50px;
	}

	@media screen and (max-width: 1024px) {
		width: 100%;
		margin: 0 auto;
		grid-template-columns: 100%;
		grid-auto-rows: 520px;
	}
	@media screen and (max-width: 768px) {
		width: 80%;
		margin: 0 auto;
		grid-template-columns: 100%;
		grid-auto-rows: 520px;
	}
`;
