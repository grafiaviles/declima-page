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
		$('#formConsulta').addClass('d-none');
		$('#exitoConsulta').removeClass('d-none');
		$('#gifCargaConsulta').removeClass('d-none');
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
					$('#gifCargaConsulta').addClass('d-none');
					$('#mensExitoConsulta').removeClass('d-none');
					setTimeout(() =>{
						$("#formConsulta").get(0).reset();
						$('.modal').modal('hide');
						$('#mensExitoConsulta').addClass('d-none');
						$('#mensErrorConsulta').addClass('d-none');
						$('#exitoConsulta').addClass('d-none');
						$('#formConsulta').removeClass('d-none');
					}, 5000)
					let tmp = 0;
				})
				.fail(function(){
					$('#gifCargaConsulta').addClass('d-none');
					$('#mensErrorConsulta').removeClass('d-none');
					$('#mensExitoConsulta').addClass('d-none');
					setTimeout(() =>{
						$("#formConsulta").get(0).reset();
						$('.modal').modal('hide');
						$('#mensExitoConsulta').addClass('d-none');
						$('#mensErrorConsulta').addClass('d-none');
						$('#exitoConsulta').addClass('d-none');
						$('#formConsulta').removeClass('d-none');
					}, 5000)
				});
	}
}