function getLocalStorage(key){
	return JSON.parse(localStorage.getItem(key))
}

function saveInLocalStorage(key,item){
	let stringifiedItem=JSON.stringify(item)
	localStorage.setItem(key,stringifiedItem)
}

let usuarios = [] 
usuarios = getLocalStorage('usuarios') || []

let busquedas = [] 
busquedas = getLocalStorage('busquedas') || []

$( document ).ready(function() 
{
   console.log( "El DOM esta listo" );
});



let username = document.querySelector('#username')
let pass = document.querySelector('#pass')

let loginBtn = $('#loginBtn')
let loginForm = $(".loginForm")

let login = document.querySelector('.login')
let canvasHeader = document.querySelector('#offcanvasRightLabel')
let canvasBody = document.querySelector('.offcanvas-body')

$("#loginBtn").click(function(event){
	event.preventDefault()
	if (username.value === "" || pass.value === ""){
		$('.loginForm').append("<p>Nombre de usuario y/o contraseña no válidos</p>");
	}else{

	let user = {
		username: username.value,
		pass: pass.value
	}
	usuarios.push(user)
	saveInLocalStorage('usuarios',usuarios)

	login.innerHTML = '<img src="./media/user_icon.png" alt="Perfil">';
	canvasHeader.innerText = "Mi Perfil";
	canvasBody.innerHTML = '¡Bienvenido!';
	}
})


let apiData = []
let html = ''
const estrenos = document.querySelector(".estrenos")
const moviesNew = ["tt5433138","tt12801262", "tt9770150"]
let movieCard = ""

moviesNew.forEach(movie=>{
const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${movie}`,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4febb5c775mshbaa376822110a0dp1cd698jsn28a17df44064",
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	html += `<div class="card">
  <img src="${response.poster}" class="card-img-top" alt="Poster ${response.title}">
  <div class="card-body">
    <h5 class="card-title">${response.title}</h5>
    <ul>
    	<li>${response.year}</li>
    	<li>IMDb: ${response.rating}</li>
    </ul>
   </div>
</div>`;
apiData = [...apiData, response];
estrenos.innerHTML = html
})
})


const populares = document.querySelector(".populares")
const moviesPop = ["tt1375666", "tt0108052", "tt0167260", "tt0068646", "tt0137523", "tt0126029"]
let html1 = ''

moviesPop.forEach(movie=>{
const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${movie}`,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4febb5c775mshbaa376822110a0dp1cd698jsn28a17df44064",
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	}
};
$.ajax(settings).done(function (response) {
	html1 += `<div class="card" >
  <img src="${response.poster}" class="card-img-top" alt="Poster ${response.title}">
  <div class="card-body">
    <h5 class="card-title">${response.title}</h5>
    <ul>
    	<li>${response.year}</li>
    	<li>IMDb: ${response.rating}</li>
    </ul>
   </div>
</div>`;
apiData = [...apiData, response];
populares.innerHTML = html1
});
})

const top10 = document.querySelector(".top10")
const moviesTop = ["tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083", "tt0108052", "tt0167260", "tt0110912", "tt0060196", "tt0120737"]
let html2 = ""

moviesTop.forEach(movie=>{
const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${movie}`,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4febb5c775mshbaa376822110a0dp1cd698jsn28a17df44064",
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
	}
};
$.ajax(settings).done(function (response) {
	html2 += `<div class="card" >
  <img src="${response.poster}" class="card-img-top" alt="Poster ${response.title}">
  <div class="card-body">
    <h5 class="card-title">${response.title}</h5>
    <ul>
    	<li>${response.year}</li>
    	<li>IMDb: ${response.rating}</li>
    </ul>
   </div>
</div>`;
apiData = [...apiData, response];
top10.innerHTML = html2
});
})

let buscar = document.querySelector(".buscadorBarra");
let buscarBtn = $(".buscadorBoton");
let indexMain = document.querySelector(".indexMain")
let busqueda = ""

buscarBtn.click(function (event) {

  event.preventDefault();

  let arrayFiltrado = apiData.filter((movie) =>

    movie.title.toUpperCase().includes(buscar.value.toUpperCase())

  );
  arrayFiltrado.forEach(movie=>{
  	busqueda += `
  	<div class="estrenos flex">
  		<div class="card" >
  			<img src="${movie.poster}" class="card-img-top" alt="Poster ${movie.title}">
  			<div class="card-body">
    			<h5 class="card-title">${movie.title}</h5>
    			<ul>
    				<li>${movie.year}</li>
    				<li>IMDb: ${movie.rating}</li>
    			</ul>
   			</div>
			</div>
		</div;
  		`
  })

  indexMain.innerHTML = busqueda
  console.log(arrayFiltrado);
});