/**
 * 
 */
$(document).ready(function(){
	$('#botonEnviar').addClass('invisible');
	$('.radios').click(function(){
		if(!parseInt($(this).attr('pasos-req')))
		{
			$('#seleccionaProd').addClass('invisible');
			$('#seleccionaCap').addClass('invisible');
			$('#seleccionaProd').height(0);
			$('#seleccionaCap').height(0);
			$('#seleccionaCap').addClass('invisible');
			$('#seleccionaProd').removeClass('step');
			$('#seleccionaCap').removeClass('step');
		}
		else
		{
			$('#seleccionaProd').removeAttr('style');
			$('#seleccionaCap').removeAttr('style');
			$('#seleccionaProd').removeClass('invisible');
			$('#seleccionaCap').removeClass('invisible');
			$('#seleccionaProd').addClass('step');
			$('#seleccionaCap').addClass('step');
		}
	});
	$('#botonSiguiente').click(function(){
		$('#personaTag').removeClass('invisible');
		$('#empresaTag').removeClass('invisible');
		$('.stepContent').removeClass('active');
		$('.personaContent').addClass('active');
		$('.empresaContent').removeClass('active');
	});
	
	$('#botonEnviar').click(function(){
		$.ajax({
			method: 'POST',
			url: 'http://declimaback.cl/index.php?r=cotizacion%2Fsetcotizacion',
			data: {id: 1, _csrf: $('#token').val(), },
			dataType: 'json'
		})
		.done(function(json) {
			var tmp = '';
		});
	});
});

verificaPasos = function(){
	$('#personaTag').removeClass('invisible');
	$('#empresaTag').removeClass('invisible');
	$('.stepContent').removeClass('active');
	$('.stepContent').removeClass('show');
	$('.empresaContent').removeClass('active');
	$('.personaContent').removeClass('active');
	$('.personaContent').addClass('active');
	$('.personaContent').addClass('show');
	$('#botonEnviar').removeClass('invisible');
	$('.stepper').nextStep();
}
