// ENLACES AL DOM
const spanMonto = document.querySelector("span.label-montoCredito")
const spanTasa = document.querySelector("span.label-tasaDeIntereses") 
const spanCuotas = document.querySelector("span.label-coutas")
const spanCuota = document.querySelector("span.label-cuota")
const spanTotalDevolver = document.querySelector("span.label-total")
const btnContratar = document.querySelector("button.button-contratar")
let email = ""

// FUNCION PARA RECUPERAR DATOS DE LS
// MEDIANTE UN OBJETO LITERAL LLAMADO 'infoDelPrestamo' RECUPERAMOS LOS DATOS ALMACENADOS EN EL NAVEGADOR
function recuperarInfoDeLocalStorage() {
    const infoDelPrestamo = JSON.parse(localStorage.getItem("informacionDelPrestamo"))
    if (infoDelPrestamo !== "" && infoDelPrestamo !== null) {
        spanMonto.textContent = "$ " + infoDelPrestamo.montoASolicitar.toLocaleString("es-AR")
        spanTasa.textContent = ((infoDelPrestamo.tipoDeInteres - 1) * 100).toFixed(2)
        spanCuotas.textContent = infoDelPrestamo.cantidadDeCuota
        spanCuota.textContent = parseFloat(infoDelPrestamo.cuota.toFixed(2)).toLocaleString("es-AR")
        spanTotalDevolver.textContent = (infoDelPrestamo.cuota * infoDelPrestamo.cantidadDeCuota).toLocaleString("es-AR")
        email = infoDelPrestamo.email
    }
    else {
        location.href = "./prestamo.html"
    }    
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
})

recuperarInfoDeLocalStorage()