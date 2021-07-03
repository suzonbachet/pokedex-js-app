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
				console.log(pokemon);
			});
	}


	function showErrorMessage(input, message) {
		let container = input.parentElement;
		// The .input-wrapper

		// Remove an existing error
		let error = container.querySelector('.error-message');

		if (error) {
			container.removeChild(error);
		}

		// Add the error if the message isn't empty
		if (message) {
			let error = document.createElement('div');
			error.classList.add('error-message');
			error.innerText = message;
			container.appendChild(error);
		}
	}


	function validateEmail() {
		let value = emailInput.value;
		
		if (!value) {
			showErrorMessage(emailInput, 'Email is a required field.');
			return false;
		}

		if (value.indexOf('@') === -1) {
			showErrorMessage(emailInput, 'You must enter a valid email address.');
			return false;
		}

		showErrorMessage(emailInput, null);
		return true;
	}


	function validatePassword() {
		let value = passwordInput.value;
		
		if (!value) {
			showErrorMessage(passwordInput, 'Password is a required field.');
			return false;
		}

		if (value.length < 8) {
			showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
			return false;
		}

		showErrorMessage(passwordInput, null);
		return true;
	}

	function valideForm() {
		let isValidEmail = validateEmail();
		let isValidPassword = validatePassword();
		return isValidEmail && isValidPassword;
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault(); // Do not submit to the server 
		if (validationForm()) {
			alert('Success!');
		}
	});

	emailInput.addEventListener('input', validateEmail);
	passwordInput.addEventListener('input', validatePassword);

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
		titleElement.innerText = title;

		let contentElement = document.createElement('p');
		contentElement.innerText = text;

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

	function showDialog(title, text) {
		showModal(title, text);

		// Add a confirm and cancel button to the modal
		let modal = modalContainer.querySelector('.modal');

		let confirmButton = document.createElement('button');
		confirmButton.classList.add('modal-confirm');
		confirmButton.innerText = 'Confirm';

		let cancelButton = document.createElement('button');
		cancelButton.classList.add('modal-cancel');
		cancelButton.innerText = 'Cancel';

		modal.appendChild(confirmButton);
		modal.appendChild(cancelButton);

		// Focus the confirmButton so that the user can just press Enter
		confirmButton.focus();

		// Return a promise that resolves when confirmed, else rejects
		return new Promise((resolve, reject) => {
			cancelButton.addEventListener('click', () => {
				hideModal();
				reject();
			});
			confirmButton.addEventListener('click', () => {
				hideModal();
				resolve();
			})

			// Can be use to reject from other functions
			dialogPromiseReject = reject;
		}
	}

	document.querySelector('#show-modal').addEventListener('click'), () => {
		showModal('Modal title', 'This is the modal content!');
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	}

	modalContainer.addEventListener('click', (e) => {
		// Since this is also triggered when clicking INSIDE the modal
		// We only want to close if the user clicks directly on the overlay
		let targer = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	}

	document.querySelector('#show-dialog').addEventListener('click', () => {
		showDialog('Confirm action', 'Are you sure you want to do this ?').then(function() {
			alert('Confirmed!');
		}, () => {
			alert('Not confirmed');
		}
	}

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

