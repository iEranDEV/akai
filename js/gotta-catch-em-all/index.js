/*
  1. W pliku data.js pod zmienna "pokemons" znajduje się tablica zawierająca dane wielu pokemonów, masz do niej dostęp również w tym pliku. 
  Chciałbym, abyś użył jej do wyświetlenia wszystkich pokemonów w naszym Pokedexie. 
  W tym celu dla każdego z nich możesz stworzyć nowy element drzeewa DOM i umieścić w nim informacje o Pokemonie (możesz zawrzeć tam jego nazwę, zdjęcie, a na kontener w którym się znajduje nadać specjalną klasę zależnie od typu)
*/

// tutaj złapiemy sekcję, do której będziemy dodawać pokemony
const pokemonsContainer = document.querySelector(".pokemons");

function renderPokemons(pokemons) {
    // uzupełnij tutaj
    pokemonsContainer.innerHTML = '';

    pokemons.forEach((pokemon) => {
        const pokemonElement = document.createElement('div');
        pokemonElement.className = 'pokemons-item';

        // Image
        const imageElement = document.createElement('img');
        imageElement.src = pokemon.image;
        imageElement.alt = pokemon.name;
        pokemonElement.appendChild(imageElement);

        // Info section
        const infoElement = document.createElement('div');
        infoElement.className = 'pokemons-item-info';
        const pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;
        infoElement.appendChild(pokemonName);
        const pokemonTypes = document.createElement('div');
        pokemonTypes.className = 'pokemons-item-types';
        pokemon.types.forEach((type) => {
            const typeElement = document.createElement('span');
            typeElement.innerText = type;
            pokemonTypes.appendChild(typeElement);
        })
        infoElement.appendChild(pokemonTypes);
        pokemonElement.appendChild(infoElement);

        // ID
        const idElement = document.createElement('span');
        idElement.className = 'pokemons-item-id';
        idElement.innerText = `#${pokemon.id}`;
        pokemonElement.appendChild(idElement);

        // Append pokemon
        pokemonsContainer.appendChild(pokemonElement);
    })
}

renderPokemons(pokemons);

/*
  2. Przeglądanie całej listy pokemonów może okazać się trochę uciążliwe. Fajnie byłoby skorzystać z filtrów, które już znajdują sie w pliku html. 
  Napisz ciało funkcji które pozwoli nam na:
  - filtrowanie po typie
  - filtrowanie po nazwie (wpisany fragment zawiera się w nazwie pokemona)
*/

const form = document.querySelector("form");

function filterPokemons(pokemons) {
    // uzupełnij tutaj
    // zwróć odfiltrowaną tablicę pokemonów
    const types = Array.from(form.querySelectorAll('[type=checkbox]')).filter((type) => type.checked).map((type) => type.id);
    const name = form.querySelector('#pokemon-name').value;

    return pokemons.filter((pokemon) => pokemon.types.every((type) => types.includes(type)) && pokemon.name.toLowerCase().includes(name.toLowerCase()));
}

function submitForm(event) {
    event.preventDefault();
    // następnie wykonaj uzupełnioną metodę z tablicą pokemons, aby sprawdzić czy wszystko działa
    renderPokemons(filterPokemons(pokemons));
}

form.addEventListener("submit", submitForm);

/*
  3. Pokedex powinien wyglądać trochę lepiej, niż ten tutaj. W folderze znajdziesz plik style.css, w którym możesz ulepszyć wygląd naszego pokedexa
  Liczymy na Twoją kreatywność 😉
*/
