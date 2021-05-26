// 전역 변수
var option = '문서';
var emp_no = '미선택';

// window onload시 프로젝트 리스트를 가져오고 이벤트 리스너를 등록함
window.onload = function () {
    // submitFileSelect에 대한 이벤트 리스너 등록
    document.getElementById('submitFileSelect').addEventListener('click', async (e) => {
        e.preventDefault();
        option = e.target.value;
        
        if (option in ['Html/Javascript', 'C#/C/C++', 'Dart/Flutter/Java', 'Python']) {
            setEmpSelectorOption(option);
        }
    });

    // empSelect에 대한 이벤트 리스너 등록
    document.getElementById('empSelect').addEventListener('click', async (e) => {
        e.preventDefault();
        emp_no = e.target.value;
    });


    // 업무 등록 버튼에 대한 이벤트 리스너 등록
    document.getElementById('formId').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const startDate = e.target.startDate.value;
        const endDate = e.target.endDate.value;

        if(!title) {
            return alert('업무 제목을 입력해주세요.');
        }
        if(!content) {
            return alert('업무 내용을 입력해주세요.');
        }
        if(!startDate) {
            return alert('업무 시작 날짜를 입력해주세요.');
        }
        if(!endDate) {
            return alert('업무 마감 날짜를 입력해주세요.');
        }
        if(option != null) {
            return alert('제출 파일 종류를 선택해주세요.');
        }
        if(emp_no == 미선택 || !emp_no) {
            return alert('업무를 수행할 직원을 선택해주세요.');
        }

        const result = await axios.post('/projects/addTask', { title, content, startDate, endDate, option, emp_no });

    });
};


async function setEmpSelectorOption(option) {
    var data;

    switch(option) {
        case 'html/javascript':
            data = (await axios.get('/projects/addTask/HJ')).data;
            break;

        case 'C#/C/C++':
            await (axios.get('projects/addTask/CCC')).data;
            break;

        case 'Dart/Flutter/Java':
            await (axios.get('projects/addTask/DFJ')).data;
            break;

        case 'Python':
            await (axios.get('projects/addTask/Python')).data;
            break;
    }

    // option 초기화
    var employee_select = document.getElementById('employee');

    while(employee_select.firstChild) {
        employee_select.removeChild(employee_select.firstChild);
    }

    var options = document.createElement('option');
    options.value = '미선택';
    options.innerHTML = '미선택';
    employee_select.appendChild(options);
    emp_no = '미선택';

    // option에 추가
    for(let i=0; i<data.length; i++) {

        let options = document.createElement('option');
        option.value = data[i][0];
        option.innerHTML = data[i][1];

        employee_select.appendChild(options);
    }

}