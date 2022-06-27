const messagesContainer = document.querySelector("main");
var entryInput = null;
let userName = null;

function login() {
    let entryInput = document.querySelector(".login-screen input");
  let name = entryInput.value;
  userName = name;
  let userNamePostObject = {
    name: name,
  };
  if (name != null && name != undefined && name != "") {
    const promise = axios
      .post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        userNamePostObject
      )
      .then(() => {
        startApp();
        hideLoginScreen();
      })
      .catch(() => {
        catchError();
      });
  } else {
    alert("Por favor, digite um nome válido");
  }
}

function hideLoginScreen() {
  let loginScreen = document.querySelector(".login-screen");
  loginScreen.classList.add("hidden");
}

function catchError(error) {
  alert("Algo deu errado, por favor tente novamente.");
}

function startApp() {
  getMessages();
  remainConnected();
  interval();
}

function interval() {
    setInterval(getMessages, 3000);
  setInterval(remainConnected, 5000);
}

function getMessages() {
  const promise = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );

  promise.then(loadMessages);
}

function scrollIntoView() {
  const toView = document.querySelector("main").lastElementChild;
  toView.scrollIntoView();
}

function loadMessages(answer) {let entryInput = document.querySelector(".login-screen input");
let name = entryInput.value;
userName = name;
  messagesContainer.innerHTML = "";
  for (i = 0; i < answer.data.length; i++) {
    let type = answer.data[i].type;
    let time = answer.data[i].time;
    let from = answer.data[i].from;
    let to = answer.data[i].to;
    let text = answer.data[i].text;

    if (to == "Todos" || to == name || from == name) {
      var renderedMessage = `
        <div class="message-box ${type}">
            <div class="message-inner-container">
                <span class="time">(${time})</span>
                <span class="from">${from}</span>
                <span>para</span>
                <span class="to">${to}:</span>
                <span class="text">${text} </span>
            </div>
        </div>
              `;
      messagesContainer.innerHTML += renderedMessage;
      scrollIntoView();
    }
  }
}

function remainConnected() {
    let entryInput = document.querySelector(".login-screen input");
    let name = entryInput.value;
    userName = name;
  let userNamePostObject = {
    name: `${name}`,
  };

  const promise = axios
    .post(
      "https://mock-api.driven.com.br/api/v6/uol/status",
      userNamePostObject
    )
    .then(console.log("status: online"))
    .catch(() => {
      alert("Você foi desconectado do servidor, por favor, entre novamente.");
      window.location.reload();
    });
}

function sendMessage() {
    let entryInput = document.querySelector(".login-screen input");
  let name = entryInput.value;
  userName = name;
    let from = name;
    let to = "Todos";
    let text = document.querySelector("footer input").value;
    let type = "message";
  
    let messagePostObject = {
      from: `${from}`,
      to: `${to}`,
      text: `${text}`,
      type: `${type}`,
    };
  
    const messagePost = axios.post(
      "https://mock-api.driven.com.br/api/v6/uol/messages",
      messagePostObject
    );
  
    document.querySelector(".login-screen input").value = "";
    messagePost.then(loadMessages);
  }
  
  const inputMessage = document.querySelector("footer input");
  inputMessage.addEventListener("keydown", function (event) {
    if (event.code === "Enter") {
      sendMessage();
    }
  });