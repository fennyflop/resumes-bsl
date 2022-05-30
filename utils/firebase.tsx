import { initializeApp } from "firebase/app";
import { addDoc, collection, DocumentData, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQtB4Ih3cOENM_D2WO3Rjn8aDhqKDBdpo",
  authDomain: "resumes-42196.firebaseapp.com",
  projectId: "resumes-42196",
  storageBucket: "resumes-42196.appspot.com",
  messagingSenderId: "54009778916",
  appId: "1:54009778916:web:51733d66acbc291b7552f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const postResume = async (values: any) => {
    const requestData = {
        username: values?.username || 'No username',
        description: values?.description || 'No description',
        payments: values?.payments || [],
        keywords: values?.keywords || [],
        doxxed: values?.doxxed || false,
        name: values?.name || '',
        surname: values?.surname || '',
        socials: {
            twitter: values?.twitter || '',
            linkedin: values?.linkedin || '',
            github: values?.github || '',
            instagram: values?.instagram || '',
            discord: values?.discord || '',
        }
    }
    try {
        const docRef = await addDoc(collection(firestore, "resumes"), requestData);
        console.log(docRef.id)
    } catch (err) {
        console.log(err);
    }
    console.log(requestData);
}

export const fetchResumes = async () => {
    const response: DocumentData[] = [];
    const resumeSnapshot = await getDocs(collection(firestore, "resumes"));
    resumeSnapshot.forEach((doc) => {
        response.push(doc.data());
    })

    return response;
}