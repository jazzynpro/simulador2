  let clientes = [];
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
