

function menu(){
    let verdadero=true;
    let iniciado=false;
    while(verdadero){
        console.log("Bienvenido!");
        console.log("---------------- Menú -----------------");
        console.log("1.Iniciar sesión");
        console.log("2.Registrarsse");
        let op=parseInt(prompt("Ingrese una opción"));
        switch (op){
            case 1:{
                iniciado=iniciarSesion();
                verdadero=false;
                break;
            }
            case 2:{
                iniciado=registrarse();              
                verdadero=false;
                break;
            }
            default:{
                console.log("Error");
                break;
            }
        }
        
    }
    if (iniciado){
        mostrarPublicaciones();
    }
}

function iniciarSesion(){
    let usuario=prompt("Ingrese usuario");
    let contraseña = prompt("Ingrese contraseña");
    if(contraseña== null || usuario == null){
        alert("Debe ingresar usuario y contraseña");
        return false;
    }else{
        console.log("Bienvenido "+ usuario);
        return true;
    }
}

function registrarse(){
    let usuario=prompt("Ingrese usuario");
    let contraseña = prompt("Ingrese contraseña");
    let nombre = prompt("Ingrese su nombre");
    let edad= parseInt(prompt("Ingrese su edad"));
    if (edad >= 18){
        console.log("Usuario registrado con exito");
        console.log("Bienvenido" + usuario);
        return true;
    }else{
        alert("Los menores de 18 años no pueden registrarse");
        return false;;
    }


}

function mostrarPublicaciones(){
    for (let i=1;i<20; i++ ){
        console.log("Publicación " + i);
    }
}

menu();