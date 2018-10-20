/**
 * 
 */
$(document).ready(function(){
	$('#botonEnviar').addClass('invisible');
	$('#campoDireccion').height(0);
	$("#continuarpaso3").click(function(){
		$('#botonSiguiente').removeClass('invisible');
	});
	$('.titulosStep').click(function(){
		tmp = parseInt($(this).attr('flag'));
		if(parseInt($(this).attr('flag')))
			$('#botonSiguiente').addClass('invisible');
	});
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
			$('#botonSiguiente').removeClass('invisible');
		}
		else
		{
			$('#seleccionaProd').removeAttr('style');
			$('#seleccionaCap').removeAttr('style');
			$('#seleccionaProd').removeClass('invisible');
			$('#seleccionaCap').removeClass('invisible');
			$('#seleccionaProd').addClass('step');
			$('#seleccionaCap').addClass('step');
			$('#botonSiguiente').addClass('invisible');
		}
	});
	
	$('#botonSiguiente').click(function(){
		$('#personaTag').removeClass('invisible');
		$('#empresaTag').removeClass('invisible');
		$('#personaTag').children().addClass('active');
		$('#empresaTag').children().removeClass('active');
		$('.stepContent').removeClass('active');
		$('.personaContent').addClass('active');
		$('.empresaContent').removeClass('active');
		$('#stepTagText').addClass('d-none');
		$('#stepTagArrow').removeClass('d-none');
		$('#stepTagText').children().removeClass('active');
		$('#stepTagArrow').children().removeClass('active');
		$('#botonSiguiente').addClass('invisible');
		$('#botonEnviar').removeClass('invisible');
	});
	
	$('#stepTagArrow').click(function(){
		$('#personaTag').addClass('invisible');
		$('#empresaTag').addClass('invisible');
		$('#stepTagText').removeClass('d-none');
		$('#stepTagArrow').addClass('d-none');
		$('#botonSiguiente').removeClass('invisible');
		$('#botonEnviar').addClass('invisible');
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
	$('.radioInstalacion').click(function(){
		if(this.id == 'conInstalacion')
		{
			$('#campoDireccion').removeAttr('style');
			$('#campoDireccion').removeClass('invisible');
		}
		else
		{
			$('#campoDireccion').addClass('invisible');
			$('#campoDireccion').height(0);
		}
	});
	
	$('.restar').click(function(){
		let valor = $(this).next().children().text();
		if(parseInt(valor) > 0)
		{
			valor = parseInt(valor) - 1;
			$(this).next().children().text(valor);
			$('#cant-btu-' + $(this).attr('dimen')).val(valor);
		}
		if(parseInt(valor) - 1 <= 0)
		{
			$(this).next().children().text(1);
			$('#cant-btu-' + $(this).attr('dimen')).val(1);
		}
	});
	$('.sumar').click(function(){
		let valor = $(this).prev().children().text();
		if(parseInt(valor) < 20)
		{
			valor = parseInt(valor) + 1;
			$(this).prev().children().text(valor);
			$('#cant-btu-' + $(this).attr('dimen')).val(valor);
		}
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
