
//elementos del boton para abrir 
const abrirModal = document.getElementById('agregar');
const abrirModal2 = document.getElementById('editar');
// el modal1 y el modal2
const modale =  document.getElementById('modal'); 
const modale2 =  document.getElementById('modal2'); 
//elemento para cerrar el modal
const cerrarModal = document.getElementById('cerrar-modal');
const cerrarModal2 = document.getElementById('cerrar-modal2');

//funciones para mostrar y cerrar modal1
abrirModal.addEventListener("click",()=>{
   modale.classList.add('modale--show');
});

cerrarModal.addEventListener("click",(e)=>{
  e.preventDefault(); 
  modale.classList.remove('modale--show');
});
//funciones para mostrar y cerrar modal2
abrirModal2.addEventListener("click",()=>{
    modale2.classList.add('modale--show');
});

cerrarModal2.addEventListener("click",(e)=>{
    e.preventDefault(); 
    modale2.classList.remove('modale--show');              
});


//descargar excel
  const $btnExportar = document.querySelector("#btnExportar"),
  $tabla = document.querySelector("#tabla");

  $btnExportar.addEventListener("click", function() {
    // Obtener las columnas deseadas por su índice (empezando desde 0)
    var columnasDeseadas = [ 1,2,3,4,5,6]; // Por ejemplo, seleccionamos las columnas 0, 1 y 2
  
    // Crear un array para almacenar los datos de las columnas seleccionadas
    var datosColumnas = [];
  
    // Recorrer las filas de la tabla
    for (var i = 0; i < $tabla.rows.length; i++) {
      var fila = $tabla.rows[i];
      var datosFila = [];
  
      // Recorrer las celdas de la fila y obtener los datos de las columnas seleccionadas
      for (var j = 0; j < fila.cells.length; j++) {
        if (columnasDeseadas.includes(j)) {
          datosFila.push(fila.cells[j].innerText);
        }
      }
  
      datosColumnas.push(datosFila);
    }
  
    // Crear un objeto de SheetJS con los datos de las columnas seleccionadas
    var libro = XLSX.utils.book_new();
    var hoja = XLSX.utils.aoa_to_sheet(datosColumnas);
    XLSX.utils.book_append_sheet(libro, hoja, "Hoja1");
  
    // Generar el archivo Excel
    var archivoExcel = XLSX.write(libro, { bookType: "xlsx", type: "array" });
    var blob = new Blob([archivoExcel], { type: "application/octet-stream" });
  
    // Crear un enlace de descarga
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = URL.createObjectURL(blob);
    enlaceDescarga.download = "bdegresados.xlsx";
    enlaceDescarga.click();
  });

  document.addEventListener('DOMContentLoaded', function() {
    var inputBusqueda = document.getElementById('inputBusqueda');
    inputBusqueda.addEventListener('keyup', function() {
        var searchText = inputBusqueda.value.toLowerCase();
        var filas = document.querySelectorAll('#tabla tbody tr');
        filas.forEach(function(fila) {
            var filaText = fila.innerText.toLowerCase();
            if (filaText.indexOf(searchText) === -1) {
                fila.style.display = 'none';
            } else {
                fila.style.display = '';
            }
        });
    });
});



