$(document).ready(function () {
    var sucursal = $('#txtNoSucursal').val();
    let separa_suc = sucursal.toString().split('-')
    let num_suc = separa_suc[0].trim();
    if(separa_suc.length == 2){
        $.get('/catalogo/productosv_jsonv2', {
            sucursal:num_suc.toString(),
        }, function (data) {
            //console.log(data);
            var table = $('#TablaMostrador').DataTable({
                destroy: true,
                // dom: "Bfrtilp",
                // buttons: [
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
                //         className: 'btn btn-danger ms-1',
                //     },
                //     {
                //         extend: "print",
                //         text: "<i class='bi bi-printer'></i>",
                //         titleAttr: 'Imprimir',
                //         className: 'btn btn-info ms-1',
                //     },
                // ],
                data: data.data,
                lengthChange: false,
                processing: true,
                paging: true,
                ordering: false,
                pageLength: 50,
                // lengthMenu: [20, 50, 100],
                columns: [
                    { data: 'id', className: "idT"},
                    { data: 'codigo', className: "codigo" },
                    { data: 'codprov', className: "codprov" },
                    { data: 'descripcion', className: "descrip" },
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
                    { className: "accion","defaultContent": "<button type='button' class='mirar btn btn-success ' ><i class='bi bi-eye'></i></button>" },
                ],
                language: {
                    url: "/static/json/sys_lenguaje_datatable.json"
                },
            });
            obtener_producto_accion("#TablaMostrador tbody", table);
        });
        var obtener_producto_accion = function (tbody, table) {
            $(tbody).on("click", "button.mirar", function (){
                var dataM = table.row($(this).parents("tr")).data();
                //console.log(dataM.codigo);
                //crear la liga de mostrar ubicacion del producto
                $('#txtUbicacionProd').val('');
                $.getJSON('/catalogo/productos_ubicacion_json', {
                    m_clave: dataM.codigo,
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
        };
    }else{
        //console.log('ocurrio un problema al cargar el numero de surcursal');
        Swal.fire({
            title: "ERROR EN SISTEMA",
            text: "Hay un problema al cargar el numero de sucursal, verifique si lo tiene asignado!",
            icon: "error"
          });
        return false;
    }
});


// $('#TablaMostrador tbody').on('click', 'button', dataTableMtd, function () {
//     const mostrador_prod = dataTableMtd.row($(this).parents('tr')).data();
//     //console.log(mostrador_prod[1]);
//     //crear la liga de mostrar ubicacion del producto
//     $('#txttxtUbicacionProd').val('');
//     $.getJSON('/catalogo/productos_ubicacion_json', {
//         m_clave: mostrador_prod[1]
//     }, function (data) {
//         let devuelve = data.result;
//         //alert(devuelve);
//         if (devuelve === '') {
//             $('#modalDetalleProducto').modal('show');
//             $('#txtUbicacionProd').val('Sin Ubicacion :(');
//             //setTimeout(function () { window.location.replace('/catalogo/clientes'); }, 3000);
//         } else {
//             $('#modalDetalleProducto').modal('show');
//             $('#txtUbicacionProd').val(devuelve);  
//         }

//     });
// });
