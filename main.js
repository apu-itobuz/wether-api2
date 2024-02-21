const apikey = "0c80b2b56f1943ada19100744230103";
const title = document.querySelector(".title");
const temp = document.querySelector(".temp");
const date = document.querySelector(".date");
const sectionMain = document.querySelector(".sectionMain");

async function getWeatherData(search, apiKey) {
  const apiurl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}&aqi=no`;
  const response = await fetch(apiurl);
  const data = await response.json();
  return data;
}

async function searchInput(apikey) {
  const location = document.querySelector(".location");
  const inputPlace = document.getElementById("text");

  const data = await getWeatherData(inputPlace.value, apikey);
  //------------------------------------
  const placeName = data.location.name;
  const temperature = data.current.temp_c;
  const condition = data.current.condition.text;
  const fetchDate = data.current.last_updated;
  //----------------------------------------------
  location.innerHTML = placeName;
  title.innerHTML = condition;
  temp.innerHTML = temperature;
  date.innerHTML = fetchDate;
  //---------------------------------
  sectionMain.classList.remove("day", "night", "rainy");
  // sectionMain.classList.remove(sectionMain.classList[1]);
  if (condition.toLowerCase().includes("sunny")) {
    sectionMain.classList.add("day");
  } else if (condition.toLowerCase().includes(["cloud", "Partly cloudy"])) {
    sectionMain.classList.add("night");
  } else sectionMain.classList.add("rainy");
}

document.getElementById("search").addEventListener("click", () => {
  searchInput(apikey);
});
