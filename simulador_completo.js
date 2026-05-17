  let clientesArreglo = []; //Arreglo
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
function ocultarSecciones(){
  let componente = document.getElementById("parametros"); //recupera el componente
  let listaClass = componente.classList; //recupera la lista de clases del componente
    listaClass.remove("activa"); //elimina la clase

  let componente2 = document.getElementById("clientes"); //recupera el componente
  let listaClass2 = componente2.classList; //recupera la lista de clases del componente
    listaClass2.remove("activa"); //elimina la clase

   let componente3 = document.getElementById("credito"); //recupera el componente
  let listaClass3 = componente3.classList; //recupera la lista de clases del componente
    listaClass3.remove("activa"); //elimina la clase

    let componente4 = document.getElementById("listaCreditos"); //recupera el componente
  let listaClass4 = componente4.classList; //recupera la lista de clases del componente
    listaClass4.remove("activa"); //elimina la clase
}

function mostrarSeccion(id){
  ocultarSecciones();
  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");
}
function guardarTasa(){
  tasaInteres = recuperarInt("tasaInteres");
  
  if(tasaInteres>=10 && tasaInteres<=20){
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: "+tasaInteres+"%")
  }else{
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%")
  }
}

function guardarCliente(){
  let cedula = recuperaraTexto("txtCedula");
  let nombre = recuperaraTexto("txtNombre");
  let apellido = recuperaraTexto("txtApellido");
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  let cliente ={};
 
  cliente.cedula = cedula;
  cliente.nombre = nombre;
  cliente.apellido = apellido;
  cliente.ingresos = ingresos;
  cliente.egresos = egresos;
 
  let busqueda = buscarCliente(cedula);
 
  if(busqueda == null){
    clientesArreglo.push(cliente);    // guarda el cliente dentro de clientesArreglo[]
    pintarClientes();                 //llama a la funcion pintar para mostrar datos en la tabla  
  } else{
    busqueda.nombre = nombre;
    busqueda.apellido = apellido;
    busqueda.ingresos = ingresos;
    busqueda.egresos = egresos;
    //clientesArreglo.push(busqueda);
    pintarClientes();    
  }
 
  limpiar();
   
}

function pintarClientes(){
  let tabla = document.getElementById("tablaClientes");
  tabla.innerHTML= "";

  let elementosTabla;
  let filaTabla = "";

  for(i=0; i<clientesArreglo.length; i++){ //usamos el contador que llega desde 0 hasta el final del arreglo
  elementosTabla = clientesArreglo[i]; //obtenemos el cliente en la posicion i

  filaTabla += "<tr>"+
              "<td>"+elementosTabla.cedula + "</td>"+
              "<td>"+elementosTabla.nombre + "</td>"+
              "<td>"+elementosTabla.apellido + "</td>"+
              "<td>"+elementosTabla.ingresos + "</td>"+
              "<td>"+elementosTabla.egresos + "</td>"+
               "<td><button onclick='seleccionarCliente("+ elementosTabla.cedula +")'>Actualizar</button>"+"<button>"+'Eliminar'+"</button></td>"+      
              "</tr>";      
  }
  tabla.innerHTML = filaTabla;
}
function buscarCliente(cedula){
  let elementoTabla;
  let clienteEncontrado = null;
 
  for(let i=0; i<clientesArreglo.length; i++){
    elementoTabla = clientesArreglo[i];
      if(elementoTabla.cedula == cedula){
        clienteEncontrado = elementoTabla;
        break;                    //encuentra el valor y suspende la ejecucion del for
      }
  }
 
  return clienteEncontrado;
}

function limpiar(){
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
}
 
function seleccionarCliente(cedula){
  let resultado = buscarCliente(cedula);

    if(resultado != null){

        clienteSeleccionado = resultado;

        mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);

        mostrarTextoEnCaja("txtNombre", clienteSeleccionado.nombre);

        mostrarTextoEnCaja("txtApellido", clienteSeleccionado.apellido);

        mostrarTextoEnCaja("txtIngresos", clienteSeleccionado.ingresos);

        mostrarTextoEnCaja("txtEgresos", clienteSeleccionado.egresos);

    }
}

function buscarClienteCredito(){

    let cedula =
    recuperaraTexto("buscarCedulaCredito");

    let clienteEncontrado =
    buscarCliente(cedula);

    let divDatos =
    document.getElementById("datosClienteCredito");

    if(clienteEncontrado != null){

       clienteSeleccionado = clienteEncontrado;

        divDatos.innerHTML = 
        "<h4>Datos del Cliente</h4>" +

        "<p>Cédula: " + 
        clienteEncontrado.cedula + "</p>" +

        "<p>Nombre: " + 
        clienteEncontrado.nombre + "</p>" +

        "<p>Apellido: " + 
        clienteEncontrado.apellido + "</p>" +

        "<p>Ingresos: " + 
        clienteEncontrado.ingresos + "</p>" +

        "<p>Egresos: " + 
        clienteEncontrado.egresos + "</p>";

    }else{

        divDatos.innerHTML =
        "Cliente no encontrado";
    }
}
function calcularCredito(){

    let monto = recuperarFloat("montoCredito");

    plazoCalculado = recuperarInt("plazoCredito");

    let ingresos = clienteSeleccionado.ingresos;

    let egresos = clienteSeleccionado.egresos;

    let disponible = calcularDisponible(ingresos,egresos);

    let capacidadPago = calcularCapacidadDePago(disponible);

    let interes = calcularInteresSimple(monto,tasaInteres,plazoCalculado);

    montoCalculado = calcularTotalPagar(monto,interes);

    cuotaCalculada = calcularCuotaMensual(montoCalculado,plazoCalculado);

    creditoAprobado = aprobarCredito(capacidadPago,cuotaCalculada);

    let resultadoCredito = document.getElementById("resultadoCredito");

    let mensajeResultado = "";

    let btnAsignar = document.getElementById("btnAsignarCredito" );

    if(creditoAprobado == true){
      mensajeResultado ="APROBADO";
      resultadoCredito.className="aprobado";
      btnAsignar.disabled = false;
    }else{
        mensajeResultado ="RECHAZADO";
        resultadoCredito.className="rechazado";
        btnAsignar.disabled = true;
    }

    resultadoCredito.innerHTML =

    "Capacidad de pago: " + capacidadPago + "<br>" +

    "Total a pagar: " + montoCalculado + "<br>" +

    "Cuota mensual: " + cuotaCalculada.toFixed(2) + "<br>" +

    "RESULTADO: " + mensajeResultado;
}
function asignarCredito(){
  let credito = {}; //objeto

  credito.cedula = clienteSeleccionado.cedula;

  credito.nombre = clienteSeleccionado.nombre;

  credito.apellido = clienteSeleccionado.apellido;

  credito.monto = montoCalculado;

  credito.tasa = tasaInteres;

  credito.plazo = plazoCalculado;

  credito.cuota = cuotaCalculada;

  creditos.push(credito);

  console.log(creditos);

}

function buscarCreditos(cedula){
let creditosEncontrados = []; //Arreglo

for(let i=0; i<creditos.length; i++){ //recorre el arreglo
  let creditoActual = creditos[i]; 

  if( creditoActual.cedula == cedula){
    creditosEncontrados.push(creditoActual);
  }
}
  return creditosEncontrados;
}

function pintarCreditos(creditos){
  let tabla = document.getElementById("tablaCreditos");
    tabla.innerHTML = "";

  let filas = "";
    for(i=0; i<creditos.length; i++){
        let creditoActual =
        creditos[i];

        filas += "<tr>" +

        "<td>" + creditoActual.cedula + "</td>" +

        "<td>" + creditoActual.nombre + "</td>" +

        "<td>" + creditoActual.apellido + "</td>" +

        "<td>" + creditoActual.monto + "</td>" +

        "<td>" + creditoActual.tasa + "</td>" +

        "<td>" + creditoActual.plazo + "</td>" +

        "<td>" + creditoActual.cuota.toFixed(2) + "</td>" +

        "</tr>";
    }
    tabla.innerHTML = filas;
  }
  function buscarCreditosCliente(){
    let cedulaRecuperada = recuperaraTexto("buscarCedulaListado");
    let creditosEncontrados = buscarCreditos(cedulaRecuperada);
    pintarCreditos(creditosEncontrados);
  }

