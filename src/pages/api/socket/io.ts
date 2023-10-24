import { Server } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types"

export default function SocketHandler( req: NextApiRequest, res: NextApiResponseServerIo ) {

    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server as any);
    res.socket.server.io = io;

    const onConnection = (socket: any) => {

        socket.on("enterRoom", ({ 
            room_id, 
            object 
        }: { 
            room_id: string, 
            object: { type: 'player' | 'tablet', pseudo?: string } 
        }) => {

            if (!socket.rooms.has(room_id)) 
            {

                console.log(`Socket ${socket.id} s'est connectée à la room ${room_id}`);
                socket.join(`room-/${room_id}`);

                if (object.type === 'player') {
                    socket.data.user = { 
                        socket_id: socket.id, 
                        pseudo: object.pseudo
                    };
    
                    io.in(`room-/${room_id}`).fetchSockets().then((res) => {
    
                        const socketsInRoom = res
                        .filter((socket) => socket.data.hasOwnProperty('user'))
                        .map((socket) => socket.data.user);

                        console.log(socketsInRoom)
                        io.to(`room-/${room_id}`).emit("newPlayerJoinParty", {
                            room: {
                                id: `room-/${room_id}`,
                                numberPlayer: socketsInRoom.length,
                                sockets: socketsInRoom,
                            },
                            newPlayer: socket.data.user,
                        });
    
                    })
                }

            }
            else 
            {
                console.log(`Socket ${socket.id} est déjà connectée à la room ${room_id}`);
            }

        });
    };

    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}