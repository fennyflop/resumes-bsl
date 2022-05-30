import { FC, useEffect } from 'react';
import { fetchResumes } from '../../utils/firebase';
import styles from './resume.module.css';

const Resume: FC<any> = (props) => {
    console.log(props)
    return (
        <div className={styles.resume}>
            <p className={styles.text}>{props.username}</p>
            <p className={styles.text}>{props.keywords.join(" ")}</p>
        </div>
    )
}

export default Resume;