const boton = document.querySelector("#boton");
const busqueda = document.querySelector("#busqueda");
const container = document.querySelector("#contenedor-img");

boton.addEventListener("click", async e => {
    if (busqueda.value === "") {
        alert("Por favor, ingresa un país");
    } 

    if (busqueda.value) {
        const buscar = busqueda.value;

        try {
          

            const response = await fetch(`https://restcountries.com/v3.1/name/${buscar}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            const datos = data
            const country = data[0];
            console.log(country.capital)

            const key = "bfef82415ea45aca1bfb501ed4d72d23"
          const respons = await fetch(`https://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`);
          if (!respons.ok) { throw new Error('Network response was not ok'); }
         
          
              const clima = await respons.json();
              const clima2 = clima
              console.log(clima2)
          
            const arrayDePares = Object.keys(country.languages)[0];
            const d =  arrayDePares[0]
            const r =  arrayDePares[1]
            console.log(d,r)
            console.log(datos.length)
            const paises = { pais0: data[0],pais1: data[1],pais2: data[2],pais3: data[3],pais4: data[4]}
            console.log(datos.length)
            if (datos.length === 1) {
             container.innerHTML = `   
             <div class="unidad">
            <h1>${paises["pais0"].name.common}
            </h1> 
             <a href="${paises["pais0"].maps.googleMaps}">  
                <img id="Bandera-uno" src="${paises["pais0"].flags.svg}"> 
          </a> 
          <div id="informacion">

 </p><p>  Capital: ${paises["pais0"].capital[0]} </p>
                 <p>  Horario: ${paises["pais0"].timezones[0]} </p>
                 <p> Hora: ${clima2.location.localtime} </p>
                  
                    <p> Temperatura: ${clima2.current.temperature}   </p>
    <img src=" ${clima2.current.weather_icons[0]} ">
                 </div>
              </div>`
            }
            if (datos.length > 10) { 
              container.innerHTML =` <p id="muchos-paises"> Por favor especifica tu busqueda<p>`
            }

            if (datos.length < 10) {
            

              container.innerHTML = `
              <div id="texto"> 
             <div class="paise">
            <h1>${paises["pais0"].name.common}
            </h1> 
             <a href="${paises["pais0"].maps.googleMaps}">  
                <img id="Bandera" src="${paises["pais0"].flags.svg}">  </a> 
 </p><p>  Capital: ${paises["pais0"].capital[0]} </p>
                 <p>  Horario: ${paises["pais0"].timezones[0]} </p>
              </div>
                <div class="paise">
                <h1>${paises["pais1"].name.common}
            </h1> 
                       <a href="${paises["pais1"].maps.googleMaps}">  
                <img id="Bandera" src="${paises["pais1"].flags.svg}">  </a>
             <p> 
                Capital: ${paises["pais1"].capital[0]} </p>
                <p>  Horario: ${paises["pais1"].timezones[0]} </p>

             
          </div>

  <div class="paise">
               <h1>${paises["pais2"].name.common}</h1>
                <a href="${paises["pais2"].maps.googleMaps}">  
                <img id="Bandera" src="${paises["pais2"].flags.svg}">  </a>
            
          <p>
             Capital: ${paises["pais2"].capital[0]} </p>
             <p>  Horario: ${paises["pais2"].timezones[0]} </p>
            </div>
            <div class="paise">
              <h1>${paises["pais3"].name.common}</h1>
                  <a href="${paises["pais3"].maps.googleMaps}">  
                <img id="Bandera" src="${paises["pais3"].flags.svg}">  </a><p>
               Capital: ${paises["pais3"].capital[0]} </p>
               <p>  Horario: ${paises["pais3"].timezones[0]} </p>
                 </div> </div>`;
              console.log(datos.length)

            }
            
          
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
});
