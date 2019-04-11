var diaSelected = 0;

function mostrarDiarios(datos, dia) {
	diaSelected = dia;
	const table = document.getElementById('containerDiariosConfig');
	table.innerHTML = '';
	datos.forEach(newsPaper => {
		table.innerHTML += `
        <tr id="${newsPaper.id}">
            <th scope="row">${newsPaper.newsPaper}</th>
            <td>${newsPaper.envy}</td>
            <td>${newsPaper.price}</td>
            <td>${newsPaper.earnings}</td>
            <td >
            <button class="btn-info btn rounded-circle" onclick="editView('${dia}','${
			newsPaper.id
		}')">
                <i class="fas fa-pen"></i>
            </button>
          </td>
          <td>
            <button class="btn-danger btn rounded-circle" onclick="deleteNewsPaper('${dia}','${
			newsPaper.newsPaper
		}')">
                <i class="fas fa-times"></i>
            </button>
        </tr>
        `;
	});
}

function editView(dia, newsPaperID) {
	const indexOfNewsPaperInDay = pConfig.days[dia].findIndex(day => {
		return day.id === newsPaperID;
	});
	const DiarioChoosen = pConfig.days[dia][indexOfNewsPaperInDay];
	const element = document.getElementById(newsPaperID);
	element.innerHTML = `
        <th scope="row">
            <input type="text" class="form-control pill" value="${DiarioChoosen.newsPaper}">
        </th>
        <td>
            <input type="number" class="form-control pill" value="${DiarioChoosen.envy}">       
        </td>
        <td>
            <input type="number" class="form-control pill" value="${DiarioChoosen.price}">
        </td>
        <td>
            <input type="number" class="form-control pill" value="${DiarioChoosen.earnings}">       
        </td>
        <td >
        <button class="btn-success btn rounded-circle" onclick="confirmEditView('${dia}','${
		DiarioChoosen.id
	}')">
            <i class="fas fa-check"></i>
        </button>
        </td>
        <td>
        <button class="btn-danger btn rounded-circle" onclick="clearInputs('${
			DiarioChoosen.newsPaper
		}')">
            <i class="fas fa-times"></i>
        </button>
    `;
}

function confirmEditView(dia, newsPaperID) {
	const element = document.getElementById(newsPaperID);
	const name = element.firstElementChild.firstElementChild.value.toUpperCase();
	const envy = element.childNodes[3].firstElementChild.value;
	const price = element.childNodes[5].firstElementChild.value;
	const earnings = element.childNodes[7].firstElementChild.value;

	const data = {
		id: newsPaperID,
		newsPaper: name,
		envy: Number(envy),
		price: Number(price),
		earnings: Number(earnings)
	};

	confirmEdit(dia, data);
}

function clearInputs(newsPaperName) {
	const element = document.getElementById(newsPaperName);
	element.childNodes[3].firstElementChild.value = '';
	element.childNodes[5].firstElementChild.value = '';
	element.childNodes[7].firstElementChild.value = '';
}

function newNewsPaper() {
	const beforeShiet = document.getElementById('newNewsPaper');
	if (beforeShiet) {
		beforeShiet.remove();
	}
	const container = document.getElementById('containerDiariosConfig');
	let row = document.createElement('tr');
	row.setAttribute('id', 'newNewsPaper');
	row.innerHTML = `
    <th scope="row">
        <input type="text" class="form-control pill">
    </th>
    <td>
        <input type="number" class="form-control pill">       
    </td>
    <td>
        <input type="number" class="form-control pill">
    </td>
    <td>
        <input type="number" class="form-control pill">       
    </td>
    <td >
    <button class="btn-success btn rounded-circle" onclick="confirmNewNewsPaper()">
        <i class="fas fa-check"></i>
    </button>
    </td>
    <td>
    <button class="btn-danger btn rounded-circle" onclick="clearInputsNew()">
        <i class="fas fa-times"></i>
    </button>
    `;
	container.prepend(row);
}

function confirmNewNewsPaper() {
	const element = document.getElementById('newNewsPaper');
	const name = element.firstElementChild.firstElementChild.value.toUpperCase();
	const envy = element.childNodes[3].firstElementChild.value;
	const price = element.childNodes[5].firstElementChild.value;
	const earnings = element.childNodes[7].firstElementChild.value;

	const data = {
		newsPaper: name,
		envy: Number(envy),
		price: Number(price),
		earnings: Number(earnings)
	};
	newNewsPaperController(data, diaSelected);
}

function clearInputsNew() {
	const element = document.getElementById('newNewsPaper');
	element.childNodes[1].firstElementChild.value = '';
	element.childNodes[3].firstElementChild.value = '';
	element.childNodes[5].firstElementChild.value = '';
	element.childNodes[7].firstElementChild.value = '';
}
