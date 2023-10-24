import Image from 'next/image'
import styles from './Sound.module.scss'

export default function Sound () {
    return (
        <div className={styles.sound}>
            <Image
                src="/cassette.svg"
                width={500}
                height={300}
                alt="Cassette audio"
            />
        </div>
    )
}