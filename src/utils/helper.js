export const getPersistentCandidatesData = () => {
  return JSON.parse(localStorage.getItem("candidates"));
};

export const setPersistentCandidatesData = (candidates) => {
  localStorage.setItem("candidates", JSON.stringify(candidates));
};

export function transformCandidatesData(fetchData) {
  return getGroupedCandidates(
    fetchData.map((candidate) => ({
      firstName: candidate.name.first,
      lastName: candidate.name.last,
      email: candidate.email,
      city: candidate.location.city,
      country: candidate.location.country,
      picture: candidate.picture.medium,
      uuid: candidate.login.uuid,
      isFavorite: false,
      isPreferred: getIsPreferred(candidate.nat),
    }))
  );
}

const getIsPreferred = (nationality) => {
  return nationality === "US" || nationality === "UK";
};

const getGroupedCandidates = (rawCandidates) => {
  const groupedCandidates = {};
  rawCandidates.forEach((candidate) => {
    const firstLetterInFirstName = candidate.firstName[0];
    if (groupedCandidates[firstLetterInFirstName]) {
      groupedCandidates[firstLetterInFirstName].push(candidate);
    } else {
      groupedCandidates[firstLetterInFirstName] = [candidate];
    }
  });
  return groupedCandidates;
};
