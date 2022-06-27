/* CODE SKETCH

- Pergunta quem é o usuário;
- Carrega as mensagens;


*/

function login(){
    let userName = document.querySelector(".login-screen input").value
    let userNamePostObject = {
        name: userName
    }
    if(userName != ""){
        const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userNamePostObject)
        .then(() => {
            startApp();
            hideLoginScreen()
        })
        .catch(() => {
            catchError()
        })
    }
}

function hideLoginScreen(){
    let loginScreen = document.querySelector(".login-screen")
    loginScreen.classList.add("hidden")
}

function catchError(error){
    alert("Algo deu errado, por favor tente novamente.")
}

function startApp() {
    loadMessages()
}

function loadMessages() {
    
}
