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

  let componente2 = document.getElementById("parametros"); //recupera el componente
  let listaClass2 = componente2.classList; //recupera la lista de clases del componente
    listaClass2.remove("activa"); //elimina la clase
}

function mostrarSeccion(id){
  ocultarSecciones();
  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");
}
function guardarTasa(){
  let tasa = recuperarInt("tasaInteres");
  if(tasa>=10 && tasa<=20){
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: "+tasa+"%")
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
 
 