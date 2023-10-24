"use client"
import { useState, useEffect } from "react";
import { useSocket } from "@/providers/socket-provider";
import { useForm } from "react-hook-form";

import styles from './page.module.scss'
import ChoiceList from "@/components/ChoiceList/ChoiceList";

export default function Room({ params }: { params: { room_id: string } }) {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    const [data, setData] = useState<any>("");
    const [roomData, setRoomData] = useState<any>(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (data !== "" && socket) {
            socketInitializer(socket, data);
        }
    }, [data, socket]);

    const socketInitializer = async (socket: any, data: any) => {

        socket.emit("enterRoom", { room_id: params.room_id, object: { type: 'player', pseudo: data.pseudo } });

        socket.on("newPlayerJoinParty", ({newPlayer, room} : any) => {
            console.log(room);
            setRoomData(room);
            console.log(`${newPlayer.pseudo} vient de joindre le salon. Il y a maintenant ${room.numberPlayer} personnes dans le salon.`);
        });

    };

    const onSubmit = (formData: any) => setData(formData)

    const listChoice = ['choix 1', 'choix 2', 'choix 3', 'choix 4', 'choix 5', 'choix 6'];

    return (
        <main className={styles.main}>
            {
                roomData && roomData.sockets.map((socket: any, index : number) => 
                    <>
                        <div>
                            <p key={index}>Pseudo : {socket.pseudo}</p>
                            <p>Score : </p>
                        </div>
                        <div>
                        {
                            listChoice ? <ChoiceList list={listChoice}/> : null
                        }
                        </div>
                    </>
                )
            }
            {
                data === "" ? 
                <>
                    <h2>Veuillez rentrer un pseudo :</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("pseudo", { required: true, maxLength: 12 })} placeholder="Pseudo" aria-invalid={errors.pseudo ? "true" : "false"}/>
                        {errors.pseudo?.type === "required" && (
                            <p role="alert">Pseudo is required</p>
                        )}
                        {errors.pseudo?.type === "maxLength" && (
                            <p role="alert">Pseudo must contain a maximum of 12 characters</p>
                        )}
                        <input type="submit" value="Valider" />
                    </form>
                </>
                : null
            }
        </main>
    );
}