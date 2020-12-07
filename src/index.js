const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
});

window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('uploadedImage');

	// Agregamos los listener de los enlaces para filtrar por categoria.
	const links = document.querySelectorAll('#categories a');
	links.forEach((element) => {
		element.addEventListener('click', (event) => {
			event.preventDefault();
			links.forEach((link) => link.classList.remove('active'));
			event.target.classList.add('active');

			const category = event.target.innerHTML.toLowerCase();
			category === 'todos' ? grid.filter('[data-category]') : grid.filter(`[data-category="${category}"]`);
		});
	});

	// Agregamos el listener para la barra de busqueda
	document.querySelector('#searchBar').addEventListener('input', (event) => {
		const search = event.target.value;
		grid.filter( (item) => item.getElement().dataset.labels.includes(search) );
	});

	// Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .itemContent').forEach((element) => {
		element.addEventListener('click', () => {
			const ruta = element.getAttribute('src');
			const description = element.parentNode.parentNode.dataset.description;

			overlay.classList.add('active');
			document.querySelector('#overlay containerImage').src = ruta;
			document.querySelector('#overlay .description').innerHTML = description;
		});
	});

	// Eventlistener del boton de cerrar
	document.querySelector('#buttomClose').addEventListener('click', () => {
		overlay.classList.remove('active');
	});

	// Eventlistener del overlay
	overlay.addEventListener('click', (event) => {
		event.target.id === 'overlay' ? overlay.classList.remove('active') : '';
	});
});