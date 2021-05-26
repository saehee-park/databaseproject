window.onload = async function () {
    
};



async function setOnButtonListener() {
    document.getElementById('grantKey').addEventListener('click', async (e) => {
        e.preventDefault();
        var project_no = 1;
        var customer_id = 1;
        var start_date = '2021-01-01';

        // Front Form이 완성되면 주석 풀고 사용
        // project_no = e.target.project_no.value;
        // customer_id = e.target.customer_id.value;
        // start_date = e.target.start_date.value;

        // 서버에 인증키를 만들기 위핸 정보를 POST로 보냄
        const result = (await axios.post('/projects/finish', {
            project_no, customer_id, start_date
        })).data;

    });
}