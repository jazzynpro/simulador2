function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }
    
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    
    }

    //AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos){
    let disponible = ingresos - egresos;
    if(disponible < 0){
        disponible = 0;
    }
    return disponible;
}
 
function calcularCapacidadDePago(montoDisponible){
    let capacidadDePago = montoDisponible / 2;
 
    return capacidadDePago;
}
 
function texto (id,vari){
    let texto1 = document.getElementById(id);
    texto1.innerText=vari.toFixed(2);    
}

function calcularInteresSimple(monto,tasa,plazoAnios){
    let interesSimple = plazoAnios*monto*(tasa/100);
    return interesSimple;
}

function calcularTotalPagar(monto,interesValor){
    let valorTotalPagar=monto+interesValor+100;
    return valorTotalPagar;
}

function calcularCuotaMensual(total,plazoAnios){

    let cuotaMensual= ((total)/(plazoAnios*12));
    return cuotaMensual;
}
function aprobarCredito(capacidadPago,cuotaMensual){
    if(capacidadPago>cuotaMensual){
        return true;
    }
    else{
        return false;
    }
}
