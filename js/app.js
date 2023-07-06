const ingresos = [
    new Ingreso('Salary', 2000),
    new Ingreso('Sell car', 1200)
];

const egresos = [
    new Egreso('Rent apartment', 900),
    new Egreso('Clothes', 400)
];

let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje_egreso').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString("en-US",{style:"percent",minimumFractionDigits:1})
}

const cargarIngresos = ()=>{
    let ingresosHTML ="";
    for (let ingreso of ingresos){
        ingresosHTML += crearIngresoHTMl(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

const crearIngresoHTMl = (ingreso)=>{
    let ingresosHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn" onclick ="eliminarIngreso(${ingreso.id})">
                 <ion-icon name="trash-outline"></ion-icon>
            </button>
        </div>
     </div>
</div>
    
    `
    return ingresosHTML;
}

const cargarEgresos = ()=>{
    let EgresoHTML ="";
    for (let egreso of egresos){
        EgresoHTML += crearEgresoHTMl(egreso);
    }
    document.getElementById("lista-egresos").innerHTML = EgresoHTML;
}

const crearEgresoHTMl = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn" onclick = "eliminarEgreso(${egreso.id})">
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    
    `
    return egresoHTML;
}
const eliminarEgreso = (id)=>{

    let indece = egresos.findIndex(ingreso => ingreso.id === id);
    egresos.splice(indece,1)
    cargarCabecero()
    cargarEgresos()

}
const eliminarIngreso = (id)=>{
    let indece = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indece,1)
    cargarCabecero()
    cargarIngresos()

}

let agregarDato = ()=>{
    let forma= document.forms["forma"]
    let tipo = forma["tipo"]
    let descripcion = forma["descripcion"]
    let valor = forma["valor"]
    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));
            cargarCabecero()
            cargarIngresos();
        }
        else if (tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value,Number(valor.value)));
            cargarCabecero()
            cargarEgresos();
        }
    }
}