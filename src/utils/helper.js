export const getPersistentCandidatesData = () => {
    return JSON.parse(localStorage.getItem("candidates"));
}

export const setPersistentCandidatesData = (candidates) => {
  localStorage.setItem("candidates", JSON.stringify(candidates));

}


export function transformCandidatesData(fetchData) {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      firstName: fetchData[i].name.first,
      lastName: fetchData[i].name.last,
      email: fetchData[i].email,
      city: fetchData[i].location.city,
      country: fetchData[i].location.country,
      picture: fetchData[i].picture.medium,
      uuid: fetchData[i].login.uuid,
      isFavorite: false,
      isPreferred: checkEnglish(fetchData[i].location.country)
    });
  }
  
   return data;

}

  const checkEnglish=(country)=>{
    return country === 'United States' || country === 'England' || country === 'United Kingdom';

  }

  const sortingData=(rawData)=>{
    let data = rawData.reduce((r, e) => {
      let group = e.firstName[0];
      if(!r[group]) r[group] = [];
      r[group].push(e);
      return r;
    }, {})
    
    let result =Object.keys(data).map(key => ({key, e: data[key]})).sort((a, b) => a.key.localeCompare(b.key));
    
   return result;

  }
