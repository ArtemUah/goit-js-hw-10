import Notiflix from 'notiflix';

export default class SearchCountry {
  constructor() {
    this.name = '';
  }

  findCountries() {
    return fetch(`https://restcountries.com/v3.1/name/${this.name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            Notiflix.Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .catch(console.error());
  }

  get country() {
    return this.name;
  }

  set country(newCountry) {
    this.name = newCountry;
  }
}
