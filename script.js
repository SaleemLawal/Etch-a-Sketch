var value = document.querySelector("#sizeSlider");
var container = document.querySelector(".container");

createDivs(value.value, container);
// listen for slider change

value.addEventListener('input', function (){
    // clear the divs
    container = clear(container);

    const size = value.value;
    document.querySelector(".size").innerHTML = value.value + " x " + value.value;
    createDivs(size, container);

});


function createDivs(size, container){
    // const container = document.querySelector(".container");
    const divSize = container.offsetWidth / size;

    // make size x size div, each div is divSize in width && height
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        div.className = "grid-item";
        div.style.width = divSize + "px";
        div.style.height = divSize + "px";
        container.appendChild(div);
    }
}

function clear(container){
    while(container.hasChildNodes()){
        container.removeChild(container.firstChild);
    }
    return container;
}

function settingsListen(){
    var buttons = document.querySelectorAll("button");
    // check if any mode button is pressed
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {

            // Add the 'selectedMode' class to the clicked button
            if (button.id != "clear"){
                // Remove the 'selectedMode' class from all buttons
                var removeSelected = document.querySelector(".selectedMode");
                removeSelected.classList.remove("selectedMode");
                button.classList.add("selectedMode");
            }else{
                clear(container);
                createDivs(value.value, container);
            }
        });    
    });
}

function performMode(currentColor){
    var selectedMode = document.querySelector(".selectedMode");
        // gets the current color
    switch (selectedMode.id) {
        // set it to the color retrieved
        case "colorMode":
            action("colorMode", currentColor);
            break;
        // implement later
        case "rainbowMode":
            break
        // erase a div
        case "Eraser":
            action("Eraser");
            break;
        default:
            break;
    }
}
function action(mode, currentColor, elementAtMouse){
    if (mode === "Eraser"){
        // replace that x/y coordinates with white to simulate eraser
        elementAtMouse.style.backgroundColor = "white";
    }else{
        elementAtMouse.style.backgroundColor = currentColor;
    }

}
function handleMouseOver(e, currentColor){
    var selectedMode = document.querySelector(".selectedMode");
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    const elementAtMouse = document.elementFromPoint(mouseX, mouseY);

    if (selectedMode) {
        switch (selectedMode.id) {
            case "colorMode":
                action("colorMode", currentColor, elementAtMouse);
                break;
            case "rainbowMode":
                var randColor = "rgb(" + generateRandnum() + "," + generateRandnum() + "," + generateRandnum() +")";
                action("colorMode", randColor, elementAtMouse);
                break;
            case "Eraser":
                action("Eraser", null, elementAtMouse);
                break;
            default:
                break;
        }
    }
}
function generateRandnum(){
    return Math.floor(Math.random() * 257);
}

function main(){
    settingsListen();

    const colorPicker = document.querySelector("#colorPicker");
    var currentColor = colorPicker.value;

    colorPicker.addEventListener('input', function () {
        currentColor = colorPicker.value;
        console.log(currentColor);
    });
    container.addEventListener("mouseover", (e) => handleMouseOver(e, currentColor));
}
main();



