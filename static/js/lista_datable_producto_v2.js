$(document).ready(function () {
    var empDataTable = $('#TablaProductos').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'ajax': {
            'url': '/catalogo/productosv2'
        },
        'lengthMenu': [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        searching: true,
        sort: false,
        "serverSide": true,
        'columns': [
            { data: "prodserv" },
            { data: "codigo" },
            { data: "descripcion" },
            { data: "codprov" },
            { data: "um" },
            { data: "pventa" },
            { data: "existencia" },
            { data: null }
        ]
    });
});
