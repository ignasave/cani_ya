const newDateForm = document.getElementById("newDateForm");
const newDate = document.getElementById("newDate");
//CONTROLADOR/////////////////////////////////////////
const days = [];
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
const listArea = document.getElementById("tableSection");
//FORMATEAR LA FECHA DEL TITULO
function formatDate(paramDate) {
  let date = new Date(paramDate);
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
    case 6:
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
class Interface {
  //FUNCION PARA MOSTRAR LOS DIAS EN EL CONTENEDOR DE DIAS, REVISTAS
  showDays(datos) {
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
      let formatedDate = formatDate(dato.date);
      let dayHTML = `
            <div class="col-12" id="${dato.date}">
              <div class="row">
                <h3 class="pl-3 pb-0 pt-2 col">${formatedDate}</h3>
                <div class="flotar-derecha col-2">
                  <button class="btn-info btn rounded-circle" onclick="UI.edit('${
                    dato.date
                  }')">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="btn-success btn rounded-circle hidden" onclick="UI.confirm('${
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
        let sellHTML = `<tr>
                    <th scope="row">${sell.name}</th>
                    <td>${sell.quantity}</td>
                    <td>$ ${sell.price}</td>
                    <td>$ ${sell.total}</td>
                    <td>$ ${sell.earnings}</td>
                  </tr>`;
        dayHTML += sellHTML;
      });

      dayHTML += `</tbody>
              </table>
            </div>`;
      listArea.innerHTML += dayHTML;
    });
  }
  //FUNCION PARA HACER EL TRAVERSING MAS FACIL
  containerCN(firstCN, secondCN, thirdCN, date) {
    return document.getElementById(date).childNodes[firstCN].childNodes[
      secondCN
    ].childNodes[thirdCN];
  }
  //FUNCION BOTON EDITAR DIA
  edit(date) {
    this.containerCN(1, 3, 1, date).classList.add("hidden");
    this.containerCN(1, 3, 3, date).classList.remove("hidden");

    let th1 = document.createElement("th");
    th1.setAttribute("scope", "col");
    let th2 = document.createElement("th");
    th2.setAttribute("scope", "col");

    this.containerCN(3, 1, 1, date).appendChild(th1);
    this.containerCN(3, 1, 1, date).appendChild(th2);
    const tbody = document.getElementById(date).childNodes[3].childNodes[3];
    this.addDomNewItem(tbody);
  }
  //FUNCION PARA AÑADIR EL DOM DEL NUEVO ITEM DE DIA
  addDomNewItem(place) {
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
  confirm(date) {
    this.containerCN(1, 3, 3, date).classList.add("hidden");
    this.containerCN(1, 3, 1, date).classList.remove("hidden");
    document.getElementById("trNuevoItem").remove();
    this.containerCN(3, 1, 1, date).lastChild.remove();
    this.containerCN(3, 1, 1, date).lastChild.remove();
  }
}
///////////////////////////////////////////////////
const UI = new Interface();
newDateForm.addEventListener("submit", event => {
  event.preventDefault();
  const newDay = new Day(newDate.value);
  days.push(newDay);
  UI.showDays(days);
});
