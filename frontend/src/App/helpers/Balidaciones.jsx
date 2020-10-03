const classValid = "is-valid", classInValid = "is-invalid"

export const Name = (target) => {
    let salida = true, valor = target.value.toString()
    if(salida){
        salida =Boolean(valor.length!==0)
    }
    if(salida){
        salida =!/[0-9]/.test(valor)
    }
    if(salida){
        salida =/[A-Z]/.test(valor)
    }
    if(salida){
        salida =!/[a-z][A-Z][a-z]|[a-z][A-Z]|[A-Z][A-Z]/.test(valor)
    }
    Balidar([target], salida)
}
export const Balidar = (targets = [], valor = true) => {
    targets.forEach((target) => {
        if (valor === true) {
            target.classList.replace(classInValid, classValid)
        } else {
            target.classList.replace(classValid, classInValid)
        }
    })
}
export const Balidador = (targets = []) => {
    let salida = true, contador = 0
    while (salida && contador < targets.length) {
        salida = !targets[contador].classList.contains(classInValid)
        contador++
    }
    return salida
}