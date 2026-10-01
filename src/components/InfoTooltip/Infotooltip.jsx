import successIcon from "../../images/successIcon.svg";
import errorIcon from "../../images/errorIcon.svg";

export default function InfoTooltip({onClose, isSuccess}) {
    const icon = isSuccess ? successIcon : errorIcon;
    const message = isSuccess ? "¡Correcto! Ya estas registrado" : "Uy, algo salio mal. Por favor intentalo de nuevo";
    const altText = isSuccess ? "Éxito" : "Error"
    return (
        <div className="popup popup_opened" id="infoTooltip-popup">
        <div className="popup__content popup__content_infotooltip">
        <button 
          className="popup__close popup__close_infotooltip" 
          type="button"
          onClick={onClose}
        ></button>
        <img 
          className="popup__icon" 
          src={icon} 
          alt={altText}
        />
        <p className="popup__caption-infotooltip">{message}</p>
      </div>
     </div>
    );
}
