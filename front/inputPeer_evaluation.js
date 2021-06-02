// 전역 변수
var project_no = null;
var non_evaluator_no = null;

// window onload시 프로젝트 리스트를 가져오고 이벤트 리스너를 등록함
window.onload = function () {
    setProjectSelector();

    // 제출 버튼에 대한 이벤트 리스너 등록
    document.getElementById('peer_evaluation_form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const content1 = e.target.work_content.value;
        const content2 = e.target.communication_content.value;
        const score1 = e.target.work_score.value;
        const score2 = e.target.communication_score.value;

        try {
            // Form 내용 입력 확인
            if(!project_no) {
                return alert('프로젝트를 선택해주세요');
            }
            if(!non_evaluator_no || non_evaluator_no == '미선택') {
                return alert('평가할 동료를 선택해주세요.');
            }
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
            const result = await axios.post('/peer_evaluation', { content1, content2, score1, score2, project_no, non_evaluator_no });
            if(result.data == true) {
                alert('성공적으로 평가를 마쳤습니다!');
                window.location.replace('/');
            } else {
                alert('평가가 서버에 저장되지 않았습니다.');
            }
        } catch(err) {
            console.error(err);
        }    
    });

};

async function setProjectSelector() {
    // project List 받아오기
    const project_list = await axios.get('/peer_evaluation/project_list');

    // option에 추가
    for(let i=0; i < project_list.data.length; i++) {
        var project_select = document.getElementById('project');

        var option = document.createElement('option');
        option.value = project_list.data[i][0];
        option.innerHTML = project_list.data[i][1];

        project_select.appendChild(option);
    }

    // project select tag에 대한 이벤트 리스너 등록
    document.getElementById('project').addEventListener('change', async (e) => {
        e.preventDefault();
        getParticipatedEmployee(e.target.value);
        project_no = e.target.value;
    });
}

//  프로젝트 선택 시 서버에 GET 요청하는 function
async function getParticipatedEmployee(project_no) {
    // 직원 리스트 받아오기
    const employee_list = await axios.get(`/peer_evaluation/employee_list/${project_no}`);

    // option 초기화
    var employee_select = document.getElementById('employee');
    
    while(employee_select.firstChild) {
        employee_select.removeChild(employee_select.firstChild);
    }

    var option = document.createElement('option');
    option.value = '미선택';
    option.innerHTML = '미선택';
    employee_select.appendChild(option);
    non_evaluator_no = '미선택';

    // option에 추가
    for(let i=0; i<employee_list.data.length; i++) {

        let option = document.createElement('option');
        option.value = employee_list.data[i][0];
        option.innerHTML = employee_list.data[i][1];

        employee_select.appendChild(option);
    }

    // employee select tag에 대한 이벤트 리스너 등록
    document.getElementById('employee').addEventListener('change', async (e) => {
        e.preventDefault();
        non_evaluator_no = e.target.value;
    });
}