const classValid = "is-valid", classInValid = "is-invalid"

export const Name = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0)
    }
    if (salida) {
        salida = !/([0-9]|[A-Z][A-Z]|[a-z][A-Z]|\s[a-z])/.test(valor)

    }
    if (salida) {
        salida = /([A-Z][a-z]+\s[A-Z]|[A-Z][a-z]+)/.test(valor)
    }
    Balidar([target], salida)
}
export const Solapin = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0 || valor.length === 6)
    }
    if (salida) {
        salida = !/([a-z]|\W|\s)/.test(valor)
    }
    if (salida) {
        salida = /([A-Z][0-9]+)/.test(valor)
    }
    Balidar([target], salida)
}
export const UserName = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0)
    }
    if (salida) {
        salida = !/([A-Z]|[0-9]|\W|\s)/.test(valor)
    }
    if (salida) {
        salida = /([a-z])/.test(valor)
    }
    Balidar([target], salida)
}
export const Password = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0 || valor.length < 4 || valor.length > 8)
    }
    if (salida) {
        salida = !/(\W)/.test(valor)
    }
    Balidar([target], salida)
}
export const Select = (target, incorrectos = [""]) => {
    let salida = true, valor = target.value.toString(), contador = 0
    while (salida && contador < incorrectos.length) {
        salida = !Boolean(valor === incorrectos[contador])
        contador++
    }
    Balidar([target], salida)
}
export const Grupo = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0 || valor.length !== 4)
    }
    if (salida) {
        salida = !/([A-Z]|[a-z]|\W)/.test(valor)
    }
    if (salida) {
        salida = /(\d)/.test(valor)
    }
    Balidar([target], salida)
}
export const Apartamento = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0 || valor.length < 4 || valor.length > 6)
    }
    if (salida) {
        salida = !/([A-Z]|[a-z]|\W)/.test(valor)
    }
    if (salida) {
        salida = /(\d)/.test(valor)
    }
    Balidar([target], salida)
}
export const Fecha = (target) => {
    let salida = true, valor = target.value.toString()
    if (salida) {
        salida = !Boolean(valor.length === 0)
    }
    if (salida) {
        salida = !/([A-Z]|[a-z])/.test(valor)
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