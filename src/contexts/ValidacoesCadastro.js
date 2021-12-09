import React from "react";
const ValidacoesCadastro = React.createContext({
  cpf: semValidacao,
  senha: semValidacao,
  nome: semValidacao,
  sobrenome: semValidacao,
  cep: semValidacao,
  numero: semValidacao,
});

function semValidacao(dados) {
  console.log(dados);
  return { valido: true, texto: "" };
}
export default ValidacoesCadastro;
