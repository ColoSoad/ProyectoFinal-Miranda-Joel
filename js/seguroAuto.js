// ENLACES AL DOM
const inputEmail = document.querySelector("input#email");
const inputMarca = document.querySelector("input#marca");
const inputModelo = document.querySelector("input#modelo");
const inputAño = document.querySelector("input#año");
const inputValor = document.querySelector("input#valor");
const selectTipoV = document.querySelector("select#tipoV");
const selectTipoA = document.querySelector("select#tipoA");
const selectTipoC = document.querySelector("select#tipoC");
const selectCombustible = document.querySelector("select#combustible");
const btnCalcular = document.querySelector("button.btnCalcular");
const contenedor = document.querySelector("div.div-father");
const formulario = document.querySelector("form");

// VARIABLES GLOBALES, ARRAYS Y ARRAYS DE OBJETOS LITERALES
const URL = "../seguroAutoTipo.json";
const URL2 = "../seguroAutoCobertura.json";
const URL3 = "../seguroAutoAntiguedad.json";
const tipoVehiculo = [];
const PlanCobertura = [];
const antiguedadVehiculos = [];
const cuotaCosto = .25;

// FUNCIONES 'CARGAR TIPO DE VEHICULO, ANTIGUEDAD Y ANTIGUEDAD'
// ES UNA FUNCION EN LA CUAL SE VALIDA SI LOS ARRAYS DE OBJETOS LLAMADOS "tipoVehiculo", "PlanCobertura" Y "antiguedadVehiculos" 
// TIENE ALGUN VALOR ALMACENADO, SI ES VERDADERO RECORRE LOS ARRAYS CON UN FOR-EACH PARA CARGAR AL HTML MEDIANTE LA PROPIEDAD
// 'innerHTML':
function cargarTipoDeVehiculoCoberturaYAntiguedad() {
    if (tipoVehiculo.length > 0 && PlanCobertura.length > 0 && antiguedadVehiculos.length > 0) {
        tipoVehiculo.forEach((factorTipo)=> {
            selectTipoV.innerHTML += `<option>${factorTipo.tipo}</option>`
        })
        PlanCobertura.forEach((sumador)=> {
            selectTipoC.innerHTML += `<option>${sumador.tipo2}</option>`
        })
        antiguedadVehiculos.forEach((factorAntiguedad)=> {
            selectTipoA.innerHTML += `<option>${factorAntiguedad.tipo3}</option>`
        })
    }
};

//FUNCION PARA RETORNAR ERROR
function retornarError() {
    return `<div class="div-error">
                <p class="logos">
                    <img class="logoPrestamo" src="../img/error.png" alt="Foto error"></h1>
                </p>
                <h3 class="textos3">No se ha podido cargar la información</h3>
                <h4 class="textos3">Intenta nuevamente en unos instantes...</h4>
            </div>`
};

//FUNCION ASINCRONICA PARA OBTENER FACTORES DE LOS TIPOS DE VEHICULOS, ANTIGUEDAD Y SUMADOR DEL PLAN DE COBERTURA, CON FETCH:
function obtenerFactores() {
    fetch(URL)
    .then((respuesta)=> {
        if (respuesta.ok) {
            return respuesta.json()
        } else {
            throw new Error("No se pudo obtener la información solicitada. (" + respuesta.status + ")")
        }
    })
    .then((datos)=> tipoVehiculo.push(...datos) )
    .then(()=> cargarTipoDeVehiculoCoberturaYAntiguedad(tipoVehiculo))
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
    .then((datos)=> PlanCobertura.push(...datos) )
    .then(()=> cargarTipoDeVehiculoCoberturaYAntiguedad(PlanCobertura))
    .catch((error)=> {
        contenedor.innerHTML = retornarError()
    })


    fetch(URL3)
    .then((respuesta)=> {
        if (respuesta.ok) {
            return respuesta.json()
        } else {
            throw new Error("No se pudo obtener la información solicitada. (" + respuesta.status + ")")
        }
    } )
    .then((datos)=> antiguedadVehiculos.push(...datos) )
    .then(()=> cargarTipoDeVehiculoCoberturaYAntiguedad(antiguedadVehiculos))
    .catch((error)=> {
        contenedor.innerHTML = retornarError()
    })
    
};

// FUNCION PARA DEVOLVER EL FACTOR MULTIPLICADOR DE SU TIPO DE VEHICULO.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'tipoVehiculo' Y BUSCA 
// COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'factorTipo' DEL OBJETO LITERAL 'factorTipoVehiculo' : 
function devolverFactorTipoMueble(tipo) {
    let factorTipoVehiculo = tipoVehiculo.find((factorTipoVehiculo)=> factorTipoVehiculo.tipo === tipo)
    return factorTipoVehiculo ? factorTipoVehiculo.factorTipo : 0;
};

// FUNCION PARA DEVOLVER EL SUMADOR DE SU PLAN DE COBERTURA DE VEHICULO.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo2) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'PlanCobertura' Y BUSCA 
// COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'sumador' DEL OBJETO LITERAL 'sumadorPlanCobertura' : 
function devolverSumadorTipoMueble(tipo2) {
    let sumadorPlanCobertura = PlanCobertura.find((sumadorPlanCobertura)=> sumadorPlanCobertura.tipo2 === tipo2)
    return sumadorPlanCobertura ? sumadorPlanCobertura.sumador : 0;
};

// FUNCION PARA DEVOLVER EL FACTOR ANTIGUEDAD DEL VEHICULO.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo3) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'antiguedadVehiculos' Y BUSCA 
// COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'factorAntiguedad' DEL OBJETO LITERAL 'factorAntiguedadVehiculo' : 
function devolverfactorAntiguedadVehiculo(tipo3) {
    let factorAntiguedadVehiculo = antiguedadVehiculos.find((factorAntiguedadVehiculo)=> factorAntiguedadVehiculo.tipo3 === tipo3)
    return factorAntiguedadVehiculo ? factorAntiguedadVehiculo.factorAntiguedad : 0;
};

// FUNCION QUE RECIBE COMO PARAMETROS 6 ARGUMENTOS Y CREA UN OBJETO LITERAL LLAMADO 'informacionDelSeguroDeVehiculo'
// PARA PODER ALMACENARLO EN EL NAVEGADOR MEDIANTE 'localStorage'. LS NO PERMITE DATOS EN FORMATO DE OBJETOS, YA QUE SE PROCEDE
// A HACER LA TRANSFORMACION DE DATO CON JSON.stringify() : 
function guardarInfoDeSegurosMueblesEnLS(email, marca, modelo, factorTipoDeVehiculo, valorDeclarado, año, SumadortipoDeCobertura, factorTipoAntiguedad, cuotaCosto, prima, cuota, tipoDVehiculo, cobertura, combustible) {
    const informacionDelSeguroDeVehiculo = {
        email: email,
        marca: marca,
        modelo: modelo,
        factorTipoDeVehiculo: factorTipoDeVehiculo,
        valorDeclarado : valorDeclarado,
        año : año,
        SumadortipoDeCobertura : SumadortipoDeCobertura,
        factorTipoAntiguedad : factorTipoAntiguedad,
        cuotaCosto : cuotaCosto,
        prima : prima,
        cuota: cuota,
        tipoDVehiculo : tipoDVehiculo,
        cobertura: cobertura,
        combustible : combustible

    }
    localStorage.setItem("informacionDelSeguroDeVehiculo", JSON.stringify(informacionDelSeguroDeVehiculo))
};

// // FUNCION PARA  CAPTURAR DATOS MEDIANTE EL EVENTO "submit" Y COTIZAR SEGURO
// SE DEFINEN VARIABLES LOCALES PARA ATRAPAR LOS DATOS, LOS DATOS QUE LA CLASE NECESITA EN FORMATO NUMERO SE TRANSFORMARON CON 
// 'parseInt()' LUEGO SE INSTANCIA A LA CLASE 'cotizacionSolicitada' PASANDOLE LOS VALORES CORRESPONDIENTES Y SE CREA VARIABLE 
// LOCAL CON EL VALOR DE EL METODO DE LA CLASE INSTANCIADA. LUEGO GUARDAMOS LA INFO EN EL NAVEGADOR WEB CON LS Y USAMOS EL OBJETO 
// 'location' CON EL ATRIBUTO 'href' PARA REDIRECCIONAR LA PÁGINA A 'cotizadorSeguroAuto.html' :
function atraparValoresConEventoSubmitYCotizar(){
    const formulario = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let email = inputEmail.value
        let marca = inputMarca.value
        let modelo = inputModelo.value
        let factorTipoDeVehiculo = devolverFactorTipoMueble(selectTipoV.value)
        let valorDeclarado = parseFloat(inputValor.value)
        let año = parseInt(inputAño.value)
        let SumadortipoDeCobertura = devolverSumadorTipoMueble(selectTipoC.value)
        let factorTipoAntiguedad = devolverfactorAntiguedadVehiculo(selectTipoA.value);
        let tipoDVehiculo = selectTipoV.value
        let cobertura = selectTipoC.value
        let combustible = selectCombustible.value
        const cotizacionVehiculoSolicitada = new SeguroMueble(factorTipoDeVehiculo, valorDeclarado, año, SumadortipoDeCobertura, factorTipoAntiguedad, cuotaCosto)
        let cuota = cotizacionVehiculoSolicitada.obtenerValorCuota()
        let prima = cotizacionVehiculoSolicitada.obtenerPrimaAsegurada()
        guardarInfoDeSegurosMueblesEnLS(email, marca, modelo, factorTipoDeVehiculo, valorDeclarado, año, SumadortipoDeCobertura, factorTipoAntiguedad, cuotaCosto, prima, cuota, tipoDVehiculo, cobertura, combustible)
        location.href = "cotizadorSeguroAuto.html"
    })
};

//FUNCION PARA CUANDO EL EVENTO SUBMIT VAYA POR ELSE DE LA VALIDACIÓN DEL EVENTO CLICK, AL NO LLENARSE EL "Select", X ENDE, 
// EL VALOR DE "select.value" será de "Elige aquí..." IRA POR ELSE PERO EL EVENTO SUBMIT SE LE ASIGNA EL ATRIBUTO "preventDefault()",
// Y DE ESTE MODO ARROJA EL ERROR VISUALIZADO POR SweetAlert:
function validarSelectPorElse(){
    form.addEventListener("submit", (event) => {
    event.preventDefault();
})
};

// EVENTOS
btnCalcular.addEventListener("click", ()=> {
    let resultado1 = inputEmail.value;
    let resultado2 = inputMarca.value;
    let resultado3 = inputModelo.value;
    let resultado4 = inputAño.value;
    let resultado5 = inputValor.value;
    let resultado6 = selectTipoV.value;
    let resultado7 = selectTipoA.value;
    let resultado8 = selectTipoC.value;
    let resultado9 = selectCombustible.value; 
    if (resultado1 !== "" && resultado2 !== "" && resultado3 !== "" && resultado4 !== "" && resultado5 !== "" && resultado6 !== "Seleccionar..." && resultado7 !== "Seleccionar..." && resultado8 !== "Seleccionar..." && resultado9 !== "Seleccionar...") {
        atraparValoresConEventoSubmitYCotizar()
    }
    else {
        Swal.fire({
            title: "¡ERROR!",
            text: "Por Favor! Ingrese datos válidos",
            icon: "error"
        });
        validarSelectPorElse()
    }

})

// CODIGO AUTOEJECUTABLE
obtenerFactores()