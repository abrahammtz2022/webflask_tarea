//var carga_productos = document.getElementById("carga_productos");
let dataTable;
let dataTableIsInitialized = false;
let conteo = 0;

let dataTableOptions = {
    dom: "Bfrtilp",
    buttons: [
        {
            extend: "excelHtml5",
            text: "<i class='bi bi-filetype-csv'></i>",
            titleAttr: 'Exportar a Excell',
            className: 'btn btn-success',
        },
        {
            extend: "pdfHtml5",
            text: "<i class='bi bi-filetype-pdf'></i>",
            titleAttr: 'Exportar a PDF',
            className: 'btn btn-danger',
        },
        {
            extend: "print",
            text: "<i class='bi bi-printer'></i>",
            titleAttr: 'Imprimir',
            className: 'btn btn-info',
        },
    ],
    processing: true,
    lengthMenu: [10, 20, 50, 100],
    columnDefs: [
        { orderable: false, target: [0, 1, 5, 6, 7, 8] },
        { searchable: false, target: [0, 5, 6, 7, 8] },
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
        "search": "Buscar:",
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

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        console.log("Vamos a destruir la tabla");
        dataTable.destroy();
    }
    await listUsers();
    dataTable = $('#TablaProductos').DataTable(dataTableOptions);
    dataTableIsInitialized = true;
};



const listUsers = async () => {
    try {
        // const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const response = await fetch("/catalogo/productosv_json");
        const users = await response.json();
        //console.log(users);
        let contenido = ``;

        users.forEach((producto, index) => {
            contenido += `
            <tr>
                <td class="idT"> ${index + 1} </td>
                <td class="prodSAT"> ${producto.prodserv} </td>
                <td class="codigo"> ${producto.codigo} </td>
                <td class="descrip"> ${producto.descripcion} </td>
                <td class="codprov"> ${producto.codprov} </td>
                <td class="um"> ${producto.um} </td>
                <td class="pventa"> ${producto.pventa} </td>
                <td class="stock"> ${producto.existencia} </td>
                <td class="accion">
                    <a href="/catalogo/productos/kardex/${producto.codigo}" class="btn btn-info btn-sm" type="button" tooltip="Editar Registro">
                        <i class="bi bi-eye"></i>  
                    </a>
                    <a href="/catalogo/productos/mostrar/${producto.codigo}" class="btn btn-warning btn-sm" type="button" tooltip="Editar Registro">
                        <i class="bi bi-pencil"></i>  
                    </a>
                    <a href="/catalogo/productos/eliminar/${producto.codigo}" class="btn btn-danger btn-sm" type="button" tooltip="Eliminar Registro"
                        onclick="return confirm('Confirma desear eliminar el Producto  ${producto.codigo}?')">
                        <i class="bi bi-trash"></i>
                    </a>
                </td>
            </tr>`
            conteo++;
        });

        //carga_productos.innerHTML = content;
        document.getElementById("carga_productos").innerHTML = contenido;
    } catch (error) {
        console.log(error);
    }
}


window.addEventListener("load", async () => {
    await initDataTable();
});