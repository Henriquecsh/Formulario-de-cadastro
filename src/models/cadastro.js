function validarCPF(cpf) {
  if (cpf.length !== 11) {
    return { valido: false, texto: "CPF deve ter 11 dígitos." };
  } else {
    let erro = { valido: true, texto: "" };
    let cpfv = cpf;
    let i,
      x,
      y = "";

    if (cpfv.length === 14 || cpfv.length === 11) {
      cpfv = cpfv.replace(".", "");
      cpfv = cpfv.replace(".", "");
      cpfv = cpfv.replace("-", "");
      var nonNumbers = /\D/;
      if (nonNumbers.test(cpfv)) {
        erro = {
          valido: false,
          texto: "O CPF é composto apenas por números!",
        };
      } else {
        if (
          cpfv === "00000000000" ||
          cpfv === "11111111111" ||
          cpfv === "22222222222" ||
          cpfv === "33333333333" ||
          cpfv === "44444444444" ||
          cpfv === "55555555555" ||
          cpfv === "66666666666" ||
          cpfv === "77777777777" ||
          cpfv === "88888888888" ||
          cpfv === "99999999999"
        ) {
          erro = { valido: false, texto: "Número de CPF inválido." };
        }
        let a = [];
        let b = "";
        let c = 11;
        for (i = 0; i < 11; i++) {
          a[i] = cpfv.charAt(i);
          if (i < 9) b += a[i] * --c;
        }
        if ((x = b % 11) < 2) {
          a[9] = 0;
        } else {
          a[9] = 11 - x;
        }
        b = 0;
        c = 11;
        for (y = 0; y < 10; y++) b += a[y] * c--;
        if ((x = b % 11) < 2) {
          a[10] = 0;
        } else {
          a[10] = 11 - x;
        }
        if (
          parseInt(cpfv.charAt(9)) !== a[9] ||
          parseInt(cpfv.charAt(10)) !== a[10]
        ) {
          erro = { valido: false, texto: "Número de CPF inválido." };
        }
      }
    } else {
      if (cpfv.length === 0) {
        erro = { valido: false, texto: "Informe o CPF." };
      } else {
        erro = { valido: false, texto: "Número de CPF inválido." };
      }
    }
    return erro;
  }
}

function validarSenha(senha) {
  if (senha.length < 4 || senha.length > 72) {
    return { valido: false, texto: "Senha deve ter entre 4 e 72 dígitos." };
  } else {
    return { valido: true, texto: "" };
  }
}

function validarCaracteres(dados) {
  if (dados.length < 4 || dados.length > 72) {
    return {
      valido: false,
      texto: "Este campo deve ter entre 4 e 72 dígitos.",
    };
  } else {
    return { valido: true, texto: "" };
  }
}

function validaCep(cep) {
  if (cep !== "") {
    return { valido: true, texto: "" };
  } else {
    return { valido: false, texto: "Informe o cep." };
  }
}

function buscaCep(cep){
  let validacep = /^[0-9]{8}$/;

  if (validacep.test(cep)) {
    const viacep = "//viacep.com.br/ws/" + cep + "/json/";
    fetch(viacep)
      .then((response) => response.json())
      .then((dados) => {
        console.log({ valido: true, texto: "", dados });

        const retornoCep = { valido: true, texto: "", dados };
        return retornoCep;
      })
      .catch((error) => {
        return { valido: false, texto: error };
      });
  } else {
    return {
      valido: false,
      texto: "CEP Inválido",
    };
  }
}

export { validarCPF, validarSenha, validarCaracteres, validaCep };
