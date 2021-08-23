let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


	function getAll() {
		return pokemonList;
	}


	function add(pokemon) {
		pokemonList.push(pokemon);
	}


	function addListItem(pokemon) {
		let unorderedList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button-class', 'btn', 'btn-primary', 'btn-lg', 'group-list-item');
		button.dataset.target = '#exampleModal';
		button.dataset.toggle = 'modal';
		listItem.appendChild(button);
		unorderedList.appendChild(listItem);

		// Add EventListener to the button: pokemon details should be displayd after a button click
		button.addEventListener('click', function() {
			showDetails(pokemon);

		});
	}


	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
				console.log(pokemon)
			});
		}).catch(function (e) {
			console.error(e);
		})
	}


	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response) { 
			return response.json();
		}).then(function (details) {
			// add the details to the item
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types ;
		}).catch(function (e) {
			console.error(e);
		});
	}


	function showDetails(pokemon) {
			loadDetails(pokemon).then(function () {
				pokemonRepository.showModal(pokemon);
			});
	}


	function showModal(pokemon) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');

		// Clear all existing modal content
		modalTitle.empty();
		modalBody.empty();

		let pokemonName = $('<h1>' + pokemon.name + '</h1>');
		let pokemonImage = $('<img class="modal-img img-fluid" style="width:50%">');
		pokemonImage.attr('src', pokemon.imageUrl);
		let pokemonHeight = $('<p>' + 'height: ' + pokemon.height + '</p>');
	

		modalTitle.append(pokemonName);
		modalBody.append(pokemonImage);
		modalBody.append(pokemonHeight);

	}


	return {
	getAll: getAll,
	add: add,
	addListItem: addListItem,
	loadList: loadList,
	loadDetails: loadDetails,
	showModal: showModal,
	}

})();


pokemonRepository.loadList().then(function() {
// data is loaded
	// Create a forEach loop to display every pokemon
	pokemonRepository.getAll().forEach(function(pokemon) {
		// Add addListItem function into the forEach loop
		pokemonRepository.addListItem(pokemon);
	});
});

