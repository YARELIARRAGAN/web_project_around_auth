import { useState, useRef, useEffect } from 'react';

export function useFormValidation() {
    const [isFormValid, setIsFormValid] = useState(false);
    const formRef =  useRef(null);

    useEffect(() => {
        if  (formRef.current) {
            setIsFormValid(formRef.current.checkValidity());
        }
    }, []);



    const checkFormValidity = (e) => {
        const form = e.target.closest('form');
        setIsFormValid(form.checkValidity());
    };

    return {
        isFormValid,
        checkFormValidity,
        formRef
    };

}