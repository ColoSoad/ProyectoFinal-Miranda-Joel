//ENLACE AL DOM
const imagenInicio = document.querySelector("img#irAInicio")
const msjFooter = document.querySelector("p.proy3");

//EVENTO MOUSEMOVE
imagenInicio.addEventListener("mousemove", ()=>{
    imagenInicio.title = "Ir al inicio"
});
msjFooter.addEventListener("mousemove", ()=>{
    msjFooter.title = "TRUST-CREDITS"
});