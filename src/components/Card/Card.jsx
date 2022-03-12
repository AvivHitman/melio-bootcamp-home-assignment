import React, { useState } from "react";
import "./Card.css";
import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";

export const Card = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [isMouseOn, setIsMouseOn] = useState(false);


  const handleFavoriteClick = () => {
    props.onFavoriteClick(props.uuid, isFavorite);
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
    }
  };

  const handleMouseOver = () => {
      setIsMouseOn(true); 
  };

  const handleMouseLeave = () => {
    setIsMouseOn(false);
  };


  return (
    <li className="card" onMouseOver={handleMouseOver} onMouseOut={handleMouseLeave} >
      <img className="card__image" src={props.picture} />
      <div className="card__content">
        <div className="card__info">
          <div className="card__name"> 
            <h2>{props.firstName} {props.lastName}</h2>
            {props.isPreferred ? <label className="card__label">PREFERRED</label> : []}
          </div>        
          <h3> {props.email} </h3>
          <h3>{props.city}, {props.country}</h3>
        </div>
      </div>
      <div className="card__icon">
        <FavoriteIcon
          onClick={handleFavoriteClick}
          style={{ fill: isFavorite || isMouseOn ? "red" : "white" }}
        />
      </div>
    </li>
  );
};
