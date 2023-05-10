/*let consultaCep = fetch("https://viacep.com.br/ws/01001000/json/")
    .then(response =>  response.json())
    .then(r => {
        if (r.erro) {
            throw Error("Esse cep não existe");
        }
        console.log(r)
    })
    .catch(erro => console.log(erro))
    .finally(mensagem => console.log('Processamento concluído com sucesso!'));

console.log(consultaCep);*/

async function buscarEndereco(cep) {

    let mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";

    try {
        let consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        let conexaoConvertida = await consultaCep.json();
        if (conexaoConvertida.erro) {
            throw new Error("CEP não existe!");
        }
        console.log(conexaoConvertida);
        let cidade = document.getElementById("cidade");
        let logradouro = document.getElementById("endereco");
        let estado = document.getElementById("estado");

        cidade.value = conexaoConvertida.localidade;
        logradouro.value = conexaoConvertida.logradouro;
        estado.value = conexaoConvertida.uf;

        return conexaoConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente Novamente!</p>`;
        console.log(erro)
    }

}

/*let ceps = ['01001000', '01001001']
let conjuntoCeps = ceps.map(valores => buscarEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));*/

let cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value));