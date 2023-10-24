import Choice from '@components/Choice/Choice'
import styles from './ChoiceList.module.scss'

type choiceListProps = {
    list : string[];
}

export default function ChoiceList ({ list } : choiceListProps) {
    return (
        <div className={styles.choicelist}>
            <h2>Answer choice</h2>
            <ul>
                {list.map((choix, index) => 
                    <Choice key={index} choix={choix}/>
                )}
            </ul>
        </div>
    )
}