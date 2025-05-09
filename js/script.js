document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a.nav-link');
  const sections = document.querySelectorAll('section');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSectionId) {
        link.classList.add('active');
      }
    });
  });
});

function showSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'none';
}
function toggleAnswer(faq) {
  const answer = faq.querySelector('.faq-answer');
  answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}


/////////////////////////////////////
//FAQs

(function () {
  const titleQuestions = [...document.querySelectorAll(".name-Question")];
  console.log(titleQuestions);

  titleQuestions.forEach((question) => {
      question.addEventListener("click", () => {
      let height = 0;
      let answer = question.nextElementSibling;
      let addPadding = question.parentElement.parentElement;

      addPadding.classList.toggle("faq-item--add");
      question.children[0].classList.toggle("questions-arrow--rotate");

      if (answer.clientHeight === 0) {
          height = answer.scrollHeight;
      }
      answer.style.height = `${height}px`;
      });
  });
})();


//NavBar Logic



/////////////////////////////


/*the box of message with VA comes*/
const messageBoxMask = document.querySelector('.maskAi');
const messageAIBox = document.querySelector('.messageBoxCont');
const callAIBox = document.querySelector('.VAIconBox');
const closeAIBox = document.querySelector('.closeChat');

callAIBox.addEventListener('click', () => {
  messageAIBox.classList.toggle('translateBox');
  messageBoxMask.classList.toggle('visible');
});

closeAIBox.addEventListener('click', () => {
  messageAIBox.classList.toggle('translateBox');
  messageBoxMask.classList.toggle('visible');
})

/*@TODO: add the logic of VA here*/
const messageInput = document.querySelector('.txtWriter');
const sendButton = document.querySelector('.sendButton');
const messageContainer = document.querySelector('.karyTalksBox');

const messageValue = document.querySelectorAll('.fm-bx-value')
const frequencyMsgBox = document.querySelector('.frecuency-message-box')

let answerBot = "";

let messageClick = "";

let interMsgFrc = 0;

/* scroll chat behaviour */
let scrollBtm = () => {
  messageContainer.scrollTop = messageContainer.scrollHeight
}

messageContainer.addEventListener("scroll", function(){
  const isAtBottom = messageContainer.scrollTop + messageContainer.clientHeight >= messageContainer.scrollHeight - 1;
  frequencyMsgBox.classList.toggle("invisible", !isAtBottom);
})

/*Frequency message query*/
for (let i = 0; i < messageValue.length; i++) {
  messageValue[i].addEventListener("click", () =>{
    interMsgFrc++;
    messageClick = messageValue[i].innerHTML
   
    createChat(messageClick)
    scrollBtm()

    if (interMsgFrc) {
      frequencyMsgBox.classList.remove('frecuency-message-box')
      frequencyMsgBox.classList.add('frecuency-message-box-hidden')
    }
  })

}


sendButton.addEventListener('click', () => {

  if (messageInput.value === "") {
    alert("Please write a message before sending.");
    return;
  }

  createChat(messageInput.value)

  scrollBtm()

  frequencyMsgBox.classList.remove('frecuency-message-box')
  frequencyMsgBox.classList.add('frecuency-message-box-hidden')
 
  messageInput.value = ""; //clear the input box

})

let createChat = (mssg) => {
  /*Build a chat glove for human*/
  const humanGloveCnt = document.createElement('div');
  const humanGlove = document.createElement('div');
  const textGlove = document.createTextNode(mssg);
  /*add classes for each div*/
  humanGlove.classList.add('humanMessage');
  humanGloveCnt.classList.add('humanTalksCont');
  /*assign the child for each parent box*/
  humanGlove.appendChild(textGlove);
  humanGloveCnt.appendChild(humanGlove);
  messageContainer.appendChild(humanGloveCnt);

  /*Doing the same process with Virtual Assitent*/
  
  chatBox(mssg);//call the function to get the answer
  
  const messageAIBox = document.createElement('div');
  const messageAI = document.createElement('div');
  const textAI = document.createTextNode(answerBot);
  const imgAIContainer = document.createElement('div');
  const imgAI = document.createElement('img');
  

  imgAI.src = "img/KaryVA.png";
  imgAI.alt = "Virtual Assistant Picture";
  imgAI.classList.add('imgVA');
  imgAIContainer.classList.add('vaImgProfile');
  messageAI.classList.add('vaMessage');
  messageAIBox.classList.add('karyTalksCont');


  imgAIContainer.appendChild(imgAI);
  messageAI.appendChild(textAI);
  messageAIBox.appendChild(imgAIContainer);
  messageAIBox.appendChild(messageAI);
  messageContainer.appendChild(messageAIBox);
  messageContainer.scrollTop = messageContainer.scrollHeight; //scroll to the bottom of the container
  messageContainer.scrollIntoView({ behavior: 'smooth' });
  messageContainer.style.overflowY = "scroll"; //enable scroll bar
  messageContainer.style.overflowX = "hidden"; //disable scroll bar
  
}

const chatBox = (sentence) => {
  let finalAnsw = "";

  sentence = sentence.trim();

  if (sentence.includes("hello") || sentence.includes("Hello") || sentence.includes("hi")) {
    finalAnsw = "Hello! How can I assist you today?";
  }
  else if (sentence == "What is the company's specialization?") {
      finalAnsw = "We are a company that specializes in providing innovative ambiental solutions to our clients for their companies or streets";
  }
  else if (sentence == "What the services of the app?") {
    finalAnsw = "We offer a range of services including environmental consulting, waste management, and sustainability assessments.";
  }
  else if (sentence == "How i can contact the company?") {
    finalAnsw = "You contact us with the email: cleanwide@gmail.com"
  }
  else if (sentence == "Where is the company's location?") {
    finalAnsw = "We are located in Lima-Perú";    
  }
  else if (sentence.includes("name") || sentence.includes("who")) {
    finalAnsw = "We are CleanWide, a company dedicated to providing environmental solutions.";
  }
  else if (sentence.includes("log in") || sentence.includes("sign in")) {
    finalAnsw = "You can log in to your account on our website by clicking the 'Sign in' button at the top right corner.";    
  }
  else if (sentence.includes("sign up") || sentence.includes("register")) {
    finalAnsw = "You can sign up for an account on our website by clicking the 'Sign in' button at the top right corner and after that clicking 'Register'.";    
  }
  else if (sentence.includes("help") || sentence.includes("support")) {
    finalAnsw = "If you need help, please contact our support team at conctact section.";
  }
  else if (sentence.includes("thank you") || sentence.includes("thanks")) {
    finalAnsw = "You're welcome! If you have any more questions, feel free to ask.";
  }
  else if (sentence == "How i can to manage and recycle my waste?") {
    finalAnsw = "Our application is designed to help you manage the waste in your environment, so you can dispose of it or recycle it. You can download it from our website.";
  }
  else if (sentence == "Whats is the funtionality of your app?") {
    finalAnsw = "Our application offers features such as waste tracking, recycling reminders, and tips for reducing your environmental impact.";
  }
  else {
    finalAnsw = "I'm sorry, I didn't understand that. I can answer you just about company things. like services, location, contact, etc.";
  }

  answerBot = finalAnsw;
}




//////////////////////////////////////// language switcher
const btnLanguageBox = document.querySelector(".arrow-language")
const boxLanguageSelect = document.querySelector(".languageBox")
const langButtons = document.querySelectorAll("[data-language]")
const textsToChange = document.querySelectorAll("[data-section]")
const lngText = document.querySelector(".changeLang")

btnLanguageBox.addEventListener("click", () =>{
  btnLanguageBox.classList.toggle("fa-angle-down")
  btnLanguageBox.classList.toggle("fa-angle-up")

  boxLanguageSelect.classList.toggle("languageBoxBack")

})

langButtons.forEach((e) =>{
  e.addEventListener("click",() => {
    fetch(`i18n/${e.dataset.language}.json`)
    .then(res => res.json())
    .then(data => {
      textsToChange.forEach((elem) =>{
        const section = elem.dataset.section;
        const value = elem.dataset.value;

        if ((elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") && elem.hasAttribute("placeholder")) {
          elem.placeholder = data[section][value]
        }
        else{
          elem.innerHTML = data[section][value]
        }

      })
    })

    lngText.textContent = e.dataset.language
    lngText.textContent = lngText.textContent.toUpperCase();

  })
})
  

window.addEventListener("scroll",() => {
  boxLanguageSelect.classList.remove("languageBoxBack")
  btnLanguageBox.classList.add("fa-angle-down")
  btnLanguageBox.classList.remove("fa-angle-up")
})
