google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    // id, title, submitFile, start_date, end_date, null, 100, null
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');
    var rows = getTasks();
    console.log(rows);
    data.addRows(rows);
    var options = {
      height: 400,
      gantt: {
        trackHeight: 30
      }
    };
    
    var chart = new google.visualization.Gantt(document.getElementById('chart_div'));
    chart.draw(data, options);
}

async function getTasks() {
    // document.
    var taskList = (await axios.get(`/projects/getTasks/${project_no}`).data);
    return taskList;
}