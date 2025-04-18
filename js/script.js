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

let answerBot = "";

sendButton.addEventListener('click', () => {

  if (messageInput.value === "") {
    alert("Please write a message before sending.");
    return;
  }

  /*Build a chat glove for human*/
  const humanGloveCnt = document.createElement('div');
  const humanGlove = document.createElement('div');
  const textGlove = document.createTextNode(messageInput.value);
  /*add classes for each div*/
  humanGlove.classList.add('humanMessage');
  humanGloveCnt.classList.add('humanTalksCont');
  /*assign the child for each parent box*/
  humanGlove.appendChild(textGlove);
  humanGloveCnt.appendChild(humanGlove);
  messageContainer.appendChild(humanGloveCnt);

  /*Doing the same process with Virtual Assitent*/
  
  chatBox(messageInput.value);//call the function to get the answer
  
  const messageAIBox = document.createElement('div');
  const messageAI = document.createElement('div');
  const textAI = document.createTextNode(answerBot);
  const imgAIContainer = document.createElement('div');
  const imgAI = document.createElement('img');
  

  imgAI.src = "../img/KaryVA.png";
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
  
  messageInput.value = ""; //clear the input box

})

const chatBox = (sentence) => {
  let finalAnsw = "";

  if (sentence.includes("hello") || sentence.includes("Hello") || sentence.includes("hi")) {
    finalAnsw = "Hello! How can I assist you today?";
  }
  else if (sentence.includes("company") || sentence.includes("about")) {
    finalAnsw = "We are a company that specializes in providing innovative ambiental solutions to our clients for their companies or streets";
  }
  else if (sentence.includes("services") || sentence.includes("service")) {
    finalAnsw = "We offer a range of services including environmental consulting, waste management, and sustainability assessments.";
  }
  else if (sentence.includes("contact") || sentence.includes("reach")) {
    finalAnsw = "You contact us with the email: cleanwide@gmail.com"
  }
  else if (sentence.includes("location") || sentence.includes("where")) {
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
  else if (sentence.includes("application") || sentence.includes("app")) {
    finalAnsw = "Our application is designed to help you manage the waste in your environment, so you can dispose of it or recycle it. You can download it from our website.";
  }
  else if (sentence.includes("features") || sentence.includes("functionality")) {
    finalAnsw = "Our application offers features such as waste tracking, recycling reminders, and tips for reducing your environmental impact.";
  }
  else {
    finalAnsw = "I'm sorry, I didn't understand that. I can answer you just about company things. like services, location, contact, etc.";
  }

  answerBot = finalAnsw;
}