// Front Code

// 제출 버튼에 대한 이벤트 리스너 등록
document.getElementById('pm_evaluation_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content1 = e.target.content1.value;
    const content2 = e.target.content2.value;
    const score1 = e.target.score1.value;
    const score2 = e.target.score2.value;

    try {
        // Form 내용 입력 확인
        if(!content1) {
            return alert('첫 번째 항목의 평가 내용을 입력해주세요.');
        }
        if(!score1) {
            return alert('첫 번째 항목의 평가 점수를 입력해주세요.');
        }
        if(!content2) {
            return alert('두 번째 항목의 평가 내용을 입력해주세요.');
        }
        if(!score2) {
            return alert('첫 번째 항목의 평가 점수를 입력해주세요.');
        }

        // Server에 /pm_evaluation POST 요청
        await axios.post('/pm_evaluation', { content1, content2, score1, score2 });

    } catch(err) {
        console.error(err);
    }    
});


