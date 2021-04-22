import { io } from "../http"
import {ConnectionService} from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";


interface IParams {
    text: string,
    email: string,
}

io.on("connect", (socket) => { //reutilizando a primeira conexão
    const connectionService = new ConnectionService();
    const userService = new UsersService();
    const messagesService = new MessagesService();

    //https://www.npmjs.com/package/socket.io
    socket.on("client_first_access", async (params) => { //primeiro evento, recebendo parametros
        const socket_id = socket.id;
        
        const {text, email} = params as IParams;

        let user_id = null;

        const userExists = await userService.findByEmail(email);

        if(!userExists){ //Se nao existir criamos o user e ja pegamos o id dele
            const user = await userService.create(email);

            await connectionService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id;
        } else { //Se existir pegamos o id dele
            user_id = userExists.id;
            const connection = await connectionService.findByUserId(userExists.id);

            if(!connection){
                await connectionService.create({
                    socket_id,
                    user_id: userExists.id
                });
            } else {
                connection.socket_id = socket_id; //sobrescrevemos o id existente

                await connectionService.create(connection) 
            }

        }

        await messagesService.create({
            text,
            user_id
        })
        
    });

});