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
				pokemonRepository.showModal(title, text);
			});
	}


	function showModal(title, text) {
		// Clear all existing modal content
		modalContainer.innerHTML = '';

		let modal = document.createElement('div');
		modal.classList.add('modal');

		// Add the new modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.innerText = pokemon.name;

		let contentElement = document.createElement('p');
		contentElement.innerText = pokemon.height;

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(contentElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}

	let dialogPromiseReject; 

	function hideModal() {
		modalContainer.classList.remove('is-visible');

		if (dialogPromiseReject) {
			dialogPromiseReject();
			dialogPromiseReject = null;
		}
	}

	
	document.querySelector('#show-modal').addEventListener('click'), () => {
		showModal(title, text);
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});

	modalContainer.addEventListener('click', (e) => {
		// Since this is also triggered when clicking INSIDE the modal
		// We only want to close if the user clicks directly on the overlay
		let targer = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	return {
	getAll: getAll,
	add: add,
	addListItem: addListItem,
	loadList: loadList,
	loardDetails: loadDetails
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

