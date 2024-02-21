// ENLACES AL DOM
const inputEmail = document.querySelector("input#email")
const selectTipoDeInmueble = document.querySelector("select#tipoDeInmueble")
const selectUbicacion = document.querySelector("select#ubicacion")
const inputMts2 = document.querySelector("input#Mts2")
const btnCotizar = document.querySelector("button.btnCotizar")
const btnInicio = document.querySelector("a#inicio")
const contenedor = document.querySelector("div.div-father")

// VARIABLES GLOBALES, ARRAYS Y ARRAYS DE OBJETOS LITERALES
const URL = "../seguroTipoInmueble.json"
const URL2 = "../seguroUbicacionInmueble.json"
const inmueblesTipo = []
const inmuebleUbicacion =  []
const costoM2 = 221.02


// FUNCIONES 'CARGAR TIPO DE INMUEBLE Y UBICACION'
function cargartipoDeInmuebleYUbicacion() {
    if (inmueblesTipo.length > 0 && inmuebleUbicacion.length > 0) {
        inmueblesTipo.forEach((factor)=> {
            selectTipoDeInmueble.innerHTML += `<option>${factor.tipo}</option>`
        })
        inmuebleUbicacion.forEach((factorUbicacion)=> {
            selectUbicacion.innerHTML += `<option>${factorUbicacion.tipo2}</option>`
        })    
    }
}


//FUNCION PARA RETORNAR ERROR
function retornarError() {
    return `<div class="div-error">
                <p class="logos">
                    <img class="logoPrestamo" src="../img/error.png" alt="Foto error"></h1>
                </p>
                <h3 class="textos3">No se ha podido cargar la información</h3>
                <h4 class="textos3">Intenta nuevamente en unos instantes...</h4>
            </div>`
}


//FUNCION ASINCRONICA PARA OBTENER FACTORES DE LOS TIPOS DE INMUEBLES Y UBICACIÓN CON FETCH:
function obtenerFactores() {
    fetch(URL)
    .then((respuesta)=> {
        if (respuesta.ok) {
            return respuesta.json()
        } else {
            throw new Error("No se pudo obtener la información solicitada. (" + respuesta.status + ")")
        }
    } )
    .then((datos)=> inmueblesTipo.push(...datos) )
    .then(()=> cargartipoDeInmuebleYUbicacion(inmueblesTipo))
    .catch((error)=> {
        contenedor.innerHTML = retornarError()
    })
    fetch(URL2)
    .then((respuesta)=> {
        if (respuesta.ok) {
            return respuesta.json()
        } else {
            throw new Error("No se pudo obtener la información solicitada. (" + respuesta.status + ")")
        }
    } )
    .then((datos)=> inmuebleUbicacion.push(...datos) )
    .then(()=> cargartipoDeInmuebleYUbicacion(inmuebleUbicacion))
    .catch((error)=> {
        contenedor.innerHTML = retornarError()
    })
    
}


// FUNCION PARA DEVOLVER EL FACTOR MULTIPLICADOR DE SU TIPO DE VIVIENDA.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'inmueblesTipo' Y BUSCA 
//COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'factor' DEL OBJETO LITERAL 'factorTipo' : 
function devolverFactorTipoInmueble(tipo) {
    let factorTipo = inmueblesTipo.find((factorTipo)=> factorTipo.tipo === tipo)
    return factorTipo.factor
}

// FUNCION PARA DEVOLVER EL FACTOR MULTIPLICADOR DE SU UBICACION.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo2) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'inmuebleUbicacion' Y BUSCA 
//COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'factorUbicacion' DEL OBJETO LITERAL 'factorUbicacionTipo' : 
function devolverFactorUbicacion(tipo2) {
    let factorUbicacionTipo = inmuebleUbicacion.find((factorUbicacionTipo)=> factorUbicacionTipo.tipo2 === tipo2)
    return factorUbicacionTipo.factorUbicacion
}

// FUNCION QUE RECIBE COMO PARAMETROS 6 ARGUMENTOS Y CREA UN OBJETO LITERAL LLAMADO 'informacionDelSeguroDeHogar'
// PARA PODER ALMACENARLO EN EL NAVEGADOR MEDIANTE 'localStorage'. LS NO PERMITE DATOS EN FORMATO DE OBJETOS, YA QUE SE PROCEDE
// A HACER LA TRANSFORMACION DE DATO CON JSON.stringify() : 
function guardarInfoDeSegurosInmueblesEnLS(email, TipoDeInmueble, InmuebleTipo, UbicacionGeo, Ubicacion, Mts2, costoM2, cuota) {
    const informacionDelSeguroDeHogar = {
        email: email,
        TipoDeInmueble: TipoDeInmueble,
        InmuebleTipo: InmuebleTipo,
        UbicacionGeo: UbicacionGeo,
        Ubicacion: Ubicacion,
        Mts2: Mts2,
        costoM2 : costoM2,
        cuota: cuota
    }
    localStorage.setItem("informacionDelSeguroDeHogar", JSON.stringify(informacionDelSeguroDeHogar))
}


// // FUNCION PARA  CAPTURAR DATOS MEDIANTE EL EVENTO "submit" Y COTIZAR SEGURO
// SE DEFINEN VARIABLES LOCALES PARA ATRAPAR LOS DATOS, LOS DATOS QUE LA CLASE NECESITA EN FORMATO NUMERO SE TRANSFORMARON CON 
// 'parseInt()' LUEGO SE INSTANCIA A LA CLASE 'cotizacionSolicitada' PASANDOLE LOS VALORES CORRESPONDIENTES Y SE CREA VARIABLE 
// LOCAL CON EL VALOR DE EL METODO DE LA CLASE INSTANCIADA. LUEGO GUARDAMOS LA INFO EN EL NAVEGADOR WEB CON LS Y USAMOS EL OBJETO 
// 'location' CON EL ATRIBUTO 'href' PARA REDIRECCIONAR LA PÁGINA A 'cotizadorSeguroInmueble.html' :
function atraparValoresConEventoSubmitYCotizar(){
    const formulario = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let email = inputEmail.value;
        let TipoDeInmueble = devolverFactorTipoInmueble(selectTipoDeInmueble.value);
        let InmuebleTipo = selectTipoDeInmueble.value
        let UbicacionGeo = selectUbicacion.value
        let Ubicacion = devolverFactorUbicacion(selectUbicacion.value)
        let mts2 = parseInt(inputMts2.value)
        const cotizacionSolicitada = new SeguroInmueble(email, TipoDeInmueble, Ubicacion, mts2, costoM2)
        let cuota = cotizacionSolicitada.obtenerCotizacionInmueble()
        guardarInfoDeSegurosInmueblesEnLS(email, TipoDeInmueble, InmuebleTipo, UbicacionGeo, Ubicacion, mts2, costoM2, cuota);
        location.href = "cotizadorSeguroInmueble.html"
    })
}


// EVENTO "click" PARA VALIDAR POR SEGUNDA VEZ LA CORRECTA ENTRADA DE DATOS EN LOS INPUTS DEL FORM, SI VA POR EL CAMINO FELIZ
// LLAMA A LA FUNCION QUE UTILIZA EL EVENTO "submit" Y LA MISMA REEDIRECCIONA AL HTML CORRESPONDIENTE, SI VA POR EL CAMINO TRISTE
// MUESTRA UN MSJ DE INFORMACION MEDIANTE EL USO DE LIBRERIA "SweetAlert2":
btnCotizar.addEventListener("click", ()=> {
    let resultado = selectTipoDeInmueble.value;
    let resultado2 = inputEmail.value;
    let resultado3 = selectUbicacion.value
    let resultado4 = inputMts2.value
    if (resultado !== 'Seleccionar...' && resultado2 !== "" && resultado3 !== 'Seleccionar...' && resultado4 !== "0") {
        atraparValoresConEventoSubmitYCotizar()
    }
    else {
        Swal.fire({
            title: "¡ERROR!",
            text: "Por Favor! Ingrese datos válidos",
            icon: "error"
        });
    }
})

// CODIGO AUTOEJECUTABLE
obtenerFactores()