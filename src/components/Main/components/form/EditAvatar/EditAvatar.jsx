import { useRef, useContext } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';
import { useFormValidation } from '../../../../../utils/useFormValidation';

export default function EditAvatar() {

    
    const { handleUpdateAvatar } = useContext(CurrentUserContext);
    const avatarRef = useRef();

    const { isFormValid, checkFormValidity, formRef } = useFormValidation()

    function handleSubmit(e) {
      e.preventDefault();

      handleUpdateAvatar({ 
        avatar: avatarRef.current.value,
      });
    }



    return(
        <form 
        className="popup__form" 
        id="edi-avatar-form"
        noValidate
        onSubmit={handleSubmit}
        ref={formRef}
        onInput={checkFormValidity}
        >
        <input
            className="popup__input popup__input_type_url"
            name="avatar"
            placeholder="Enlace a la imagen"
            id="avatar"
            required
            type="url"
            ref={avatarRef}
          />
        <span className="popup__input-error avatar-input-error"></span>
        <button 
        className="button popup__button" 
        type="submit"
        disabled={!isFormValid}
        >
          Guardar</button>
      </form>
    );

}