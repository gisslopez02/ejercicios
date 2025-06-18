 // 1. Importar readline (¡muy importante!)

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 1. ARRAY INICIAL DE ESTUDIANTES
let estudiantes = [
  { nombre: "Carla", calificaciones: [85, 90, 78, 92] },
  { nombre: "Zabeth", calificaciones: [70, 65, 80, 75] },
  { nombre: "Andres", calificaciones: [95, 88, 92, 98] }
];

//2. FUNCIONES REQUERIDAS

// mostrar estudiantes 
console.log("Lista de estudiantes con sus respectivas calificaciones:");
estudiantes.forEach(estudiante => {
  console.log("Nombre:", estudiante.nombre);
  console.log("Calificaciones:", estudiante.calificaciones.join(", "));
});

//calcular promedio(calificaciones)
function calcularPromedio(calificaciones) {
  let suma = calificaciones.reduce((total, nota) => {
    return total + nota;
  }, 0);

  let promedio = suma / calificaciones.length;
  return parseFloat(promedio.toFixed(2));
}
// Mostrar nombre y promedio de cada estudiante
console.log("Promedio de cada estudiante:");
estudiantes.forEach(function(estudiante){
  let promedio = calcularPromedio(estudiante.calificaciones);
  console.log("Nombre:", estudiante.nombre);
  console.log("Promedio:", promedio);
  console.log("-----------------------------");
});

//obtener Mejor calificacion (calificaciones)
function obtenerMejorCalificacion(calificaciones) {
  return Math.max(...calificaciones);
}
// Mostrar la mejor calificación de cada estudiante
console.log("Mejor calificación de cada estudiante:");
estudiantes.forEach(estudiante => {
  let mejorNota = obtenerMejorCalificacion(estudiante.calificaciones);
  console.log("Nombre:", estudiante.nombre);
  console.log("Mejor calificación:", mejorNota);
  console.log("-----------------------------");
});

// Obtener peor calificación
function obtenerPeorCalificacion(calificaciones) {
  return Math.min(...calificaciones);
}

// Mostrar peor calificación de cada estudiante
console.log("Peor calificación de cada estudiante:");
estudiantes.forEach(estudiante => {
  let peorNota = obtenerPeorCalificacion(estudiante.calificaciones);
  console.log("Nombre:", estudiante.nombre);
  console.log("Peor calificación:", peorNota);
  console.log("-----------------------------");
});

//AGREGAR CALIFICACION
function agregarCalificacion(nombreEstudiante, nuevaCalificacion) {  // Función para agregar una calificación
  let estudiante = estudiantes.find(est => est.nombre === nombreEstudiante); // Buscar el estudiante por su nombre
  if (estudiante) {  // Si lo encuentra, le agrega la nueva calificación
    estudiante.calificaciones.push(nuevaCalificacion);
    console.log(`Se agregó la calificación ${nuevaCalificacion} a ${nombreEstudiante}.`);
  } else {
    console.log(`Estudiante "${nombreEstudiante}" no encontrado.`);
  }
 /* // prueba 
agregarCalificacion("Carla", 95);
agregarCalificacion("Juan", 88); // Este no existe*/

}
//prueba del funcionamiento
agregarCalificacion("Carla", 100); // Llama automáticamente para probar la función
console.log("Calificaciones actualizadas:"); // muestra el arreglo actualizado
console.log(estudiantes);
console.log("-----------------------------");

//ELIMINAR ULTIMA CALIFICACION 
function eliminarUltimaCalificacion(nombreEstudiante) {   // Función para eliminar la última calificación
  let estudiante = estudiantes.find(est => est.nombre === nombreEstudiante);  // Busca el estudiante por su nombre
  if (estudiante) {  // Verifica si el estudiante existe
    if (estudiante.calificaciones.length > 0) { // Verificar si tiene calificaciones
      let eliminada = estudiante.calificaciones.pop();
      console.log(`Se eliminó la calificación ${eliminada} de ${nombreEstudiante}.`);
    } else {
      console.log(`${nombreEstudiante} no tiene calificaciones para eliminar.`);
    }
  } else {
    console.log(`Estudiante "${nombreEstudiante}" no encontrado.`);
    console.log("-----------------------------");
  }
}

// FUNCION PARA FILTAR APROBADOS
function filtrarEstudiantesAprobados(promedioMinimo) {
  return estudiantes.filter(est => calcularPromedio(est.calificaciones) >= promedioMinimo);
}

// PRUEBA RÁPIDA
console.log("Estudiantes aprobados (promedio mayor o igual a 80):");
filtrarEstudiantesAprobados(80).forEach(est => {
  console.log(est.nombre);
  console.log("-----------------------------");
});

//ORDENAR ESTUDIANTES POR NOMBRE ALFABETICO
function ordenarEstudiantesPorNombre() {
  estudiantes.sort((a, b) => a.nombre.localeCompare(b.nombre));
  
  console.log("Lista de estudiantes ordenados alfabéticamente por nombre:");
  
  estudiantes.forEach(est => {
    console.log(`- ${est.nombre}`);
    console.log("-----------------------------");
  });
}
// Llamamos la función
ordenarEstudiantesPorNombre();

//REPORTE INDIVIDUAL DE CADA ESTUDIANTE
function generarReporteIndividual(nombreEstudiante) {
  const estudiante = estudiantes.find(e => e.nombre.toLowerCase() === nombreEstudiante.toLowerCase());

  if (!estudiante) {
    console.log(`No se encontró al estudiante: ${nombreEstudiante}`);
    return;
  }

  const calificaciones = estudiante.calificaciones;
  const promedio = calcularPromedio(calificaciones);
  const mejor = obtenerMejorCalificacion(calificaciones);
  const peor = obtenerPeorCalificacion(calificaciones);

  console.log(` Reporte individual de estudiante ${estudiante.nombre}`);
  console.log(`Calificaciones: ${calificaciones.join(', ')}`);
  console.log(`Promedio: ${promedio.toFixed(2)}`);
  console.log(` Mejor calificación: ${mejor}`);
  console.log(`Peor calificación: ${peor}`);}
  generarReporteIndividual("Carla");
  console.log("-----------------------------");
  

// 3. Mostrar menú
function mostrarMenu() {
  console.log("MENÚ DE OPCIONES ");
  console.log("1. Mostrar estudiantes");
  console.log("2. Agregar calificación");
  console.log("3. Generar reporte individual");
  console.log("4. Salir");
}

// 4. Menú interactivo
function iniciarGestionCalificaciones() {
  mostrarMenu();

  rl.question("Elige una opción: ", (opcion) => {
    switch (opcion) {
      case "1":
        console.log(" Lista de estudiantes:");
        estudiantes.forEach(est => {
          console.log(`- ${est.nombre}: ${est.calificaciones.join(", ")}`);
        });
        iniciarGestionCalificaciones();
        break;

      case "2":
        rl.question("Nombre del estudiante agregar calificacion: ", (nombre) => {
          rl.question("Nueva calificación para el estudiante: ", (nota) => {
            agregarCalificacion(nombre, parseFloat(nota));
            iniciarGestionCalificaciones();
          });
        });
        break;

      case "3":
        rl.question("Nombre del estudiante a generar reporte: ", (nombre) => {
          generarReporteIndividual(nombre);
          iniciarGestionCalificaciones();
        });
        break;

      case "4":
        console.log("Hasta luego Sistema finalizado correctamente.");
        rl.close();
        break;

      default:
        console.log(" Opción inválida.");
        iniciarGestionCalificaciones();
        break;
    }
  });
}

// Iniciar
iniciarGestionCalificaciones();