class SeguroMueble {
    constructor(factorTipoDeVehiculo, valorDeclarado, año, SumadortipoDeCobertura, factorTipoAntiguedad, cuotaCosto) {
        this.factorTipoDeVehiculo = factorTipoDeVehiculo || 1
        this.valorDeclarado = valorDeclarado || 1
        this.año = año || 1
        this.SumadortipoDeCobertura = SumadortipoDeCobertura || 1
        this.factorTipoAntiguedad = factorTipoAntiguedad || 1
        this.cuotaCosto = cuotaCosto || 1
    }


    obtenerPrimaAsegurada() {
        return ((this.valorDeclarado * this.factorTipoDeVehiculo) + (this.año * this.factorTipoAntiguedad) + this.SumadortipoDeCobertura) / this.factorTipoDeVehiculo
    }

    obtenerValorCuota() {
        return (((this.valorDeclarado * this.factorTipoDeVehiculo) + (this.año * this.factorTipoAntiguedad) + this.SumadortipoDeCobertura) / this.factorTipoDeVehiculo) * this.cuotaCosto / 100
    }
}
