
const searchButton = document.getElementById('searchButton');
const input = document.getElementById('input');
const theWord = document.getElementById('theWord');
const theDefinition = document.getElementById('theDefinition');
const theExample = document.getElementById('theExample');
const darkModeButton = document.getElementById('themeButtonDarkMode');
const lightModeButton = document.getElementById('themeButtonLightMode');
const resultDiv = document.getElementById('resultDiv');
const header = document.getElementById('header');
const myLink = document.getElementById('myLink');
const stupidIcon = document.getElementById('stupidIcon');
const igLink = document.getElementById('igLink');
const fbLink = document.getElementById('fbLink');
const gmailLink = document.getElementById('gmailLink');

let dark = false;


const errorModal = (title, text, icon) => {
    let iconColorStyle;
    let popupStyle;
    let confirmButtonStyle;

    if(dark){
        iconColorStyle = 'white';
        popupStyle = 'modalContainerLightMode';
        confirmButtonStyle = 'modalConfirmButtonLightMode';
    }
    else{
        iconColorStyle = 'black';
        popupStyle = 'modalContainerDarkMode';
        confirmButtonStyle = 'modalConfirmButtonDarkMode';
    }

    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: confirmButtonStyle,
            popup: popupStyle
        },
        iconColor: iconColorStyle
    });
}

const fetchData = async () => {
    let title = 'Empty Input Field';
    let text = 'Enter a word first before searching';
    let icon = 'error';

    let word = input.value.trim();

    if(word === ''){ 
        errorModal(title, text, icon); 
        return; 
    }

    try{
        const respond = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`);

        if(!respond.ok){
            throw new Error('cant connect mayy error ');
        }
   
        const data = await respond.json();

        const definition = data.list[0].definition;
        const example = data.list[0].example;
        const angWord = word[0].toUpperCase() + word.substring(1, word.legth);
        console.log(data.list[0]);

        resultDiv.classList.add('resultDivFade');

        setTimeout(() => {
            resultDiv.classList.remove('resultDivFade');
            theExample.textContent = example;
            theDefinition.textContent = definition;
            theWord.textContent = angWord;
        }, 400);
    }
    catch(error){
        title = 'Word not found :(';
        text = 'Oooppss, the word is not yet added to our brain.';
        icon = 'warning';

        errorModal(title, text, icon);
    }
}

const searchInvoked = (event) => {
    if(event.key === 'Enter'){
       fetchData();
    }
    
}


const toggleTheme = () => {    
    if(!dark){
        document.body.style.backgroundColor = "white";
        resultDiv.style.backgroundColor = "white";
        resultDiv.style.color = "black";
        input.style.backgroundColor = "black";
        input.style.color = "white";
        header.style.color = "black";
        searchButton.style.backgroundColor = "black";
        searchButton.style.color = "white";
        myLink.style.color = "black";
        stupidIcon.style.color ="black";
        stupidIcon.backgroundColor ="white";
        fbLink.style.color = "black";
        gmailLink.style.color = "black";
        igLink.style.color = "black";

        lightModeButton.classList.add('activeTheme');
        darkModeButton.classList.remove('activeTheme');
    }
    else{
        document.body.style.backgroundColor = "black";
        resultDiv.style.backgroundColor = "black";
        resultDiv.style.color = "white";
        input.style.backgroundColor = "white";
        input.style.color = "black";
        header.style.color = "white";
        searchButton.style.backgroundColor = "white";
        searchButton.style.color = "black";
        myLink.style.color = "white";
        stupidIcon.style.backgroundColor ="white";
        stupidIcon.backgroundColor = "black";
        fbLink.style.color = "white";
        gmailLink.style.color = "white";
        igLink.style.color = "white"; 

        darkModeButton.classList.add('activeTheme');
        lightModeButton.classList.remove('activeTheme');
    }

    dark = !dark;
}



document.addEventListener('DOMContentLoaded', () => toggleTheme());

darkModeButton.addEventListener('click', () => toggleTheme());
lightModeButton.addEventListener('click', () => toggleTheme());
searchButton.addEventListener('click', ()=> fetchData());
input.addEventListener('keydown', (event) => searchInvoked(event));
