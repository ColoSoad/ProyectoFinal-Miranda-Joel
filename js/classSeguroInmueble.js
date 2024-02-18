class SeguroInmueble {
    constructor(email, tipoInmueble, ubicacion, mts2, costoM2) {
        this.email = email
        this.tipoInmueble = tipoInmueble || 1
        this.ubicacion = ubicacion || 1
        this.mts2 = mts2 || 1
        this.costoM2 = costoM2 || 1
    }
    
    obtenerCotizacionInmueble() {
        return parseFloat((this.tipoInmueble * this.ubicacion * this.mts2 * this.costoM2).toFixed(2)).toLocaleString("es-AR")
    }
}