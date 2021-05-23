// 전역 변수
var project_no = null;
var emp_no = null;

// window onload시 프로젝트 리스트를 가져오고 이벤트 리스너를 등록함
window.onload = function () {
    setProjectSelector();
};

// 프로젝트 셀렉터에 대한 함수
async function setProjectSelector() {
    // project List 받아오기
    const project_list = await axios.get('/evaluation/project_list');

    // option에 추가
    for(let i=0; i < project_list.data.length; i++) {
        // project 셀렉터 검색
        var project_select = document.getElementById('project');

        // 옵션 생성
        var option = document.createElement('option');
        option.value = project_list.data[i][0];
        option.innerHTML = project_list.data[i][1];

        // 옵션 추가
        project_select.appendChild(option);
    }

    // project select tag에 대한 이벤트 리스너 등록
    document.getElementById('project').addEventListener('change', async (e) => {
        e.preventDefault();

        // 선택한 프로젝트에 대한 모든 참여 인원을 받아옴.
        getParticipatedEmployee(e.target.value);

        // 선택한 프로젝트에 대한 project_no는 변수에 저장해둠.
        project_no = e.target.value;
    });
}

//  프로젝트 선택 시 서버에 GET 요청하는 function
async function getParticipatedEmployee(project_no) {
    // 직원 리스트 받아오기
    const employee_list = await axios.get(`/evaluation/employee_list/${project_no}`);

    // option 초기화
    var employee_select = document.getElementById('employee');
    while(employee_select.hasChildNodes()) {
        employee_select.removeChild();
    }

    // option에 추가
    for(let i=0; i<employee_list.data.length; i++) {

        var option = document.createElement('option');
        option.value = employee_list.data[i][0];
        option.innerHTML = employee_list.data[i][1];

        employee_select.appendChild(option);
    }

    // employee select tag에 대한 이벤트 리스너 등록
    document.getElementById('employee').addEventListener('change', async (e) => {
        e.preventDefault();
        emp_no = e.target.value;

        // 해당 직원에 대한 평가 결과들 출력
        showEvaluation();
    });
}

async function showEvaluation() {
    var evaluation_result_list = getEvaluationResult();
    //
    var row = document.createElement('tr');

    for (let item in evaluation_result_list) {
        var td = document.createElement('td');
        td.style.innerHTML = item;
        
        row.appendChild(td);
    }

    // 옵션 추가
    document.getElementById('evaluation_result_table').appendChild(row);
}

async function getEvaluationResult() {
    return await axios.get(
        `/evaluation/result/`,
        {
            params : { emp_no, project_no }
        },
    );
}