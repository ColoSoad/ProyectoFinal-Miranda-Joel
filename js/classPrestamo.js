class Credito {
    constructor(email, cantidadDeCuota, tipoDeInteres, montoASolicitar) {
        this.email = email;
        this.cantidadDeCuota = cantidadDeCuota || 0
        this.tipoDeInteres = tipoDeInteres || 0
        this.montoASolicitar = montoASolicitar || 0
    }
    
    calcularCuotaMensual() {
        let cuotaMensual = (this.montoASolicitar * this.tipoDeInteres) / this.cantidadDeCuota
        return cuotaMensual
    }
}