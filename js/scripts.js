let pokemonRepository = (function () {
	let pokemonList = [
		{name: 'Bulbasur', height: 0.7, types: ['grass', 'poison']},
		{name: 'Charmander', height: 0.6, types: ['fire']},
		{name: 'Phanpy', height: 1.08, types: ['ground']}, 
		{name: 'Eve', height: 1, types: ['normal']},
	];
	function getAll() {
		return pokemonList;
	}
	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function addListItem(pokemon) {
		let unorderedList = document.querySelector(".pokemon-list");
		let listItem = document.createElement("li");
		let button = document.createElement("button");
		button.innerText = pokemon.name;
		button.classList.add("button-class");
		listItem.appendChild(button);
		unorderedList.appendChild(listItem);
		// Add EventListener to the button: pokemon details should be displayd after a button click
		function showDetails(pokemon) {
			console.log(pokemon);
		}
		button.addEventListener('click', () => showDetails(pokemon))
		}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem
	}
})();

// Add a new pokemon to the pokemonList array
pokemonRepository.add({name: 'Tangela', height: 3.03, types: ['grass']})


// Create a forEach loop to display every pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
// Add addListItem function into the forEach loop
pokemonRepository.addListItem(pokemon);
});

