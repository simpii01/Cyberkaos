const userAnswers = []; // Liste til at gemme brugerens valg


document.addEventListener("DOMContentLoaded", () => {
  // Start-knap og spilafsnit
  const startButton = document.getElementById("start-button");
  const gameSection = document.querySelector(".game-section");

  // Når man klikker på "Start spillet"
  startButton.addEventListener("click", () => {
    gameSection.classList.remove("hidden"); // vis spillet
    startButton.style.display = "none";     // skjul knappen
    gameSection.scrollIntoView({ behavior: "smooth" }); // scroll ned
  });

  // Find svar-knapper
  const likeButton = document.querySelector(".like");
  const dislikeButton = document.querySelector(".dislike");
  const questionButton = document.querySelector(".question");

  // Feedback-elementer
  const feedbackBox = document.getElementById("feedback-box");
  const feedbackText = document.getElementById("feedback-text");
  const questionText = document.querySelector(".question-text");
  const questionSub = document.querySelector(".question-sub");
  const headline = document.querySelector("h2");

  // Næste-knap
  const nextButton = document.createElement("button");
  nextButton.textContent = "NÆSTE";
  nextButton.classList.add("next-button");


  // Spørgsmål og feedback
  const questions = [
    {
      headline: "LIKE OR NOT",
      question: "Du får en besked fra 'mor', der spørger om du kommer hjem til aftensmad.",
      sub: "KAN DU STOLE PÅ DENNE BESKED?",
      feedback: {
        like: "Det er rigtigt! Det kan godt være din mor, især hvis hun bare spørger om noget helt normalt. Men hvis beskeden lyder mærkelig, eller hun beder dig om penge, så ring og tjek, at det virkelig er hende.",
        dislike: "Ikke helt rigtigt. Det kunne godt være din mor – så det er ikke altid farligt. Men du har ret i, at man skal være forsigtig. Man skal altid tænke sig om, før man svarer.",
        question: "Du er tvivl – og det er helt okay! Hvis du er i tvivl, så spørg en voksen. Det er smart at stoppe op og tjekke beskeden, før du svarer – især hvis noget virker mærkeligt."
      }
    },
    {
      headline: "MÆRKELIGE LINKS",
      question: "Du får en besked med et link til en 'gratis gave'til Roblox.",
      sub: "ER DET EN GOD IDÉ AT KLIKKE?",
      feedback: {
        like: "Pas på! Selvom det lyder fristende med en gratis gave, kan links fra nogle du ikke kender være farlige. De kan snyde dig til at dele oplysninger eller hente noget farligt på din computer. Klik kun på links, du er helt sikker på, er fra nogen, du kender og stoler på.",
        dislike: "Godt set! Links i beskeder, især når de lover noget gratis, kan være snyd. Det er bedst altid at spørge en voksen, før du klikker på noget, du ikke er helt sikker på.",
        question: "Husk: Klik aldrig på noget, du ikke kender. Er du itvivl så spørg en voksen. links fra nogen du ikke kender kan være farlige og kan snyde dig til at dele oplysninger."
      }
    },
    {
      headline: "GODE VENNER",
      question: "Din ven vil låne din adgangskode til et spil.",
      sub: "SKAL DU DELE DEN?",
      feedback: {
        like: "Pas på! Det virker måske som en lille ting at dele din kode med en ven, men adgangskoder skal altid holdes hemmelige – selv for gode venner. Hvis andre kender din kode, kan de ændre ting eller komme ind på dine ting uden din tilladelse.",
        dislike: "Godt tænkt! En adgangskode er personlig, og den skal kun være din. Når du holder den hemmelig, passer du på dine egne ting online.",
        question: "Del aldrig din adgangskode – heller ikke med dine bedste venner. Hvis andre kender din kode, kan de ændre ting eller komme ind på dine ting uden din tilladelse."
      }
    }
  ];
  //holder styr på hvilken spørgsmål vi er på
  let currentQuestion = 0;

  //Den der viser spørgsmålet
  function showQuestion(index) {
    const q = questions[index];
    questionText.textContent = q.question;
    questionSub.textContent = q.sub;
    headline.textContent = q.headline;
    feedbackBox.classList.add("hidden"); //skjuler feedbacken igen 

     // Vis svar-knapper igen
    likeButton.style.display = "inline-block";
    dislikeButton.style.display = "inline-block";
    questionButton.style.display = "inline-block";
    document.querySelector(".question-card h5").style.display = "block";

  }
  
  //funktionen der håndtere brugernes valg
  function showFeedback(choice) {
    const q = questions[currentQuestion];
    feedbackText.textContent = q.feedback[choice]; //viser feedback til valgt svar 
    userAnswers.push(choice);
    localStorage.setItem('cyberkaosAnswers', JSON.stringify(userAnswers));
    feedbackBox.classList.remove("hidden");
  
    // Skjul svarknapper og h5
    likeButton.style.display = "none";
    dislikeButton.style.display = "none";
    questionButton.style.display = "none";
    document.querySelector(".question-card h5").style.display = "none"; 
  
    // Opdater tekst på knappen afhængig af hvor vi er i quizzen
    if (currentQuestion < questions.length - 1) {
      nextButton.textContent = "NÆSTE";
    } else {
      const questionCard = document.getElementById("question-card");
    
      questionCard.innerHTML = `
        <h2>Du har gennemført Cyberkaos!</h2>
        <p class="final-feedback">${generateFinalFeedback(userAnswers)}</p>
        <button id="restart-button" class="next-button">PRØV IGEN</button>
      `;
    
      // Tilføj event til "Prøv igen"-knap
      document.getElementById("restart-button").addEventListener("click", () => {
        location.reload();
      });
    }
    
    
  
    // Tilføj knappen, hvis den ikke allerede er vist
    if (!nextButton.parentNode) {
      nextButton.style.display = "inline-block"; // ← vis knappen!
      feedbackBox.appendChild(nextButton);
    }
    nextButton.style.display = "inline-block";
  }
  

  likeButton.addEventListener("click", () => showFeedback("like"));
  dislikeButton.addEventListener("click", () => showFeedback("dislike"));
  questionButton.addEventListener("click", () => showFeedback("question"));

  nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion(currentQuestion);
    } else {
      questionText.textContent = "Du har gennemført Cyberkaos!";
      questionSub.textContent = "";
      headline.textContent = "GODT GÅET!";
      feedbackBox.classList.add("hidden");
      nextButton.remove();
    }
  });

  // Start med første spørgsmål
  showQuestion(currentQuestion);
});

// Funktion der laver en afslutnings-tekst baseret på brugerens resultater
function generateFinalFeedback(answers) {
  const goodAnswers = answers.filter(ans => ans === "like" || ans === "dislike").length;
  const totalQuestions = answers.length;
  const percentage = (goodAnswers / totalQuestions) * 100;

  if (percentage >= 100) {
    return "Fantastisk! Du er en cybersikkerhedshelt! 🎉 Du har helt styr på, hvordan man passer på sig selv på nettet. Bliv ved med at tænke dig om, og hjælp gerne andre med at være smarte online. Verden har brug for flere som dig!";//hvis 100% er rigtig
  } else if (percentage >= 50) {
    return "Godt gået! Du er godt på vej til at blive en cybersikkerhedsekspert. 💻 Du kender allerede mange af de vigtige ting, men husk at være ekstra opmærksom på mærkelige beskeder og links. Øvelse gør mester – bliv ved!";//hvis 50-99% er rigtigt
  } else {
    return "Pas på derude! 🌍 Det er en god idé at stoppe op og tænke sig godt om, før du klikker på noget online. Du kan altid spørge en voksen, hvis du er i tvivl. Jo mere du lærer, jo bedre kan du passe på dig selv og dine ting.";//hvis under 50% er rigtig
  }
}

