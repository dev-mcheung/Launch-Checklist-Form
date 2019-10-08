// Write your JavaScript code here!

// Submit handler
function onSubmit(event){
   // set variables
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoWeight = document.querySelector("input[name=cargoWeight]");
   let fuelLevelEmpty = document.querySelector("input[name=fuelLevel]");
   let cargoWeightEmpty = document.querySelector("input[name=cargoWeight]");
   let faultyItems = document.getElementById("faultyItems")
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   let flag = false;

   // Resets the div id "faultyItems" after every click on Submit
   launchStatus.innerHTML = `Awaiting Information Before Launch`;
   launchStatus.style.color = "black";
   faultyItems.style.visibility = "hidden";

   // Converts pilot and copilot's name to strings. Also converts fuel and cargo to numbers.
   pilotName = pilotName.value.toString();
   copilotName = copilotName.value.toString();
   fuelLevel = Number(fuelLevel.value)
   cargoWeight = Number(cargoWeight.value)

   // checks if pilotName and coPilotName fields are empty
   if(pilotName === "" || copilotName === ""){
      alert("Missing input for either Pilot Name or Co-Pilot Name.");
      event.preventDefault();
      flag = true;
   // checks if fuel level and cargo weight fields are empty
   } else if(fuelLevelEmpty.value === "" || cargoWeightEmpty.value === ""){
      alert("Missing input for either Fuel Level or Cargo Weight.");
      event.preventDefault();
      flag = true;
   // checks if fuel level and cargo weight values are numbers
   } else if(isNaN(fuelLevel) === true || isNaN(cargoWeight) === true){
      alert("That isn't a number for fuel level or cargo weight.");
      event.preventDefault();
      flag = true;
   }

   // Update div id "faultyItems"
   document.getElementById("pilotStatus").innerHTML = `${pilotName} Ready`;
   document.getElementById("copilotStatus").innerHTML = `${copilotName} Ready`;
   // Update fuelStatus and show Faultyitems if less than 2641.72gal (10000 liters)
   if(fuelLevel < 2641.72 && flag === false){
      faultyItems.style.visibility = "visible";
      fuelStatus.innerHTML = `Not enough fuel for launch`;
      launchStatus.innerHTML = `Shuttle not ready for launch`;
      launchStatus.style.color = "red";
   }
   // Update cargoWeight and show Faultyitems if less than 22046.23lbs (10000 Kilogram)
   if(cargoWeight > 22046.23 && flag === false){
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML = `Too much mass for launch`;
      launchStatus.innerHTML = `Shuttle not ready for launch`;
      launchStatus.style.color = "red";
   }
   // If shuttle is ready to launch then to display "Shuttle is ready for launch"
   if(cargoWeight < 22046.23 && fuelLevel > 2641.72 && flag === false){
      faultyItems.style.visibility = "visible";
      launchStatus.innerHTML = "Shuttle is ready for launch";
      launchStatus.style.color = "green";
   }
}

// On window load
window.addEventListener("load", function(){
   this.console.log("Window loaded.");
   let form = document.querySelector("form");
   // excute onSubmit() function when you click the Submit Button
   form.addEventListener("submit", onSubmit);
   // fetch the json from https://handlers.education.launchcode.org/static/planets.json
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         // Selects an object from the list of arrays. Randomizes.
         json = json[Math.floor((Math.random() * 6))];
         // Outputting the json
         let missionTaget = document.getElementById("missionTarget");
         missionTaget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json.name}</li>
               <li>Diameter: ${json.diameter}</li>
               <li>Star: ${json.star}</li>
               <li>Distance from Earth: ${json.distance}</li>
               <li>Number of Moons: ${json.moons}</li>
            </ol>
            <img src="${json.image}">
         `;
      });
   });
});

