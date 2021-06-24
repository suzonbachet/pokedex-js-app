let pokemonList = [
	{name: 'Bulbasur', height: 0.7, types: ['grass', 'poison']},
	{name: 'Charmander', height: 0.6, types: ['fire']}, 
	{name: 'Phanpy', height: 1.08, types: ['ground']}, 
	{name: 'Eve', height: 1, types: ['normal']} 
	];

// Create a list of Pokemon with their length
for (let i = 0; i < pokemonList.length; i++) {
// Add "Wow, that's big !" after the height of the biggest Pokemon
	if (pokemonList[i].height > 1) {
	document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " - Wow, that's big!" + "<br>");
}
	else {
	document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + "<br>");
}
}