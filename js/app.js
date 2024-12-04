
    const solicitud = async (url)=>{
        const respuesta = await fetch(url);
        return await respuesta.json();
    }

    const ciudades = async () => solicitud("http://127.0.0.1:3000/ciudades");
    const usuarios = async (ciudId) => solicitud (`http://127.0.0.1:3000/usuarios?cityId=${ciudId}`);

    const usuariosyCiudades = async() => {

        const ciudad = await ciudades();

        const respuesta = await Promise.all(
            ciudad.map(async (ciud) =>{
                const users = await usuarios(ciud.id);
                return {ciudad: ciud.name, usuarios: users};
        })
        );
        console.log(respuesta);
    } 
    usuariosyCiudades();

        const profile = async () => solicitud("http://127.0.0.1:3000/usuarios");
        const materiaUsuario = async (user) => solicitud (`http://127.0.0.1:3000/materia_usuario?userId=${user}`);
        const materias = async (subjectId) => solicitud(`http://127.0.0.1:3000/materias?id=${subjectId}`);
    
    const materiasUsuarios = async() => {

        const users = await profile();
        // console.log(users);
        const respuesta  = await Promise.all(
        users.map(async (user) => {
            const materia = await materiaUsuario(user.id);
            
            materia.map(async(mat) =>{
                const nombreMateria = await materias(mat.subjectId);
                return {materia: materia ,nombreMateria: nombreMateria.name}
            });
               return {nombre: user.name, materia: materia}
            
            // const materiaxUsuario = materia.filter(materia => materia.userId == user.id);
            // return {...materiaxUsuario};            
        })
    );
        
        // const materiaUser = await materiaUsuario();
        // console.log(materiaUser);
        


        
        // const materia = await materias();
        // materia.map(async (mate)=>{
        //     const materiaUser = await materiaUsuario(mate.id);
        //     return materiaUser;
        // })

        // return console.log(materia);
        console.log(respuesta);
        
    }
    
    materiasUsuarios();

//un com

