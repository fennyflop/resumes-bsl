import React, { useState } from "react";

// везде задавать initial value может быть решит проблему

const useFormWithValidation = <TValuesType = {[key: string]: string}>(initialValue: TValuesType) => {
    const [values, setValues] = useState<TValuesType>(initialValue);
    const [errors, setErrors] = useState<TValuesType>(initialValue);
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: e.currentTarget.validationMessage});
        // @ts-ignore: Тут говорит, что нет таких полей. Что мне тут следует делать?:)
        setIsValid(e.currentTarget.closest("form").checkValidity());
    }

    const changeValues = (newData: TValuesType) => {
        setValues(newData);
    }
    
    return {values, errors, isValid, handleChange, changeValues};
}

export default useFormWithValidation;