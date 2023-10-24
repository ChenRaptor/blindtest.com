import Image from 'next/image'
import styles from './CardImage.module.scss'

export default function CardImage({src}:{src: string}) {

    const imageLoader = ({ src }:any) => {
        return `${src}?w=100&q=1`
    }

    return (
        <div className={`${styles.main}`}>
            <div>
                <Image 
                loader={imageLoader}
                src={src}
                alt="Poster"
                width={120}
                height={160}
                />
            </div>
        </div>
    )
}