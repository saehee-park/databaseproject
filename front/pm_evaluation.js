// Front Code

// 제출 버튼에 대한 이벤트 리스너 등록
document.getElementById('pm_evaluation_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content1 = e.target.work_content.value;
    const content2 = e.target.communication_content.value;
    const score1 = e.target.work_score.value;
    const score2 = e.target.communication_score.value;
    // const project = e.target.project.;
    // const employee = e.target.employee.value;


    try {
        // Form 내용 입력 확인
        if(!score1) {
            return alert('첫 번째 항목의 평가 점수를 입력해주세요.');
        }
        if(!content1) {
            return alert('첫 번째 항목의 평가 내용을 입력해주세요.');
        }
        if(!score2) {
            return alert('첫 번째 항목의 평가 점수를 입력해주세요.');
        }
        if(!content2) {
            return alert('두 번째 항목의 평가 내용을 입력해주세요.');
        }

        // Server에 /pm_evaluation POST 요청
        await axios.post('/pm_evaluation', { content1, content2, score1, score2 });

    } catch(err) {
        console.error(err);
    }    
});


