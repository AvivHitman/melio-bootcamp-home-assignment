import React, { useEffect, useState } from "react";
import "./Favorite.css";
import {
  getPersistentCandidatesData,
  setPersistentCandidatesData,
} from "../../utils/helper.js";
import { CardList } from "../../components/CardList/CardList";

export const Favorite = () => {
  const [favoriteCandidates, setfavoriteCandidates] = useState([]);
  const data = getPersistentCandidatesData();

  useEffect(() => {
    runOnFavoritePageLoad();
  }, []);

  const getFavoritesFromData = (candidates) => {
    const favoritesData = [];
    Object.keys(candidates).forEach((firstLetter) => {
      favoritesData[firstLetter] = candidates[firstLetter].filter(
        (candidate) => candidate.isFavorite
      );
    });
    setfavoriteCandidates(favoritesData);
  };

  const handleFavoriteClick = (uuid) => {
    const updatedCandidates = Object.values(data).map((groupedCandidates) =>
      groupedCandidates.map((candidate) =>
        candidate.uuid === uuid
          ? { ...candidate, isFavorite: !candidate.isFavorite }
          : candidate
      )
    );
    getFavoritesFromData(updatedCandidates);
    setPersistentCandidatesData(updatedCandidates);
  };

  const runOnFavoritePageLoad = async () => {
    if (data) {
      getFavoritesFromData(data);
    }
  };

  const isFavoriteCandidatesEmpty = Object.values(favoriteCandidates).every(
    (groupedCandidates) => groupedCandidates.length === 0
  );

  return isFavoriteCandidatesEmpty ? (
    <p style={{ textAlign: "center", lineHeight: "400px" }}>
      you don't have any favorite candidates yet
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
