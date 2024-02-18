// ENLACES AL DOM
const spanMonto = document.querySelector("span.label-montoCredito")
const spanTasaAnual = document.querySelector("span.label-tasaDeInteresesAnual")
const spanTasa = document.querySelector("span.label-tasaDeIntereses") 
const spanCuotas = document.querySelector("span.label-coutas")
const spanCuota = document.querySelector("span.label-cuota")
const spanTotalDevolver = document.querySelector("span.label-total")
const btnContratar = document.querySelector("button.button-contratar")

//VARIABLES
let email = ""

// FUNCION PARA RECUPERAR DATOS DE LS
// MEDIANTE UN OBJETO LITERAL LLAMADO 'infoDelPrestamo' RECUPERAMOS LOS DATOS ALMACENADOS EN EL NAVEGADOR
function recuperarInfoDeLocalStorage() {
    const infoDelPrestamo = JSON.parse(localStorage.getItem("informacionDelPrestamo"))
    if (infoDelPrestamo !== "" && infoDelPrestamo !== null) {
        spanMonto.textContent = "$ " + infoDelPrestamo.montoASolicitar.toLocaleString("es-AR")
        spanTasaAnual.textContent = infoDelPrestamo.tipoDeIntereses.toFixed(0)
        spanTasa.textContent = ((infoDelPrestamo.tipoDeInteres - 1) * 100).toFixed(0)
        spanCuotas.textContent = infoDelPrestamo.cantidadDeCuota
        spanCuota.textContent = parseFloat(infoDelPrestamo.cuota.toFixed(2)).toLocaleString("es-AR")
        spanTotalDevolver.textContent = (infoDelPrestamo.cuota * infoDelPrestamo.cantidadDeCuota).toLocaleString("es-AR")
        email = infoDelPrestamo.email
    }
    else {
        location.href = "./prestamo.html"
    }    
}
// FUNCION PARA REFRESCAR PÁGINA DE CONTRATAR SERVICIO, PARA QUE SE REEDIRECCIONE AL SITIO "./prestamo.html"
function refrescarPagina(){
    location.reload(true);
}

//EVENTOS

//CLICK
btnContratar.addEventListener("click", ()=> {
    Swal.fire({
        title: "FELICITACIONES!",
        text: `Se enviará un email a ${email} para finalizar la operación`,
        icon: "success"
    });
    localStorage.removeItem("informacionDelPrestamo")
    // USO DE ASINCRONISMO CON "setTimeout" PARA REFRESCAR PAGINA DE DETALLE LUEGO DE 3segundos, Y AL VENIR SIN DATOS SE REEDIRECCIONA A "./prestamo.html"
    setTimeout(()=>{
        refrescarPagina()
    }, 5000)
})

recuperarInfoDeLocalStorage()