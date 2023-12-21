// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

// Operador	Operación	Ejemplo
// >	Mayor que	(a>b)
// <	Menor que	(a<b)
// >=	Mayor o igual a	(a>=b)
// <=	Menor o igual a	(a<=b)
// ==	Igual a	(a==b)
// !=	Diferente	(a!=b)
// ===	idéntico a	(a===b)
// !==	No idéntico a	(a!==b)

var datos = new Array();
var enEdicion = true;
var ultimoNodoEditado;
function editarFila(nodo){
	var nodoTd = nodo.previousSibling;
	if (enEdicion==true){
		cambiarEnEdicion(nodo);
		creaCajasTexto(nodoTd);
		var nodoDiv = document.getElementById('botonesForm');
		nodoDiv.innerHTML = '<span id=\'texto1\'>Pulse Aceptar para guardar los cambios o cancelar para anularlos.</span><br/>' +
			'<input type=\'submit\' value=\'Aceptar\' class=\'botonForm\'><input type=\'reset\' value=\'Cancelar\' class=\'botonForm\' onclick=\'reiniciarFila()\'>';
		enEdicion = false;
	}else{
		alert('Solo se puede editar una línea. Recargue la página para poder editar.')
	}
}
function creaCajasTexto(nodoTd){
	var nameForm = ['alimento', 'calorias', 'grasas', 'proteina', 'carbohidratos'];
	var instruccion = new Array();
	for(var i=0; i<5; i++){
		datos[i] = nodoTd.textContent;
		instruccion = '<input type=\'text\' style=\'width:70px\' name=\'' + nameForm[i] + '\' value=\'' + nodoTd.textContent + '\'>';
		nodoTd.innerHTML = instruccion;
		if(i<4){nodoTd = nodoTd.previousSibling;}
	}
	ultimoNodoEditado = nodoTd;
}
function reiniciarFila(){
	var nodoDiv = document.getElementById('botonesForm');
	for(var i=4; i>-1; i--){
		ultimoNodoEditado.innerHTML = datos[i];
		ultimoNodoEditado = ultimoNodoEditado.nextSibling;
	}
	cambiarEnEdicion(ultimoNodoEditado);
	enEdicion = true;
	nodoDiv.innerHTML = '';
}
function cambiarEnEdicion(nodo){
	if(enEdicion==true){
		nodo.textContent = 'En edición';
		nodo.style.color = 'gray';
	}else{
		nodo.textContent = 'Editar';
		nodo.style.color = '#3300FF';
	}
}