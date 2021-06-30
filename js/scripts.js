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
	return {
		getAll: getAll,
		add: add
	}
})();

// Add a new pokemon to the pokemonList array
pokemonRepository.add({name: 'Tangela', height: 3.03, types: ['grass']})


// Create a list of Pokemon and their caracteristics
pokemonRepository.getAll().forEach(function(pokemon) {
// Add "Wow, that's big !" after the height of the biggest Pokemon 
//   	if (pokemon.height > 3) {
// 	document.write(pokemon.name + " - height: " + pokemon.height + " - Wow, that's big!" + "<br>");
// }
// 	else {
// 	document.write(pokemon.name + " - height: " + pokemon.height + "<br>");
// }
	let unorderedList = document.querySelector('ul');
	let listItem = document.createElement('li');
	let button = document.createElement('button');
	button.innerText = pokemonRepository.getAll().name;
	button.classList.add('button');
	listItem.appendChild('button');
	unorderedList.appendChild('listItem')
});

