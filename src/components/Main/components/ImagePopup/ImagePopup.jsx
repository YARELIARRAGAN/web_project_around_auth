

export default function ImagePopup({card, onClose}) {

    console.log('ImagePopup renderizado');
    console.log('card:', card);
    console.log('card.link:', card.link);
    console.log('card.name:', card.name);
   
   
    return (
      <div className="popup popup_opened" id="image-popup">
        <div className="popup__content popup__content_content_image">
        <button 
          className="popup__close" 
          type="button"
          onClick={onClose}
        ></button>
        <img 
          className="popup__image" 
          src={card.link} 
          alt={card.name} 
        />
        <p className="popup__caption">{card.name}</p>
      </div>
     </div>
    );
}