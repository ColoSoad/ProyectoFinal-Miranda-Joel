// ENLACES AL DOM
const spanPropiedad = document.querySelector("span.label-propiedad")
const spanUbicacion = document.querySelector("span.label-ubicacion") 
const spanM2 = document.querySelector("span.label-m2")
const spanValorCuota = document.querySelector("span.label-valorCuota")
const btnContratar = document.querySelector("button.button-contratar")
let email = ""

// FUNCION PARA RECUPERAR DATOS DE LS
// MEDIANTE UN OBJETO LITERAL LLAMADO 'infoDelInmueble' RECUPERAMOS LOS DATOS ALMACENADOS EN EL NAVEGADOR
function recuperarInformacionDeLocalStorage() {
    const infoDelInmueble = JSON.parse(localStorage.getItem("informacionDelSeguroDeHogar"))
    if (infoDelInmueble !== "" && infoDelInmueble !== null) {
        spanPropiedad.textContent = infoDelInmueble.InmuebleTipo
        spanUbicacion.textContent = infoDelInmueble.UbicacionGeo
        spanM2.textContent = infoDelInmueble.Mts2
        spanValorCuota.textContent = infoDelInmueble.cuota
        email = infoDelInmueble.email
    }
    else {
        location.href = "./seguroCasa.html"
    }    
}

// FUNCION PARA REFRESCAR PÁGINA DE CONTRATAR SERVICIO, PARA QUE SE REEDIRECCIONE AL SITIO "./seguroCasa.html"
function refrescarPagina(){
    location.reload(true);
}

//EVENTOS

//CLICK
btnContratar.addEventListener("click", ()=> {
    Swal.fire({
        icon: 'question',
        title: 'Finalizar operación',
        text: '¿Confirma la realización de la operación?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((resultado)=> {
        if (resultado.isConfirmed) {
            Swal.fire({
                title: "FELICITACIONES!",
                text: `Se enviará un email a ${email} para finalizar la operación`,
                icon: "success",
                confirmButtonText: 'Aceptar'
            });
            localStorage.removeItem("informacionDelSeguroDeHogar");
            setTimeout(()=>{
                refrescarPagina()
            }, 5000)
        }
    })
})

// CODIGO AUTOEJECUTABLE
recuperarInformacionDeLocalStorage()