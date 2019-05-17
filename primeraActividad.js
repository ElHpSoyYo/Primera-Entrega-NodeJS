const fs = require("fs");
const cursos =
{
    curso1:
    {
        nombre: "Programacion y Logica",
        id: 0,
        duracion: 48,
        precio: 20
    },
    curso2:
    {
        nombre: "Analisis y diseño de algoritmos",
        id: 1,
        duracion: 60,
        precio: 50 
    },
    curso3:
    {
        nombre: "Seducción en ambientes no controlados",
        id:2,
        duracion: 100,
        precio: 70
    }
}
const opciones = 
{
    nombre:
    {
        demand:true,
        alias: "n"
    },
    cedula:
    {
        demand:true,
        alias: "c"
    },
    id:
    {
        demand:true,
        alias: "i"
    }
}

function hallarCurso(id)
{
    if(id > 2  || id <0)
    {
        return -1
    }
    for(const curso in cursos)
    {
        if(id == cursos[curso].id){
            return cursos[curso]
        }
    }
}

const argv= require('yargs')
          .usage("\nPara ver los cursos escriba principal y para inscribire escriba inscribir")
          .help()
          .command("principal","muestra todos los cursos dipsonibles",
          function()
          {
              i=0
              for(const curso in cursos)
              {
                setTimeout(function imprimirCursos ()
                {
                    nombre = cursos[curso].nombre
                    tiempo = cursos[curso].duracion
                    valor = cursos[curso].precio
                    id = cursos[curso].id
                    console.log(`El curso se llama ${nombre}, el id es ${id}, tiene una duracion de ${tiempo} horas y un valor de ${valor} dolares`)
                    
                },2000 * i)
                i ++ 
              }
          })
          .command("inscribir", "te inscribe en un curso disponible", opciones,
          function(argv){
              nombre=argv.n
              cedula = argv.c
              id = argv.i
              curso = hallarCurso(parseInt(id))
              if ( curso == -1 ){
                  console.log('Ha ingresa un Id que no corresponde a ningun curso de nuestra Base de Datos')
                  for (const curso in cursos)
                  {
                    nombre = cursos[curso].nombre
                    tiempo = cursos[curso].duracion
                    valor = cursos[curso].precio
                    id = cursos[curso].id
                    console.log(`El curso se llama ${nombre}, el id es ${id}, tiene una duracion de ${tiempo} horas y un valor de ${valor} dolares`)
                      
                  }
              }
              else
              {
                texto = `El estudiante: ${nombre} \nCon cedula: ${cedula}\n Se ha matriculado en ${curso.nombre}, ${curso.nombre} tiene una duracion ${curso.duracion} horas y un valor de ${curso.precio}`
                fs.writeFile("matricula.txt",texto, (err) => {
                    if (err) throw (err);
                    console.log('se hacreado el archivo')
                });
                 
              }   
              
          }
          )
          .argv
