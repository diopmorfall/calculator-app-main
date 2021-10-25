const body = document.body;
const heading = document.querySelector(".heading");
const themeMenu = document.querySelector(".switch");
const themeIdentifiers = document.querySelectorAll(".theme-setter");
const keyboard = document.querySelector(".keyboard");
const keys = document.querySelectorAll("button");
const screen = document.querySelector(".result");
const deleteButton = document.querySelector(".del");
const resetButton = document.querySelector(".reset");
const equalsButton = document.querySelector(".equals");

//* text color

const themes = {
        bodyBgColor: ["hsl(222, 26%, 31%)", "hsl(0, 0%, 90%)", "hsl(268, 75%, 9%)"],
        textColor: ["hsl(0, 0, 100%)", "hsl(60, 10%, 19%)", "hsl(52, 100%, 62%)"],
        themeMenuAndKeyboardBgColor: ["hsl(223, 31%, 20%)", "hsl(0, 5%, 81%)", "hsl(268, 71%, 12%)"],
        themeIdentifierAndEqualsBgColor: ["hsl(6, 63%, 50%)", "hsl(25, 98%, 40%)", "hsl(176, 100%, 44%)"],
        screenBgColor: ["hsl(224, 36%, 15%)", "hsl(0, 0%, 93%)", "hsl(268, 71%, 12%)"],
        keyColor: ["hsl(221, 14%, 31%)", "hsl(60, 10%, 19%)", "hsl(52, 100%, 62%)"],
        keyBgColor: ["hsl(30, 25%, 89%)", "hsl(45, 7%, 89%)", "hsl(281, 89%, 26%)"],
        keyShadow: [
            "0px 3.5px 0px 0px hsl(28, 16%, 65%)",
            "0px 3.5px 0px 0px hsl(35, 11%, 61%)",
            "0px 3.5px 0px 0px hsl(290, 70%, 36%)"
        ],
        delAndResetBgColor: ["hsl(225, 21%, 49%)", "hsl(185, 42%, 37%)", "hsl(281, 89%, 26%)"],
        delAndResetTextColor: "hsl(0, 0, 100%)",
        delAndResetShadow: [
            "0px 3.5px 0px 0px hsl(224, 28%, 35%)",
            "0px 3.5px 0px 0px hsl(185, 58%, 25%)",
            "0px 3.5px 0px 0px hsl(285, 91%, 52%)"
        ],
        equalsShadow: [
            "0px 3.5px 0px 0px hsl(6, 70%, 34%)",
            "0px 3.5px 0px 0px hsl(25, 99%, 27%)",
            "0px 3.5px 0px 0px hsl(177, 92%, 70%)"
        ]
};

//* if(theme = 3){ del/reset.text color = "hsl(0, 0, 100%)"; equals-text color = "hsl(198, 20%, 13%)";}

function removeClass(){
    for(let element of themeIdentifiers){
        element.classList.remove("theme-selected");
    }
}

function setThemeStyles(index){
    body.style.backgroundColor = themes.bodyBgColor[index];

    heading.style.color = themes.textColor[index];
    
    themeMenu.style.backgroundColor = keyboard.style.backgroundColor = themes.themeMenuAndKeyboardBgColor[index];
    themeIdentifiers[index] = themes.themeIdentifierAndEqualsBgColor[index];

    screen.style.backgroundColor = themes.screenBgColor[index];
    screen.style.color = themes.textColor[index];

    for(let key of keys){
        key.style.color = themes.keyColor[index];
        key.style.backgroundColor = themes.keyBgColor[index];
        key.style.boxShadow = themes.keyShadow[index];
    }
    
    //deleteButton.style.color = resetButton.style.color = themes.delAndResetTextColor;
    deleteButton.style.backgroundColor = resetButton.style.backgroundColor = themes.delAndResetBgColor[index];
    deleteButton.style.boxShadow = resetButton.style.boxShadow = themes.delAndResetShadow[index];

    equalsButton.style.backgroundColor = themes.themeIdentifierAndEqualsBgColor[index];
    equalsButton.style.boxShadow = themes.equalsShadow[index];
    
    if(index == 2){
        themeIdentifiers[index].style.backgroundColor = themes.themeIdentifierAndEqualsBgColor[index];
        equalsButton.style.color = "hsl(198, 20%, 13%)";
    } else {
        themeIdentifiers[2].style.backgroundColor = "initial";
    }

    
}

for(let identifier of themeIdentifiers){
    identifier.addEventListener("click", function(){
        removeClass();
        let themeIndex = this.getAttribute("id");
        let themeToggle = document.getElementById(themeIndex);
        themeToggle.classList.add("theme-selected");
        //* set it to the right one and set the corresponding styles (themes.property[id])
        setThemeStyles(themeIndex);
    });
}

//todo: add event listeners to add active classes (buttons when clicked should have the same color of their shadow)
//todo: try to understand why the text color remains of the previous theme when switching to the first one
//todo: del, reset and equals buttons always have white text (equals button has it blue in the last theme, and it's correct)



