var container = document.querySelector(".container");
var col = document.querySelector(".counter");
var odometer = document.getElementById("odometer");
var titletext = document.getElementById("titletext");
var authortext = document.getElementById("authortext");

var rumbleUser = { "id": "_c276782", "slug": "Bongino", "title": "The Dan Bongino Show", "type": "channel", "name": "Bongino" }

loadCounter();
var refreshInterval;

async function loadId() {
  var response = prompt(
    "Please enter the user you want to track's channel name in the prompt down below."
  );
  if (!response) return console.log("User cancellled prompt... that's pretty sad.")

  await fetch(
    "https://api.rumblecounter.live/search?query=" +
    response
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
      if (!res.data.items[0]) return alert("No user found.")
      rumbleUser = res.data.items[0];
      clearInterval(refreshInterval);
      loadCounter();
    });
}

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
      odometer.innerHTML = rumbleUser.followers;
      titletext.innerHTML = `${rumbleUser.title}`
      //authortext.innerHTML = res.creatorName;
    })
    .catch(function(err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });

  refreshInterval = setInterval(() => {
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
        console.log(res.followers);
        odometer.innerHTML = res.followers;
        titletext.innerHTML = `${rumbleUser.title}`
        //authortext.innerHTML = res.creatorName;
      })
      .catch(function(err) {
        // There was an error
        console.warn("Something went wrong.", err);
      });
  }, 5000);
}
