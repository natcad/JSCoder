

function menu(){
    //simulación de un menu donde se pueda iniciar y registrar 
    //también simula mostrar publicaciones luego de iniciar sesion  
    let continuar=true;
    let iniciado=false;
    while(continuar){
        //MENU
        console.log("Bienvenido!");
        console.log("---------------- Menú -----------------");
        console.log("1.Iniciar sesión");
        console.log("2.Registrarsse");
        let op=parseInt(prompt("Ingrese una opción"));
        switch (op){
            case 1:{
                //el usuario elige iniciar sesion
                iniciado=iniciarSesion();           //retorna bool si completa el inicio
                if (iniciado){
                //sale del while del menu
                continuar=false;
                }else {
                    //no inicio sesion
                    console.log("el inicio de sesion no fue exitoso");
                }
                break;
            }
            case 2:{
                //el usuario elige registrarse
                iniciado=registrarse();             //retorna bool si completa el registro 
                if(iniciado){
                    //sale del while del menu
                    continuar=false;
                }else {
                    //no se registro
                    console.log("el registro no fue exitoso");
                }
                break;
            }
            default:{
                //usuario no eligio una opcion valida
                console.log("Error");
                break;
            }
        }
        
    }
    if (iniciado){
        // si se inicio sesion o se registro muestra publicaciones
        mostrarPublicaciones();
    }
}

function iniciarSesion(){
    //pide datos de inicio de sesion
    let usuario=prompt("Ingrese usuario");
    let contraseña = prompt("Ingrese contraseña");
    if(contraseña== null || usuario == null){
        //si no ingresa nada retorna falso
        alert("Debe ingresar usuario y contraseña");
        return false;
    }else{
        //inicio exitoso
        console.log("Bienvenido "+ usuario);
        return true;
    }
}

function registrarse(){
    //pide datos del registro
    let usuario=prompt("Ingrese usuario");
    let contraseña = prompt("Ingrese contraseña");
    let nombre = prompt("Ingrese su nombre");
    let edad= parseInt(prompt("Ingrese su edad"));
    if (edad >= 18){
        //comprueba edad si cumple requisito retorna true, se ha registrado.
        console.log("Usuario registrado con exito");
        console.log("Bienvenido" + usuario);
        return true;
    }else{
        //comprueba edad si no cumple requisito retorna false,no se ha registrado.
        alert("Los menores de 18 años no pueden registrarse");
        return false;;
    }


}

function mostrarPublicaciones(){
    //muestra publicaciones hasta 10
    for (let i=1;i<10; i++ ){
        console.log("Publicación " + i);
    }
}

menu();