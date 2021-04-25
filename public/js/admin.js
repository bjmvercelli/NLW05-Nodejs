const socket = io(); //conecta assim que carregar a página
let connectionsUsers = [];
let connectionInSupport = [];

socket.on("admin_list_all_users", (connections) => {
    connectionsUsers = connections; //passamos as conexões para dentro de um array
    document.getElementById("list_users").innerHTML = "";

    let template = document.getElementById("template").innerHTML; //pegamos o template (linha 19 do admin.html)

    connections.forEach((connection) => {

        const rendered = Mustache.render(template, {
            email: connection.user.email, //conseguimos pegar devido a relation no connectionService
            id: connection.socket_id,
        });

        document.getElementById("list_users").innerHTML += rendered; //list_users é a div na linha 17
    });
});

function call(id){ //função chamada na linha 22 do admin.html

    const connection = connectionsUsers.find(connection => connection.socket_id === id); //se o socket_id for igual ao id recebido no parametro, retorna a conexão

    const template = document.getElementById("admin_template").innerHTML; //linha 28 do admin.html

    const rendered = Mustache.render(template, {
        email: connection.user.email,
        id: connection.user_id
    });

    document.getElementById("supports").innerHTML += rendered; //div da linha 26
    
    const params = {
        user_id: connection.user_id,
    }

    socket.emit("admin_user_in_support", params);

    socket.emit("admin_list_messages_by_user", params, (messages) =>{ //evento, o que queremos enviar, o que queremos receber. o callback nos retornará isso que queremos receber
        
        const divMessages = document.getElementById(`allMessages${connection.user_id}`);

        messages.forEach(message => {
            const createDiv = document.createElement("div");

            if (message.admin_id === null){ //mensagem do usuario
                
                createDiv.className = "admin_message_client";
                
                createDiv.innerHTML = `<span>${connection.user.email}</span>`;
                createDiv.innerHTML += `<span>${message.text}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>` //dayjs está sendo importada no html
            
            } else { //mensagem do admin
                
                createDiv.className = "admin_message_admin";
                
                createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
                createDiv.innerHTML += `<span class="admin_date">${dayjs(message.created_at).format("DD/MM/YYYY HH:mm:ss")}`
            }
            divMessages.appendChild(createDiv);
        });
    });
}

function sendMessage(id){
    const text = document.getElementById(`send_message_${id}`); //linha 37 admin.html

    const params = {
        text: text.value,
        user_id: id
    }

    socket.emit("admin_send_message", params);

    const divMessages = document.getElementById(`allMessages${id}`);

    const createDiv = document.createElement("div");
    createDiv.className = "admin_message_admin";            
    createDiv.innerHTML = `Atendente: <span>${params.text}</span>`;
    createDiv.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM/YYYY HH:mm:ss")}`;

    divMessages.appendChild(createDiv);

    text.value = "";
}

socket.on("admin_recieve_message", (data) => {
    const connection = connectionsUsers.find(
        (connection) => connection.socket_id == data.socket_id
    );

    const divMessages = document.getElementById(`allMessages${connection.user_id}`);

    const createDiv = document.createElement("div");
    
    createDiv.className = "admin_message_client";
    createDiv.innerHTML = `<span>${connection.user.email}</span>`;
    createDiv.innerHTML += `<span>${data.message.text}</span>`;
    createDiv.innerHTML += `<span class="admin_date">${dayjs(data.message.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`

    divMessages.appendChild(createDiv);
});