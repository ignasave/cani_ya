const CFG = new Configuracion();
const listArea = document.getElementById('tableSection');

//FORMATEAR LA FECHA DEL TITULO
function formatDate(paramDate,separated = false) {
	let date = new Date(paramDate);
	let day = date.getDate() + 1;
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let gDay = date.getDay();
	let cDay = 'Dia Desconocido';
	switch (gDay) {
		case 0:
			cDay = 'LUNES';
			break;
		case 1:
			cDay = 'MARTES';
			break;
		case 2:
			cDay = 'MIERCOLES';
			break;
		case 3:
			cDay = 'JUEVES';
			break;
		case 4:
			cDay = 'VIERNES';
			break;
		case 5:
			cDay = 'SABADO';
			break;
		case 6:
			cDay = 'DOMINGO';
			break;
	}
	if (month < 10) {
		if (day < 10) {
			return !separated ? `${cDay} 0${day}/0${month}/${year}` : 
			{
				completeDay : `${cDay}`,
				date : `0${day}/0${month}/${year}`
			};
		} else {
			return !separated ? `${cDay} ${day}/0${month}/${year}` : 
			{
				completeDay : `${cDay}`,
				date : `${day}/0${month}/${year}`
			}
		}
	} else {
		return !separated ? `${cDay} ${day}/${month}/${year}` : 
		{
			completeDay : `${cDay}`,
			date : `${day}/${month}/${year}`
		}
	}
}

function sortear(datos){
	datos.sort((a, b) => {
		var dateA = new Date(a.date),
			dateB = new Date(b.date);
		return dateB - dateA; //sort by date ascending
	});
}

//FUNCION PARA MOSTRAR LOS DIAS EN EL CONTENEDOR DE DIAS, REVISTAS
function showDays(datos) {
	//ORDENAR LOS DATOS DE MAYOR FECHA A MENOR FECHA;
	sortear(datos);
	//VACIO EL CAMPO DONDE SE MUESTRAN LOS DATOS
	listArea.innerHTML = '';
	//POR CADA DIA HAGO UNA TABLA
	datos.forEach(dato => {
		dato.calcularTotal();
		let formatedDate = formatDate(dato.date);
		let dayHTML =
			`
              <div class="col-12 my-4" id="${dato.date}">
                <div class="row">
                  <h3 class="pl-3 pb-0 pt-2 col">${formatedDate}</h3>
                  <div class="flotar-derecha col-2">
                    <button class="btn-info btn rounded-circle" onclick="edit('${dato.date}')">
                      <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn-success btn rounded-circle confirm hidden" onclick="confirm('${
						dato.date
					}')">
                      <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-danger btn rounded-circle" onclick="eliminar('${
						dato.date
					}')">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <table class="table table-striped table-hover` +
			(CFG.modonoche ? ' table-dark' : '') +
			` ">
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
		dato.sells.forEach((sell,index) => {
			let sellHTML = `<tr>
                      <th scope="row" identify="${index}">${sell.name}</th>
                      <td>${sell.quantity}</td>
                      <td>$ ${sell.price}</td>
                      <td>$ ${sell.total}</td>
                      <td>$ ${sell.earnings}</td>
                      <td class="hidden">
                        <button class="btn-info btn rounded-circle" onclick="editSell('${
							index
						}', '${dato.date}')"><i class="fas fa-pen"></i>
                        </button>
                      </td>
                      <td class="hidden">
                        <button class="btn-danger btn rounded-circle" onclick="eliminarSellView('${
							sell.name
						}', '${dato.date}')">
                        <i class="fas fa-times"></i>
                    </button>
                      </td>
                    </tr>`;
			dayHTML += sellHTML;
		});
		if (dato.total.show) {
			dayHTML += `<tr class="resultado">
            <th scope="row" >TOTAL: </th>
            <td>${dato.total.quantity}</td>
            <td></td>
            <td>${dato.total.total}</td>
            <td>${dato.total.earnings}</td>
          </tr>`;
		}
		dayHTML += `</tbody>
                </table>
              </div>`;
		listArea.innerHTML += dayHTML;
	});
}
//FUNCION PARA HACER EL TRAVERSING MAS FACIL
function containerCN(firstCN, secondCN, thirdCN, date) {
	return document.getElementById(date).childNodes[firstCN].childNodes[secondCN].childNodes[
		thirdCN
	];
}
//FUNCION BOTON EDITAR DIA
function edit(date) {
	const confirms = document.querySelectorAll('.confirm');
	confirms.forEach(confirm => {
		if (confirm.getAttribute('class') != 'btn-success btn rounded-circle confirm hidden') {
			confirm.click();
		}
	});

	const elementosOcultos = document
		.getElementById(date)
		.childNodes[3].childNodes[3].querySelectorAll('.hidden');
	if (elementosOcultos.length > 0) {
		elementosOcultos.forEach(elemento => {
			elemento.classList.remove('hidden');
			elemento.classList.add('no-hidden');
		});
	}

	containerCN(1, 3, 1, date).classList.add('hidden');
	containerCN(1, 3, 3, date).classList.remove('hidden');
	const th1 = document.createElement('th');
	const th2 = document.createElement('th');
	containerCN(3, 1, 1, date).appendChild(th1);
	containerCN(3, 1, 1, date).appendChild(th2);

	const tbody = document.getElementById(date).childNodes[3].childNodes[3];
	addDomNewItem(tbody, date);
}
//FUNCION ELIMINAR DIA
function eliminar(date) {
	const dayToEliminate = document.getElementById(date);
	deleteDay(date);
	dayToEliminate.remove();
}
//FUNCION PARA AÑADIR EL DOM DEL NUEVO ITEM DE DIA
function addDomNewItem(place, id) {
	const nuevoItem = document.createElement('tr');
	nuevoItem.id = 'trNuevoItem';
	nuevoItem.innerHTML = `
        <th scope="row" id="formularioNuevoItem">
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
        <td></td>
        <td></td>
        <td>
          <button onclick="enviarNuevoItem('${id}')" class="btn-success btn rounded-circle">
            <i class="fas fa-check"></i>
          </button>
        </td>
        <td>
          <button onclick="limpiarNuevoItem()" class="btn-danger btn rounded-circle">
            <i class="fas fa-times"></i>
          </button>
        </td>
  
    `;
	place.prepend(nuevoItem);
}
function limpiarNuevoItem() {
	document.getElementById('cantidad').value = '';
	document.getElementById('precio').value = '';
	document.getElementById('nombre').value = '';
}
// FUNCION BOTON CONFIRMAR EDICION DEL DIA
function confirm(date) {
	const elementosNoOcultos = document
		.getElementById(date)
		.childNodes[3].childNodes[3].querySelectorAll('.no-hidden');
	if (elementosNoOcultos.length > 0) {
		elementosNoOcultos.forEach(elemento => {
			elemento.classList.remove('no-hidden');
			elemento.classList.add('hidden');
		});
	}

	containerCN(1, 3, 3, date).classList.add('hidden');
	containerCN(1, 3, 1, date).classList.remove('hidden');
	document.getElementById('trNuevoItem').remove();
	containerCN(3, 1, 1, date).lastChild.remove();
	containerCN(3, 1, 1, date).lastChild.remove();
	showDays(days);
}

async function editSell(index, dia) {
	showDays(days);
	await edit(dia);
	const selector = document.getElementById(dia).querySelector(`[identify="${index}"]`);
	const padre = selector.parentElement;
	const nombreEdit = days[indiceFecha(dia)].sells[index].name;
	const cantidadEdit = days[indiceFecha(dia)].sells[index].quantity;
	const precioEdit = days[indiceFecha(dia)].sells[index].price;
	padre.innerHTML = '';
	padre.innerHTML = `
        <th scope="row">
          <input type="text" id="nombreEdit" class="form-control pill" value="${nombreEdit}"/>
        </th>
        <td>
          <input
            type="number"
            id="cantidadEdit"
            class="form-control pill"
            value="${cantidadEdit}"
          />
        </td>
        <td>
          <input
            type="number"
            id="precioEdit"
            class="form-control pill"
            value="${precioEdit}"
          />
        </td>
        <td></td>
        <td></td>
        <td>
          <button onclick="confirmEditView('${dia}','${index}')" class="btn-success btn rounded-circle">
            <i class="fas fa-check"></i>
          </button>
        </td>
        <td>
          <button onclick="cancelarEdit('${dia}')" class="btn-danger btn rounded-circle">
            <i class="fas fa-times"></i>
          </button>
        </td>
    `;
}

function confirmEditView(dia, id) {
	const nombre = document.getElementById('nombreEdit').value;
	const cantidad = Number(document.getElementById('cantidadEdit').value);
	const precio = Number(document.getElementById('precioEdit').value);
	if (verificarNoComienzaEnNum(nombre)) {
		confirmEdit(dia, id, nombre, cantidad, precio);
	} else {
		cancelarEdit(dia);
	}
}

function cancelarEdit(id) {
	showDays(days);
	edit(id);
}

function eliminarSellView(item, id) {
	eliminarSell(item, id);
	showDays(days);
	edit(id);
}

function verificarNoComienzaEnNum(value) {
	if (!isNaN(value.charAt(0))) {
		console.error('name cant initialize with number');
		return false;
	} else {
		return true;
	}
}
