const assert = require("assert");
const Postgres = require("./../db/strategies/postgres");
const Context = require("./../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());

const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "flexas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Batman", poder: "dinheiro" };

describe("Postgres Strategy", function() {
  this.timeout(Infinity);
  this.beforeAll(async function() {
    await context.connect();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });
  it("PostgresSQL Connection", async function() {
    const result = await context.isConnected();
    assert.equal(result, true); // resultado esperado
  });
  it("cadastrar", async function() {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    console.log("result", result);
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("listar", async () => {
    // se eu fizer [result, segundaposicao] ele retorna a segunda posicao
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    delete result.id;
    console.log("result", result);
    // pegar a primeira posicao
    //const posicaoZero = result[0];
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("atualizar", async () => {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome
    });
    const novoItem = { ...MOCK_HEROI_ATUALIZAR, nome: "Mulher Maravilha" };

    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    // o ... -> vou manter o objeto do jeito que ta e alterar só o nome
  });
});
