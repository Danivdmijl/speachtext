const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const message = document.getElementById("message");
const output = document.getElementById("result");
const image1 = document.getElementById("image1");

startRecognition = () => {
  if (SpeechRecognition !== undefined) { // test if speechrecognitio is supported
    let recognition = new SpeechRecognition();
    recognition.lang = 'nl'; // which language is used?
    recognition.interimResults = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults
    recognition.continuous = false; // https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous
   
    recognition.onstart = () => {
      message.innerHTML = `Ik luister, praat in de microfoon aub<br>Zeg "help me" voor hulp`;
      output.classList.add("hide"); // hide the output
    };

    recognition.onspeechend = () => {
      message.innerHTML = `Ik ben gestopt met luisteren `;
      recognition.stop();
    };

    recognition.onresult = (result) => {
      let transcript = result.results[0][0].transcript;
      let confidenceTranscript= Math.floor(result.results[0][0].confidence * 100); // calc. 'confidence'
      output.classList.remove("hide"); // show the output
      output.innerHTML = `Ik weet ${confidenceTranscript}% dat je zojuist dit zij: <b>${transcript}</b>`;
      actionSpeech(transcript);
    };

    recognition.start();
  } 
  else {  // speechrecognition is not supported
    message.innerHTML = "Je browser word niet gesupport, gebruik google of een andere browser.";
  }
};

// process speech results
actionSpeech = (speechText) => {
  speechText = speechText.toLowerCase().trim(); // trim spaces + to lower case
  console.log(speechText); // debug 
  switch(speechText){ 
    // switch evaluates using stric comparison, ===
    case "product":
      window.open("https://www.bol.com/nl/nl/p/-/9200000059746935/?bltgh=siKoZsJKM8Xq022pTF5KzA.2_6.7.ProductImage", "_self");
      break;
    case  "reset":
      document.body.style.background = "#ffe6ab";
      document.body.style.color="#000000";
      image1.classList.add("hide"); // hide image (if any)
      break;
    case "foto": // let op, "fall-through"
    case "boek": // let op, "fall-through"
      image1.src = "img/boek.jpg";
      image1.style.width = "400px";
      image1.classList.remove("hide") // show image
      break;
    case "Dani":
      window.open("https://www.ffonts.net/Dani.font", "_self");
      break;
    case "help me":
      alert("Spraak commands: Product, reset, foto, Dani");
      break;
    default:
      // do nothing yet
  }
}

