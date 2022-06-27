const messagesContainer = document.querySelector("main");

function login() {
  let userName = document.querySelector(".login-screen input").value;
  let userNamePostObject = {
    name: userName,
  };
  if (userName != "") {
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

function loadMessages(answer) {
  let userName = document.querySelector(".login-screen input").value;
  var name = userName.value;
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
  let userName = document.querySelector(".login-screen input").value;
  let userNamePostObject = {
    name: userName,
  };
  const promise = axios
    .post(
      "https://mock-api.driven.com.br/api/v6/uol/status",
      userNamePostObject
    )
    .then(console.log("status: online"));
}
