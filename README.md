<h1 align='center'>경제지표 관리 서비스</h1>

> Fred API에게 전달받은 데이터를 토대로 경제지표를 관리해주는 서비스를 제작중입니다.

## 프로젝트 Tech-stack 및 주요 라이브러리 

- Next 13
- tanstack query v5
- redux
- styled-component
- d3.js
- framer-motion


## 배포 및 아키텍쳐
배포링크: https://economic-context.vercel.app/

 [ 이미지 ]

- 프론트엔드: Fred api, 백엔드 데이터를 적절히 활용해 화면을 구현합니다. 
- 백엔드: AWS EC2에 배포됐으며 로드밸런서를 통해 프론트와 통신합니다.


## 주요기능 소개 

- 경제지표를 차트를 통해 시각화
- 경제지표를 카테고리별로 색을 부여해 관리
- 원하는 경제지표를 묶어서 관리할 수 있는 대시보드 기능 제공
- 투자일지관리 기능 제공


## 개발 주요 로드맵

> 목표
- [x] 카테고리별로 경제지표를 제공한다.
- [x] 경제지표는 카테고리별로 고유의 색을 통해 구분된다.
- [ ] 투자일지를 작성하고 일짜순으로 볼 수 있게한다.
- [x] 현재 4가지 카테고리를 사용하지만 더 많은 카테고리를 사용하게 한다. 
- [ ] 카테고리의 개수를 Fred와 동일하게 처리한다.
- [ ] 알림 기능을 제공한다.


## Version history

🦫 version 1
1. 이자율, 환율, 소비, 생산별 경제지표 제공
2. 경제지표별 차트 제공

🦫 Version 1.1
1. 기간별로 차트를 보여주는 기능 제공
2. SSG를 사용해 홈페이지 비로그인시 Flickring 현상 제거
3. 대시보드 페이지 context delete 에러 수정

🦫 Version 1.2 
1. 더보기 페이지 layout 변경
2. alert 제거 

🦫 Version 1.3
1. IndicatorCard, FavoriteIndicator 카드 분리
2. CardUI 변경
3. IndicatorsTab UI변경
4. MyContext, CurrentContext UI 변경 (CurrentContext의 chart부분은 chartList컴포넌트의 문제로 인해 다음 버전에서 업데이트)


<!-- CONTACT -->
## Contact

Your Name - dkanvk1@gmail.com</br>
Project Link: https://github.com/Jangwoohyeok123/Economic-Context

<p align="right">(<a href="#readme-top">back to top</a>)</p>

