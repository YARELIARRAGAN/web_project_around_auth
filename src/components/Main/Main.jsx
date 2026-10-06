
import { useContext} from "react";
import NewCard from "./components/form/NewCard/NewCard.jsx";
import EditProfile from "./components/form/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/form/EditAvatar/EditAvatar.jsx";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({ onOpenPopup, onClosePopup, popup, cards, onCardLike, onCardDelete, onPopupImageClick, selectedCard }) {

  //estado
  const { currentUser } = useContext(CurrentUserContext);
  

  //Variable de cada form
  const newCardPopup = {title: "Nuevo Lugar", children: <NewCard />};
  const editProfilePopup = {title: "Editar perfil", children: <EditProfile onClosePopup={onClosePopup}/>};
  const editvatarPopup = {title: "Cambiar foto del perfil", children: <EditAvatar />};


  

    return (
        <main className="content">
<section className="profile page__section">
  <div className="profile__image-container">
    <img className="profile__image" src={currentUser.avatar} alt="Avatar" />
    <div className="profile__image-overlay">
      <button 
      className="profile__image-edit-button"
      //Mandar a llamar la funcion para abrir el poopup de editar perfil
      onClick={() => onOpenPopup(editvatarPopup)}
      ></button>
    </div>
  </div>
  <div className="profile__info">
    <h1 className="profile__title">{currentUser.name}</h1>
    <button
      aria-label="Editar perfil"
      className="profile__edit-button"
      type="button"
      id="profile__edit-button"
      onClick={() => onOpenPopup(editProfilePopup)}
    ></button>
    <p className="profile__description">{currentUser.about}</p>
  </div>
  <button
    aria-label="Agregar tarjeta"
    className="profile__add-button"
    type="button"
    onClick={() => onOpenPopup(newCardPopup)}
  ></button>
</section>
<section className="cards page__section">
  <ul className="cards__list">
    
    {cards.map((card) => (
      
      <Card 
      key={card._id} 
      card={card} 
      isLiked={card.isLiked}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      onPopupImageClick={onPopupImageClick}
      />
    ))}
  </ul>
</section>
{ popup === 'image' && selectedCard && (
  <ImagePopup 
  card={selectedCard}
  onClose={onClosePopup}
  />
)

}

{ popup && popup !== 'image' && (
  <Popup onClose={onClosePopup} 
  title={popup.title}>
  {popup.children}
  </Popup>
)}
</main>
    );
}

export default Main;
