import { MouseEventHandler } from "react";
import styles from './Button.module.scss'

export default function Button({
    onClick, 
    text, 
    className,
    type
} : {
    onClick?: MouseEventHandler<HTMLButtonElement>, 
    text?: string,
    className?: string
    type?: 'primary' | 'secondary'
}) {
    return (
        <button className={`${styles.main} ${type ? styles[type] : null} ${className || ''}`} onClick={onClick}>
            {text}
        </button>
    )
}

