// ENLACES AL DOM
const inputEmail = document.querySelector("input#email")
const inputMontoASolicitar = document.querySelector("input#montoASolicitar")
const inputCantidadDeCuota = document.querySelector("input#cantidadDeCuota")
const selectTipoDeInteres = document.querySelector("select#tipoDeInteres")
const btnCalcular = document.querySelector("button.btnCalcular")
const contenedor = document.querySelector("div.div-father")

// VARIABLES GLOBALES, ARRAYS Y ARRAYS DE OBJETOS LITERALES

const URL = "../creditos.json"
const tiposDeCreditos = []
// const tiposDeCreditos = [{id: 1, tipoDelCredito: 'Credito Personal', interes: 1.45},
//                        {id: 2, tipoDelCredito: 'Credito Prendario', interes: 1.95},]


// FUNCIONES 'CARGAR TIPO DE INTERES'
// ES UNA FUNCION EN LA CUAL SE VALIDA SI EL ARRAY DE OBJETOS LLAMADA "tiposDeCreditos" TIENE ALGUN VALOR ALMACENADO, SI ES VERDADERO
// RECORRE EL ARRAY CON UN FOR-EACH PARA CARGAR AL HTML MEDIANTE LA PROPIEDAD 'innerHTML' LAS OPCIONES DE TIPOS DE CREDITO, PERSONAL
// Ó PRENDARIO. SI ES FALSO DEVUELVE UN MENSAJE DE ERROR MEDIANTE LA FUNCION "retornarError()":
function cargartipoDeInteres(tiposDeCreditos) {
    if (tiposDeCreditos.length > 0) {
        tiposDeCreditos.forEach((interes)=> {
            selectTipoDeInteres.innerHTML += `<option>${interes.tipoDelCredito}</option>`
        })
    }
    else {
        contenedor.innerHTML = retornarError()
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

//FUNCION ASINCRONICA PARA OBTENER INTERESES DE LOS TIPOS DE CREDITOS CON FECHT:
async function obtenerIntereses() {

    fetch(URL)
    .then((respuesta)=> {
        if (respuesta.ok) {
            return respuesta.json()
        } else {
            throw new Error("No se pudo obtener los productos. (" + respuesta.status + ")")
        }
    } )
    .then((datos)=> tiposDeCreditos.push(...datos) )
    .then(()=> cargartipoDeInteres(tiposDeCreditos))
    .catch((error)=> {
        contenedor.innerHTML = retornarError()
    })
    
}

// FUNCION PARA DEVOLVER EL FACTOR MULTIPLICADOR QUE VA A REPRESENTAR EL INTERÉS DEL CREDITO SELECCIONADO
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipoDelCredito) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'tiposDeCreditos' Y BUSCA 
//COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'interes' DEL OBJETO LITERAL 'creditoTipo' : 
function devolverIntereses(tipoDelCredito) {
    let creditoTipo = tiposDeCreditos.find((creditoTipo)=> creditoTipo.tipoDelCredito === tipoDelCredito)
    return creditoTipo ? creditoTipo.interes : 0;
}

// FUNCION QUE RECIBE COMO PARAMETROS 5 ARGUMENTOS Y CREA UN OBJETO LITERAL LLAMADO 'informacionDelPrestamo'
// PARA PODER ALMACENARLO EN EL NAVEGADOR MEDIANTE 'localStorage', LS NO PERMITE DATOS EN FORMATO DE OBJETOS, YA QUE SE PROCEDE
// A HACER LA TRANSFORMACION DE DATO CON JSON.stringify() : 
function guardarInfoDePrestamoEnLocalStorage(email, montoASolicitar, cantidadDeCuota, tipoDeInteres, tipoDeIntereses, cuota) {
    const informacionDelPrestamo = {
        email: email,
        montoASolicitar: montoASolicitar,
        cantidadDeCuota: cantidadDeCuota,
        tipoDeInteres: tipoDeInteres,
        tipoDeIntereses: tipoDeIntereses,
        cuota: cuota
    }
    localStorage.setItem("informacionDelPrestamo", JSON.stringify(informacionDelPrestamo))
}

// FUNCION PARA CALCULAR CUOTAS
// SE DEFINEN VARIABLES LOCALES PARA ATRAPAR LOS DATOS, LOS DATOS QUE LA CLASE NECESITA EN FORMATO NUMERO SE TRANSFORMARON CON 
// 'parseInt()' LUEGO SE INSTANCIA A LA CLASE 'Credito' PASANDOLE LOS VALORES CORRESPONDIENTES Y SE CREA VARIABLE LOCAL CON EL VALOR
// DE EL METODO DE LA CLASE INSTANCIADO. LUEGO GUARDAMOS LA INFO EN EL NAVEGADOR WEB CON LS Y USAMOS EL OBJETO 'location' CON EL
// METODO 'href' PARA REDIRECCIONAR LA PÁGINA A 'calculadorPrestamo.html' :
function calcularPrestamo() {
    let email = inputEmail.value
    let montoASolicitar = parseInt(inputMontoASolicitar.value)
    let cantidadDeCuota = parseInt(inputCantidadDeCuota.value)
    let tipoDeIntereses = (devolverIntereses(selectTipoDeInteres.value)-1)*100
    const divisor = 12
    let factorCuotas = cantidadDeCuota / divisor;
    let interesCalculado = tipoDeIntereses*factorCuotas
    let tipoDeInteres = (interesCalculado +100)/100
    const creditoSolicitado = new Credito(email, cantidadDeCuota, tipoDeInteres, montoASolicitar)
    let cuota = creditoSolicitado.calcularCuotaMensual() 
    guardarInfoDePrestamoEnLocalStorage(email, montoASolicitar, cantidadDeCuota, tipoDeInteres, tipoDeIntereses, cuota)
    location.href = "calculadorPrestamo.html"
}

// EVENTOS
btnCalcular.addEventListener("click", ()=> {
    let resultado = selectTipoDeInteres.value;
    let resultado2 = inputEmail.value;
    let resultado3 = inputMontoASolicitar.value;
    let resultado4 = inputCantidadDeCuota.value;
    if (resultado !== 'Elige aquí...' && resultado2 !== "" && resultado3 !== "0" && resultado4 !== "0") {
        calcularPrestamo()
    }
    else {
        Swal.fire({
            title: "¡ERROR!",
            text: "Por Favor! Ingrese datos válidos",
            icon: "error",
        });
    }

})

// CODIGO AUTOEJECUTABLE
obtenerIntereses()