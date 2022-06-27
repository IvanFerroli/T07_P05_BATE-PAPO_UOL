/* CODE SKETCH

- Pergunta quem é o usuário;
- Carrega as mensagens;


*/

function login(){
    let userName = document.querySelector(".login-screen input").value
    let userNamePostObject = {
        name: userName
    }
    let loginScreen = document.querySelector(".login-screen")
    if(userName != ""){
        loginScreen.classList.add("hidden")
        const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userNamePostObject)
        startApp()
    }
}

function startApp() {
    loadMessages()
}

function loadMessages() {
    
}
