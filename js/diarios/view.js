const sidebar = document.getElementById('sidebar');
const tableSection = document.getElementById('tableSection');
// INSTANCIAR EL MODO EDICION
let editMode = false;
//FUNCION PARA MOSTRAR LOS DIAS EN LA LISTA DE LA IZQUIERDA
function mostrarDiasEnLista(data) {
	sortear(data);
	sidebar.innerHTML = '';
	data.forEach(day => {
		let formatedDate = formatDate(day.date, true);
		sidebar.innerHTML += `
        <div class="col-12 m-1 p-1 day-item " onClick="selectDay('${day.date}')">
            <h5 class="centered">${formatedDate.date}</h5>
        </div>
        `;
	});
}
// FUNCION PARA SELECCIONAR UN DIA
function selectDay(dia) {
	mostrarDiaExtendido(daysD[indiceFecha(dia)]);
}
// FUNCION PARA MOSTRAR UN DIA EN EL LADO DERECHO
function mostrarDiaExtendido(dia) {
	let formatedDate = formatDate(dia.date, true);
	let string = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="row" colspan="6">
                    <center>
                        ${formatedDate.completeDay}
                        <button class="ml-3 btn-info btn rounded-circle" id="editDia" onclick="viewEditDia('${
							dia.date
						}')">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button onclick="sendEdit('${
							dia.date
						}')" id="confirmEdit" class="btn-success btn rounded-circle hidden">
                            <i class="fas fa-check"></i>
                        </button>
                        <button onclick="deleteday('${
							dia.date
						}')" id="delete" class="btn-danger btn rounded-circle">
                            <i class="fas fa-times"></i>
                        </button>
                    </center>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row" colspan="6">
                    <center>${formatedDate.date}</center>  
                </th>
            </tr>
            <tr>
                <th scope="col">DIARIOS</th>
                <td scope="col">VENTA</td>
                <td scope="col">ENVIO</td>
                <td scope="col">PRECIO</td>
                <td scope="col">TOTAL</td>
                <td scope="col">GANANCIA</td>
            </tr>`;
	dia.sells.forEach(sell => {
		if (!editMode) {
			string += `
                <tr>
                    <th scope="row">${sell.newsPaper}</th>
                    <th>${sell.quantity}</th>
                    <th>$${sell.envy}</th>
                    <th>$${sell.price}</th>
                    <th>$${sell.total}</th>
                    <th>$${sell.totalEarnings}</th>
                </tr>
        `;
		} else {
			string += `
            <tr>
                <th scope="row">${sell.newsPaper}</th>
                <th>
                    <input class="form-control pill quantity" type="number" name="${
						sell.newsPaper
					}">
                </th>
                <th>$${sell.envy}</th>
                <th>$${sell.price}</th>
                <th>$${sell.total}</th>
                <th>$${sell.totalEarnings}</th>
            </tr>
            `;
		}
	});
	nuevoDia = new Day(dia.date, dia.sells);
	totalLine = nuevoDia.calcularTotal();
	string += `
            <tr class="resultado">
                <th scope="row">TOTAL</th>
                <th>${totalLine[0]}</th>
                <th>-</th>
                <th>-</th>
                <th>$${totalLine[1]}</th>
                <th>$${totalLine[2]}</th>
            </tr>
        </tbody>
    </table>
    `;
	tableSection.innerHTML = string;
}
// FUNCION QUE MODIFICA EL DOM PARA VER LA EDICION DE UN DIA
function viewEditDia(dia) {
	editMode = !editMode;
	mostrarDiaExtendido(daysD[indiceFecha(dia)]);

	const editdia = document.getElementById('editDia');
	const confirmEdit = document.getElementById('confirmEdit');

	editdia.classList.add('hidden');
	confirmEdit.classList.remove('hidden');
}
// FUNCION PARA ENVIAR AL CONTROLLADOR LOS DATOS DE LOS INPUTS
function sendEdit(dia) {
	editMode = !editMode;
	let inputs = document.getElementsByClassName('quantity');
	inputs = Array.from(inputs);
	const data = inputs.map(input => {
		return {
			newsPaper: input.name,
			value: Number(input.value)
		};
	});
	editDia(dia, data);
}
