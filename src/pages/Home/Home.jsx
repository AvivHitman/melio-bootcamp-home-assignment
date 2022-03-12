import React, {useEffect, useState} from "react";
import "./Home.css";
import {fetchCandidates} from "../../utils/API.js";
import {getPersistentCandidatesData, transformCandidatesData, setPersistentCandidatesData} from "../../utils/helper.js";
import { Card } from "../../components/Card/Card";

export const Home = () => {
  const [candidates, setCandidatesFunction] = useState([]);

  useEffect(() => {
    runOnHomePageLoad();
  }, []);


  const handleFavoriteClick = (uuid, isFavorite) => {
    const updatedCandidates = candidates.map(candidate => candidate.uuid === uuid ? {...candidate, isFavorite:!isFavorite } : candidate);
    setCandidatesFunction(updatedCandidates);
    setPersistentCandidatesData(updatedCandidates);

  }

  const runOnHomePageLoad = async () => {
     const data = getPersistentCandidatesData();
     if (data) {
        setCandidatesFunction(data);
    } else {
      const fetchedData = await fetchCandidates();
      const transformedData = transformCandidatesData(fetchedData) ;

      setCandidatesFunction(transformedData);
      setPersistentCandidatesData(transformedData);
    }
  }

  return (
    <div id="home">
      <div className="home-title">Firm's candidates</div>
      <div className="home-subtitle">Aviv Hitman</div>
      <div className="candidates-list">
       
      {candidates.map(candidate => (
        <Card onFavoriteClick ={handleFavoriteClick}
          key={candidate.uuid}
          uuid={candidate.uuid}
          picture={candidate.picture}
          firstName={candidate.firstName}
          lastName={candidate.lastName}
          email={candidate.email}
          city={candidate.city}
          country={candidate.country}
          isFavorite={candidate.isFavorite}
          isPreferred= {candidate.isPreferred}
        />
      ))}

      </div>
    </div>
  );
};
