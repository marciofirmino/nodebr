const { obterPessoas } = require("./service");

// para exportar apenas algumas coisas do nosso servico

/**
 * const item = {
 * nome:Firma,
 * idade:12,
 * }
 * const {nome} = item
 * console.log (nome)
 */

Array.prototype.meuFilter = function(callback) {
  const lista = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    // 0, "",null, undefined == false
    if (!result) continue;
    lista.push(item);
  }
  return lista;
};
async function main() {
  try {
    const { results } = await obterPessoas("a");

    // const familiaLars = results.filter(function(item) {
    //   // por padrão precisa retornar um booleano para informar
    //   // se deve manter ou remover da lista.
    //   // false = remove
    //   // true = mantem
    //   // não encontrou = -1
    //   // encontrou = posicao no array
    //   // Se eu coloco === -1 ele retorna todo mundo Que não tem Lars
    //   const result = item.name.toLowerCase().indexOf("lars") !== -1;
    //   return result;
    // });

    const familiaLars = results.meuFilter((item, index, lista) => {
      console.log(`index: ${index}`, lista.length);
      return item.name.toLowerCase().indexOf("lars") !== -1;
    });
    const names = familiaLars.map(pessoa => pessoa.name);
    console.log(names);
  } catch (error) {
    console.log("Deu Ruim", error);
  }
}

main();
