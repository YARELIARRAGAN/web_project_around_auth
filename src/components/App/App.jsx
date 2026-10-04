import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import api from "../../utils/api.js";
import auth from "../../utils/auth.js";
import Login from "../Login/login.jsx";
import Register from "../Register/register.jsx";
import InfoTooltip from "../InfoTooltip/Infotooltip.jsx";
import { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({ data: {} });
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleOpenPopup(popup) {
    setPopup(popup); 
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    (async () => {
      if (token) {
        try {
          const userData = await auth.checkToken(token);
          setCurrentUser(userData);
          setIsLoggedIn(true);
        } catch {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        } 
      }else {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  //exportar la instancia de api para obtener las cards

  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn) {
          const cardsData = await api.getInitialCards();
          setCards(cardsData);
        }
      } catch (err) {
        console.error("Eror al obtener la tarjeta", err);
      }
    })();
  }, [isLoggedIn]);

  const handleUpdateUser = (userData) => {
    (async () => {
      const newData = await api.editUserInfo(userData);
      setCurrentUser(newData);
      handleClosePopup();
    })();
  };

  const handleUpdateAvatar = (userData) => {
    (async () => {
      const newData = await api.editUserAvatar(userData);
      setCurrentUser(newData);
      handleClosePopup();
    })();
  };

  const handleAddPlaceSubmit = (cardData) => {
    (async () => {
      const newCard = await api.addNewCard(cardData);
      setCards([newCard, ...cards]);
      handleClosePopup();
    })();
  };

  const handleRegisterSubmit = (email, password) => {
    (async () => {
      try {
        const newData = await auth.register(email, password);
        setIsSuccess(true);
        setIsTooltipOpen(true);
      } catch (err) {
        setIsSuccess(false);
        setIsTooltipOpen(true);
        console.log(err);
      }
    })();
  };

  const handleLoginSubmit = (email, password) => {
    (async () => {
      try {
        const newData = await auth.authorize(email, password);
        setIsLoggedIn(true);
        localStorage.setItem("token", newData.token);
        navigate("/");
      } catch (err) {
        setIsSuccess(false);
        setIsTooltipOpen(true);
        console.log(err);
      }
    })();
  };

  //funcion para dar like a la carta

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;
    (async () => {
      try {
        const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const handleCardDelete = (card) => {
    (async () => {
      try {
        await api.deleteCard(card._id);
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const handlePopupImageClick = (card) => {
    setSelectedCard(card);
    handleOpenPopup("image");
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          currentUser={currentUser}
        />
        {isTooltipOpen && (
          <InfoTooltip
            isSuccess={isSuccess}
            onClose={() => {
              setIsTooltipOpen(false);
              if (isSuccess) {
                navigate("/signin");
              }
            }}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onPopupImageClick={handlePopupImageClick}
                  selectedCard={selectedCard}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={<Register onSubmitRegister={handleRegisterSubmit} />}
          />
          <Route
            path="/signin"
            element={<Login onSubmitLogin={handleLoginSubmit} />}
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
