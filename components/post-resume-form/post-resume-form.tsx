import chroma from 'chroma-js';
import React, { useState } from 'react';
import styles from './post-resume-form.module.css';

import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import useFormWithValidation from '../../utils/hooks';
import { postResume } from '../../utils/firebase';

const animatedComponents = makeAnimated()

export const fields = [
    { value: 'developer', label: 'Developer', color: '#8338ec' },
    { value: 'artist', label: 'Artist', color: '#ff006e' },
    { value: 'management', label: 'Management', color: '#fb5607' },
];

export const payments = [
    { value: 'btc', label: 'BTC', color: '#fb8500' },
    { value: 'sol', label: 'SOL', color: '#8338ec' },
    { value: 'usdt', label: 'USDT', color: '#3a5a40' },
    { value: 'forge', label: '$FORGE', color: '#ffb703' },
    { value: 'fiat', label: 'Fiat Currencies', color: '#1a759f' },
];



const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

const PostResumeForm = () => {

    const [keywords, setKeywords] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [doxxed, setDoxxed] = useState<boolean>(false);

    const {values, errors, isValid, handleChange, changeValues} = useFormWithValidation({
        username: '',
        description: '',
        name: '',
        surname: '',
        github: '',
        twitter: '',
        website: '',
        instagram: '',
        discord: ''
    });

    const handleSubmit = async (evt: React.FormEvent) => {
        evt.preventDefault();
        postResume({...values, payments: paymentMethods, keywords, doxxed})
    }

    const handleSelectKeywords = (e: any) => setKeywords(e.map((element: any) => element.value));
    const handleSelectPaymentMethods = (e: any) => setPaymentMethods(e.map((element: any) => element.value));

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.subtitle}>Credentials</h3>
            <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                <input className={styles.input} placeholder="Username" value={values.username} onChange={handleChange} name="username" />
            </fieldset>
            <fieldset className={styles.question}> {/* username, description, doxxed */}
                <p className={styles.doxxed}>Ready to be doxxed</p>
                <div className={styles.buttons}>
                    <button type="button" className={`${styles.button} ${doxxed ? styles.green : styles.red}`} onClick={() => setDoxxed(!doxxed)}>{doxxed ? "Switch Off" : "Switch On"}</button>
                </div>
            </fieldset>
            {
                doxxed ?  
                <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                    <input className={styles.input} placeholder="First" value={values.name} onChange={handleChange} name="name" />
                    <input className={styles.input} placeholder="Last Name" value={values.surname} onChange={handleChange} name="surname" />
                </fieldset> 
                :
                ''
            }
            {/* @ts-ignore */}
            <textarea className={styles.textarea} placeholder="About me" value={values.description} onChange={handleChange} name="description" />
            <h3 className={styles.subtitle}>Working Fields & Payement</h3>
            <div className={styles.select}>
                <Select 
                    onChange={handleSelectKeywords}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    options={fields}
                    styles={colourStyles}
                    placeholder="Select Working Fields..."
                />
            </div>
            <div className={styles.select}>
                <Select 
                    onChange={handleSelectPaymentMethods}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={[]}
                    isMulti
                    options={payments}
                    styles={colourStyles}
                    placeholder="Select Payment Methods..."
                />
            </div>
            <h3 className={styles.subtitle}>Social Medias</h3>
            <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                <input className={styles.input} placeholder="Github (Link)" value={values.github} onChange={handleChange} name="github" />
            </fieldset>
            <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                <input className={styles.input} placeholder="Twitter (Link)" value={values.twitter} onChange={handleChange} name="twitter" />
            </fieldset>
            <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                <input className={styles.input} placeholder="Website (Link)" value={values.website} onChange={handleChange} name="website" />
            </fieldset>
            <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                <input className={styles.input} placeholder="Instagram (Link)" value={values.instagram} onChange={handleChange} name="instagram" />
            </fieldset>
            <fieldset className={styles.fieldset}> {/* username, description, doxxed */}
                <input className={styles.input} placeholder="Discord (fennyflop#7289)" value={values.discord} onChange={handleChange} name="discord" />
            </fieldset>
            <button type="submit" className={styles.submit}>POST RESUME</button>
        </form>
    );
}

export default PostResumeForm;