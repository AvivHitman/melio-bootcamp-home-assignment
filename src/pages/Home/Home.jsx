import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchCandidates } from "../../utils/API.js";
import {
  getPersistentCandidatesData,
  transformCandidatesData,
  setPersistentCandidatesData,
} from "../../utils/helper.js";
import { CardList } from "../../components/CardList/CardList";

export const Home = () => {
  const [candidates, setCandidatesFunction] = useState([]);

  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const handleFavoriteClick = (uuid) => {
    const updatedCandidates = Object.values(candidates).map(
      (groupedCandidates) =>
        groupedCandidates.map((candidate) =>
          candidate.uuid === uuid
            ? { ...candidate, isFavorite: !candidate.isFavorite }
            : candidate
        )
    );
    setCandidatesFunction(updatedCandidates);
    setPersistentCandidatesData(updatedCandidates);
  };

  const runOnHomePageLoad = async () => {
    const data = getPersistentCandidatesData();
    if (data) {
      setCandidatesFunction(data);
    } else {
      const fetchedData = await fetchCandidates();
      const transformedData = transformCandidatesData(fetchedData);
      setCandidatesFunction(transformedData);
      setPersistentCandidatesData(transformedData);
    }
  };

  return (
    <div id="home">
      <div className="home-title">Firm's candidates</div>
      <div className="home-subtitle">Aviv Hitman</div>
      <CardList
        candidateList={candidates}
        handleFavoriteClick={handleFavoriteClick}
      />
    </div>
  );
};
