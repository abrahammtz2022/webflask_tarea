// $(document).ready(function() {
//     $('#TablaProductosV').DataTable({
//                 processing: true,
//                 serverSide: true,
//                 serverMethod: 'post',
//                 ajax: {
//                     'url':'/ajaxfile'
//                 },
// 				lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
//                 searching: true,
//                 sort: false,
//                 serverSide: true,
//                 columns: [
//                     { data: 'id', orderable: false, searchable: false },
//                     { data: 'prodserv' },
//                     { data: 'codigo' },
//                     { data: 'descripcion' },
//                     { data: 'codprov' },
//                     { data: 'um' },
//                     { data: 'pventa' },
//                     { data: 'existencia' },
//                     { data: null },
//                 ]
//             });

// });
var set_lenguaje = {
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
//refesh the page on modal close so that printfunction works again.
// $(document).on('hidden.bs.modal', function () {
//     location.reload();
// });
$(document).ready(function () {
    $.get('/catalogo/productosv_jsonv2', function (data) {
        //console.log(data);
        var table = $('#TablaProductosV').DataTable({
            destroy: true,
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
                    className: 'btn btn-danger ms-1',
                },
                {
                    extend: "print",
                    text: "<i class='bi bi-printer'></i>",
                    titleAttr: 'Imprimir',
                    className: 'btn btn-info ms-1',
                },
            ],
            data: data.data,
            processing: true,
            paging: true,
            ordering: false,
            lengthMenu: [20, 50, 100],
            columns: [
                { data: 'id', className: "idT"},
                { data: 'prodserv', className: "prodSAT" },
                { data: 'codigo', className: "codigo" },
                { data: 'descripcion', className: "descrip" },
                { data: 'codprov', className: "codprov" },
                { data: 'um', className: "um" },
                { data: 'pventa', className: "pventa" },
                { data: 'existencia', className: "stock",
                   "render": function (data, type) {
                            let color = 'bg-secondary';
                            if (data < 0) {
                                color = 'bg-danger';
                            }
                            else if (data > 0) {
                                color = 'bg-primary';
                            }
                            return `<h6><span class="badge ${color}">${data}</span></h6>`;
                            //return `<span style="color:${color}">${number}</span>`;
                    }
                },
                { className: "accion","defaultContent": "<button type='button' class='mirar btn btn-info btn-sm' ><i class='bi bi-eye'></i></button><button type'button' class='editar btn btn-warning btn-sm'><i class='bi bi-pencil'></i></button><button type='button' class='eliminar btn btn-danger btn-sm'><i class='bi bi-trash'></i></button>" },
            ],
            language: set_lenguaje,
        });
        obtener_producto_accion("#TablaProductosV tbody", table);
        
    });
    var ModalKardex = document.getElementById('ModalKardex');
    var obtener_producto_accion = function (tbody, table) {
        $('#btnPDFExport').on('click', function() {
            //alert('Hola');
            //https://thedigitalmike.com/crear-y-exportar-una-tabla-html-a-pdf/
            var maintable = document.getElementById('ImpresionDiv');

            var doc = new jsPDF('p', 'pt', 'letter'); 
            var margin = 20; 
            var scale = (doc.internal.pageSize.width - margin * 2) / document.body.clientWidth; 
            var scale_mobile = (doc.internal.pageSize.width - margin * 2) / document.body.getBoundingClientRect(); 

            
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                
                doc.html(maintable, { 
                    x: margin,
                    y: margin,
                    html2canvas:{
                        scale: scale_mobile,
                    },
                    callback: function(doc){
                        doc.output('dataurlnewwindow', {filename: 'pdf.pdf'}); 
                    }
                });
            } else{
                 
                doc.html(maintable, {
                    x: margin,
                    y: margin,
                    html2canvas:{
                        scale: scale,
                    },
                    callback: function(doc){
                        doc.output('dataurlnewwindow', {filename: 'pdf.pdf'}); 
                    }
                });
            }
        });
        $('#btnPDFExport_V2').on('click', function() {
            var nTitulo = ModalKardex.querySelector('.menTitulo');
            nTitulo.textContent = 'Historial de Movimientos del Producto';

            var divImp = document.getElementById('ImpresionDiv'); // <-- Aquí puedes elegir cualquier elemento del DOM
            var nClave = ModalKardex.querySelector('.txtClave');
            //alert(nTitulo.textContent);
            var nombre_pdf = nClave.textContent;
            //html2pdf().from(divImp).save();
            html2pdf()
                .set({
                    margin: 1,
                    filename: 'docKardex_'+ nombre_pdf+'.pdf',
                    image: {
                        type: 'jpeg',
                        quality: 0.98
                    },
                    html2canvas: {
                        scale: 1, // A mayor escala, mejores gráficos, pero más peso
                        letterRendering: true,
                        //width: $(window).width(),
                    },
                    jsPDF: {
                        unit: "pt",
                        format: "letter",
                        orientation: 'portrait' // landscape o portrait
                    }
                })
                .from(divImp)
                .save()
                .catch(err => console.log(err));
                

            nTitulo.textContent='';
        });
        $('#btnImprimir').on('click', function (){
            // var printContenido = document.getElementById('ImpresionDiv').innerHTML;
            // var originalContenido = document.body.innerHTML;
            // document.body.innerHTML = printContenido;
            //window.open('','_blank');
            //window.print();
            //document.body.innerHTML = originalContenido;
            var div = document.getElementById('ImpresionDiv');
            //document.getElementById('menTitulo').textContent = 'Hola titulo';
            var nTitulo = ModalKardex.querySelector('.menTitulo');
            nTitulo.textContent = 'Historial de Movimientos del Producto';

            var win = window.open('', 'impKardex');

            // Define and style for the elements and store it in a vairable.
            var style = '<style>';
            style = style + 'table#TablaKardex { border-collapse: collapse; font-family: "Montserrat", sans-serif; font-size: 12px;letter-spacing: 1px;}';
            style = style + 'table#TablaKardex th{ border: 1px solid #fff; background-color: #000 !important; color: #fff; font-size: 0.9em; }'
            // style = style + 'table#TablaKardex td,th { border: 1px solid #fff; }';
            style = style + 'table#TablaKardex td{ border-bottom: 1px solid black} ';
            style = style + 'table#TablaKardex td.dataTables_empty{ text-align: center;}';
            style = style + '.menTitulo {text-align: center; font-family: "Courier New", monospace; padding-bottom: 20px;}';
            //style = style + '.encabezado { display:flex; justify-content:space-evenly; flex-direction: row; font-family: "Courier New", monospace; }';
            style = style + '.encabezado { display:flex; flex-wrap: wrap; font-family: "Courier New", monospace; }';
            style = style + '.encabezado .divCodigo { flex:10%;}';
            style = style + '.encabezado .divDescripcion { flex:55%;}';
            style = style + '.encabezado .divCodProd { flex:15%;}';
            style = style + '.encabezado .divStock { flex:10%;}';
            style = style + '.encabezado .lblClave, .lblDescripcion, .lblCodProd, .lblStock{ border-radius: 10px 10px 0 0; background-color: #000;color: #fff; font-size: .7em; font-weight: bold; padding:10px;}';
            style = style + '.encabezado p.txtClave, p.menDescripcion,p.txtCodProv, p.txtStock{ border: 1px solid #000; font-size: .8em; padding: 6px; }';

            style = style + '</style>';

            // Now, write the DIV contents with CSS styles and print it.
            win.document.write(style);
            win.document.write(div.outerHTML);
            win.print();
            win.close();
            nTitulo.textContent='';
        });
        $(tbody).on("click", "button.mirar", function (){
            var dataM = table.row($(this).parents("tr")).data();
            var Titulo = ModalKardex.querySelector('.modal-title');
            var descripcion = ModalKardex.querySelector('.menDescripcion');
            var ncodigo = ModalKardex.querySelector('.txtClave');
            var ncodprov = ModalKardex.querySelector('.txtCodProv');
            var nexist = ModalKardex.querySelector('.txtStock');
            console.log(dataM);
            var titulo = " Kardex del Producto [ " + dataM.codigo + " ] Cod-Prov [ " + dataM.codprov + " ] Stock [ " + dataM.existencia + " ]";
            
            $('#ModalKardex').modal("show");
            
            Titulo.innerHTML = `<i class='bi bi-eye'></i> ` + titulo;
            descripcion.textContent = dataM.descripcion;
            ncodigo.textContent = dataM.codigo;
            ncodprov.textContent = dataM.codprov;
            nexist.textContent = dataM.existencia;
            $.get('/operaciones/muestra_kardex_codigo', {
                clave:dataM.codigo,
            }, function (data) {
                //console.log(data);
                $('#TablaKardex').DataTable({
                    destroy: true,
                    // dom: 'Bfrtip',
                    // buttons: [
                    //     {
                    //         extend: 'print',
                    //         text: "<i class='bi bi-printer'></i>",
                    //         titleAttr: 'Imprimir',
                    //         className: 'btn btn-info mb-5',
                    //         customize: function ( win ) {
                    //             $(win.document.body).addClass('white-bg');
                    //             $(win.document.body).css('font-size', '14px');
        
                    //             // $(win.document.body).find('table')
                    //             //         .addClass('compact')
                    //             //         .css('font-size', '13px')
                    //             //         .css('color','black') ;

                    //             $(win.document.body).find('th').addClass('display').css('text-align', 'center');
                    //             $(win.document.body).find('table').addClass('display').css('font-size', '16px');
                    //             $(win.document.body).find('table').addClass('display').css('text-align', 'center');
                    //             $(win.document.body).find('tr:nth-child(odd) td').each(function (index) {
                    //                 $(this).css('background-color', '#D0D0D0');
                    //             });
                    //             $(win.document.body).find('h1').css('text-align', 'center');
                    //         }
                    //     }
                    // ],
                    data: data.data,
                    processing: true,
                    //paging: true,
                    searching: false,
                    ordering: false,
                    //lengthMenu: [20, 50, 100],
                    lengthChange:false,
                    info:false,
                    paging:false,
                    // columnDefs:[
                    //     { target:3, render: DataTable.render.datetime(null,"DD/MM/YYYY","es-MX"), }
                    // ],
                    columns: [
                        { data: 'ID'},
                        { data: 'TIPO', className: "tipo"},
                        { data: 'ESTADO', className: "estado"},
                        {
                            data: "FECHA",
                            "render": DataTable.render.datetime('DD-MM-YYYY','es-MX')
                            // "render": function(data) {
                            //     return moment(data).format('DD/MM/yyyy');
                            //   },
                            // 'render': function (jsonDate) {  
                            //     var date = new Date(parseInt(jsonDate.substr(6)));  
                            //     var month = ("0" + (date.getMonth() + 1)).slice(-2);  
                            //     return ("0" + date.getDate()).slice(-2) + '-' + month + '-' + date.getFullYear();  
                            // } 
                            
                        },
                        { data: 'FOLIO'},
                        { data: 'MOVIMIENTOS'},
                        { data: 'ENT'},
                        { data: 'SAL'},
                        { data: 'EXIST'},
                        { data: 'COSTO'},
                        { data: 'MOV_ENT'},
                        { data: 'MOV_SAL'},
                        { data: 'MOV_INV'},
                    ],
                    language: set_lenguaje,
                });
                SumaImporteKardex();
            });
        });
        $(tbody).on("click", "button.eliminar", function () {
            var dataE = table.row($(this).parents("tr")).data();
            //var datal = $(this).parents("tr");
            
            //console.log(datal);
            //console.log(dataE);
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            swalWithBootstrapButtons.fire({
                title: "ELIMINAR PRODUCTO",
                text: "¿Desea eliminar el Producto [ " + dataE.codigo + "] ??",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Eliminar!!",
                cancelButtonText: "No, es Otro!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    $.getJSON('/catalogo/productos/eliminarV2', {
                        codigo: dataE.codigo
                    }, function (data) {
                        let devuelve = data.result;
        
                        if (devuelve === 'Eliminado') {
                            table.row( $(this).parents("tr") ).remove().draw();

                            Toast.fire({
                                icon: "success",
                                title: "SE HA ELIMINADO CORRECTAMENTE EL PRODUCTO!! :)"
                            });
                            setTimeout(function () { window.location.replace('/catalogo/productos'); }, 2000);
                        } else if (devuelve === 'Cancelado') {
                            swalWithBootstrapButtons.fire({
                                title: "PROBLEMA",
                                text: "Ocurrio un problema al Eliminar el Producto en BD!",
                                icon: "error"
                            });
                        }
        
                    });
        
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "CANCELADO!",
                        text: "Se cancelo la opcion eliminar Suerte!",
                        icon: "error"
                    });
                }
            });
        });
        $(tbody).on("click", "button.editar", function () {
            var data = table.row($(this).parents("tr")).data();
            //console.log(data);
            Swal.fire({
                title: "MODIFICAR PRODUCTO",
                text: "¿Desea modificar el producto [ " + data.codigo + "] ?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "S I",
                cancelButtonText: "No, es Otro!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    //console.log('entro a si')
                    window.location.replace('/catalogo/productos/mostrar/' + (data.codigo).trim());
                } //else if (
                    /* Read more about handling dismissals below */
                //     result.dismiss === Swal.DismissReason.cancel
                // ) {
                //     Swal.fire({
                //         title: "CANCELADO!",
                //         text: "Se cancelo la opcion eliminar Suerte!",
                //         icon: "error"
                //     });
                // }
            });
        });
    };
});
function SumaImporteKardex() {
    let totalEnt = 0, totalSal = 0, totalStock = 0;
    let totalImpEnt = 0, totalImpSal = 0, totalImpStock = 0;
    const table = document.getElementById("TablaKardex");
    for (let i = 1; i < table.rows.length - 1; i++) {
        let rowEnt = table.rows[i].cells[6].innerHTML;
        let rowSal = table.rows[i].cells[7].innerHTML;
        let rowStock = table.rows[i].cells[8].innerHTML;
        let rowImpEnt = table.rows[i].cells[10].innerHTML;
        let rowImpSal = table.rows[i].cells[11].innerHTML;
        let rowImpStock = table.rows[i].cells[12].innerHTML;
        //console.log(rowSal);
        totalEnt = totalEnt + Number(rowEnt);
        totalSal = totalSal + Number(rowSal);
        totalStock = totalStock + Number(rowStock);
        totalImpEnt = totalImpEnt + Number(rowImpEnt);
        totalImpSal = totalImpSal + Number(rowImpSal);
        totalImpStock = totalImpStock +Number(rowImpStock);
    }
    const tdTotalEnt = document.getElementById("SumaEnt");
    const tdTotalSal = document.getElementById("SumaSal");
    const tdTotalStock = document.getElementById("SumaStock");
    const tdTotalImpEnt = document.getElementById("SumaImpEnt");
    const tdTotalImpSal = document.getElementById("SumaImpSal");
    const tdTotalImpStock = document.getElementById("SumaImpStock");
    tdTotalEnt.textContent = totalEnt;
    tdTotalSal.textContent = totalSal;
    tdTotalStock.textContent = totalStock;
    tdTotalImpEnt.textContent = totalImpEnt;
    tdTotalImpSal.textContent = totalImpSal;
    tdTotalImpStock.textContent = totalImpStock;

    
}
// $(document).ready(function() {
//     var table = $('#TablaProductosV').DataTable({
//         destroy: true,
//         dom: "Bfrtilp",
//         buttons: [
//             {
//                 extend: "excelHtml5",
//                 text: "<i class='bi bi-filetype-csv'></i>",
//                 titleAttr: 'Exportar a Excell',
//                 className: 'btn btn-success',
//             },
//             {
//                 extend: "pdfHtml5",
//                 text: "<i class='bi bi-filetype-pdf'></i>",
//                 titleAttr: 'Exportar a PDF',
//                 className: 'btn btn-danger ms-1',
//             },
//             {
//                 extend: "print",
//                 text: "<i class='bi bi-printer'></i>",
//                 titleAttr: 'Imprimir',
//                 className: 'btn btn-info ms-1',
//             },
//         ],
//         orderCellsTop: true,
//         fixedHeader: true, 
//         responsive: true,
//         "processing": true,
//         "serverSide": true,
//         "ajax": {
//             "url": "/catalogo/productosv_jsonv2",
//             "type": "GET",
//             "data": function (d) {
//                 d.start = d.start || 0;
//                 console.log(d,'---', d.start);
//             },
            
//         },
//         ordering: false,
//         lengthMenu: [20, 50, 100],
//         columns: [
//             { data: 'id', orderable: false, searchable: false },
//             { data: 'prodserv' },
//             { data: 'codigo' },
//             { data: 'descripcion' },
//             { data: 'codprov' },
//             { data: 'um' },
//             { data: 'pventa' },
//             // { data: 'pventa', "render": function ( data, type, row ) {  
//             //     return "$"+data+" MXN";
//             // } },
//             { data: 'existencia' },
//             { data: null },
//         ],
//         scrollY: 330,
//         scroller: {
//             loadingIndicator: true
//         }
//     });
// });

