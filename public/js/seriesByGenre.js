window.onload = function () {

  var genreSearch = new URLSearchParams(location.search)
  var genreId = genreSearch.get('genreId')


  var poster =  'https://image.tmdb.org/t/p/original/'
  var key = "e59c94a503ea78e9502aa8e308f21eb5";
	var metodo = 'GET';

  var genreURL = 'https://api.themoviedb.org/3/discover/tv?api_key='+key+'&page=1&with_genres='+genreId

  fetch(genreURL,{
			method: metodo
	})
			.then(function (response) {
					return response.json();
			})
			.then(function (data) {
        console.log(data);
        var grillaSeries = document.querySelector(".grilla-series")
        var arraySeries = data.results

        for (var i = 0; i < arraySeries.length; i++) {
          if (arraySeries[i].backdrop_path == null) {
            var div = '<div><a href="detalle.html?serieId='+arraySeries[i].id+'"> <h3>'+arraySeries[i].name+'</h3>'
            div+= '<img src="img/noAvailable.png" alt="poster"></a></div>'
            grillaSeries.innerHTML+= div

          }else {
            var div = '<div><a href="detalle.html?serieId='+arraySeries[i].id+'"> <h3>'+arraySeries[i].name+'</h3>'
            div+= '<img src="'+poster+arraySeries[i].backdrop_path+'" alt="poster"> </a></div>'
            grillaSeries.innerHTML+= div

          }
        }
        })
			.catch(function (error) {
					console.log("El error es: " + error);
			})






}
