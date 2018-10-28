/**
 * 
 */
var recaptchaResponse = false;
$(document).ready(function() {
    $("#continuarpaso3").click(function() {
        $('#botonSiguiente').removeClass('disabled');
    });
    $('.scroll-fin').click(function() {
        $('.modal-c-tabs').animate({
            scrollTop: $('#botonSiguiente').offset().top
        }, 1000);
    });
    $('.titulosStep').click(function() {
        tmp = parseInt($(this).attr('flag'));
        if (parseInt($(this).attr('flag')))
            $('#botonSiguiente').addClass('disabled');
    });
    $('.radios').click(function() {
        if (!parseInt($(this).attr('pasos-req'))) {
            $('#seleccionaProd').addClass('d-none');
            $('#seleccionaCap').addClass('d-none');
            //$('#seleccionaProd').height(0);
            //$('#seleccionaCap').height(0);
            $('#seleccionaCap').addClass('d-none');
            $('#seleccionaProd').removeClass('step');
            $('#seleccionaCap').removeClass('step');
            $('#botonSiguiente').removeClass('disabled');
        } else {
            $('#seleccionaProd').removeAttr('style');
            $('#seleccionaCap').removeAttr('style');
            $('#seleccionaProd').removeClass('d-none');
            $('#seleccionaCap').removeClass('d-none');
            $('#seleccionaProd').addClass('step');
            $('#seleccionaCap').addClass('step');
            $('#botonSiguiente').addClass('disabled');
        }
    });

    $('#botonSiguiente').click(function() {
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

    $('#stepTagArrow').click(function() {
        $('#personaTag').addClass('d-none');
        $('#empresaTag').addClass('d-none');
        $('#stepTagText').removeClass('d-none');
        $('#stepTagArrow').addClass('d-none');
        $('#botonSiguiente').removeClass('d-none');
        $('#botonEnviar').addClass('d-none');
    });

    $('.radioInstalacion').click(function() {
        if (this.id == 'conInstalacion') {
            $('#campoDireccion').removeAttr('style');
            $('#campoDireccion').removeClass('d-none');
            $('#direccionInstalacion').attr('required', 'true');
            //$('.stepper').mdbStepper();
        } else {
            $('#campoDireccion').addClass('d-none');
            $('#campoDireccion').height(0);
            $('#direccionInstalacion').removeAttr('required');
        }
    });

    $('.restar').click(function() {
        let valor = $(this).next().children().text();
        if (parseInt(valor) > 0) {
            valor = parseInt(valor) - 1;
            $(this).next().children().text(valor);
            $('#cant-btu-' + $(this).attr('dimen')).val(valor);
        }
        if (parseInt(valor) - 1 <= 0) {
            $(this).next().children().text(1);
            $('#cant-btu-' + $(this).attr('dimen')).val(1);
        }
    });
    $('.sumar').click(function() {
        let valor = $(this).prev().children().text();
        if (parseInt(valor) < 20) {
            valor = parseInt(valor) + 1;
            $(this).prev().children().text(valor);
            $('#cant-btu-' + $(this).attr('dimen')).val(valor);
        }
    });

    $('.tipoProducto').click(function() {
        let capAsoc = $(this).attr('lista').split('|');
        $.each($('.contentCapacidad'), function(k, v) {
            $(v).addClass('d-none');
        });
        $.each($('.contentCapacidad'), function(k, v) {
            let cap = v;
            let flag = false;
            $.each(capAsoc, function(a, e) {
                if (e == $(cap).attr('cap')) {
                    flag = true;;
                }
            });
            if (flag)
                $(cap).removeClass('d-none');
            else
                $(cap).addClass('d-none');
        });
    });
});

verificaPasos = function() {
    $('#personaTag').removeClass('d-none');
    $('#empresaTag').removeClass('d-none');
    $('.stepContent').removeClass('active');
    $('.stepContent').removeClass('show');
    $('.empresaContent').removeClass('active');
    $('.personaContent').removeClass('active');
    $('.personaContent').addClass('active');
    $('.personaContent').addClass('show');
    //$('#botonEnviar').removeClass('d-none');
    $('.stepper').nextStep();
}

enviaCotizacion = function(e) {
    var result = e.checkValidity();
    if (e.checkValidity() === false) {
        //e.preventDefault();
        //e.stopPropagation();
        e.classList.add('was-validated');
    } else {
        e.classList.add('was-validated');
        //e.preventDefault();
        let data = new Array();
        $.each($('.tipoServicio'), function(k, v) {
            if (v.checked) {
                let tipoServ = new Object();
                tipoServ.name = 'Servicio';
                tipoServ.value = v.value;
                data.push(tipoServ);
            }
        });
        $.each($('.tipoProducto'), function(k, v) {
            if (v.checked) {
                let tipoProd = new Object();
                tipoProd.name = 'Producto'
                tipoProd.value = v.value;
                data.push(tipoProd);
            }
        });
        $.each($('.tipoCapacidad'), function(k, v) {
            if (v.checked) {
                let tipoCap = new Object();
                tipoCap.name = 'Capacidad';
                tipoCap.value = v.value;
                tipoCap.cantidad = $('.cant-cap-' + v.id).text();
                data.push(tipoCap);
            }
        });
        $.each($('.radioInstalacion'), function(k, v) {
            if (v.checked && v.id == 'conInstalacion') {
                let radioInst = new Object();
                radioInst.name = 'instalacion';
                radioInst.value = 1;
                data.push(radioInst);
            }
        });
        var jsonData = JSON.parse(JSON.stringify(data));
        $.ajax({
                method: 'POST',
                url: 'http://declimamanager.declima.cl/insertacotizacion/setcotizacion',
                data: { id: 1, data: data, recaptcha: recaptchaResponse},
                dataType: 'json'
            })
            .done(function(json) {
                var tmp = '';
            });
    }
}

enviarForm = function(recaptcha){
    recaptchaResponse = recaptcha;
    $('#botonEnviar').removeClass('disabled');
    $('#botonEnviar').click(function(){
        if($('#pestanaEmpresa').hasClass('active'))
        {
            enviaCotizacion($('#formEmpresa')[0]);
        }
        if($('#pestanaPersona').hasClass('active'))
        {
            enviaCotizacion($('#formPersona')[0]);
        }
    });
}