$(document).ready(function(){
	$("#enviarConsulta").click(function() {
		contactenos($('#formConsulta')[0]);
	});
	$("#consultas-checkbox").click(function(e) {
		if(this.checked)
		{
			$('#enviarConsulta').removeClass('disabled');
		}
	});
});
contactenos = function(e){
	var result = e.checkValidity();
	if (e.checkValidity() === false)
	{
		e.classList.add('was-validated');
	}
	else
	{
		let data = new Object();
		e.classList.add('was-validated');
		form = new Array();
		$.each(e.elements, function(k, v) {
			let campos = new Object();
			campos[v.name] = v.value;
			form.push(campos);
		});
		data.formulario = form;
		$.ajax(
				{
					method : 'POST',
					url : 'http://declimamanager.declima.cl/consultas/recibeconsulta',
					data : {
						data : data
					},
					dataType : 'json'
				})
				.done(function(data, textStatus, jqXHR) {
					let tmp = 0;
				});
	}
}