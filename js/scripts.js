let pokemonRepository = function () {
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
		pokemonList.add(pokemon);
	}
	return {
		getAll: getAll,
		add: add
	}();
};

// Create a list of Pokemon and their caracteristics
	pokemonRepository.forEach(getAll(pokemon) {
  	console.log(name);
// Add "Wow, that's big !" after the height of the biggest Pokemon 
  	if (pokemon.height > 1) {
	document.write(pokemon.name + " - height: " + pokemon.height + " - Wow, that's big!" + "<br>");
}
	else {
	document.write(pokemon.name + " - height: " + pokemon.height + "<br>");
}
	});