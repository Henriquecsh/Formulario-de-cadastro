import React, { Component } from "react";
import FormularioCadastro from "./components/FormularioCadastro/FormularioCadastro";
import { Container, Paper, Typography } from "@material-ui/core";
import "fontsource-roboto";
import "./App.css";
import ValidacoesCadastro from "./contexts/ValidacoesCadastro";
import {validarCPF, validarSenha, validarCaracteres, validaCep} from "./models/cadastro";

class App extends Component {
  render() {
    return (
      <Container component="article" maxWidth="sm">
        <Paper className="papper-form" elevation={0} variant="outlined" square>
        <Typography variant="h3" component="h1" align="center">
          Formulario de cadastro
        </Typography>
        <ValidacoesCadastro.Provider value={{cpf:validarCPF, senha:validarSenha, nome:validarCaracteres, sobrenome:validarCaracteres, cep:validaCep}}>
          <FormularioCadastro aoEnviar={aoEnviarForm} />
        </ValidacoesCadastro.Provider>
        </Paper>
      </Container>
    );
  }
}

function aoEnviarForm(dados) {
  console.log(dados);
}

export default App;
