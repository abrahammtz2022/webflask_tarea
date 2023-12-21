$(function(){

    $.ajax({
        url:'/catalogo/prod_serv_json_cadena',
        success: function(response){
            console.log("[productos]La Api conecto correctamente!");
            $('#txtProdServSAT').autocomplete({
                source:response["productos"],
                minLength: 2
            })
        }
        
    });  
});

$(function(){

    $.ajax({
        url:'/catalogo/umsat_json_cadena',
        success: function(response){
            console.log("[umsat]La Api conecto correctamente!");
            $('#txtUMSat').autocomplete({
                source:response["umsat"],
                minLength: 2
            })
        }
        
    });  
});

// $(function(){

//     $.ajax({
//         url:'/catalogo/regimen_json_cadena',
//         success: function(response){
//             console.log("[regimen]La Api conecto correctamente!");
//             $('#txtRegimenFiscal').autocomplete({
//                 source:response["regimen"],
//                 minLength: 2
//             })
//         }
        
//     });  
// });

