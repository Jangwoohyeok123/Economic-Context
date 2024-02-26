import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Callback() {
	const router = useRouter();

	useEffect(() => {
		// URL 쿼리에서 'code' 파라미터를 추출
		const authCode = router.query.code;

		if (authCode) {
			// 1. 인가코드 전달
			try {
				fetch('http://localhost:3000/api/auth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ code: authCode })
				})
					.then(response => response.json())
					.then(data => {
						console.log('Success:', data);
						// 여기에 성공 시의 추가 로직을 구현할 수 있습니다.
					})
					.catch(error => {
						console.error('Error:', error);
					});
			} catch (error) {
				console.error('Fetch error:', error);
			}

			// 2. mainpage 로 리다이렉트
			// header 가 안보이게 만들어야 함
			window.location.href = 'http://localhost:3000';
		}
	}, [router.query]);

	// 인가 코드를 기다리는 동안 사용자에게 보여줄 UI
	return <main>Loading</main>;
}
