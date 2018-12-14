$(document).ready(function(){
	$("#enviarReclamo").click(function() {
		reclamos($('#formReclamo')[0]);
	});
	$("#reclamos-checkbox").click(function(e) {
		if(this.checked)
		{
			$('#enviarReclamo').removeClass('disabled');
		}
	});
});
reclamos = function(e){
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
		$('#formReclamo').addClass('d-none');
		$('#exitoReclamo').removeClass('d-none');
		$('#gifCargaReclamo').removeClass('d-none');
		$.ajax(
				{
					method : 'POST',
					url : 'http://declimamanager.declima.cl/reclamos/recibereclamo',
					data : {
						data : data
					},
					dataType : 'json'
				})
				.done(function(data, textStatus, jqXHR) {
					$('#gifCargaReclamo').addClass('d-none');
					$('#mensExitoReclamo').removeClass('d-none');
					setTimeout(() =>{
						$('.modal').modal('hide');
						$('#mensExitoReclamo').addClass('d-none');
						$('#mensErrorReclamo').addClass('d-none');
						$('#exitoReclamo').addClass('d-none');
						$('#formReclamo').removeClass('d-none');
					}, 5000)
					let tmp = 0;
				})
				.fail(function(){
					$('#gifCargaReclamo').addClass('d-none');
					$('#mensErrorReclamo').removeClass('d-none');
					$('#mensExitoReclamo').addClass('d-none');
					setTimeout(() =>{
						$('.modal').modal('hide');
						$('#mensExitoReclamo').addClass('d-none');
						$('#mensErrorReclamo').addClass('d-none');
						$('#exitoReclamo').addClass('d-none');
						$('#formReclamo').removeClass('d-none');
					}, 5000)
				});;
	}
}