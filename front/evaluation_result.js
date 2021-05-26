// 전역 변수
var project_name = null;
var emp_no = null;
var emp_name = null;
var optionValue = 'all';

// window onload시 프로젝트 리스트를 가져오고 이벤트 리스너를 등록함
window.onload = function () {
    showEvaluation();
    setSearchButton();
};

async function showEvaluation(option) {
    var evaluationResultList = null;
    switch(option) {
        case 1:
            evaluationResultList = getEvaluation1();
            break;
        case 2:
            evaluationResultList = getEvaluation2();
            break;
        case 3:
            evaluationResultList = getEvaluation3();
            break;
        case 4:
            evaluationResultList = getEvaluation4();
            break;
    
        default:
            console.log("ERROR");
    }

    for (let i=0; i<evaluationResultList.length; i++) {
        //ROW 생성
        var row = document.createElement('tr');
    
        //Td들 생성
        for (let item in evaluationResultList) {
            var td = document.createElement('td');
            td.style.innerHTML = item;
            
            row.appendChild(td);
        }
    }

    // 옵션 추가
    document.getElementById('evaluation_result_table').appendChild(row);
}

async function getEvaluation1() {
    return await axios.get(`/evaluation/result/all`);
}

async function getEvaluation2() {
    return await axios.get(`/evaluation/result/empName`);
}

async function getEvaluation3() {
    return await axios.get(`/evaluation/result/empNum`);
}

async function getEvaluation4() {
    return await axios.get(`/evaluation/result/projectName`);
}

async function setSearchButton() {
    document.getElementById('search').addEventListener('click', async (e) => {
        e.preventDefault();

        // select Element 가져오기
        var option = document.getElementById('researchOption');
        option.addEventListener('change', async (e) => {
            e.preventDefault();
            optionValue = e.target.value;
        });

        if (optionValue == 'all') showEvaluation(1);
        else if (optionValue == 'empName') showEvaluation(2);
        else if (optionValue == 'empNum') showEvaluation(3);
        else if (optionValue == 'projectName') showEvaluation(4);
    });

    document.getElementById('goodEmpAdd').addEventListener('click', async (e) => {
        e.preventDefault();
        // 우수 직원 선정
    });

    document.getElementById('goodEmpDelete').addEventListener('click', async (e) => {
        e.preventDefault();
        // 우수 직원 취소
    });
}