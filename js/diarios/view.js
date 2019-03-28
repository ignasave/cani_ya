const sidebar = document.getElementById('sidebar');
const tableSection = document.getElementById('tableSection');
function mostrarDiasEnLista(data) {
	sortear(data);
	sidebar.innerHTML = '';
	data.forEach(day => {
		let formatedDate = formatDate(day.date, true);
		sidebar.innerHTML += `
        <div class="col-12 my-1" onClick="selectDay('${day.date}')">
            <h5 class="centered">${formatedDate.date}</h5>
        </div>
        `;
	});
}

function selectDay(dia) {
	daysD[indiceFecha(dia)].sells.push(venta.devolverVenta());
	mostrarDiaExtendido(daysD[indiceFecha(dia)]);
}

function mostrarDiaExtendido(dia) {
	let formatedDate = formatDate(dia.date, true);
	let string = `
    <div class="col-12">
    <table class="table table-dark">
    <thead>
      <tr>
        <th scope="row" colspan="4"><center>${formatedDate.completeDay}</center></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row" colspan="4"><center>${formatedDate.date}</center></th>
      </tr>
      <tr>
        <th scope="col">DIARIOS</th>
        <td scope="col">VENTA</td>
        <td scope="col">PRECIO</td>
        <td scope="col">TOTAL</td>
      </tr>`;

      dia.sells.forEach(sell => {
        string += `<tr>
        <th scope="row">${sell.newsPaper}</th>
        <th>${sell.quantity}</th>
        <th>$${sell.price}</th>
        <th>$${sell.total}</th>
      </tr>`;
      })

	string += `<tr class="resultado">
            <th scope="row">TOTAL</th>
            <th>10</th>
            <th>-</th>
            <th>$30</th>
        </tr>
        </tbody>
    </table>
    </div>`;

	tableSection.innerHTML = string;
}
