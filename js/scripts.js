let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');


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
		button.classList.add("btn");
		button.classList.add("btn-lg");
		listItem.appendChild(button);
		unorderedList.appendChild(listItem);
		// Add EventListener to the button: pokemon details should be displayd after a button click
		button.addEventListener("click", function(event) {
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
		let modalBody = $(".modal-body");
		let modalTitle = $(".modal-title");
		let modalHeader = $(".modal-header");

		// Clear all existing modal content
		modalTitle.empty();
		modalBody.empty();

		let pokemonName = ${"<h1>"} + pokemon.name + "</h1>"};
		let pokemonImage = $('<img class="modal-img" style="width:50%">');
		pokemonImage.attr("src", pokemon.imageUrl);
		let pokemonHeight = $("<p>" + "height: " + pokemon.height + "</p>");



		/* let modal = document.createElement('div');
		modal.classList.add('modal');

		// Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.innerText = pokemon.name;

		let contentElement = document.createElement('p');
		let pokemonImage = document.createElement('img');
		pokemonImage.src = pokemon.imageUrl;
		pokemonImage.classList.add('pokemon-image');
		contentElement.appendChild(pokemonImage)
		contentElement.innerText = 'Height: ' + pokemon.height + pokemonImage;*/
	

		modalTitle.append(pokemonName);
		modalBody.append(pokemonImage);
		modalBody.append(pokemonHeight);
		

		/*modalContainer.classList.add('is-visible'); 
	}

	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}*/

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	modalContainer.addEventListener('click', (e) => {
		// Since this is also triggered when clicking INSIDE the modal
		// We only want to close if the user clicks directly on the overlay
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	return {
	getAll: getAll,
	add: add,
	addListItem: addListItem,
	loadList: loadList,
	loadDetails: loadDetails,
	showModal: showModal,
	hideModal: hideModal
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

