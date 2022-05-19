var container = document.querySelector(".container");
var col = document.querySelector(".counter");
var odometer = document.getElementById("odometer");
var titletext = document.getElementById("titletext");
var authortext = document.getElementById("authortext");

var rumbleUser = { "id": "_c276782", "slug": "Bongino", "title": "The Dan Bongino Show", "type": "channel", "name": "Bongino" }

var refreshInterval = setInterval(refresher,2000)
loadCounter();

async function loadId() {
  var response = prompt(
    "Please enter the user you want to track's hanlde in the prompt down below."
  );
  if (!response) return console.log("User cancellled prompt... that's pretty sad.")

  await fetch(
    "https://api.rumblecounter.live/search/users?query=" +
    response
  ).then(res => res.text())
  .then(data => {
    console.log(data)
    if (data !== "not found!") {
      data = JSON.parse(data)
      rumbleUser.id = data[0].id;
      clearInterval(refreshInterval)
      loadCounter()
    } else {
      alert('No users found.')
    }
  })
}

// can you also make the odermeter bigger?
//k

function loadCounter() {
  fetch(
    "https://api.rumblecounter.live/user?id=" +
    rumbleUser.id
  )
    .then(function(response) {
      //The API call was successful!
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
      //return response;
    })
    .then(function(res) {
      odometer.innerHTML = res.followers;
      titletext.innerText = res.title;
      rumbleUser.title = res.title;
      rumbleUser.slug = res.slug;
      rumbleUser.name = res.name;
    })
    .catch(function(err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}

  function refresher() {
    fetch("https://api.rumblecounter.live/user?id=" +
      rumbleUser.id)
      .then(function(response) {
        // The API call was successful!
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function(res) {
      odometer.innerHTML = res.followers;
      titletext.innerText = res.title;
      rumbleUser.title = res.title;
      rumbleUser.slug = res.slug;
      rumbleUser.name = res.name;
      })
      .catch(function(err) {
        // There was an error
        console.warn("Something went wrong.", err);
      });
  }
