"use client"

import { useEffect, useState } from 'react'
import { useSocket } from '@/providers/socket-provider'

import styles from './tablet.module.scss'

import Sound from '@components/Sound/Sound'
import UserList from '@components/UserList/UserList'
import Answer from '@components/Answer/Answer'
import Genre from '@components/Genre/Genre'


export default function Home({ params }: { params: { room_id: string } }) {

  const [roomData, setRoomData] = useState<any>(null);
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
        socketInitializer();
    }
  }, [socket]);

  const socketInitializer = () => {

    socket.emit("enterRoom", { room_id: params.room_id, object: {type: 'tablet'} });

      socket.on("newPlayerJoinParty", ({newPlayer, room} : any) => {
          // console.log(room)
          setRoomData(room)
          // console.log(`${newPlayer.pseudo} vient de joindre le salon. Il y a maintenant ${room.numberPlayer} personnes dans le salon.`);
      });

  };

  const listUser = roomData && roomData.sockets.map((socket: {pseudo : string, socket_id : string}) => socket.pseudo);
  
  return (
    <main className={styles.main}>
      <div>
        <Genre/>
        {
            roomData && listUser ? <UserList list={listUser}/> : null
        }
      </div>
      <Sound/>
      <Answer/>
    </main>
  )
}