import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';
import { useFormValidation } from '../../../../../utils/useFormValidation';
import { useEffect } from 'react';

export default function EditProfile() {
   
    const userContext  = useContext(CurrentUserContext);
    const { currentUser, handleUpdateUser } = userContext;
    const { isFormValid, checkFormValidity, formRef} = useFormValidation();
   
    

    //Agregar variables de esado para name y descrition
    const [name, setName] = useState(currentUser.name);
    const  [description, setDescription] = useState(currentUser.about);
  

    //funcion para actualizar el valor de name
    const handleNameChange = (e) => {
      setName(e.target.value);
    }

    //funcion para actualizr le valor de description
    const handleDescriptionChange = (e) => {
    
      setDescription(e.target.value);
      
    }


    //Funcion para manejar el envio del formulario
    const handleSubmit = (e) => {
      e.preventDefault();

      //autualizar la informcion del usuario
      handleUpdateUser({ name, about: description});
    }

    return(
        <form className="popup__form"
         id="edit-profile-form"
         name='profile-form'
         noValidate
         onSubmit={handleSubmit}
         ref={formRef}
         onInput={checkFormValidity}
         >
        <input
          className="popup__input popup__input_type_name"
          name="name"
          id="name"
          placeholder="Nombre"
          type="text"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-input-error"></span>
        <input
          className="popup__input popup__input_type_description"
          name="about"
          placeholder="Acerca de mí"
          type="text"
          id="description"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error description-input-error"></span>
        <button 
        className='popup__button'
        type="submit" 
        disabled={!isFormValid}
        >
          Guardar
          </button>
      </form>
    );
}