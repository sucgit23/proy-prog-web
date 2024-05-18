$(function(){
    $("#ingresar").validate({
        rules:{
            nombre: {
                required: true,
                minlength: 5,
                lettersonly: true

            },
            correo: {
                required: true,
                email: true
            },
            clave: {
                required: true,
                minlength: 8
            }
        },
        messages:{
            nombre: {
                required: "<p id='mensajeNombre'>Debe ingresar un nombre valido</p>",
                minlength: "<p id='mensajeNombre'>El nombre debe tener al menos 5 caracteres</p>",
                lettersonly: "<p id='mensajeNombre'>El nombre no debe contener números ni caracteres especiales</p>"
            },
            correo: {
                required: "<p id='mensajeCorreo'>Por favor ingrese su correo</p>",
                email: "<p id='mensajeCorreo'>Debe ingresar un correo valido</p>"
            },
            clave: {
                required: "<p class='mensajeClave'>Por favor ingrese su contraseña</p>",
                minlength: "<p class='mensajeClave'>Debe ingresar minimo 8 caracteres</p>"
            }
        },
        onfocusout: function(element) {
            this.element(element); // Realiza la validación solo cuando se pierde el foco
        }
    });
    $.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
    }, "Por favor ingrese solo letras");
});