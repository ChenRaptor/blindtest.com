"use client"

import Button from '@/components/Button/Button';
import styles from './Carrousel3D.module.scss'
import { Fragment, useState } from 'react';

export default function Carrousel3D({carrouselItems, gapCenter, setter} : { carrouselItems : string[], gapCenter : number, setter : any }) {

    const [index, setIndex] = useState({
        selected: 0,
        deg: 0
    });
  
    const gapRotation = 360 / carrouselItems.length
  
    const rotate = (direction : string) => {
        if (direction === 'p') {

            setIndex((prev) => {
                if (prev.selected === 0) {
                    setter(carrouselItems[carrouselItems.length -1]);
                    return { selected: carrouselItems.length -1, deg: prev.deg + gapRotation }
                }
                setter(carrouselItems[prev.selected - 1]);
                return { selected: prev.selected - 1, deg: prev.deg + gapRotation }
            });

        } else if (direction === 'n') {
            setIndex((prev) => {
                if (prev.selected === carrouselItems.length - 1) {
                    setter(carrouselItems[0]);

                    return { selected: 0, deg: prev.deg - gapRotation }
                } 
                setter(carrouselItems[prev.selected + 1]);
                return { selected: prev.selected + 1, deg: prev.deg - gapRotation }
            });
        }
    };

    return (
        <div className={styles.main}>
            <Button className={`${styles['main-button']}`} onClick={() => rotate("p")} text="Prev"/>
            <div className={styles.container}>
                <div className={styles.carousel} style={{"--rotation": `${index.deg}deg`}}>
                    {
                        !!carrouselItems && carrouselItems.map((carrouselItem: string, carrouselItemIndex) => {
                            return (
                                <Fragment key={carrouselItemIndex}>
                                    <div key={`op2-${carrouselItemIndex}`} className={`${styles.item}`} style={{
                                        "--rotation2": `${gapRotation*carrouselItemIndex}deg`,
                                        "--gapCenter": `${gapCenter}px`,
                                        }}>
                                        <h2 >{carrouselItem.charAt(0).toUpperCase() + carrouselItem.slice(1).split('_').join(' ')}</h2>
                    
                                    </div>
                                    <div key={`op1-${carrouselItemIndex}`} className={`${styles.itembackside}`} style={{
                                        "--rotation2": `${gapRotation*carrouselItemIndex}deg`,
                                        "--gapCenter": `${gapCenter}px`,
                                        }}></div>
                                </Fragment>
                            )
                        })
                    }

                </div>
            </div>
            <Button className={`${styles['main-button']}`} onClick={() => rotate("n")} text="Next"/>
        </div>
    )
}