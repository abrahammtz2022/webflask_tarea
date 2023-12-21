const settings = {
	async: true,
	crossDomain: true,
	url: 'https://documentos-mex1.p.rapidapi.com/Imss/ExtraerNss?curp=LOSL821028HMCPNS05',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b1d269cb3mshbd3ab82b053895fp1f6430jsn2cfe54247c52',
		'X-RapidAPI-Host': 'documentos-mex1.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});