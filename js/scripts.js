let pokemonRepository = (function () {
	let pokemonList = [
		{name: 'Bulbasur', height: 0.7, types: ['grass', 'poison']},
		{name: 'Charmander', height: 0.6, types: ['fire']},
		{name: 'Phanpy', height: 1.08, types: ['ground']}, 
		{name: 'Eve', height: 1, types: ['normal']},
	];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
			loadDetails(pokemon).then(function () {
				console.log(pokemon);
			});
		}
		button.addEventListener('click', () => showDetails(pokemon))
		}

	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name.item.name,
					detailsUrl: item.detailsUrl
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response)
	{ 
		return reponse.json();
	}).then(function (details) {
		// add the details to the item
		item.imageUrl = details.sprites.front_default;
		item.height = details.height;
		item.types = details.types ;
	}).catch(function (e) {
		console.error(e);
	});
	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem
		loadList: loadList
		loardDetails: loadDetails
	}
	
	};
})();

pokemonRepository.loadList().then(function() {
	// data is loaded
// Create a forEach loop to display every pokemon
pokemonRepository.getAll().forEach(function(pokemon) {
// Add addListItem function into the forEach loop
pokemonRepository.addListItem(pokemon);
});
});

