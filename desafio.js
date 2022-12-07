const fs = require("fs");
//const { randomUUID } = require("crypto");

class Archivo{
    constructor(data) {
        this.filepath = data
    }

    async leer () {

        try {
            const peliculas = await fs.promises.readFile(this.filepath, 'utf-8')
            return JSON.parse(peliculas);
        } catch (err) {
            return [];
        }
  
    }

    async borrar () {
        await fs.promises.unlink(this.filepath);
    }
    
 
    async guardar (titulo, precio, thumbnail) {
        try {
            const peliculas = await this.leer()
            const nuevaPelicula = {
                titulo,
                precio,
                thumbnail,
                id: peliculas.length + 1,
            };
            peliculas.push(nuevaPelicula);
            await fs.promises.writeFile(this.filepath, JSON.stringify(peliculas, null, 2));
            return `Se ha agregado pelicula ${titulo}`;
        } catch (err) {
            console.log('error'. err);
        }

    }

    async getById(id) {
        id = Number(id);
        try {
        
        const peliculasGuardados = await fs.promises.readFile(this.filepath,"utf-8")
        const arrayDePeliculas = JSON.parse(peliculasGuardados);
        //let peliFound =
        return  arrayDePeliculas.find((peli) =>
                peli.id === id) //? peli : undefined
        
        // );
         //await fs.promises.writeFile(this.filepath, JSON.stringify(peliFound))
        
        //console.log(peliFound);
        } catch (error) {
        
        console.log(error);
            }
        
        }

        async deleteById(id) {
            //await fs.promises.unlink(this.filepath)
            try{
            id = Number(id)
              let peliculasCompletas = await fs.promises.readFile(this.filepath, "utf-8")
              let peliculaConId = JSON.parse(peliculasCompletas);
            
              let peliculaSinId = peliculaConId.filter(nuevaPelicula => nuevaPelicula.id != id  ) //-1
              await fs.promises.writeFile(this.filepath, JSON.stringify(peliculaSinId))
              //console.log(peliculaSinId)  
                   
            } catch (error) {
            
            console.log(error, "no funciona ");
            
            }
            
            }

            async updateById(id, nuevaPeli) {
                try {
                  id = Number(id);
                  const peliculasCompletas = await fs.promises.readFile(this.filepath,"utf-8");
                  const peliculasConId = JSON.parse(peliculasCompletas);
                  const peliculaActualizar = peliculasConId.find(
                    (peli) => peli.id === id
                  );
                  if (peliculaActualizar) {
                    const index = peliculasConId.indexOf(peliculaActualizar);
                    const {titulo, precio, thumbnail} = nuevaPeli;
            
                    peliculasConId[index]['titulo'] = titulo;
                    peliculasConId[index]['precio'] = precio;
                    peliculasConId[index]['thumbnail'] = thumbnail;
                    await fs.promises.writeFile(this.filepath, JSON.stringify(peliculasConId));
                    return true;
                  } else {
                    console.log(`ID ${id} no existe`);
                    return null;
                  }
            
                } catch (error) {
                  `Error: ${error.code} | No reconoce (${id})`
                }
              }
    
}


 const main = async () => {
     const manejadorDeArchivos = new Archivo();
   console.log("Leer: ", await manejadorDeArchivos.leer());
  // console.log(await manejadorDeArchivos.guardar("Argentina 1985", 100, "immagen.png"));
  // console.log(await manejadorDeArchivos.guardar("Titanic", 200, "imagen.png"));
  // console.log(await manejadorDeArchivos.guardar("Documental Mundial", 300, "poster.png"));
  // console.log("Leer: ", await manejadorDeArchivos.leer());
  // console.log( await manejadorDeArchivos.getById(2));
  //  console.log( await manejadorDeArchivos.deleteById(2));
  //  console.log("Leer: ", await manejadorDeArchivos.leer())
  //  console.log( await manejadorDeArchivos.deleteById(1));
  //  console.log("Leer: ", await manejadorDeArchivos.leer())

//     setTimeout( async () => {
//         await manejadorDeArchivos.borrar();
//     }, 5000);
    
//     console.log("Leer: ", await manejadorDeArchivos.leer());
}

//main();

module.exports = {Archivo}

// const fs = require("fs");

// const creandoArchivo = async (fileName) => {
//     try {
//        //Creo un nuevo archivo 
//       await fs.promises.writeFile(fileName, "[]");
//     } catch (error) {
//       throw error;
//     }
//   };

//   const existeArchivo = async (fileName) => {
//     //Chequeo que el archivo exista, si no existe creo uno nuevo
//     const stats = fs.existsSync(fileName);
  
//     if (stats == false) {
//       console.log(`Creacion del archivo: ${fileName}`);
//       await creandoArchivo(fileName);
//     }
//   };

  
// class Contenedor{

//     constructor(fileName){
//         this.fileName= fileName
//     }

//     //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
//    async save(objeto){
//     try{
//         await existeArchivo(this.fileName)
    
//         const contenido = JSON.parse(await fs.promises.readFile(this.fileName))
//         let longitud = contenido.length;
//         let index = 0
        
//             if (longitud == 0) {
//                 index = 1;
//               } else {
//                 //sumo uno al id del ultimo elemento y lo agrego al id del objeto
//                 index = contenido[longitud - 1].id + 1;
//               }
            
//             objeto.id = index
//             contenido.push(objeto)
//             await fs.promises.writeFile(this.fileName, JSON.stringify(contenido));
//             return objeto.id

//     }catch(error){
//         throw error
//     }  
//    }

//    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
//     async getById(id){
//        try{
//         const contenido = await fs.promises.readFile(this.fileName)
//         const objeto = JSON.parse(contenido)

//         let objetoId = objeto.find((x) => x.id == id) || null;
        
//         return objetoId;
        
//        }catch(error){
//             throw error
//        }
//    }

//    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
//    async getAll(){
//     try{
//         await existeArchivo(this.fileName)

//         const contenidoCrudo = await fs.promises.readFile(this.fileName)
//         const contenido = JSON.parse(contenidoCrudo)
//         return contenido;
//     }catch(error){
//         console.log("Error en getAll: ", error)
//         return [];
//     }
//    }

//    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
//    async deleteById(id){
//        try{
//         const contenido = await fs.promises.readFile(this.fileName)
//         const contenidoParseado = JSON.parse(contenido)
        
//         let arrayFiltrado = contenidoParseado.filter((x) => x.id !== id)
    
//         await fs.promises.writeFile(this.fileName, JSON.stringify(arrayFiltrado))
    
//        }catch(error){
//         throw error
//        }
//    }
//     // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
//    async deleteAll(){
//        await creandoArchivo(this.fileName)
//    }
// }

// const ejecutarProductos = async () => {
//     const productos = new Contenedor("productos.txt")
//     // console.log('CREO MIS OBJETOS CON SUS ID CORRESPONDIENTES: ')
//     // console.log(await productos.save({title: "Computadora", price: 112000, thumbnail: "/ruta-random"}))
//     // console.log(await productos.save({title: "Carpeta", price: 1200, thumbnail: "/ruta-random"}))
//     // console.log(await productos.save({title: "Lapicera", price: 60, thumbnail: "/ruta-random"}))
//     // console.log(await productos.save({title: "Silla", price: 35000, thumbnail: "/ruta-random"}))

//     // console.log("TRAIGO TODOS MIS OBJETOS-PRODUCTOS:")
//     // const contenido = await productos.getAll()
//     // console.log(contenido)

//     // console.log("DEVUELVO UN PRODUCTO CON EL ID 3:")
//     // const mostrarid = await productos.getById(3)
//     // console.log(mostrarid)

//     // // console.log("VOY A ELIMINAR UN OBJETO CON EL ID 2")
//     // // await productos.deleteById(2)

//     // console.log("DEVUELVO MI ARRAY DE OBJETOS SIN EL PRODUCTO ELIMINADO:")
//     // console.log(await productos.getAll())
    
//     // console.log("VACIO EL ARCHIVO")
//     // await productos.deleteAll()
// }

// // ejecutarProductos()

// module.exports= Contenedor

