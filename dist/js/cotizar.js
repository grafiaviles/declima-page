/**
 * 
 */
$(document).ready(function(){
	$('#botonEnviar').addClass('d-none');
	$('#campoDireccion').height(0);
	$("#continuarpaso3").click(function(){
		$('#botonSiguiente').removeClass('d-none');
	});
	$('.titulosStep').click(function(){
		tmp = parseInt($(this).attr('flag'));
		if(parseInt($(this).attr('flag')))
			$('#botonSiguiente').addClass('d-none');
	});
	$('.radios').click(function(){
		if(!parseInt($(this).attr('pasos-req')))
		{
			$('#seleccionaProd').addClass('d-none');
			$('#seleccionaCap').addClass('d-none');
			$('#seleccionaProd').height(0);
			$('#seleccionaCap').height(0);
			$('#seleccionaCap').addClass('d-none');
			$('#seleccionaProd').removeClass('step');
			$('#seleccionaCap').removeClass('step');
			$('#botonSiguiente').removeClass('d-none');
		}
		else
		{
			$('#seleccionaProd').removeAttr('style');
			$('#seleccionaCap').removeAttr('style');
			$('#seleccionaProd').removeClass('d-none');
			$('#seleccionaCap').removeClass('d-none');
			$('#seleccionaProd').addClass('step');
			$('#seleccionaCap').addClass('step');
			$('#botonSiguiente').addClass('d-none');
		}
	});
	
	$('#botonSiguiente').click(function(){
		$('#personaTag').removeClass('d-none');
		$('#empresaTag').removeClass('d-none');
		$('#personaTag').children().addClass('active');
		$('#empresaTag').children().removeClass('active');
		$('.stepContent').removeClass('active');
		$('.personaContent').addClass('active');
		$('.empresaContent').removeClass('active');
		$('#stepTagText').addClass('d-none');
		$('#stepTagArrow').removeClass('d-none');
		$('#stepTagText').children().removeClass('active');
		$('#stepTagArrow').children().removeClass('active');
		$('#botonSiguiente').addClass('d-none');
		$('#botonEnviar').removeClass('d-none');
	});
	
	$('#stepTagArrow').click(function(){
		$('#personaTag').addClass('d-none');
		$('#empresaTag').addClass('d-none');
		$('#stepTagText').removeClass('d-none');
		$('#stepTagArrow').addClass('d-none');
		$('#botonSiguiente').removeClass('d-none');
		$('#botonEnviar').addClass('d-none');
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
			$('#campoDireccion').removeClass('d-none');
		}
		else
		{
			$('#campoDireccion').addClass('d-none');
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
	$('#personaTag').removeClass('d-none');
	$('#empresaTag').removeClass('d-none');
	$('.stepContent').removeClass('active');
	$('.stepContent').removeClass('show');
	$('.empresaContent').removeClass('active');
	$('.personaContent').removeClass('active');
	$('.personaContent').addClass('active');
	$('.personaContent').addClass('show');
	$('#botonEnviar').removeClass('d-none');
	$('.stepper').nextStep();
}
