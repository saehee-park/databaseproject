// 전역 변수
var project_name = null;
var emp_no = null;
var emp_name = null;
var optionValue = 'all';
var className = ['goodEmployeeCheck', 'employeeName', 'projectName', 'peerResult', 'pmResult', 'customerResult', 'sum', 'avg'];

// window onload시 프로젝트 리스트를 가져오고 이벤트 리스너를 등록함
window.onload = function () {
    showEvaluation(1);
    setSearchButton();
};

async function showEvaluation(option) {
    removeRow();
    var evaluationResultList = [];
    switch(option) {
        case 1:
            evaluationResultList = await getEvaluation1();
            break;
        case 2:
            evaluationResultList = await getEvaluation2();
            break;
        case 3:
            evaluationResultList = await getEvaluation3();
            break;
        case 4:
            evaluationResultList = await getEvaluation4();
            break;
    
        default:
            console.log("ERROR");
    }
    evaluationResultList = evaluationResultList.data;
    for (let i=0; i<evaluationResultList.length; i++) {
        // ROW 생성
        let row = document.createElement('tr');
        
        // Td들 생성
        var td1 = document.createElement('td');
        td1.classList.add(className[0]);  
        // creating checkbox element
        var checkbox = document.createElement('input');
              
        // Assigning the attributes
        // to created checkbox
        checkbox.type = "checkbox";
        checkbox.value = "good_employee";
        checkbox.ariaLabel = "good_employee";

        td1.appendChild(checkbox);
        row.appendChild(td1);

        for (let j=0; j<evaluationResultList[i].length; j++) {
            var td = document.createElement('td');
            td.innerHTML = evaluationResultList[i][j];
            td.className = className[j+1];  
            console.log(evaluationResultList[i][j]);
            console.log(td.className);
            row.appendChild(td);
        }

        // row 추가
        document.getElementById('tbody').appendChild(row);
    }

    
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

async function getEvaluation1() {
    return await axios.get(`/evaluation/result/all`);
}

async function getEvaluation2() {
    return await axios.get(`/evaluation/result/empName`);
}

async function getEvaluation3() {
    return await axios.get(`/evaluation/result/empNum/${emp_no}`);
}

async function getEvaluation4() {
    return await axios.get(`/evaluation/result/projectName`);
}

function removeRow() {
    // option 초기화
    var tbody = document.getElementById('tbody');

    while(tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}