// // 인가코드가 서버에 전송되는지 확인하는 컴포넌트
// export default function handler(req, res) {
// 	if (req.method === 'POST') {
// 		// POST 요청 처리
// 		const data = req.body; // 요청 본문에서 데이터를 추출
// 		console.log('Received data:', data);

// 		// 예를 들어, 받은 데이터를 가공하거나 데이터베이스에 저장하는 등의 작업을 수행할 수 있습니다.

// 		// 성공적으로 요청을 처리했음을 응답
// 		res.status(200).json({ message: 'Data received successfully', receivedData: data });
// 	} else {
// 		// POST가 아닌 다른 HTTP 메서드에 대한 요청을 처리
// 		res.setHeader('Allow', ['POST']);
// 		res.status(405).end(`Method ${req.method} Not Allowed`);
// 	}
// }
