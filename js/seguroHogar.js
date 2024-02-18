// ENLACES AL DOM
const inputEmail = document.querySelector("input#email")
const selectTipoDeInmueble = document.querySelector("select#tipoDeInmueble")
const selectUbicacion = document.querySelector("select#ubicacion")
const inputMts2 = document.querySelector("input#Mts2")
const btnCotizar = document.querySelector("button.btnCotizar")
const btnInicio = document.querySelector("a#inicio")

// VARIABLES GLOBALES, ARRAYS Y ARRAYS DE OBJETOS LITERALES 
const inmueblesTipo = [{ codigo: 1, tipo: 'Hogar', factor: 1.12,},
                       { codigo: 2, tipo: 'Local comercial', factor: 1.44 },
                       { codigo: 3, tipo: 'Consultorio / Oficina', factor: 1.75 }]


const inmuebleUbicacion =  [{tipo2: 'CABA', factorUbicacion: 1.13},
                            {tipo2: 'Tandil', factorUbicacion: 1.07},
                            {tipo2: 'Costa Atlántica', factorUbicacion: 1.29},
                            {tipo2: 'Patagonia', factorUbicacion: 1.00},
                            {tipo2: 'Cuyo', factorUbicacion: 1.11}]

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

// FUNCION PARA COTIZAR SEGURO DE HOGAR EN CUOTAS/MES
// SE DEFINEN VARIABLES LOCALES PARA ATRAPAR LOS DATOS. LOS DATOS QUE LA CLASE NECESITA EN FORMATO NUMERO SE TRANSFORMARON CON 
// 'parseInt()' LUEGO SE INSTANCIA A LA CLASE 'SeguroInmueble' PASANDOLE LOS VALORES CORRESPONDIENTES Y SE CREA VARIABLE LOCAL CON EL
// VALOR DE EL METODO DE LA CLASE. LUEGO GUARDAMOS LA INFO EN EL NAVEGADOR WEB CON LS Y USAMOS EL OBJETO 'location' CON EL
// METODO 'href' PARA REDIRECCIONAR LA PÁGINA A 'cotizadorHogar.html' :
function cotizarSeguro() {
    let email = inputEmail.value
    let TipoDeInmueble = devolverFactorTipoInmueble(selectTipoDeInmueble.value)
    let InmuebleTipo = selectTipoDeInmueble.value
    let UbicacionGeo = selectUbicacion.value
    let Ubicacion = devolverFactorUbicacion(selectUbicacion.value)
    let mts2 = parseInt(inputMts2.value)
    const cotizacionSolicitada = new SeguroInmueble(email, TipoDeInmueble, Ubicacion, mts2, costoM2)
    let cuota = cotizacionSolicitada.obtenerCotizacionInmueble()
    guardarInfoDeSegurosInmueblesEnLS(email, TipoDeInmueble, InmuebleTipo, UbicacionGeo, Ubicacion, mts2, costoM2, cuota);
    location.href = "cotizadorSeguroInmueble.html"
}

// EVENTOS
btnCotizar.addEventListener("click", ()=> {
    let resultado = selectTipoDeInmueble.value;
    let resultado2 = inputEmail.value;
    let resultado3 = selectUbicacion.value
    let resultado4 = inputMts2.value
    if (resultado !== 'Seleccionar...' && resultado2 !== "" && resultado3 !== 'Seleccionar...' && resultado4 !== "0") {
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
cargartipoDeInmuebleYUbicacion()