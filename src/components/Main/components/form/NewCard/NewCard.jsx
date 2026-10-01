import {useState, useContext} from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';
import { useFormValidation } from '../../../../../utils/useFormValidation';

export default function NewCard() {

    const userContext = useContext(CurrentUserContext);
    const { currenUser, handleAddPlaceSubmit } = userContext;
    const { isFormValid, checkFormValidity, formRef} = useFormValidation();

    const [ name, setName ] = useState('');
    const [ link, setLink ] = useState(''); 


    const handlePlaceNameChange = (e) => {
      setName(e.target.value);
    };

    const handleImageUrlChange = (e) => {
      setLink(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      handleAddPlaceSubmit({
        name: name,
        link: link
      });

      setName('');
      setLink('');

    }

    return (
        <form 
        className="popup__form" 
        id="new-card-form"
        onSubmit={handleSubmit}
        ref={formRef}
        onInput={checkFormValidity}
        
        >
        <input
          className="popup__input popup__input_type_card-name"
          name="name"
          placeholder="Título"
          id="place-name"
          required
          type="text"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handlePlaceNameChange}
        />
        <span className="popup__input-error place-name-input-error"></span>
        <input
          className="popup__input popup__input_type_url"
          name="link"
          placeholder="Enlace a la imagen"
          id="link"
          required
          type="url"
          value={link}
          onChange={handleImageUrlChange}
        />
        <span className="popup__input-error link-input-error"></span>
        <button 
        className="button popup__button" 
        type="submit" 
        disabled={!isFormValid}
        >Crear</button>
      </form>
    )
}