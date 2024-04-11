const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const submitBtn = document.getElementById("submitBtn");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = `Plz write the city name before you search`;
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=af0be1a7b0def215e8812cc52457f59e`;
      const response = await fetch(url);
      const data = await response.json();
      const arr = await [data];

      city_name.innerText = `${arr[0].name},  ${arr[0].sys.country}`;

      temp_real_val.innerText = arr[0].main.temp;

      const tempMode = arr[0].weather[0].main;

      if (tempMode == "Clear") {
        temp_status.innerHTML =
          "<i class = 'fas fa-sun' style='color: #eccc78;'></i>";
      } else if (tempMode == "Clouds") {
        temp_status.innerHTML =
          "<i class = 'fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMode == "Rain") {
        temp_status.innerHTML =
          "<i class = 'fas fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class = 'fas fa-cloud' style='color:#f1f2f6;'></i>";
      }
      datahide.classList.remove("data_hide");
    } catch (error) {
      city_name.innerText = `Plz write the city name properly`;
    }
  }
};

submitBtn.addEventListener("click", getInfo);
