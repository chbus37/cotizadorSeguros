// CONSTRUCTORES

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function () {
  // Si es opcion 1 Americano incrementa en 1.15
  // Si es opcion 2 Asiatico incrementa 1.05
  // Si es opcion 3 Europeo incrementa 1.35

  let cantidad;
  const base = 2000;

  console.log(this.marca);
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;

    case "3":
      cantidad = base * 1.35;
      break;

    default:
      break;
  }

  //   Leer el anio
  const diferencia = new Date().getFullYear() - this.year;

  // Cada anio que la diferencia es mayor, el costo va a reducirse un 3% el costo del seguro
  cantidad -= (diferencia * 3 * cantidad) / 100;

  /*
    Si el seguro es basico se multiplica por un 30%
    Si el seguro es completo se multiplica por un 50%
  */

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function UI() {}

// Llena las opciones de los anios
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  const min = max - 20;
  const selectYear = document.querySelector("#year");
  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");
  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (total, seguro) => {
  const { marca, year, tipo } = seguro;
  let textoMarca;
  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;
    default:
      break;
  }
  // Crear el resultrado
  const div = document.createElement("div");
  div.classList.add("mt-10");
  div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: ${textoMarca}</p>
        <p class="font-bold capitalize">Tipo de Cobertura: ${tipo}</p>
        <p class="font-bold">Total: $ ${total}</p>
    
    `;

  const resultadoDiv = document.querySelector("#resultado");

  //   Mostar el spinner

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    // Se borra el spinner pero se muestra el resultado
    resultadoDiv.appendChild(div);
  }, 3000);
};

// INSTANCIAR UI

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  //   Leer la marca seleccionada
  const marca = document.querySelector("#marca").value;

  // Leer el anio seleccionado
  const year = document.querySelector("#year").value;

  // Leer el tipo de cobertura
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }

  ui.mostrarMensaje("Cotizando Seguro", "exito");

  //   Ocultar cotizaciones previas

  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }

  //   Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(total, seguro);
}
