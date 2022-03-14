import "./CardList.css";
import { Card } from "../Card/Card";

export const CardList = (props) => {
  return (
    <div className="card-list">
      {Object.values(props.candidateList).map((groupedCandidates) =>
        groupedCandidates.map((candidate) => (
          <Card
            onFavoriteClick={props.handleFavoriteClick}
            key={candidate.uuid}
            uuid={candidate.uuid}
            picture={candidate.picture}
            firstName={candidate.firstName}
            lastName={candidate.lastName}
            email={candidate.email}
            city={candidate.city}
            country={candidate.country}
            isFavorite={candidate.isFavorite}
            isPreferred={candidate.isPreferred}
          />
        ))
      )}
    </div>
  );
};
