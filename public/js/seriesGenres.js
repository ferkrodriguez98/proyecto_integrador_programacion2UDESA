window.onload = function () {


  var key = "e59c94a503ea78e9502aa8e308f21eb5";
  var metodo = 'GET';



  var genresURL = 'https://api.themoviedb.org/3/genre/tv/list?api_key='+key+'&language=en-US'


  fetch(genresURL,{
      method: metodo
  })
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
        console.log(data.genres);
        var arrayGeneros = data.genres
        var listaGeneros = document.querySelector(".lista-generos")
        for (var i = 0; i < arrayGeneros.length; i++) {
          var li = '<li>'
          li  +=  '<h2><a class="genre" href="seriesByGenre.html?genreId='+arrayGeneros[i].id+'" value="">'+ arrayGeneros[i].name+ '</a></h2>'
          li+= '</li>'
        listaGeneros.innerHTML += li
        }
        function peliPorGenero(id) {
          console.log("algo");
        }

      })
      .catch(function (error) {
          console.log("El error es: " + error);
      })









}
