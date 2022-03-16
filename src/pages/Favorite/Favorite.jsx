import React, { useEffect, useState } from "react";
import "./Favorite.css";
import {
  getPersistentCandidatesData,
  setPersistentCandidatesData,
  getUpdatedCandidatesWithFavorite,
} from "../../utils/helper.js";
import { CardList } from "../../components/CardList/CardList";

export const Favorite = () => {
  const [favoriteCandidates, setfavoriteCandidates] = useState([]);
  const data = getPersistentCandidatesData();

  useEffect(() => {
    runOnFavoritePageLoad();
  }, []);

  const updateFavoritesList = (candidates) => {
    const favoritesData = [];
    Object.keys(candidates).forEach((firstLetter) => {
      favoritesData[firstLetter] = candidates[firstLetter].filter(
        (candidate) => candidate.isFavorite
      );
    });
    setfavoriteCandidates(favoritesData);
  };

  const handleFavoriteClick = (uuid) => {
    const updatedCandidates = getUpdatedCandidatesWithFavorite(data, uuid);
    updateFavoritesList(updatedCandidates);
    setPersistentCandidatesData(updatedCandidates);
  };

  const runOnFavoritePageLoad = async () => {
    if (data) {
      updateFavoritesList(data);
    }
  };

  const isFavoriteCandidatesEmpty = Object.values(favoriteCandidates).every(
    (groupedCandidates) => groupedCandidates.length === 0
  );

  return isFavoriteCandidatesEmpty ? (
    <p style={{ textAlign: "center", lineHeight: "400px" }}>
      You don't have any favorite candidates yet
    </p>
  ) : (
    <div id="favorites">
      <div className="favorites-title">Favorites candidates</div>
      <div className="favorites-subtitle">Aviv Hitman</div>
      <CardList
        candidateList={favoriteCandidates}
        handleFavoriteClick={handleFavoriteClick}
      />
    </div>
  );
};
