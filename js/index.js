const newDateForm = document.getElementById("newDateForm");
const newDate = document.getElementById("newDate");
//CONTROLADOR/////////////////////////////////////////
const dias = [];
class Day {
  constructor(date) {
    this.date = date;
    this.sells = [];
    this.item = {
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
      earnings: 0
    };
  }

  addItem() {
    this.sells.push(this.item);
  }
}

//INTERFAZ////////////////////////////////////////////
const listArea = document.getElementById("jeu");
//FORMATEAR LA FECHA DEL TITULO
function formatearFecha(fecha) {
  date = new Date(fecha);
  let day = date.getDate() + 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let gDay = date.getDay();
  let cDay = "Dia Desconocido";
  switch (gDay) {
    case 0:
      cDay = "LUNES";
      break;
    case 1:
      cDay = "MARTES";
      break;
    case 2:
      cDay = "MIERCOLES";
      break;
    case 3:
      cDay = "JUEVES";
      break;
    case 4:
      cDay = "VIERNES";
      break;
    case 5:
      cDay = "SABADO";
      break;
    case 0:
      cDay = "DOMINGO";
      break;
  }
  if (month < 10) {
    if (day < 10) {
      return `${cDay} 0${day}/0${month}/${year}`;
    } else {
      return `${cDay} ${day}/0${month}/${year}`;
    }
  } else {
    return `${cDay} ${day}/${month}/${year}`;
  }
}
//CLASE INTERFAZ
class Interfaz {
  mostrarDias(datos) {
    //ORDENAR LOS DATOS DE MAYOR FECHA A MENOR FECHA;
    datos.sort((a, b) => {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateB - dateA; //sort by date ascending
    });
    //VACIO EL CAMPO DONDE SE MUESTRAN LOS DATOS
    listArea.innerHTML = "";
    //POR CADA DIA HAGO UNA TABLA
    datos.forEach(dato => {
      let fechaFormateada = formatearFecha(dato.date);
      let diaHtml = `
            <div class="col-12" id="${dato.date}">
              <div class="row">
                <h3 class="pl-3 pb-0 pt-2 col">${fechaFormateada}</h3>
                <div class="flotar-derecha col-2">
                  <button class="btn-info btn rounded-circle" onclick="UI.editar('${
                    dato.date
                  }')">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="btn-success btn rounded-circle hidden" onclick="UI.confirmar('${
                    dato.date
                  }')">
                    <i class="fas fa-check"></i>
                  </button>
                  <button class="btn-danger btn rounded-circle" onclick="UI.eliminar(${
                    dato.date
                  })">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <table class="table table-striped table-dark">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Total</th>
                    <th scope="col">Ganancia</th>
                  </tr>
                </thead>
                <tbody>`;
      dato.sells.forEach(sell => {
        let ventaHtml = `<tr>
                    <th scope="row">${sell.name}</th>
                    <td>${sell.quantity}</td>
                    <td>$ ${sell.price}</td>
                    <td>$ ${sell.total}</td>
                    <td>$ ${sell.earnings}</td>
                  </tr>`;
        diaHtml += ventaHtml;
      });

      diaHtml += `</tbody>
              </table>
            </div>`;
      listArea.innerHTML += diaHtml;
    });
  }
  //FUNCION BOTON EDITAR DIA
  editar(fecha) {
    let container = document.getElementById(fecha);
    container.childNodes[1].childNodes[3].childNodes[1].classList.add("hidden");
    container.childNodes[1].childNodes[3].childNodes[3].classList.remove(
      "hidden"
    );

    let th1 = document.createElement("th");
    th1.setAttribute("scope", "col");
    let th2 = document.createElement("th");
    th2.setAttribute("scope", "col");

    container.childNodes[3].childNodes[1].childNodes[1].appendChild(th1);
    container.childNodes[3].childNodes[1].childNodes[1].appendChild(th2);
    const tbody = container.childNodes[3].childNodes[3];
    this.añadirDomNuevoItem(tbody);
  }

  añadirDomNuevoItem(place) {
    const nuevoItem = document.createElement("tr");
    nuevoItem.id = "trNuevoItem";
    nuevoItem.innerHTML = `
    <form id="formularioNuevoItem" >
      <th scope="row">
        <input type="text" id="nombre" class="form-control pill" />
      </th>
      <td>
        <input
          type="number"
          id="cantidad"
          class="form-control pill"
        />
      </td>
      <td>
        <input
          type="number"
          id="precio"
          class="form-control pill"
        />
      </td>
      <td>$<span>0</span></td>
      <td>$<span>0</span></td>
      <td>
        <button type="submit" class="btn-success btn rounded-circle">
          <i class="fas fa-check"></i>
        </button>
      </td>
      <td>
        <button class="btn-danger btn rounded-circle">
          <i class="fas fa-times"></i>
        </button>
      </td>
    </form>
  `;
    place.prepend(nuevoItem);
  }
  // FUNCION BOTON CONFIRMAR EDICION DEL DIA
  confirmar(fecha) {
    let container = document.getElementById(fecha);
    container.childNodes[1].childNodes[3].childNodes[3].classList.add("hidden");
    container.childNodes[1].childNodes[3].childNodes[1].classList.remove(
      "hidden"
    );
    document.getElementById("trNuevoItem").remove();
    container.childNodes[3].childNodes[1].childNodes[1].lastChild.remove();
    container.childNodes[3].childNodes[1].childNodes[1].lastChild.remove();
  }
}
///////////////////////////////////////////////////
const UI = new Interfaz();
newDateForm.addEventListener("submit", event => {
  event.preventDefault();
  const diaNuevo = new Day(newDate.value);
  dias.push(diaNuevo);
  UI.mostrarDias(dias);
});
