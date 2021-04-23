import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService();
    const messagesService = new MessagesService();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    //Como queremos emitir o evento para todos administradores (o socket é enviado diretamente ao usuario que está conectado)
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

    //agora, como quero diretamente para um administrador especifico, ai vou utilizar o socket
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;

        const allMessages = await messagesService.listByUser(user_id);

        callback(allMessages);
    });
});