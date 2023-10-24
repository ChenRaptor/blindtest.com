"use client"
import styles from './page.module.scss'

import SocketQRCode from '@/components/QrCode/QrCode'
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import Carrousel3D from '@/components/Carrousel3D/Carrousel3D';
import CardImage from '@/components/CardImage/CardImage';
import Button from '@/components/Button/Button';
import { useCinema } from '@/providers/cinema-provider';


export default function Home() {

  const socketURL = `${process.env.NEXT_PUBLIC_SITE_URL}/room/${uuidv4()}/phone`;
  const {cinema, setCinema} = useCinema();
  const [party, setParty] = useState(false);
  const [option, setOption] = useState<string>();


  useEffect(() => {
    cinema && Object.keys(cinema) && setOption(Object.keys(cinema)[0])
  }, [cinema])

  return (
    <main className={styles.main}>

      <div className={styles.top}>

        <div>
          <div className={styles.qrCode}>
            {cinema && option && (cinema[option] ?? []).map((src : string, index : number) => 
                <CardImage
                  src={src}
                  key={index}
                />
              ) 
            }
            <span>
              {
                party ?  <SocketQRCode url={socketURL}/> : ''
              }
            </span>
          </div>
        </div>
        <div>
          <Button type="primary" text="Lancer la partie" onClick={() => setParty(true)}/>
        </div>

      </div>

      <div className={styles.carrousel3D}>
        {cinema && Object.keys(cinema) &&
          <Carrousel3D 
            gapCenter={250} 
            carrouselItems={ Object.keys(cinema) } 
            setter={setOption}
          />
        }
      </div>
    </main>
  )
}