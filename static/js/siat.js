//Cédula Fiscal SAT extrae los datos de la cedeula fiscal
// const siat = async (rfc, idCif) => {
//     let json = {}
//     try{
//       if(rfc != '' && idCif != ''){
//         let urlSiat = 'https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3='
//         let get = await fetch(`${urlSiat}${idCif}_${rfc}`)
//         let text = await get.text()
//         let parser = new DOMParser()
//         let doc = parser.parseFromString(text, 'text/html')
//         let tr = doc.getElementsByTagName('tr')
//         let toJson = []
//         for(let elem of tr){
//           let txtContent = (elem.textContent).trim()
//           if(txtContent != ''){
//             let arrSplit = txtContent.split("\n")
//             for(let text of arrSplit){
//               text = text.trim()
//               if(text != ''){
//                 let arrText = text.split(':')
//                 if(arrText.length == 2){
//                   let key = arrText?.[0]
//                   let value = arrText?.[1]
//                   key = key.trim()
//                   key = key.replaceAll(' ', '_').replaceAll(':', '').replaceAll('$', '').replaceAll('&', '').replaceAll('/', '').replaceAll('-', '').replaceAll('*', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('.', '').normalize("NFD").replace(/\p{Diacritic}/gu, '').toLowerCase().replaceAll('°', '')
//                   toJson.push({key, value})
//                 }
//               }
//             }
//           }
//         }
//         let jsonFilter = toJson.filter((arr, index, self) => index === self.findIndex((t) => (t.value === arr.value)))
//         if(jsonFilter.length > 0){
//           json.rfc = rfc
//           json.id_cif = idCif
//           json.regimenes = []
//           for(let item of jsonFilter){
//             let key = item?.key
//             let value = item?.value
//             if(key == 'regimen')json['regimenes'].push(value)
//             else json[key] = value
//           }
//           let nombreFiscal = ''
//           if(json?.denominacion_o_razon_social)nombreFiscal = json?.denominacion_o_razon_social
//           else nombreFiscal = `${json?.nombre} ${json?.apellido_paterno} ${json?.apellido_materno}`.trim()
//           json.nombre_fiscal = nombreFiscal
//         }
//       }
//     }catch(e){
//       console.log(e);
//     }
//     return json
//   }

  
  

$(document).ready(function () {
  $('#frmConstancia').submit(function (e) {
    e.preventDefault();
    document.getElementById("frmDetalleConstancia").style.display="block";
    let m_rfc = document.getElementById("inputRFC").value
    let m_id = document.getElementById("inputConstancia").value
    //alert(m_rfc + '--' +m_id);
//https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/asignacionNSS;JSESSIONIDASEGEXTERNO=UfcyFQ0nddnE1HPTxbkEzlcvyU3XHPYiD5jZdsQzSxKiPcLC2ID7!1489679266
//https://serviciosdigitales.imss.gob.mx/gestionAsegurados-web-externo/asignacionNSS/

      const siat = async (rfc, idCif) => {
      let json = {}
      try{
        if(rfc != '' && idCif != ''){
          let urlSiat = 'https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3='
          let get = await fetch(`${urlSiat}${idCif}_${rfc}`)
          let text = await get.text()
          let parser = new DOMParser()
          let doc = parser.parseFromString(text, 'text/html')
          let tr = doc.getElementsByTagName('tr')
          let toJson = []
          for(let elem of tr){
            //console.log(elem.textContent);
            let txtContent = (elem.textContent).trim()
            if(txtContent != ''){
              let arrSplit = txtContent.split("\n")
              for(let text of arrSplit){
                //console.log(text);
                text = text.trim()
                if(text != ''){
                  let arrText = text.split(':')
                  if(arrText.length == 2){
                    let key = arrText?.[0]
                    let value = arrText?.[1]
                    key = key.trim()
                    key = key.replaceAll(' ', '_').replaceAll(':', '').replaceAll('$', '').replaceAll('&', '').replaceAll('/', '').replaceAll('-', '').replaceAll('*', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('.', '').normalize("NFD").replace(/\p{Diacritic}/gu, '').toLowerCase().replaceAll('°', '')
                    toJson.push({key, value})
                  }
                }
              }
            }
          }
          let jsonFilter = toJson.filter((arr, index, self) => index === self.findIndex((t) => (t.value === arr.value)))
          if(jsonFilter.length > 0){
            //console.log(jsonFilter);
            let tipo_persona =''
            if(rfc.length == 12)tipo_persona='Persona Moral'
            else if(rfc.length == 13)tipo_persona='Persona Fisica'
            json.tipoP = tipo_persona
            json.rfc = rfc
            json.id_cif = idCif
            json.regimenes = []
            for(let item of jsonFilter){
              let key = item?.key
              let value = item?.value
              if(key == 'regimen')json['regimenes'].push(value)
              else json[key] = value
            }
            let nombreFiscal = ''
            if(json?.denominacion_o_razon_social)nombreFiscal = json?.denominacion_o_razon_social
            else nombreFiscal = `${json?.nombre} ${json?.apellido_paterno} ${json?.apellido_materno}`.trim()
            json.nombre_fiscal = nombreFiscal
          }
        }
      }catch(e){
        console.log(e);
      }
      return json
    }

    new Promise(async (resolve, reject) => {
      let rfc = m_rfc //'MASC870109F82' // Tu RFC
      let id_cif = m_id //'22120242709' // TU ID de la constancia fiscal
    
      // Llamar la función async para recibir datos de la constancia
      let datos = await siat(rfc, id_cif)
      console.log(datos)
    
      // Recuperar distintos valores de json
      let nombre_fiscal = datos?.nombre_fiscal
      let cp = datos?.cp
      let regimenes = datos?.regimenes
      let lrfc = datos?.rfc
      let lcurp = datos?.curp
      let fInicioO = datos?.fecha_de_inicio_de_operaciones
      let situacion = datos?.situacion_del_contribuyente
      let fUCambio = datos?.fecha_del_ultimo_cambio_de_situacion
      let estado = datos?.entidad_federativa
      let municipio = datos?.municipio_o_delegacion
      let colonia = datos?.colonia
      let noext = datos?.numero_exterior
      let noint = datos?.numero_interior
      let mal = datos?.al
      let tipovial = datos?.tipo_de_vialidad
      let nombrev = datos?.nombre_de_la_vialidad
      let correo = datos?.correo_electronico
      let fechaA = datos?.fecha_de_alta

      $('#detalleCURP').val(lcurp);
      $('#detalleNombre').val(nombre_fiscal);
      $('#detalleFechaI').val(fInicioO);
      $('#detalleEstadoC').val(situacion);
      $('#detalleFechaCamb').val(fUCambio);
      $('#detalleCP').val(cp);
      $('#detalleEstado').val(estado);
      $('#detalleMunicipio').val(municipio);
      $('#detalleColonia').val(colonia);
      $('#detalleNoExterior').val(noext);
      $('#detalleNoInterior').val(noint);
      $('#detalleTipoVial').val(tipovial);
      $('#detalleAL').val(mal);
      $('#detalleNombreV').val(nombrev);
      $('#detalleCorreo').val(correo);
      $('#detalleFechaA').val(fechaA);
      $('#detalleTipoReg').val('');
      $("#detalleTipoReg option").remove();
      for (var i in datos?.regimenes) {
          //console.log('lista de regimenes: ' + datos?.regimenes[i]);
          document.getElementById("detalleTipoReg").innerHTML += "<option value='" + datos?.regimenes[i] + "'>" + datos?.regimenes[i] + "</option>";
      }


      


      //console.log({ nombre_fiscal, cp, regimenes })
    });

  });
});
/* 
  {
    "rfc": "",
    "id_cif": "",
    "nombre_fiscal": "",
    "correo_electronico": "",
    "regimenes": [],
    "regimen_de_capital": "",
    "fecha_de_constitucion": "",
    "situacion_del_contribuyente": "",
    "fecha_del_ultimo_cambio_de_situacion": "",
    "entidad_federativa": "",
    "municipio_o_delegacion": "",
    "colonia": "",
    "tipo_de_vialidad": "",
    "nombre_de_la_vialidad": "",
    "numero_exterior": "",
    "numero_interior": "",
}
*/