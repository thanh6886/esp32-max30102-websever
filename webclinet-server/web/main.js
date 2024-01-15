const $ = document.querySelector.bind(document);
const heart_1 = $("#heart_1");
const spo2_1 = $("#spo2_1");
const body_temp_1 = $("#body_temp_1");
const Environment_temp_1 = $("#Environment_temp_1");
const heart_2 = $("#heart_2");
const spo2_2 = $("#spo2_2");
const body_temp_2 = $("#body_temp_2");
const Environment_temp_2 = $("#Environment_temp_2");
const labels = [];
const dataValues = [];
const labels_2 = [];
const dataValues_2 = [];

function fetchData() {
  fetch("http://127.0.0.1:3000/node")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      let data_1 = data.database_1.length - 1;
      let data_2 = data.database_2.length - 1;

      heart_1.innerText = data.database_1[data_1].heartbeat;
      spo2_1.innerText = data.database_1[data_1].Spo2;
      body_temp_1.innerText = data.database_1[data_1].body_temperature;
      Environment_temp_1.innerText = data.database_1[data_1].Environment_temp;

      heart_2.innerText = data.database_2[data_2].heartbeat;
      spo2_2.innerText = data.database_2[data_2].Spo2;
      body_temp_2.innerText = data.database_2[data_2].body_temperature;
      Environment_temp_2.innerText = data.database_2[data_2].Environment_temp;
    });
}

const myChart = new Chart(document.getElementById("chartjs-1"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Data",
        data: dataValues,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        lineTension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const myChart_2 = new Chart(document.getElementById("chartjs-0"), {
  type: "line",
  data: {
    labels: labels_2,
    datasets: [
      {
        label: "Data",
        data: dataValues_2,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        lineTension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function addData_2(value) {
  labels_2.push(new Date().toLocaleTimeString()); // Sử dụng thời gian hiện tại làm nhãn
  dataValues_2.push(value);

  // Giới hạn số lượng dữ liệu hiển thị trên biểu đồ (nếu muốn)
  const maxDataPoints = 30;
  if (labels_2.length > maxDataPoints) {
    labels_2.shift();
    dataValues_2.shift();
  }

  // Cập nhật dữ liệu cho biểu đồ
  myChart_2.data.labels_2 = labels_2;
  myChart_2.data.datasets[0].data = dataValues_2;

  // Cập nhật biểu đồ
  myChart_2.update();
}
function addData(value) {
  labels.push(new Date().toLocaleTimeString()); // Sử dụng thời gian hiện tại làm nhãn
  dataValues.push(value);

  // Giới hạn số lượng dữ liệu hiển thị trên biểu đồ (nếu muốn)
  const maxDataPoints = 30;
  if (labels.length > maxDataPoints) {
    labels.shift();
    dataValues.shift();
  }

  // Cập nhật dữ liệu cho biểu đồ
  myChart.data.labels = labels;
  myChart.data.datasets[0].data = dataValues;

  // Cập nhật biểu đồ
  myChart.update();
}

// Giả định: Giá trị mới được thêm vào biểu đồ sau mỗi khoảng thời gian (ví dụ: 1 giây)
setInterval(() => {
  // Giá trị mới (đây có thể là giá trị bạn nhận được từ dữ liệu thời gian thực)
  const newValue = Math.floor(Math.random() * (85 - 70 + 1)) + 70; // Giá trị ngẫu nhiên từ 0 đến 100
  const newValue_2 = Math.floor(Math.random() * (80 - 75 + 1)) + 75;
  // Thêm giá trị mới và cập nhật biểu đồ
  addData(newValue);
  addData_2(newValue_2);
}, 500); // Cập nhật giá trị mỗi giây

setInterval(fetchData, 100);
