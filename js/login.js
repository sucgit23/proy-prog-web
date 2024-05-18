$(function(){
    $("#ingresar").validate({
        rules:{
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
});

var contraseña=document.getElementById("clave");
var view=document.getElementById("view");
view.addEventListener("click", function(){
    if(contraseña.type=="password"){
        contraseña.type= "text"
        contraseña.style.opacity=0.8
    }else{
        contraseña.type="password"
    }
})