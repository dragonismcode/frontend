var container = document.querySelector(".container");
var col = document.querySelector(".counter");
var odometer = document.getElementById("odometer");
var titletext = document.getElementById("titletext");
var authortext = document.getElementById("authortext");

if (window.location.href.includes("?id=")) {
  localStorage.setItem(
    "rumbleUser",
    JSON.stringify({
      id: window.location.href.split("?id=")[1]
    })
  );
} else if (!localStorage.getItem("rumbleUser")) {
  localStorage.setItem(
    "rumbleUser",
    JSON.stringify({
      id: "_c276782"
    })
  );
}

loadCounter();

async function loadId() {
  var response = prompt(
    "Please enter the user you want to track's hanlde in the prompt down below."
  );
  if (!response)
    return console.log("User cancellled prompt... that's pretty sad.");
  fetch("https://api.rumblecounter.live/search/users?query=" + response)
    .then((res) => {
      if (res.status == 200) {
        return res.text();
      } else if (res.status == 404) {
        return alert("User with the specified query was not found!");
      }
    })
    .then((data) => {
      console.log(data);
      if (data[0]) {
        data = JSON.parse(data);
        localStorage.setItem("rumbleUser", JSON.stringify(data[0]));
        titletext.innerText = data[0].title;
        titletext.href = `https://rumble.com/c/${data[0].slug}`;
        if (window.location.href.includes("?id=")) {
          window.location.href = window.location.href.split("?id=")[1] =
            "?id=" + data[0].id;
        } else {
          window.location.href =
            window.location.href + "?id=" + data[0].id + "";
        }
      } else {
        alert("an unexpected error occured...");
      }
    });
}

// can you also make the odermeter bigger?
//k

function loadCounter() {
  fetch(
    "https://api.rumblecounter.live/user?id=" +
      JSON.parse(localStorage.getItem("rumbleUser")).id
  )
    .then((res) => res.json())
    .then((res) => {
      odometer.innerHTML = res.followers;
      titletext.innerText = res.title;
      titletext.href = `https://rumble.com/c/${res.slug}`;
    });
  setTimeout(refresher, 2000);
}

function refresher() {
  fetch(
    "https://api.rumblecounter.live/user?id=" +
      JSON.parse(localStorage.getItem("rumbleUser")).id
  )
    .then((res) => res.json())
    .then((res) => {
      odometer.innerHTML = res.followers;
      titletext.innerText = res.title;
      titletext.href = `https://rumble.com/c/${res.slug}`;
    });
  setTimeout(refresher, 2000);
}
