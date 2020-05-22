window.onload= function () {

  var paramsSearch = new URLSearchParams(location.search)
  var query = paramsSearch.get('query')
  var genres = paramsSearch.get('with_genres')
  var releaseDate = paramsSearch.get('first_air_date_year')
  var sort = paramsSearch.get('sort_by')

  console.log(sort);

  var key = "e59c94a503ea78e9502aa8e308f21eb5";
  var poster =  'https://image.tmdb.org/t/p/original/'
  var metodo = 'GET';


if (query != "") {
  var busquedaURL = 'https://api.themoviedb.org/3/search/tv?api_key='+key+'&query=' + query

}else if (genres != "" && releaseDate != "" && sort != "") {
  var busquedaURL = 'https://api.themoviedb.org/3/discover/tv?api_key='+key+'&sort_by='+sort+'&first_air_date_year='+releaseDate+'&with_genres='+ genres


}else if (genres != "" && releaseDate != "") {
  var busquedaURL = "https://api.themoviedb.org/3/discover/tv?api_key="+ key +"&first_air_date_year="+releaseDate + "&with_genres="+genres

}else if(genres != "" && sort != "") {
  var busquedaURL = 'https://api.themoviedb.org/3/discover/tv?api_key='+key+'&sort_by='+sort+'&with_genres='+ genres

}else if (releaseDate != "" && sort != "") {
  var busquedaURL = 'https://api.themoviedb.org/3/discover/tv?api_key='+key+'&sort_by='+sort+'&page=1&first_air_date_year='+releaseDate

}else if (genres != "") {
  var busquedaURL = "https://api.themoviedb.org/3/discover/tv?api_key="+ key + "&with_genres=" + genres

}else if (releaseDate != "") {
  var busquedaURL = 'https://api.themoviedb.org/3/discover/tv?api_key='+key+'&first_air_date_year='+releaseDate

}else {
  alert("something bad happened")
}





  fetch(busquedaURL,{
      method: metodo
  })
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
    console.log(data);
    var contenedor = document.querySelector("#resultados")

    for (var i = 0; i < data.results.length; i++) {
      var div = '<div>'
      div+= '<a href="detalle.html?serieId='+ data.results[i].id +'">'
      div+= '<h2>'+data.results[i].name+ '</h2>'
      if (data.results[i].poster_path == null) {
        div+= '<img src="img/noAvailable.png" alt="imagen de serie">'

      }else {
        div+= '<img src="'+poster+data.results[i].poster_path+'" alt="imagen de serie">'
      }
      // console.log(data.results[i].);
      data.results[i]
      div+= '</a>'
      div+= '</div>'
      contenedor.innerHTML+= div

      console.log(data.results[i].first_air_date);
    }
  })
  .catch(function (error) {
    console.log("El error es: " + error);
  })











}
