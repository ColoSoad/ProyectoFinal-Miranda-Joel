// ENLACES AL DOM
const inputEmail = document.querySelector("input#email")
const inputMarca = document.querySelector("input#marca")
const inputModelo = document.querySelector("input#modelo")
const inputAño = document.querySelector("input#año")
const inputValor = document.querySelector("input#valor")
const selectTipoV = document.querySelector("select#tipoV")
const selectTipoA = document.querySelector("select#tipoA")
const selectTipoC = document.querySelector("select#tipoC")
const selectCombustible = document.querySelector("select#combustible")
const btnCalcular = document.querySelector("button.btnCalcular")

// VARIABLES GLOBALES, ARRAYS Y ARRAYS DE OBJETOS LITERALES
const tipoVehiculo = [{ tipo: 'Compacto', factorTipo: .5 },
                      { tipo: 'Sedan', factorTipo: 1 },
                      { tipo: 'Suv', factorTipo: 1.5 },
                      { tipo: 'Utilitario', factorTipo: 2 }]

const PlanCobertura = [{ tipo2: '(C) - Responsabilidad Civil + Robo', sumador: 100000 },
                       { tipo2: '(C+) - C + Hurto, incendio total y parcial', sumador: 120000 },
                       { tipo2: '(C-Full) - (C+) + Granizo e inundaciones', sumador: 160000 },
                       { tipo2: '(C-Full++) - (C-FULL) + Franquicia', sumador: 200000 }]

const antiguedadVehiculos = [{ tipo3: '1970 - 1988', factorAntiguedad: 1.5 },
                             { tipo3: '1989 - 2007', factorAntiguedad: 1.2 },
                             { tipo3: '2008 - 2024', factorAntiguedad: .9 }]

const cuotaCosto = .25

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
}

// FUNCION PARA DEVOLVER EL FACTOR MULTIPLICADOR DE SU TIPO DE VEHICULO.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'tipoVehiculo' Y BUSCA 
// COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'factorTipo' DEL OBJETO LITERAL 'factorTipoVehiculo' : 
function devolverFactorTipoMueble(tipo) {
    let factorTipoVehiculo = tipoVehiculo.find((factorTipoVehiculo)=> factorTipoVehiculo.tipo === tipo)
    return factorTipoVehiculo ? factorTipoVehiculo.factorTipo : 0;
}

// FUNCION PARA DEVOLVER EL SUMADOR DE SU PLAN DE COBERTURA DE VEHICULO.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo2) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'PlanCobertura' Y BUSCA 
// COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'sumador' DEL OBJETO LITERAL 'sumadorPlanCobertura' : 
function devolverSumadorTipoMueble(tipo2) {
    let sumadorPlanCobertura = PlanCobertura.find((sumadorPlanCobertura)=> sumadorPlanCobertura.tipo2 === tipo2)
    return sumadorPlanCobertura ? sumadorPlanCobertura.sumador : 0;
}

// FUNCION PARA DEVOLVER EL FACTOR ANTIGUEDAD DEL VEHICULO.
// ES UNA FUNCION QUE RECIBE UN ARGUMENTO (tipo3) Y DENTRO DE LA ESTRUCTURA DEFINE UNA VARIABLE LOCAL PARA
// PODER DAR EL USO DE METODO DE BUSQUEDA Y TRANSFORMACION CON FIND QUE RECORRE EL ARRAY DE OBJETO 'antiguedadVehiculos' Y BUSCA 
// COINCIDENCIAS, AL ENCONTRARLAS DEVUELVE EL ATRIBUTO 'factorAntiguedad' DEL OBJETO LITERAL 'factorAntiguedadVehiculo' : 
function devolverfactorAntiguedadVehiculo(tipo3) {
    let factorAntiguedadVehiculo = antiguedadVehiculos.find((factorAntiguedadVehiculo)=> factorAntiguedadVehiculo.tipo3 === tipo3)
    return factorAntiguedadVehiculo ? factorAntiguedadVehiculo.factorAntiguedad : 0;
}

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
}

// FUNCION PARA COTIZAR SEGURO DE VEHICULO EN CUOTAS/MES Y PRIMA ASEGURADA
// SE DEFINEN VARIABLES LOCALES PARA ATRAPAR LOS DATOS. LOS DATOS QUE LA CLASE NECESITA EN FORMATO NUMERO SE TRANSFORMARON CON 
// 'parseInt()' LUEGO SE INSTANCIA A LA CLASE 'SeguroMueble' PASANDOLE LOS VALORES CORRESPONDIENTES Y SE CREA VARIABLE LOCAL CON EL
// VALOR DE EL METODO DE LA CLASE. LUEGO GUARDAMOS LA INFO EN EL NAVEGADOR WEB CON LS Y USAMOS EL OBJETO 'location' CON EL
// METODO 'href' PARA REDIRECCIONAR LA PÁGINA A 'cotizadorHogar.html' :
function cotizarSeguro() {
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
}


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
        cotizarSeguro()
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
cargarTipoDeVehiculoCoberturaYAntiguedad()