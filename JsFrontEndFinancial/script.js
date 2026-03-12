
const endpoint = "http://localhost:3322";

//const endpoint = "http://localhost:8080";




const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;



const month = [
	"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
	"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];



let selectedType = "mastercard";
let isOpcaoType = true ;



let search = {	
	year: currentYear,
	month: currentMonth,
	type: selectedType,   
	user: "ALL"           
};

const list = [];



const field_user = document.getElementById('field-user');
const field_expery = document.getElementById('field-expery');
const field_amount = document.getElementById('field-amount');

const container_list = document.getElementById('container-list');
const content_list = document.getElementById('content-list');
const t_body = document.getElementById('t-body');

const btn_pdf = document.getElementById('btn-pdf');

const opcao_year = document.querySelectorAll('input[name="opcao-year"]');

const select_month = document.getElementById('select-month');

const content_type = document.getElementById('content-type');

const select_user = document.getElementById('select-user');




/*
opcao_year.forEach(radio => {
    // Verifica se o valor do radio é igual ao currentYear
    if (Number(radio.value) === currentYear) {
        radio.checked = true; // Marca o rádio correspondente
    }

    radio.addEventListener('change', (event) => {
        search.year = Number(event.target.value); // Atualiza o ano
        getData(); // Chama a função para obter os dados filtrados com o novo ano
    });
});
*/


opcao_year.forEach(function(radio) {
        if (parseInt(radio.value) === currentYear) {
            radio.checked = true;  // Marca o rádio do ano atual
        }
        // Adiciona o evento de alteração
        radio.addEventListener('change', function(event) {
            // Atualiza a variável search.year com o valor do radio selecionado
            search.year = parseInt(event.target.value);
            getData();  // Chama a função para atualizar os dados com o novo ano
        });
	});




const clean = () => {
    list.splice(0, list.length);  // Limpa a lista    
};






const getData = async () => { 	
    clean();

    try {
        const res = await fetch(endpoint + "?action=postsByDate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search
            })
        });

        // Check if response is OK (status 200)
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
		const result = await res.json(); // Attempt to parse the JSON

        if (result == "not found") {	
            field_user.innerHTML = ""; 
            field_amount.innerHTML = ""; 
            field_expery.innerHTML = "";
        } else {	
            result.forEach(item => {
                list.push({
                    user: item.user_pcc,
                    shop: item.shop_pcc,
                    date: item.date_pcc,
                    value: item.value_pcc,
                    desc: item.desc_pcc,
                    format: item.format_cc,
                    parcel: item.parcel_pcc,
                    expery: item.expery_date_pcc,
					type:item.type_cc
                });
            });
        }

		opcao_year.forEach(radio => radio.disabled = false);
        select_month.disabled = false;
        select_user.disabled = false;

        if (isOpcaoType) {
            opcaoType();
        }
        selectUser(selectedType);
        filterDataAndRender();

    } catch (error) {
        console.error('Fetch error:', error);
        // Optionally, handle any errors with a user-friendly message or fallback behavior.
    }
};

getData();




month.forEach( (mes, index) =>{  
	const option = document.createElement('option');
	option.value = index + 1;
    option.textContent = mes;

	if (index + 1 === currentMonth) {
		option.selected = true;	
	}

	select_month.classList.toggle(
		'current-month',
		Number(select_month.value) === currentMonth
	);
	
	select_month.appendChild(option);
});



select_month.addEventListener('change', ()=> {
	   search.month = Number (select_month.value);
	   getData();
});




const opcaoType =()=>{	
       let types = [...new Set(list.map(item => item.type))]; 

       types.forEach((type, index) => {
		  const label = document.createElement('label');

		  const radio = document.createElement('input');
          radio.type = 'radio';
		  radio.name = 'type';  // Todos os botões de rádio terão o mesmo 'name' para serem exclusivos
          radio.value = type;
          radio.id = `type-${index}`;

		  if (type === selectedType) {
            radio.checked = true;
          }

		  // Criar o ícone para o cartão (Mastercard ou Visa)
          const icon = document.createElement('i');
		  icon.style = "font-size:36px;color:white";
		  
		
          if (type === "mastercard") {
             icon.className = 'fab fa-cc-mastercard';  // Classe do Font Awesome para o ícone da Mastercard
          } else if (type === "visa") {
             icon.className = 'fab fa-cc-visa';  // Classe do Font Awesome para o ícone da Visa
          }

		   label.setAttribute('for', radio.id);
		   label.textContent = type.charAt(0).toUpperCase() + type.slice(1);  // Capitaliza o tipo (ex: 'mastercard' -> 'Mastercard')

		    // Adicionar o ícone dentro do label, antes do texto
           label.prepend(icon);

		   content_type.appendChild(radio);
           content_type.appendChild(label);
           content_type.appendChild(document.createElement('br'));

		    radio.addEventListener('change', () => { 
				 selectedType = radio.value;
				 selectUser(selectedType);
				 filterDataAndRender();
			});
	   }); 	   
	   isOpcaoType = false ;	
}










const selectUser =( type )=>{
   // Filtra a lista de usuários de acordo com o tipo selecionado
	let users = [...new Set(list.filter(item => item.type === type).map(item => item.user))];
	
	users.sort((a, b) => a.localeCompare(b));
	users.unshift("All");
	select_user.innerHTML = '';
	users.forEach(user => {
		const option = document.createElement('option');
		option.value = user;
		option.textContent = user;
		select_user.appendChild(option);
	});	
}





select_user.addEventListener('change', function () {
	filterDataAndRender();  // Chama a função para filtrar e renderizar a tabela
});







const filterDataAndRender = () => {

	// Filtra a lista pelo tipo selecionado
	let filteredList = list.filter(item => item.type === selectedType); 
	
	// Filtra ainda mais pela seleção do usuário, caso não seja "All"	
	const selectedUser = select_user.value;
	if (selectedUser !== "All") {
		filteredList = filteredList.filter(item => item.user === selectedUser);
	}
     
	 // Ordenação da lista pelo campo 'date'
	filteredList.sort((a, b) => {
		const dateA = new Date(a.date);  // Converte a string de data para um objeto Date
		const dateB = new Date(b.date);  // Converte a string de data para um objeto Date
		return dateA - dateB;  // Ordenação crescente (se quiser decrescente, troque a ordem para `dateB - dateA`)
	});

	 renderTable(filteredList);
     updateTotal(filteredList);   
	
	if (filteredList.length > 0) {
		if (selectedUser === "All") {
			// Exibe "Todos" quando o usuário selecionado for "All"
			field_user.innerHTML = "All";

			select_user.classList.add('highlight-all');
            
		} else {
			// Exibe o nome do usuário selecionado
			field_user.innerHTML = filteredList[0].user;					
           	select_user.classList.remove('highlight-all');
		}		
		// Exibe a data de vencimento do primeiro item filtrado
		field_expery.innerHTML = " Vencimento "+filteredList[0].expery;
	}
};





const renderTable = (filteredList) => {
    // Limpa o conteúdo da tabela antes de renderizar
    t_body.innerHTML = '';
    
    filteredList.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding-left: 10px;">${item.date}</td>
            <td style="padding-left: 10px;">${item.shop}</td>
            <td style="padding-left: 10px;">R$ ${item.value}</td>
            <td style="padding-left: 10px;">${item.desc}</td>
            <td style="padding-left: 10px;">${item.parcel}</td>
            <td style="padding-left: 10px;">${item.format}</td>
        `;
        t_body.appendChild(tr);
    });
};



const updateTotal = (filteredList) => {
  const total = filteredList.reduce((acc, despesa) => acc + parseFloat(despesa.value), 0);
  field_amount.innerHTML = "Total R$ " + total.toFixed(2);  
};





btn_pdf.addEventListener('click', function () {

	const options = {
		margin: [1, 10, 10, 10],
		//filename: "file.pdf",
		filename: selectedType+".pdf",
		html2canvas: { scale: 2 },
		jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
	};
	html2pdf().set(options).from(container_list).save();	
});






















































































