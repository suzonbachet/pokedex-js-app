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


	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		loadList: loadList,
		loardDetails: loadDetails
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

})();


pokemonRepository.loadList().then(function() {
// data is loaded
	// Create a forEach loop to display every pokemon
	pokemonRepository.getAll().forEach(function(pokemon) {
		// Add addListItem function into the forEach loop
		pokemonRepository.addListItem(pokemon);
	});
});

