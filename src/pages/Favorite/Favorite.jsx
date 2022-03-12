import React, {useEffect, useState} from "react";
import "./Favorite.css";
import {getPersistentCandidatesData, setPersistentCandidatesData} from "../../utils/helper.js";
import { Card } from "../../components/Card/Card";
export const Favorite = () => {
    const [favoriteCandidates, setfavoriteCandidates] = useState([]);
    const data = getPersistentCandidatesData();

    useEffect(() => {
      runOnFavoritePageLoad();
    }, []);
    
    const getFavoriteFromData=(data)=>{
      const favoriteData=[];
      data.forEach(candidate => candidate.isFavorite? favoriteData.push(candidate): []);
      setfavoriteCandidates(favoriteData);
    }
  
    const handleFavoriteClick = (uuid, isFavorite) => {
        const updatedCandidates = data.map(candidate => candidate.uuid === uuid ? {...candidate, isFavorite:!isFavorite } : candidate);
        getFavoriteFromData(updatedCandidates);
        setPersistentCandidatesData(updatedCandidates);
  
    }
  
    const runOnFavoritePageLoad = async () => {
       if (data) {
         getFavoriteFromData(data);
      } 
    }

    if(favoriteCandidates.length === 0){
        return <p style={{'textAlign':'center', 'lineHeight': '400px'}}>
          you don't have any favorite candidates yet</p>
    }

  
    return (
      <div id="favorites">
        <div className="favorites-title">Favorites candidates</div>
        <div className="favorites-subtitle">Aviv Hitman</div>
        <div className="favorites-list">
         
        {favoriteCandidates.map(candidate => (
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
  
