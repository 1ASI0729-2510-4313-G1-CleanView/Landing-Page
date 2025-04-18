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
  const messageAIBox = document.createElement('div');
  const messageAI = document.createElement('div');
  const textAI = document.createTextNode("Hello, I am your virtual assistant. How can I help you?");
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

