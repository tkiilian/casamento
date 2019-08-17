var apiUrl = "https://localhost:44358/api/Convidado";

(function () {
    
    var queryString = new URLSearchParams(window.location.search)
    var familiaCode = queryString.get("FamiliaCode");


    window.addEventListener('load', () => {
        fetch(apiUrl + "/" + familiaCode, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',               
            },            
            cache: 'no-cache',            
        })
        .then(response => {

            if (response.status === 204) {
                
                return new Promise((resolve, reject) => {

                    resolve({});
                });
            }

            return response.json()
        })
        .then(response => {
            console.log(response);

            var $container = document.querySelector(".container");
            var $tbody = document.querySelector('#confirma_presenca tbody');
        
            var pessoas = response && response.pessoas || [];
            var pessoasLength = pessoas.length;

            if (pessoasLength) {
                
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

            } else {
                
                while ($container.firstChild) {
                    
                    $container.removeChild($container.firstChild);
                }

                var $h3 = document.createElement("h3");
                $h3.innerText = "Página não encontrada";
                $h3.classList.add("text-center");
                $h3.classList.add("v-center");
                
                
                $container.appendChild($h3);
            }

            $container.style.display = "block";
        })
        .catch((error) => {
            console.log(error);
        });
    });

    Events();

    function Events() {
        
        var $enviar = document.getElementById("enviar");
        $enviar.addEventListener("click", EnviarEvent);
    }

    function EnviarEvent(e) {
        e.preventDefault();

            var $pessoasId = document.querySelectorAll('tr[pessoaid]')
            var pessoasIdLength = $pessoasId.length;

            var familia = {
                pessoas: []
            };

            for (let i = 0; i < pessoasIdLength; i++) {
                var pessoaId = +$pessoasId[i].getAttribute("pessoaid")
                var presenca = document.getElementById("pessoa_" + pessoaId).checked;

                const pessoa = {
                    PessoaId: pessoaId,
                    Presenca: presenca
                };
                
                familia.pessoas.push(pessoa);
            }

            $messagePresenca = document.getElementById("message-presenca");

            fetch(apiUrl, {
                method: "PUT",
                headers: new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(familia),
                cache: "no-cache"
            })
            .then(response => {

                if (response.status == 200) {
                    return response.json();    
                }
                else if (response.status == 204) {
                    return new Promise((resolve) => {
                        resolve("");
                    })
                }

                return new Promise((resolve, reject) => {
                    
                    response.json()
                        .then(error => {
                            
                            reject(error);
                        });
                });
            })
            .then(response => {
                $messagePresenca.innerText = "Presença confirmada :)";
                $messagePresenca.style.display = "block";
            })
            .catch(error => {

                $messagePresenca.innerText = "Não foi possível confirmar sua presença, tente novamente mais tarde :(";
                $messagePresenca.style.display = "block";
            });
    }
})();