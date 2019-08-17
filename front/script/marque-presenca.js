window.addEventListener('load', () => {
    fetch('familia.json')

    .then(response => response.json())
    .then(response => {
        console.log(response);
    
        var $tbody = document.querySelector('#confirma_presenca tbody');
    
        var pessoas = response && response.pessoas || [];
        var pessoasLength = pessoas.length
    
        for (let i = 0; i < pessoasLength; i++) {
            const pessoa = pessoas[i];
    
            var $tr = document.createElement('tr');
            $tr.setAttribute('pessoaid', pessoa.pessoaId); 
            
            var $tdNome = document.createElement('td');
            $tdNome.classList.add('text-center');
            $tdNome.innerText = pessoa.nome;
    
            var $tdPresenca = document.createElement('td');
            $tdPresenca.classList.add('text-center');
            
            var $inputPresenca = document.createElement("input");
            $inputPresenca.classList.add('presenca');
            $inputPresenca.id = 'pessoa_' + pessoa.pessoaId; 
            $inputPresenca.type = 'checkbox';
            $inputPresenca.value = pessoa.presenca;
            
            if (pessoa.presenca) {
                
                $inputPresenca.setAttribute('checked', '');
            }

            $tdPresenca.appendChild($inputPresenca);
            
            $tr.appendChild($tdNome);
            $tr.appendChild($tdPresenca);
    
            $tbody.appendChild($tr);
        }
    });
});