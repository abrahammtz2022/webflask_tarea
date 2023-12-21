var array = [
    {
        id: "1",
        name: "farhan",
        country: "pakistan",
        city: "karachi"
    },
    {
        id: "2",
        name: "ali",
        country: "india",
        city: "mumbai"
    },
    {
        id: "3",
        name: "subhan",
        country: "afghanistan",
        city: "kabul"
    },
    {
        id: "4",
        name: "john",
        country: "europe",
        city: "england"
    },
    {
        id: "5",
        name: "smith",
        country: "russia",
        city: "moscow"
    }
]
var array_prod = []
// $(function () {
//     var query ='probando'
//     $.get('/catalogo/productos_mostrador_json', { query: query } , function (data) {
//         console.log(data);
//     });
// });

function showtable() {
    var query = 'probando'
    $.get('/catalogo/productos_mostrador_json', { query: query }, function (data) {
        //console.log(data);
        array_prod = data;
        document.getElementById("mytable").innerHTML = `
        <tr class="bg-primary text-white fw-bold">
                    <td>ID</td>
                    <td>Codigo</td>
                    <td>CoDProv</td>
                    <td>Descripcion</td>
                    <td>Stock</td>
                    <td>Precio</td>
                </tr> ` ;

        if (data.length == 0) {
            document.getElementById("error").innerHTML = `<span class='text-danger '>Producto no encontrado...</span>`;
        }
        else {

            document.getElementById("error").innerHTML = "";

            for (var i = 0; i < data.length; i++) {
                document.getElementById("mytable").innerHTML += ` 
                <tr > <td>${data[i].id}</td> 
                    <td>${data[i].codigo}</td> 
                    <td>${data[i].codprov}</td> 
                    <td>${data[i].descripcion}</td> 
                    <td>${data[i].existencia}</td>
                    <td class="row_data">${data[i].pventa}</td>
                    </tr>`;
            }
            // Get all the "row_data" elements into an array
            let cells = Array.prototype.slice.call(document.querySelectorAll(".row_data"));

            // Loop over the array
            cells.forEach(function(cell){
            // Convert cell data to a number, call .toLocaleString()
            // on that number and put result back into the cell
            cell.textContent = (+cell.textContent).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            });
        }

    });

}

function showtable2(curarray) {
    
        document.getElementById("mytable").innerHTML = `
        <tr class="bg-primary text-white fw-bold">
                    <td>ID</td>
                    <td>Codigo</td>
                    <td>CoDProv</td>
                    <td>Descripcion</td>
                    <td>Stock</td>
                    <td>Precio</td>
                </tr> ` ;

        if (curarray == '') {
            document.getElementById("error").innerHTML = `<span class='text-danger '>Producto no encontrado...</span>`;
        }
        else {

            document.getElementById("error").innerHTML = "";

            for (var i = 0; i < curarray.length; i++) {
                document.getElementById("mytable").innerHTML += ` 
                    <tr > <td>${curarray[i].id}</td> 
                    <td>${curarray[i].codigo}</td> 
                    <td>${curarray[i].codprov}</td> 
                    <td>${curarray[i].descripcion}</td>
                    <td>${curarray[i].existencia}</td>
                    <td class="row_data">${curarray[i].pventa}</td> 
                    </tr>`;
            }
            // Get all the "row_data" elements into an array
            let cells = Array.prototype.slice.call(document.querySelectorAll(".row_data"));

            // Loop over the array
            cells.forEach(function(cell){
            // Convert cell data to a number, call .toLocaleString()
            // on that number and put result back into the cell
            cell.textContent = (+cell.textContent).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            });
        }


}
showtable();

var newarray = [];

document.getElementById("search").addEventListener("keyup", function () {
    var search = this.value.toLowerCase();
    //console.log(search);
    //console.log(array_prod);
    newarray = array_prod.filter(function (val) {
        console.log(val);
        if ( val.codigo.includes(search) || val.descripcion.includes(search)
            || val.codprov.includes(search)) {
            var newobj = { id: val.id, codigo: val.codigo, descripcion: val.descripcion, codprov: val.codprov, existencia: val.existencia, pventa: val.pventa }
            return newobj;
        }
    });

    showtable2(newarray);

});

  $(document).ready(function () {
    $('#mytable').dataTable( {
        "pagingType": "full_numbers"
      } );
  });
