function onLoad(){
    let date = new Date();

    document.getElementById("currentDay").innerText = date.toDateString();
   
    for(let i=0; i <= 8; i++){
        let newDiv = makeRow(9 + i, date.getHours());
        document.getElementById("scheduleContainer").appendChild(newDiv);
    }
}

function makeRow(hour, currHour){
    let newDiv = document.createElement("div");
    newDiv.className = "row";

    let timeDiv = makeTimeDiv(hour);
    newDiv.appendChild(timeDiv);

    let textArea = makeTextArea(hour,currHour);
    newDiv.appendChild(textArea);

    let saveButton = makeSaveButton(hour);
    newDiv.appendChild(saveButton);

    return newDiv;
}

function makeTimeDiv(hour) {
    let newDiv = document.createElement("div");
    newDiv.className = "col time-block hour";

    let newLabel = document.createElement("label");
    newLabel.className = "align-self-center";

    let hours = hour %12;
    hours = hours ? hours : 12;

    let designation = hour >= 12 ? "PM" : "AM";
    newLabel.textContent = `${hours} ${designation}`;

    newDiv.appendChild(newLabel);

    return newDiv; 
}

function makeTextArea(hour, currHour){
    let textArea = document.createElement("textArea");
    textArea.id = `text${hour}`;

    if (window.localStorage.getItem(textArea.id) !== null){
        textArea.value = window.localStorage.getItem(textArea.id);
    }

    let timeStyle = "";

    if (hour < currHour) {
        timeStyle = "past";
    }else if (hour == currHour){
        timeStyle = "present";
    }else {
        timeStyle = "future";
    }

    textArea.className=`col-8 description ${timeStyle}`;

    return textArea;
}

function makeSaveButton(hour){
    let div = document.createElement("div");
    div.className = "col saveBtn";

    let button = document.createElement("button");

    button.onclick = function () {
        let textArea = document.getElementById( `text${hour}`);

        window.localStorage.setItem(textArea.id, textArea.value);
    }

    div.appendChild(button);

    return div;
}