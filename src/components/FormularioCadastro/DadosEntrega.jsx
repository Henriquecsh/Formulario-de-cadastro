import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import ValidacoesCadastro from "../../contexts/ValidacoesCadastro";
import useErros from "../../hooks/useErros";
import { Typography, Grid } from "@material-ui/core";

function DadosEntrega({ aoEnviar, aoVoltar }) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const validacoes = useContext(ValidacoesCadastro);
  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar) {
          aoEnviar({
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
          });
        }
      }}
    >
      <TextField
        autoFocus
        value={cep}
        onChange={(event) => {
          setCep(event.target.value);
          let cepConsulta = event.target.value;
          let validacep = /^[0-9]{8}$/;
          if (validacep.test(cepConsulta)) {
            const viacep = "//viacep.com.br/ws/" + cepConsulta + "/json/";
            fetch(viacep)
              .then((response) => response.json())
              .then((dados) => {
                setLogradouro(dados.logradouro);
                setBairro(dados.bairro);
                setCidade(dados.localidade);
                setEstado(dados.uf);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
        onBlur={validarCampos}
        error={!erros.cep.valido}
        helperText={erros.cep.texto}
        id="cep"
        name="cep"
        label="Cep"
        type="number"
        variant="outlined"
        margin="normal"
        required
      />
      <Typography component="label" className="label-cep">
        Informe o cep para auto completar o endereço.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            value={logradouro}
            onChange={(event) => {
              setLogradouro(event.target.value);
            }}
            id="logradouro"
            label="Endereço"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={numero}
            onChange={(event) => {
              setNumero(event.target.value);
            }}
            id="numero"
            label="Número"
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            value={complemento}
            onChange={(event) => {
              setComplemento(event.target.value);
            }}
            id="complemento"
            label="Complemento"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={bairro}
            onChange={(event) => {
              setCidade(event.target.value);
            }}
            id="bairro"
            label="Bairro"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            value={estado}
            onChange={(event) => {
              setEstado(event.target.value);
            }}
            id="estado"
            label="Estado"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={cidade}
            onChange={(event) => {
              setCidade(event.target.value);
            }}
            id="cidade"
            label="Cidade"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
      </Grid>
      <div className="button-box">
        <Button onClick={aoVoltar}>Voltar</Button>
        <Button type="submit" variant="contained" color="primary">
          Finalizar cadastro
        </Button>
      </div>
    </form>
  );
}

export default DadosEntrega;
