let socket_admin_id = null;
let emailUser = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
    socket = io();
    
    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";
    
    const email = document.getElementById("email").value;
    emailUser = email;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => { //o socket espera o "connect" para emitir evento para o client_first_access que foi definido no client.ts
        const params = { email, text };

        socket.emit("client_first_access", params, (call, err) =>{ 
            if(err){
                console.log(err)
            } else{
                console.log(call)
            }
        }) ;
    });

    socket.on("client_list_all_messages", (messages) => { //socket espera o evento de listagem e recebe as mensagens (linha 60 do client.ts)
        
        var template_client = document.getElementById("message-user-template").innerHTML;
        var template_admin = document.getElementById("admin-template").innerHTML;

        //iterando o array das messages
        messages.forEach((message) => {
            if(message.admin_id === null){ //mensagem vem do cliente
                const rendered = Mustache.render(template_client, {
                    message: message.text, //message é passado na linha 29 do html
                    email, //esse email vem da variavel na linha 10 ja que ele é o mesmo para o mesmo usuario. É passado na linha 27 do html
                });

                document.getElementById("messages").innerHTML += rendered; //adicionar as mensagens (caso contrario elas seriam sobrescritas e apareceria apenas a ultima delas no chat) dentro da div "messages" na linha 41 do html
            } else {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text //message_admin é passado na linha 37 do html
                });

                document.getElementById("messages").innerHTML += rendered; 
            }
        });
    }); 

    socket.on("admin_send_to_client", (message) => {
        socket_admin_id = message.socket_id;
        const template_admin = document.getElementById("admin-template").innerHTML;

        const rendered = Mustache.render(template_admin, {
            message_admin: message.text
        });

        document.getElementById("messages").innerHTML += rendered;
    });

});

document.querySelector("#send_message_button").addEventListener("click", (event) => {
    const text = document.getElementById("message_user");

    const params = {
        text: text.value,
        socket_admin_id
    }

    socket.emit("client_send_to_admin", params);

    const template_client = document.getElementById("message-user-template").innerHTML;

    const rendered = Mustache.render(template_client, {
        message: text.value,
        email: emailUser
    });

    document.getElementById("messages").innerHTML += rendered;
})
