let pokemonList = [
	{name: 'Bulbasur', height: 0.7, types: ['grass', 'poison']},
	{name: 'Charmander', height: 0.6, types: ['fire']}, 
	{name: 'Phanpy', height: 1.08, types: ['ground']}, 
	{name: 'Eve', height: 1, types: ['normal']} 
	];


// Create a list of Pokemon and their caracteristics
	pokemonList.forEach(function(pokemon) {
  	console.log(name);
// Add "Wow, that's big !" after the height of the biggest Pokemon 
  	if (pokemon.height > 1) {
	document.write(pokemon.name + " - height: " + pokemon.height + " - Wow, that's big!" + "<br>");
}
	else {
	document.write(pokemon.name + " - height: " + pokemon.height + "<br>");
}
	});

