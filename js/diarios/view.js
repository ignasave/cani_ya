const sidebar = document.getElementById('sidebar');
const tableSection = document.getElementById('tableSection');
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

function selectDay(dia) {
	mostrarDiaExtendido(daysD[indiceFecha(dia)]);
}

function mostrarDiaExtendido(dia) {
	let formatedDate = formatDate(dia.date, true);
	let string = `
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="row" colspan="6">
                    <center>${formatedDate.completeDay}</center>
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
        string += `
            <tr>
                <th scope="row">${sell.newsPaper}</th>
                <th>${sell.quantity}</th>
                <th>$${sell.envy}</th>
                <th>$${sell.price}</th>
                <th>$${sell.total}</th>
                <th>$${sell.earnings}</th>
            </tr>
        `;
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
