
export default function Popup(props) {
    const {onClose, title, children} = props;
    
    return (
        <div className="popup" >
        <div className="popup__content">
          <button
            aria-label="Cerrar ventana emergente"
            className="popup__close"
            type="button"
            //Evento que llama a la funion para cerrar el popup
            onClick={onClose}
          ></button>
          {title && <h3 className="popup__title">{title}</h3>}
          {children}
        </div>
      </div>
    );
}