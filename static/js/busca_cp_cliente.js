
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

window.onload = function () {
    document.getElementById('submit').disabled=true;
    //boton.disabled=true;
}

//$(document).ready(function () {
$(function () {
    $('#txtCodigoPostal').keydown('input', function (e) {
        if (e.which == 9) {
            var query = $(this).val();
            if (query.length < 5) {
                Swal.fire({
                    title: "Error de Captura!(TAMAÑO)",
                    text: "Codigo Postal no debe ser menos de 5 digitos numericos, el codigo postal es de 5 digitos numericos",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                return false;
            }
            if (isNaN(query)) {
                Swal.fire({
                    title: "Error de Captura!(NUMERICO)",
                    text: "Solo se admite numeros para este campo, el codigo postal es de 5 digitos numericos",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                $('#txtCodigoPostal').val('');
                return false;
            }
            if (query === '') {
                Swal.fire({
                    title: "Error de Captura!(VACIO)",
                    text: "EL campo Codigo Postal no debe estar vacio, el codigo postal es de 5 digitos numericos",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                return false;
            }
            //alert(query);
            $.get('/catalog/clientes/codigopostal', { query: query }, function (data) {
                console.log('Esta es la data:  ' + data.parametro);
                console.log('Esta es la data2:  ' + data.poblados);
                console.log('Esta es la data2:  ' + data.mensaje);

                const objetoAVerificar = data.mensaje;
                if (objetoAVerificar === 'Vacio') {
                    Swal.fire({
                        title: "Error de Verificacion",
                        text: "Codigo Postal no existe favor de verificar, o consulte a la pagina de SEPOMEX",
                        icon: 'warning',
                        confirmButtonText: "Aceptar",
                    });
                    $('#txtCodigoPOstal').focus();
                    return false;
                } else {
                    $('#txtCodigoPostal').css({ "border-color": "rgb(82, 179, 126)", "box-shadow": "0 2px 2px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgba(255,144,0,0.6)", "outline": "0 none", "borderWidth": "3px" });

                    $('#txtEstado').val(data.parametro[0]);
                    $('#txtMunicipio').val(data.parametro[1]);
                    $('#txtCiudad').val('');
                    $("#txtCiudad option").remove();

                    for (var i in data.poblados) {
                        console.log('lista de poblados: ' + data.poblados[i]);
                        document.getElementById("txtCiudad").innerHTML += "<option value='" + data.poblados[i] + "'>" + data.poblados[i] + "</option>";
                    }
                    document.getElementById('txtCiudad').focus();

                }
                
            });
        };

    });
});
$(function () {
    $('#txtRFC').keydown('input', function (e) {
        if (e.which == 9) {
            var rfc = $(this).val();
            var data = validateRfc(rfc);
            resultado = document.getElementById("resultado");
            //https://www.npmjs.com/package/validate-rfc/v/2.0.0
            //liga documentacion para el uso de verificar el rfc
            //alert(data);
            if (data.isValid) {
                $('#txtRFC').css({ "outline": "0 none" })
                $('#txtRFC').css({ "border-color": "rgb(82, 179, 126)", "box-shadow": "0 2px 2px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgba(255,144,0,0.6)", "outline": "0 none", "borderWidth": "3px" })
                if (data.type === 'company') {
                    resultado.innerHTML = 'Persona Moral';
                } else if (data.type === 'person') {
                    resultado.innerHTML = 'Persona Fisica';
                } else if (data.type === 'generic') {
                    resultado.innerHTML = 'RFC Generico';
                } else if (data.type === 'foreign') {
                    resultado.innerHTML = 'RFC Extragero';
                } else {
                    resultado.innerHTML = 'RFC vacio';
                }
                return true;
            } else {
                if (data.type === 'null') {
                    resultado.innerHTML = 'RFC vacio';
                }
                Swal.fire({
                    title: "Error en el RFC!",
                    text: "El RFC no es valido, para Persona Fisica son 13 digitos y para Persona Moral es de 12 digitos. ",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                $('#txtRFC').css({ "outline": "0 none" })
                $('#txtRFC').val('');
                return false;
            }

        }

    });
});
$(function () {
    $('#txtCorreo').keydown('input', function (e) {
        if (e.which == 9) {
            var correo = $(this).val();

            var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

            // Using test we can check if the text match the pattern
            if (validEmail.test(correo)) {
                //alert('Correo es valido');
                $('#txtCorreo').css({ "outline": "0 none" });
                $('#txtCorreo').css({ "border-color": "rgb(82, 179, 126)", "box-shadow": "0 2px 2px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgba(255,144,0,0.6)", "outline": "0 none", "borderWidth": "3px" });
                $('#submit').focus();
                return true;
            } else {
                //alert('Correo invalido');
                $('#txtCorreo').css({ "outline": "0 none" });
                $('#txtCorreo').css({ "border-color": "rgb(205, 92, 92)", "box-shadow": "0 2px 2px rgba(229, 103, 23, 0.075)inset, 0 0 8px rgba(255,144,0,0.6)", "outline": "0 none", "borderWidth": "3px" });
                $('#txtCorreo').focus();
                Swal.fire({
                    title: "Error en el CORREO!",
                    text: "El CORREO  es invalido favor de verificar. ",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                return false;
            }

        }
    });
});

$(function(){

    $.ajax({
        url:'/catalogo/regimen_json_cadena',
        success: function(response){
            console.log("[regimen]La Api conecto correctamente!");
            $('#txtRegimenFiscal').autocomplete({
                source:response["regimen"],
                minLength: 2
            })
        }
        
    });  
});

$(document).ready(function () {
    $('#txtRFC').on('click', function(){
        //$('#txtRFC').css({ "outline": "1px solid rgb(155,196,254)", "box-shadow":"0 0 5px 5px rgb(194,219,254)"})
        document.getElementById('submit').disabled =false;
    })
    $('#txtRazonSocial').on('click', function() {
        document.getElementById('submit').disabled =false;
    })
    $('#frmClientesAdd').submit(function (e) {
        e.preventDefault();
        document.getElementById("fondo").style.display="block";
        document.getElementById("bloquea").style.display="block";

        //Guardamos en una variable el nombre del campo provincia.
        var idCiudad = document.getElementById("txtCiudad");
        var p_ciudad = idCiudad.options[idCiudad.selectedIndex].value;

        var count_error = 0;
        if ($('#txtRFC').val() === '') {
            $('#txtRFC').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtRazonSocial').val() === '') {
            $('#txtRazonSocial').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtNombreComercial').val() === '') {
            $('#txtNombreComercial').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtCalle').val() === '') {
            $('#txtCalle').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtNoExterior').val() === '') {
            $('#txtNoExterior').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtNoInterior').val() === '') {
            $('#txtNoInterior').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtCodigoPostal').val() === '') {
            $('#txtCodigoPostal').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtEstado').val() === '') {
            $('#txtEstado').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtMunicipio').val() === '') {
            $('#txtMunicipio').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        /*Validación de que se haya elegido un elemento del select */
        var indiceElegido = document.getElementById('txtCiudad').selectedIndex;
        console.log(indiceElegido);
        if( indiceElegido == null || indiceElegido == -1 ) {
            $('#txtCiudad').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            //alert('erorr');
            count_error++;
            
        }
        if ($('#txtRegimenFiscal').val() === '') {
            $('#txtRegimenFiscal').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtCorreo').val() === '') {
            $('#txtCorreo').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if(count_error > 0){
            Swal.fire({
                title: "¡VALIDANDO CAMPOS!",
                text: "Hay campos vacios verifique, estaran resaltados en Rojo ",
                icon: 'warning',
                confirmButtonText: "Aceptar",
            });
            document.getElementById("fondo").style.display="none";
            document.getElementById("bloquea").style.display="none";
            return false;
        }
        $.getJSON('/catalogo/clientes/agregar_guardar', {
            rfc: $('input[name="txtRFC"]').val().toUpperCase(),
            razon: $('input[name="txtRazonSocial"]').val().toUpperCase(),
            comercial: $('input[name="txtNombreComercial"]').val(),
            calle: $('input[name="txtCalle"]').val(),
            noexterior: $('input[name="txtNoExterior"]').val(),
            nointerior: $('input[name="txtNoInterior"]').val(),
            postal: $('input[name="txtCodigoPostal"]').val(),
            estado: $('input[name="txtEstado"]').val(),
            municipio: $('input[name="txtMunicipio"]').val(),
            ciudad: p_ciudad,
            regimen: $('input[name="txtRegimenFiscal"]').val(),
            correo: $('input[name="txtCorreo"]').val()
        }, function (data) {
            //$("#result").text(data.result);
            //alert(data.result);
            let devuelve = data.result;
            document.getElementById("fondo").style.display="none";
            document.getElementById("bloquea").style.display="none";

            if(devuelve === 'Agregado'){
                //alert('Se ha agregado el CLiente')
                Swal.fire({
                    title: "Aviso Agregado!",
                    text: "Se ha agregado con exito el Cliente!!",
                    icon: 'success',
                    confirmButtonText: "Aceptar",
                });
                document.getElementById("txtRFC").value = "";
                document.getElementById("txtRFC").removeAttribute('style');
                //$('#txtRFC').remove();
                document.getElementById("txtRazonSocial").value = "";
                document.getElementById("txtNombreComercial").value = "";
                document.getElementById("txtCalle").value = "";
                document.getElementById("txtNoExterior").value = "";
                document.getElementById("txtNoInterior").value = "";
                document.getElementById("txtCodigoPostal").value = "";
                document.getElementById("txtEstado").value = "";
                document.getElementById("txtMunicipio").value = "";
                document.getElementById("txtCiudad").value = "";
                $("#txtCiudad option").remove();
                document.getElementById("txtRegimenFiscal").value = "";
                $('#txtRegimenFiscal').autocomplete('close').val('');
                $('#txtCorreo').val('');
                document.getElementById("resultado").removeAttribute('style');
                document.getElementById("resultado").innerHTML = ''
                document.getElementById('submit').disabled =true;
                document.getElementById("txtRFC").focus();
                //setTimeout( function() { window.location.href = "http://127.0.0.1:5000/catalogo/clientes"; }, 5000 );
                setTimeout( function() { window.location.replace('/catalogo/clientes'); }, 3000 );

            } else if(devuelve === 'Fallado') {
                //alert('Ocurrio un problema al agregar el cliente')
                Swal.fire({
                    title: "Aviso Fallido!",
                    text: "Ocurrio un problema al agregar el Cliente!!",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                return false;
            }
        });

        return false;
       // alert("hola")
        
    });

    $('#frmClientesEdit').submit(function (e) {
        e.preventDefault();
        document.getElementById("fondo").style.display="block";
        document.getElementById("bloquea").style.display="block";

        //Guardamos en una variable el nombre del campo provincia.
        var idCiudad = document.getElementById("txtCiudad");
        var p_ciudad = idCiudad.options[idCiudad.selectedIndex].value;

        var count_error = 0;
        if ($('#txtRFC').val() === '') {
            $('#txtRFC').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtRazonSocial').val() === '') {
            $('#txtRazonSocial').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtNombreComercial').val() === '') {
            $('#txtNombreComercial').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtCalle').val() === '') {
            $('#txtCalle').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtNoExterior').val() === '') {
            $('#txtNoExterior').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtNoInterior').val() === '') {
            $('#txtNoInterior').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtCodigoPostal').val() === '') {
            $('#txtCodigoPostal').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtEstado').val() === '') {
            $('#txtEstado').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtMunicipio').val() === '') {
            $('#txtMunicipio').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        /*Validación de que se haya elegido un elemento del select */
        var indiceElegido = document.getElementById('txtCiudad').selectedIndex;
        console.log(indiceElegido);
        if( indiceElegido == null || indiceElegido == -1 ) {
            $('#txtCiudad').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            //alert('erorr');
            count_error++;
            
        }
        if ($('#txtRegimenFiscal').val() === '') {
            $('#txtRegimenFiscal').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if ($('#txtCorreo').val() === '') {
            $('#txtCorreo').css({ "outline": "1px solid red", "box-shadow": "0 0 5px 5px red"})
            count_error++;
        }
        if(count_error > 0){
            Swal.fire({
                title: "¡EDITAR - VALIDANDO CAMPOS!",
                text: "Hay campos vacios verifique, estaran resaltados en Rojo ",
                icon: 'warning',
                confirmButtonText: "Aceptar",
            });
            document.getElementById("fondo").style.display="none";
            document.getElementById("bloquea").style.display="none";
            return false;
        }
        $.getJSON('/catalogo/clientes/modificar', {
            rfc: $('input[name="txtRFC"]').val().toUpperCase(),
            razon: $('input[name="txtRazonSocial"]').val().toUpperCase(),
            comercial: $('input[name="txtNombreComercial"]').val(),
            calle: $('input[name="txtCalle"]').val(),
            noexterior: $('input[name="txtNoExterior"]').val(),
            nointerior: $('input[name="txtNoInterior"]').val(),
            postal: $('input[name="txtCodigoPostal"]').val(),
            estado: $('input[name="txtEstado"]').val(),
            municipio: $('input[name="txtMunicipio"]').val(),
            ciudad: p_ciudad,
            regimen: $('input[name="txtRegimenFiscal"]').val(),
            correo: $('input[name="txtCorreo"]').val()
        }, function (data) {
            //$("#result").text(data.result);
            //alert(data.result);
            let devuelve = data.result;
            document.getElementById("fondo").style.display="none";
            document.getElementById("bloquea").style.display="none";

            if(devuelve === 'Modificado'){
                //alert('Se ha agregado el CLiente')
                Swal.fire({
                    title: "EDITAR - SE HA GUARDADO!",
                    text: "Se ha guardado los cambios con exito el Cliente!!",
                    icon: 'success',
                    confirmButtonText: "Aceptar",
                });
                document.getElementById("txtRFC").value = "";
                document.getElementById("txtRFC").removeAttribute('style');
                //$('#txtRFC').remove();
                document.getElementById("txtRazonSocial").value = "";
                document.getElementById("txtNombreComercial").value = "";
                document.getElementById("txtCalle").value = "";
                document.getElementById("txtNoExterior").value = "";
                document.getElementById("txtNoInterior").value = "";
                document.getElementById("txtCodigoPostal").value = "";
                document.getElementById("txtEstado").value = "";
                document.getElementById("txtMunicipio").value = "";
                document.getElementById("txtCiudad").value = "";
                $("#txtCiudad option").remove();
                document.getElementById("txtRegimenFiscal").value = "";
                $('#txtRegimenFiscal').autocomplete('close').val('');
                $('#txtCorreo').val('');
                document.getElementById("resultado").removeAttribute('style');
                document.getElementById("resultado").innerHTML = ''
                document.getElementById('submit').disabled =true;
                document.getElementById("txtRFC").focus();
                //setTimeout( function() { window.location.href = "http://127.0.0.1:5000/catalogo/clientes"; }, 5000 );
                setTimeout( function() { window.location.replace('/catalogo/clientes'); }, 3000 );

            } else if(devuelve === 'Fallado') {
                //alert('Ocurrio un problema al agregar el cliente')
                Swal.fire({
                    title: "EDITAR - Aviso Fallido!",
                    text: "Ocurrio un problema al editar el Cliente!!",
                    icon: 'warning',
                    confirmButtonText: "Aceptar",
                });
                return false;
            }
        });

        return false;
       // alert("hola")
        
    });
});
