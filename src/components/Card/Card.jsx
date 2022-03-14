import React, { useState } from "react";
import "./Card.css";
import { FavoriteIcon } from "../FavoriteIcon/FavoriteIcon";

export const Card = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleFavoriteClick = () => {
    props.onFavoriteClick(props.uuid);
  };

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <li
      className="card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseLeave}
    >
      <img className="card__image" src={props.picture} />
      <div className="card__content">
        <div className="card__info">
          <div className="card__name">
            <h2>
              {props.firstName} {props.lastName}
            </h2>
            {props.isPreferred && (
              <label className="card__label">PREFERRED</label>
            )}
          </div>
          <h3> {props.email} </h3>
          <h3>
            {props.city}, {props.country}
          </h3>
        </div>
      </div>
      <div
        className="card__icon"
        style={{
          display: props.isFavorite || isMouseOver ? "initial" : "none",
        }}
      >
        <FavoriteIcon
          onClick={handleFavoriteClick}
          style={{ fill: isMouseOver && props.isFavorite && "#ff9999" }}
        />
      </div>
    </li>
  );
};
