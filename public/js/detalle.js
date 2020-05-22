window.onload = function functionName() {
  var detalleSearch = new URLSearchParams(location.search)
  var serieId = detalleSearch.get('serieId')


  var poster =  'https://image.tmdb.org/t/p/original/'
  var key = "e59c94a503ea78e9502aa8e308f21eb5";
	var metodo = 'GET';

  var detalleURL = 'https://api.themoviedb.org/3/tv/'+serieId+'?api_key='+ key

  fetch(detalleURL,{
			method: metodo
	})
			.then(function (response) {
					return response.json();
			})
			.then(function (data) {
        var imageContainer = document.querySelector(".imagenSerie")
        imageContainer.innerHTML = '<img src="'+poster+data.poster_path+'" alt="">'

        var dataSerie = document.querySelector(".dataSerie")
        dataSerie.innerHTML += '<h1>'+data.name+'</h1>'
        dataSerie.innerHTML += '<div class="data"><p>Seasons: '+data.number_of_seasons+'</p> <p>Episodes: '+data.number_of_episodes+'</p>  <p> First air date: '+ data.first_air_date +'</p> <h3>Overview </h3> <p>'+ data.overview +'</p> </div>'

        dataSerie.innerHTML += '<div class="series-trailer"></div>'

        document.querySelector(".data").innerHTML += '<h3> Genres: </h3>'
        var genres = ""
        for (var i = 0; i < data.genres.length; i++) {
          genres += '<a href="#">'+ data.genres[i].name + ' </a>'
        }
        document.querySelector(".data").innerHTML += '<div class="genres">' + genres+'</div>'

        var listaTemporadas = document.querySelector(".listaTemporadas")
        var contenido = ""
        for (var i = 0; i < data.seasons.length; i++) {
          if (data.seasons[i].poster_path == null) {
            contenido += '<li class="noAvailable">'
            contenido += '<img " src="img/noAvailable.png" alt="">'
            contenido += '</li>'

          }else {
            contenido += '<li>'
            contenido += '<img src="'+poster+ data.seasons[i].poster_path+ '" alt="">'
            contenido += '</li>'
          }
          listaTemporadas.innerHTML = contenido
        }

        })
			.catch(function (error) {
					console.log("El error es: " + error);
			})


      // TRAILER
      var trailerULR='https://api.themoviedb.org/3/tv/'+serieId+'/videos?api_key='+key

      fetch(trailerULR,{
    			method: metodo
    	})
    			.then(function (response) {
    					return response.json();
    			})
    			.then(function (data) {


            var trailerContainer = document.querySelector(".series-trailer")


            // VIDEOS
            trailerContainer.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'


            })
    			.catch(function (error) {
    					console.log("El error es: " + error);
    			})







}
