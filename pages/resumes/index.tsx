import { useEffect, useState } from 'react';
import Resume from '../../components/resume/resume';
import { fetchResumes } from '../../utils/firebase';
import styles from './resumes.module.css';

const Resumes = () => {

    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes()
        .then((res) => {
            setResumes(res);
        })
        .catch((err) => console.log(err));
    }, [])

    return (
        <main>
            {
                resumes.map((resume, i) => {
                    return <Resume {...resume} key={i} />
                })
            }
        </main>
    );
}

export default Resumes;