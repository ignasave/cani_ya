const newDateForm = document.getElementById("newDateForm");
const newDate = document.getElementById("newDate");
//CONTROLADOR
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

//INTERFAZ
const listArea = document.getElementById("jeu");
class Interfaz {
    
  mostrarDias(datos) {
    //ORDENAR LOS DATOS DE MAYOR FECHA A MENOR FECHA;
    datos.sort(function(a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateB - dateA; //sort by date ascending
    });
    //VACIO EL CAMPO DONDE SE MUESTRAN LOS DATOS
    listArea.innerHTML = "";
    //POR CADA DIA HAGO UNA TABLA
    datos.forEach(dato => {
      let diaHtml = `
            <div class="col-12">
              <div class="row">
                <h3 class="pl-3 pb-0 pt-2 col" id="">${dato.date}</h3>
                <div class="flotar-derecha col-2">
                  <button class="btn-info btn rounded-circle" onClick="editar(${
                    dato.date
                  })">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="btn-danger btn rounded-circle" onClick="eliminar(${
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
}

const UI = new Interfaz();
newDateForm.addEventListener("submit", event => {
  event.preventDefault();
  const diaNuevo = new Day(newDate.value);
  dias.push(diaNuevo);
  UI.mostrarDias(dias);
});
