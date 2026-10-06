
export default function Card(props) {
    const { name, link, isLiked} = props.card;
    const { onPopupImageClick, onCardLike, onCardDelete } = props;
    const cardLikeButtonClassName = `card__like-button ${
      isLiked ? 'card__like-button_is-active' : ''
      
  }`;

  const handleImageClick = () => {
    onPopupImageClick(props.card)
  }

    return (
        <li className="card">
        <img 
            className="card__image" 
            src={link} 
            alt={name} 
            onClick={handleImageClick}/>
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={() => onCardDelete(props.card)}
        />
        <div className="card__description">
          <h2 className="card__title">{name}</h2>
          <button
            aria-label="Like card"
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(props.card)}
          />
        </div>
      </li>
    )
}