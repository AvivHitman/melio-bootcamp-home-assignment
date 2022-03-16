import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchCandidates } from "../../utils/API.js";
import {
  getPersistentCandidatesData,
  transformCandidatesData,
  setPersistentCandidatesData,
  getUpdatedCandidatesWithFavorite,
} from "../../utils/helper.js";
import { CardList } from "../../components/CardList/CardList";

export const Home = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const handleFavoriteClick = (uuid) => {
    const updatedCandidates = getUpdatedCandidatesWithFavorite(
      candidates,
      uuid
    );
    setCandidates(updatedCandidates);
    setPersistentCandidatesData(updatedCandidates);
  };

  const runOnHomePageLoad = async () => {
    const data = getPersistentCandidatesData();
    if (data) {
      setCandidates(data);
    } else {
      const fetchedData = await fetchCandidates();
      const transformedData = transformCandidatesData(fetchedData);
      setCandidates(transformedData);
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
