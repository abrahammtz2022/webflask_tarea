//var carga_productos = document.getElementById("carga_productos");
let dataTableMtd;
let dataTableIsInitializedMtd = false;

let dataTableOptionsMtd = {
    // dom: "Bfrtilp",
    // buttons : [
    //     {
    //         extend: "excelHtml5",
    //         text: "<i class='bi bi-filetype-csv'></i>",
    //         titleAttr: 'Exportar a Excell',
    //         className: 'btn btn-success',
    //     },
    //     {
    //         extend: "pdfHtml5",
    //         text: "<i class='bi bi-filetype-pdf'></i>",
    //         titleAttr: 'Exportar a PDF',
    //         className: 'btn btn-danger',
    //     },
    //     {
    //         extend: "print",
    //         text: "<i class='bi bi-printer'></i>",
    //         titleAttr: 'Imprimir',
    //         className: 'btn btn-info',
    //     },
    // ],
    processing: true,
    bLengthChange : false,
    // lengthMenu: [10, 20, 50, 100],
    columnDefs: [
        { orderable: false, target: [3, 4, 5, 6] },
        { searchable: false, target: [ 0, 4,5, 6] },
        { width: '4%', target: [0]},
        { width: '10%', target:[4], className: "dt-body-right"},
        { width: '6%', target: [5], className: "dt-body-right"},
        
    ],
    // pageLength: 5,
    destroy: true,
    language: {
        "aria": {
            "sortAscending": "Activar para ordenar la columna de manera ascendente",
            "sortDescending": "Activar para ordenar la columna de manera descendente"
        },
        "autoFill": {
            "cancel": "Cancelar",
            "fill": "Rellene todas las celdas con <i>%d<\/i>",
            "fillHorizontal": "Rellenar celdas horizontalmente",
            "fillVertical": "Rellenar celdas verticalmente"
        },
        "buttons": {
            "collection": "Colección",
            "colvis": "Visibilidad",
            "colvisRestore": "Restaurar visibilidad",
            "copy": "Copiar",
            "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
            "copySuccess": {
                "1": "Copiada 1 fila al portapapeles",
                "_": "Copiadas %d fila al portapapeles"
            },
            "copyTitle": "Copiar al portapapeles",
            "csv": "CSV",
            "excel": "Excel",
            "pageLength": {
                "-1": "Mostrar todas las filas",
                "_": "Mostrar %d filas"
            },
            "pdf": "PDF",
            "print": "Imprimir",
            "createState": "Crear Estado",
            "removeAllStates": "Borrar Todos los Estados",
            "removeState": "Borrar Estado",
            "renameState": "Renombrar Estado",
            "savedStates": "Guardar Estado",
            "stateRestore": "Restaurar Estado",
            "updateState": "Actualizar Estado"
        },
        "infoThousands": ",",
        "loadingRecords": "Cargando...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
        },
        "processing": "Procesando...",
        "search": "_INPUT_",
        "searchPlaceholder": "Ingrese codigo, numero de parte, nombre parte o vehiculo...",
        "searchBuilder": {
            "add": "Añadir condición",
            "button": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "clearAll": "Borrar todo",
            "condition": "Condición",
            "deleteTitle": "Eliminar regla de filtrado",
            "leftTitle": "Criterios anulados",
            "logicAnd": "Y",
            "logicOr": "O",
            "rightTitle": "Criterios de sangría",
            "title": {
                "0": "Constructor de búsqueda",
                "_": "Constructor de búsqueda (%d)"
            },
            "value": "Valor",
            "conditions": {
                "date": {
                    "after": "Después",
                    "before": "Antes",
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual a",
                    "not": "Diferente de",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío"
                },
                "number": {
                    "between": "Entre",
                    "empty": "Vacío",
                    "equals": "Igual a",
                    "gt": "Mayor a",
                    "gte": "Mayor o igual a",
                    "lt": "Menor que",
                    "lte": "Menor o igual a",
                    "not": "Diferente de",
                    "notBetween": "No entre",
                    "notEmpty": "No vacío"
                },
                "string": {
                    "contains": "Contiene",
                    "empty": "Vacío",
                    "endsWith": "Termina con",
                    "equals": "Igual a",
                    "not": "Diferente de",
                    "startsWith": "Inicia con",
                    "notEmpty": "No vacío",
                    "notContains": "No Contiene",
                    "notEndsWith": "No Termina",
                    "notStartsWith": "No Comienza"
                },
                "array": {
                    "equals": "Igual a",
                    "empty": "Vacío",
                    "contains": "Contiene",
                    "not": "Diferente",
                    "notEmpty": "No vacío",
                    "without": "Sin"
                }
            },
            "data": "Datos"
        },
        "searchPanes": {
            "clearMessage": "Borrar todo",
            "collapse": {
                "0": "Paneles de búsqueda",
                "_": "Paneles de búsqueda (%d)"
            },
            "count": "{total}",
            "emptyPanes": "Sin paneles de búsqueda",
            "loadMessage": "Cargando paneles de búsqueda",
            "title": "Filtros Activos - %d",
            "countFiltered": "{shown} ({total})",
            "collapseMessage": "Colapsar",
            "showMessage": "Mostrar Todo"
        },
        "select": {
            "cells": {
                "1": "1 celda seleccionada",
                "_": "%d celdas seleccionadas"
            },
            "columns": {
                "1": "1 columna seleccionada",
                "_": "%d columnas seleccionadas"
            },
            "rows": {
                "1": "1 fila seleccionada",
                "_": "%d filas seleccionadas"
            }
        },
        "thousands": ",",
        "datetime": {
            "previous": "Anterior",
            "hours": "Horas",
            "minutes": "Minutos",
            "seconds": "Segundos",
            "unknown": "-",
            "amPm": [
                "am",
                "pm"
            ],
            "next": "Siguiente",
            "months": {
                "0": "Enero",
                "1": "Febrero",
                "10": "Noviembre",
                "11": "Diciembre",
                "2": "Marzo",
                "3": "Abril",
                "4": "Mayo",
                "5": "Junio",
                "6": "Julio",
                "7": "Agosto",
                "8": "Septiembre",
                "9": "Octubre"
            },
            "weekdays": [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
            ]
        },
        "editor": {
            "close": "Cerrar",
            "create": {
                "button": "Nuevo",
                "title": "Crear Nuevo Registro",
                "submit": "Crear"
            },
            "edit": {
                "button": "Editar",
                "title": "Editar Registro",
                "submit": "Actualizar"
            },
            "remove": {
                "button": "Eliminar",
                "title": "Eliminar Registro",
                "submit": "Eliminar",
                "confirm": {
                    "_": "¿Está seguro que desea eliminar %d filas?",
                    "1": "¿Está seguro que desea eliminar 1 fila?"
                }
            },
            "multi": {
                "title": "Múltiples Valores",
                "restore": "Deshacer Cambios",
                "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo.",
                "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, haga click o toque aquí, de lo contrario conservarán sus valores individuales."
            },
            "error": {
                "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\"> Más información<\/a>)."
            }
        },
        "decimal": ".",
        "emptyTable": "No hay datos disponibles en la tabla",
        "zeroRecords": "No se encontraron coincidencias",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        "infoFiltered": "(Filtrado de _MAX_ total de entradas)",
        "lengthMenu": "Mostrar _MENU_ entradas",
        "stateRestore": {
            "removeTitle": "Eliminar",
            "creationModal": {
                "search": "Buscar",
                "button": "Crear",
                "columns": {
                    "search": "Columna de búsqueda",
                    "visible": "Columna de visibilidad"
                },
                "name": "Nombre:",
                "order": "Ordenar",
                "paging": "Paginar",
                "scroller": "Posición de desplazamiento",
                "searchBuilder": "Creador de búsquedas",
                "select": "Selector",
                "title": "Crear nuevo",
                "toggleLabel": "Incluye:"
            },
            "duplicateError": "Ya existe un valor con el mismo nombre",
            "emptyError": "No puede ser vacío",
            "emptyStates": "No se han guardado",
            "removeConfirm": "Esta seguro de eliminar %s?",
            "removeError": "Fallo al eliminar",
            "removeJoiner": "y",
            "removeSubmit": "Eliminar",
            "renameButton": "Renombrar",
            "renameLabel": "Nuevo nombre para %s:",
            "renameTitle": "Renombrar"
        },
        "infoEmpty": "No hay datos para mostrar"
    } 
};

const initDataTableMtd = async () => {
    if(dataTableIsInitializedMtd){
        console.log("Vamos a destruir la tabla");
        dataTableMtd.destroy();
    }
    await listProdMostrador();
    dataTableMtd = $('#TablaMostrador').DataTable(dataTableOptionsMtd);
    dataTableIsInitializedMtd = true;
};



const listProdMostrador = async ()=>{
    try{
        // const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const response = await fetch("/catalogo/productosv_json");
        const mostrador = await response.json();
        //console.log(mostrador);
        let contenido = ``;

        mostrador.forEach((producto, index) => {
            contenido += `
            <tr>
                <td> ${index + 1} </td>
                <td> ${producto.codigo} </td>
                <td> ${producto.codprov} </td>
                <td> ${producto.descripcion} </td>
                <td class="row_data"> ${producto.pventa} </td>
                <td> ${producto.existencia} </td>
                <td>
                    <button  type="button" class="btn btn-success btn-sm" >
                    <i class="bi bi-binoculars"></i> <span>Info</span>
                    </button>
                </td>
            </tr>`
        });

        //carga_productos.innerHTML = content;
        document.getElementById("carga_mostrador").innerHTML = contenido;
        // Get all the "row_data" elements into an array
        let cells = Array.prototype.slice.call(document.querySelectorAll(".row_data"));
        // Loop over the array
        cells.forEach(function(cell){
        // Convert cell data to a number, call .toLocaleString()
        // on that number and put result back into the cell
        cell.textContent = (+cell.textContent).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        });
        
    }catch (error) {
        console.log(error);
    }
}
window.addEventListener("load", async () => {
    await initDataTableMtd();
});

$('#TablaMostrador tbody').on('click', 'button', dataTableMtd, function () {
    const mostrador_prod = dataTableMtd.row($(this).parents('tr')).data();
    //console.log(mostrador_prod[1]);
    //crear la liga de mostrar ubicacion del producto
    $('#txttxtUbicacionProd').val('');
    $.getJSON('/catalogo/productos_ubicacion_json', {
        m_clave: mostrador_prod[1]
    }, function (data) {
        let devuelve = data.result;
        //alert(devuelve);
        if (devuelve === '') {
            $('#modalDetalleProducto').modal('show');
            $('#txtUbicacionProd').val('Sin Ubicacion :(');
            //setTimeout(function () { window.location.replace('/catalogo/clientes'); }, 3000);
        } else {
            $('#modalDetalleProducto').modal('show');
            $('#txtUbicacionProd').val(devuelve);  
        }

    });
});
