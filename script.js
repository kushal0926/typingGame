// api for the random quote 
const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";

// taking the HTML id with the getElement method
const quoteDisplaytElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timeElement = document.getElementById("time");


// adding the event listener in input so that coloring works perfectly
quoteInputElement.addEventListener('input', () => {
 const arrayQuote = quoteDisplaytElement.querySelectorAll('span');
 const  arrayValue = quoteInputElement.value.split('');

 let correct =  true;
 arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character === null) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
        correct = false;
    } else if (character === characterSpan.innerText) {
        characterSpan.classList.add('correct');
        characterSpan.classList.remove('incorrect');
    } else {
        characterSpan.classList.remove('correct');
        characterSpan.classList.add('incorrect');
        correct = false;
    }
 })

 if (correct) getNextQuote();
});

// fetching the api for thr random quote
 function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content);
}


async function getNextQuote() {
    const quote = await getRandomQuote();
    quoteDisplaytElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplaytElement.appendChild(characterSpan);
    })
    quoteInputElement.value = null;
    setTimer();
}

// making the timer work 
let startTime;
function setTimer() {
   timeElement.innerText = 0;
   startTime = new Date();
   setInterval(() => {
    time.innerText = getTimer();
   }, 1000);
}

function getTimer() {
    return Math.floor((new Date() - startTime) / 1000);
}


getNextQuote();