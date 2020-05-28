window.onload = function () {
  var poster = "https://image.tmdb.org/t/p/original/";
  var key = "e59c94a503ea78e9502aa8e308f21eb5";

  var popularURL = "https://api.themoviedb.org/3/tv/popular?api_key=" + key + "&language=en-US&page=1";

  fetch(popularURL, {
     method: "GET",
  })
  .then(function (response) {
     return response.json();
  })
  .then(function (data) {
     var container = document.querySelector("#populares");
     console.log(data);
     for (var i = 0; i < 3; i++) {
           container.innerHTML += '<li class="lg:w-1/3" style="list-style-type: none"><a href="series/detail/' + data.results[i].id + '"><div class="mx-4"><img src="' + poster + data.results[i].backdrop_path + '"><div class="text-center pt-2"><h3>' + data.results[i].name + "</h3></div></div></a></li>";
     }
  })
  .catch(function (error) {
     console.log("El error es: " + error);
  });

	var topRatedUrl =
		"https://api.themoviedb.org/3/tv/top_rated?api_key=" +
		key +
		"&language=en-US&page=1";

	fetch(topRatedUrl, {
		method: "GET",
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var contenedor = document.querySelector("#top-rated");
			console.log(data);
			for (var i = 0; i < data.results.length; i++) {
				// console.log(data.results[i]);
				contenedor.innerHTML +=
					'<li class="uk-width-3-4"><a href="detalle.html?serieId=' +
					data.results[i].id +
					'"><div class="uk-panel"><img src="' +
					poster +
					data.results[i].backdrop_path +
					'" alt=""><div class="uk-position-bottom-center uk-panel"><h3>' +
					data.results[i].name +
					"</h3></div></div></a></li>";
			}
		})
		.catch(function (error) {
			console.log("El error es: " + error);
		});

	// SERIES QUE TIENEN UN CAPITULO ESTRENO DENTRO DE LOS 7 DIAS
	// var onAirURL = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=' + key

	// SERIES QUE ESTAN AL AIRE <HOY>
	var onAirURL =
		"https://api.themoviedb.org/3/tv/airing_today?api_key=" + key;

	fetch(onAirURL, {
		method: "GET",
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			var contenedor = document.querySelector("#airing");
			console.log(data);
			for (var i = 0; i < data.results.length; i++) {
				// console.log(data.results[i]);
				contenedor.innerHTML +=
					'<li class="uk-width-3-4"><a href="detalle.html?serieId=' +
					data.results[i].id +
					'"><div class="uk-panel"><img src="' +
					poster +
					data.results[i].backdrop_path +
					'" alt=""><div class="uk-position-bottom-center uk-panel"><h3>' +
					data.results[i].name +
					"</h3></div></div></a></li>";
			}
		})
		.catch(function (error) {
			console.log("El error es: " + error);
		});
};
