const formVentaMostrador = document.getElementById("formVentaDetalle");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const btn_add = document.getElementById("btnAgregar");


let codigo_escaneo = '';
let respActFolio = '';
let valida_stock = 0;
var val_iva = 8;
let conteo_producto = 0;

let arregloDetalle = [];
let arregloNota = [];
let arregloNotaDetalle = [];
let NotaDetalle = {};
//39:41

const redibujarTabla = () => {
    cuerpoTabla.innerHTML = "";
    arregloDetalle.forEach((detalle) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td >${detalle.cant}</td>
                          <td>${detalle.codigo}</td>  
                          <td class="reduce">${detalle.descripcion}</td>
                          <td class="derecha ">${detalle.precio}</td>
                          <td class="derecha ">${detalle.importe}</td>`;
        let tdEliminar = document.createElement("td");
        let botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "btn-danger", "btn-sm");
        botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
        botonEliminar.onclick = () => {
            eliminarDetalleById(detalle.codigo);
        };
        tdEliminar.appendChild(botonEliminar);
        fila.appendChild(tdEliminar);
        cuerpoTabla.appendChild(fila);

    });
};
const eliminarDetalleById = (id) => {
    arregloDetalle = arregloDetalle.filter((detalle) => {
        if (id !== detalle.codigo) {
            return detalle;
        }
    });
    redibujarTabla();
    SumaImporte();
};
//space task group
const agregarDetalle = (objVentaDetalle) => {
    //buscar so eñ pbjetp detalle ya existia en el arreglo detalle
    // de ser asi, sumar las cantidades pars solo aparrecza una vez en el arreglo
    const resultado = arregloDetalle.find((detalle) => {
        //console.log(+objVentaDetalle.descripcion);
        if (objVentaDetalle.descripcion === detalle.descripcion) {
            return detalle;
        }
    });
    //console.log('resultado-> ' + resultado);
    if (resultado) {
        arregloDetalle = arregloDetalle.map((detalle) => {
            if (parseInt(detalle.cant) == parseInt(objVentaDetalle.stock)) {
                alert("No hay stock para vender");
                return detalle;
            }
            if (detalle.codigo === objVentaDetalle.codigo) {
                return {
                    cant: parseInt(detalle.cant) + parseInt(objVentaDetalle.cant),
                    codigo: detalle.codigo,
                    descripcion: detalle.descripcion,
                    importe: parseFloat((parseInt(detalle.cant) + parseInt(objVentaDetalle.cant)) * detalle.precio).toFixed(2),
                    precio: parseFloat(detalle.precio).toFixed(2),
                };
            }
            return detalle;
        });
    } else {
        arregloDetalle.push(objVentaDetalle);
    }
}

btn_add.addEventListener("click", function () {
    //alert('hola');
    //alert(codigo_escaneo);
    if (codigo_escaneo === '') {
        alert("No ha ingresado algun codigo, Verifique");
        $('#txtVentaCodigoEscanea').focus();
        return false;
    }
    var cod_escaneo = codigo_escaneo
    let arrEscaneo = cod_escaneo.split("|");
    var v_cant = $('#txtVentaCantidad').val();
    var v_codigo = arrEscaneo[0];
    var v_descripcion = arrEscaneo[1];
    var v_precio = arrEscaneo[2];
    var v_importe = v_cant * v_precio;
    let existencia = arrEscaneo[3].trim();
    //valida_stock = existencia;
    //console.log(existencia);
    if (existencia == 0) {
        alert("el producto no se puede vender, existencia 0");
        valida_stock = parseInt(existencia);
        document.getElementById("txtVentaCodigoEscanea").value = "";
        $('#txtVentaCodigoEscanea').autocomplete('close').val('');
        $('#txtVentaCantidad').val('1');
        cod_escaneo = ''
        v_cant = 0;
        v_codigo = '';
        v_descripcion = '';
        v_precio = 0;
        v_importe = 0;
        existencia = 0;
        $('#txtVentaCodigoEscanea').focus();
        return false;
    } else {
        //creando objeto detalle
        const objVentaDetalle = {
            cant: v_cant,
            codigo: v_codigo,
            descripcion: v_descripcion,
            precio: v_precio,
            importe: v_importe,
            stock: existencia,
        };
        valida_stock = parseInt(existencia);
        //console.log(objVentaDetalle);
        agregarDetalle(objVentaDetalle);
        redibujarTabla();
        document.getElementById("txtVentaCodigoEscanea").value = "";
        $('#txtVentaCodigoEscanea').autocomplete('close').val('');
        $('#txtVentaCantidad').val('1');
        cod_escaneo = ''
        v_cant = 0;
        v_codigo = '';
        v_descripcion = '';
        v_precio = 0;
        v_importe = 0;
        existencia = 0;
        $('#txtVentaCodigoEscanea').focus();
        SumaImporte();
    }

});
$(document).click(function () {
    // RecalcularImportesTabla();
    // ActualizarArray();
    $('#txtVentaComentario').val('');
    let seleccion = $('#txtVentaVendedor').find("option:selected").text();
    let div_selec = seleccion.split('-');
    let valor = $('#txtVentaFolio').val();
    $('#txtVentaComentario').val('Nota de Venta =>' + div_selec[0] + valor);
});
$(document).ready(function () {

    ObtenerFechaServidor();

    ObtenerLetraVendedor();

    $('#txtVentaVendedor').change(function () {
        // selected value 
        //alert($(this).val());
        // selected text 
        //alert($(this).find("option:selected").text());
        let seleccion = $(this).find("option:selected").text();
        let div_selec = seleccion.split('-');
        //console.log(div_selec[0],'===',div_selec[1]);
        ObtenerFolioVenta(div_selec[0]);
    })
    $('#TablaVentaMostrador').on('dblclick', 'tr td', function (evt) {
        evt.stopPropagation(); //detener el evento burbuja
        var target = $(evt.target);
        var nodoTr = target.parent("tr"); //Nodo TD
        var nodoTd = nodoTr.find("td"); //Nodo TR
        var importe = nodoTd[3].textContent; //obtenemos el valor de precio a modificar
        var nvo_importe
        nodoTd[3].textContent = '';
        nodoTd[3].innerHTML = '';

        // creamos un nuevo input con el valor actual de la celda
        let input = document.createElement('input');
        input.value = importe;
        input.focus();
        //evento que se ejecuta cuando el input pierde el foco
        input.addEventListener("blur", function () {
            removeInput(this);
        });
        // evento que se ejecuta cada vez que se deja de pulsar una tecla
        input.addEventListener("keypress", function (e) {
            // la tecla 13, es el Enter
            if (e.key === 'Enter') {
                removeInput(this);
                RecalcularImportesTabla();
                //nvo_importe = this.value;
                //console.log(this.value);
            }
        });

        // Ponemos en la celda el input que hemos creado
        nodoTd[3].appendChild(input);
    });
    // $('#TablaVentaMostrador').on('change','tr td', function(evt) {
    //     RecalcularImportesTabla();
    //     console.log('entro al change');
    // });
    $('#txtVentaCodigoEscanea').on('click', function () {
        RecalcularImportesTabla();
        ActualizarArray();
        $('#txtVentaComentario').val('');
        let seleccion = $('#txtVentaVendedor').find("option:selected").text();
        let div_selec = seleccion.split('-');
        let valor = $('#txtVentaFolio').val();
        $('#txtVentaComentario').val('Nota de Venta =>' + div_selec[0] + valor);
        //console.log('arreglo modificado: ',arregloDetalle);
    });
    var sucursal = $('#txtNoSucursal').val();
    let separa_suc = sucursal.toString().split('-')
    let num_suc = separa_suc[0].trim();
    console.log(num_suc);
    $('#submit').on('click', function () {
        //alert('click en el boton');

        var idVendedor = document.getElementById("txtVentaVendedor");
        var p_vendedor = idVendedor.options[idVendedor.selectedIndex].value;
        var total = document.getElementById("SumaTotal");
        var xSI = document.getElementById("optVentaSI").checked;
        var xNO = document.getElementById("optVentaNO").checked;
        var radio_opt = false;
        // var val_iva = 8;
        var total_nota = parseFloat(total.innerHTML);
        var separa_letra = p_vendedor.split('-');
        var consecutivo = $('#txtVentaFolio').val();
        var subtotal = total_nota / (1 + (val_iva / 100));
        var iva = subtotal * (val_iva / 100);
        const table = document.getElementById("TablaVentaMostrador");
        var conteo = table.rows.length - 1;
        var nombrep = $('#txtVentaNombrePC').val();
        var noip = $('#txtVentaIP').val();

        if (conteo === 1) {
            alert('No hay registros de productos a vender!');
            return false;
        }
        //console.log(separa_letra[0])
        if (consecutivo === '') {
            alert('Debe seleccionar un vendedor o vuelva a seleccionarlo');
            return false;
        }
        //console.log(total.innerHTML);
        if (xSI) {
            radio_opt = true;
        } else if (xNO) {
            radio_opt = false;
        }
        let notaVenta = {
            nvo_folio: separa_letra[0].trim() + consecutivo,
            letra: separa_letra[0],
            folio: consecutivo,
            fecha: $('#txtVentaFecha').val(),
            estado: 'R',
            facturar: radio_opt,
            sucursal: $('#txtVentaSucursal').val(),
            comentario: $('#txtVentaComentario').val(),
            vendedor: separa_letra[1].trim(),
            total: total_nota.toFixed(2),
            subtotal: subtotal.toFixed(2),
            iva: iva.toFixed(2),
            usu_canc: '...',
            usu_f_canc: '1900-01-01',
            nota_cred: '0',
            usu_cobra: '...',
            no_fact: '0',
            nomb_pc: nombrep,
            ip_pc: noip,
            detalle: arregloDetalle,
        };
        arregloNota.push(notaVenta);
        //console.log('Esto se guardara: -->',arregloNota);
        //console.log('Sucursal:', arregloNota[0].sucursal,'--',arregloNota[0].nvo_folio);
        //----agregar
        $.getJSON('/operaciones/ventas/genera_venta_ticket/agregar', {
            p_folio: arregloNota[0].nvo_folio,
            p_letra: arregloNota[0].letra,
            p_numero: arregloNota[0].folio,
            p_fecha: arregloNota[0].fecha,
            p_estado: arregloNota[0].estado,
            p_facturar: arregloNota[0].facturar,
            p_sucursal: arregloNota[0].sucursal,
            p_comentario: arregloNota[0].comentario,
            p_vendedor: arregloNota[0].vendedor,
            p_total: arregloNota[0].total,
            p_subtotal: arregloNota[0].subtotal,
            p_iva: arregloNota[0].iva,
            p_usu_canc: arregloNota[0].usu_canc,
            p_u_f_canc: arregloNota[0].usu_f_canc,
            p_ncredito: arregloNota[0].nota_cred,
            p_ucobra: arregloNota[0].usu_cobra,
            p_no_fact: arregloNota[0].no_fact,
            p_nomb_pc: arregloNota[0].nomb_pc,
            p_ver_1p: arregloNota[0].ip_pc,

        }, function (data) {
            let devuelve = data.result;
            var contP = 0;
            let final_c = 0;
            //console.log(devuelve);
            if (devuelve === 'AgregadoEnc') {
                //alert('Se ha agregado con exito!');
                //console.table(arregloNota[0].detalle);
                arregloNota[0].detalle.forEach(function (item, index) {
                    let precio = parseFloat(item.precio);
                    let p_subtotal = precio / (1 + (val_iva / 100));
                    let p_iva = p_subtotal * (val_iva / 100);
                    let importe = parseFloat(item.importe);
                    let imp_subtotal = importe / (1 + (val_iva / 100));
                    let imp_iva = imp_subtotal * (val_iva / 100);
                    //console.log('index',index);
                    $.getJSON('/operaciones/ventas/genera_venta_ticket/agregar_detalle', {
                        det_folio: arregloNota[0].nvo_folio,
                        det_cant: parseFloat(item.cant),
                        det_codigo: item.codigo,
                        det_descr: item.descripcion,
                        det_pu: precio.toFixed(2),
                        det_importe: importe.toFixed(2),
                        det_cod_sat: '',
                        det_um_sat: '',
                        det_um: '',
                        det_pu_iva: redondearToX(p_iva, 4),
                        det_pu_subtotal: redondearToX(p_subtotal, 4),
                        det_imp_iva: redondearToX(imp_iva, 4),
                        det_imp_subtotal: redondearToX(imp_subtotal, 4),
                        det_imp_desc: 0.00,
                        det_imp_desc_subtotal: 0.00,
                        det_imp_desc_iva: 0.00,
                        det_cod_prov: '',
                        det_pre_costo: 0.00,
                    }, function (data) {
                        let devuelveDet = data.result;
                        //console.log('respuesta esperada: ', devuelveDet);
                        if (devuelveDet === 'AgregadoDet') {
                            //AQUI NO SE MANDA NADA SOLO ACUMULAR REGISTROS DE PRODUCTOS
                            final_c += 1;
                            if (parseInt(final_c) === parseInt(arregloNota[0].detalle.length)) {
                                //alert('Se ha creado con exito la nota de venta :' + arregloNota[0].nvo_folio);
                                // REALIZAR CAMBIO DE FOLIO
                                ActualizarFolioVenta(arregloNota[0].letra, arregloNota[0].folio);
                                // console.log('aumento.....', respFolio);
                                // if (respFolio === 'Actualizado') {
                                RecorreTabla();
                                let notita = arregloNota[0].nvo_folio;
                                let rutaurl = window.location.href;
                                alert('Se ha creado con exito la nota de venta :' + notita);
                                window.open('/operaciones/ventas/genera_venta_ticket/mostrar_ticket/' + notita, '_blank');
                                //setTimeout(function () { var win = window.open('/operaciones/ventas/genera_venta_ticket/mostrar_ticket/' + notita, '_blank'); win.focus(); }, 1000);
                                window.location.href = rutaurl;
                                //resetear formulario
                                return true;
                            }

                        } else if (devuelveDet === 'FalladoDet') {
                            alert('Ocurrio un problema al crear ventas detalles...');
                            //agregar linea para eliminar el encabezado de la venta
                            return false;
                        }
                    });//finaliza de agregar detalle
                }); //fin de lectura de arreglo   
            } else if (devuelve === 'FalladoEnc') {
                alert('Ocurrio un error al agregar el Encabezado de Notas!');
                return false;
            }
        });
    });
    if(separa_suc.length == 2){
        $.ajax({
            url: '/catalogo/mostrador_json_cadena',
            data: {
                sucursal:num_suc.toString(),
            },
            success: function (response) {
                console.log("[mostrador]La Api conecto correctamente!");
                document.getElementById("fondo").style.display = "none";
                document.getElementById("bloquea").style.display = "none";
                $('#txtVentaCodigoEscanea').autocomplete({
                    delay: 500,
                    source: response["mostrador"],
                    minLength: 2,
                    select: function (event, ui) {
                        //console.log( "Selected: " + ui.item.value + " aka " + ui.item.id );
                        //alert(ui.item.value);
                        codigo_escaneo = ui.item.value;
                        $('#btnAgregar').focus();
                    }
                })
            }
    
        });
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
//funcion para redondear a mas de dos digitos
function redondearToX(num, decimals) {
    return +(Math.round(num + "e" + decimals) + "e-" + decimals);
}
// Eliminamos el input y ponemos el valor del mismo
function removeInput(e) {
    e.parentElement.textContent = e.value;
    //console.log('evalue-->',e.value);
}
function RecalcularImportesTabla() {
    // obtenemos todas las filas del tbody
    var filas = document.querySelectorAll("#TablaVentaMostrador tbody tr");

    var total = 0;

    // recorremos cada una de las filas
    filas.forEach(function (e) {

        // obtenemos las columnas de cada fila
        var columnas = e.querySelectorAll("td");

        // obtenemos los valores de la cantidad y importe
        var cantidad = parseFloat(columnas[0].textContent);
        var importe = parseFloat(columnas[3].textContent);

        // mostramos el total por fila
        columnas[0].textContent = cantidad.toFixed(2);
        columnas[3].textContent = importe.toFixed(2);
        columnas[4].textContent = (cantidad * importe).toFixed(2);

        total += cantidad * importe;
    });

    // mostramos la suma total
    var filas = document.querySelectorAll("#TablaVentaMostrador tfoot tr td");
    filas[1].textContent = total.toFixed(2);
}
function updateVal(currentEle, value) {
    $(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
    $(".thVal").focus();
    $(".thVal").keyup(function (event) {
        if (event.keyCode == 13) {
            $(currentEle).html($(".thVal").val().trim());
        }
    });
    $(document).click(function () { //you can use $('html')
        $(currentEle).html($(".thVal").val().trim());
    })
}
function getIndex(x) {
    document.getElementById("index").textContent = x.rowIndex;
}
function ObtenerFolioVenta(EFOLIO) {
    $.get('/catalogo/venta_mostrador_encabezado', {
        nombre: EFOLIO,
    }, function (data) {
        //console.log('obteniendo folio ventas...');
        let devuelve = data.result;
        //console.log(devuelve);
        document.getElementById("txtVentaFolio").value = devuelve;
    });
}
function ActualizarFolioVenta(folio_letra, folio_numero) {

    $.get('/catalogo/actualiza_mostrador_letra', {
        letra: folio_letra,
        numero: folio_numero,
    }, confirma);
    function confirma(datos) {
        document.getElementById("txtVentaComodin").value = datos.result;
    }
    //let consulta = $('#txtVentaComodin').val();
    //return consulta;
}
function ActualizaExistenciaProducto(vCodigo, vCant, vCondicion) {
    $.get('/catalogo/actualiza_existencia', {
        codigo: vCodigo,
        cant: vCant,
        condicion: vCondicion,
    }, function (data) {
        console.log('Actualiza Existencia: ', vCodigo, ' Respuesta: ', data.result);
    });
}
function CrearKardexProducto(pTipo, pFecha, pFolio, pCodigo, pCant, pCosto, pEstado) {
    $.get('/operaciones/crea_kardex', {
        ktipo: pTipo,
        kfecha: pFecha,
        kfolio: pFolio,
        kcodigo: pCodigo,
        kcant: pCant,
        kcosto: pCosto,
        kestado: pEstado,
    }, function (data) {
        console.log('Crea Kardex:', pCodigo, ' Respuesta: ', data.result);
    });
}
function RecorreTabla() {
    let respuesta = 0;
    let fecha = $('#txtVentaFecha').val();
    var idVendedor = document.getElementById("txtVentaVendedor");
    var p_vendedor = idVendedor.options[idVendedor.selectedIndex].value;
    var separa_letra = p_vendedor.split('-');
    var consecutivo = $('#txtVentaFolio').val();

    let folio = separa_letra[0].trim() + consecutivo;
    const table = document.getElementById("TablaVentaMostrador");

    for (let i = 1; i < table.rows.length - 1; i++) {
        let rowCant = table.rows[i].cells[0].innerHTML;
        let rowCodigo = table.rows[i].cells[1].innerHTML;
        ActualizaExistenciaProducto(rowCodigo, rowCant, 'resta');
        CrearKardexProducto('V', fecha, folio, rowCodigo, rowCant, 0, 'R');
        //respuesta = respuesta + parseInt(getResp);
        respuesta++;
    }
    console.log(respuesta, '-----', (table.rows.length - 1));
}

function ObtenerFechaServidor() {
    $.get('/catalogo/venta_mostrador_fecha', {
        fecha: 'uno'
    }, function (data) {
        let fecha = data.result;
        document.getElementById("txtVentaFecha").value = fecha
    });
}
function ObtenerLetraVendedor() {
    $.get('/catalogo/venta_mostrador_letra', {
        letra: 'prueba'
    }, function (data) {
        //let letra = data.result;
        //console.log(letra);
        document.getElementById("txtVentaVendedor").innerHTML = "<option value='0'>Seleccione...</option>";
        for (var i in data.result) {
            //console.log('lista de letras: ' + data.result[i]);
            document.getElementById("txtVentaVendedor").innerHTML += "<option value='" + data.result[i] + "'>" + data.result[i] + "</option>";
        }
    });
}
// window.addEventListener("load", function() {
//     SumaImporte();
// });
function SumaImporte() {
    let total = 0;
    const table = document.getElementById("TablaVentaMostrador");
    for (let i = 1; i < table.rows.length - 1; i++) {
        let rowValue = table.rows[i].cells[4].innerHTML;
        total = total + Number(rowValue);
    }
    const tdTotal = document.getElementById("SumaTotal");
    tdTotal.textContent = total;

}
function ActualizarArray() {
    const nuevaTabla = document.getElementById("TablaVentaMostrador");
    for (let i = 1; i < nuevaTabla.rows.length - 1; i++) {
        let rowCant = nuevaTabla.rows[i].cells[0].innerHTML;
        let rowCodigo = nuevaTabla.rows[i].cells[1].innerHTML;
        let rowDescripcion = nuevaTabla.rows[i].cells[2].innerHTML;
        let rowPrecio = nuevaTabla.rows[i].cells[3].innerHTML;
        let rowImporte = nuevaTabla.rows[i].cells[4].innerHTML;
        //console.log(rowCant,rowCodigo,rowPrecio,rowImporte);
        arregloDetalle = arregloDetalle.map((detalle) => {
            if (detalle.codigo === rowCodigo) {
                return {
                    cant: rowCant,
                    codigo: rowCodigo,
                    descripcion: rowDescripcion,
                    precio: rowPrecio,
                    importe: rowImporte
                };
            }
            return detalle;
        });
    }
}

