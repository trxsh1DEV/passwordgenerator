// class Generator{
//     constructor(options, lenght)
// }

const container = document.querySelector(`.password-option`);
const passwordGenerated = document.querySelector(".password-box");
const passwordField = document.querySelector(".password-box span");
const sizePassword = document.querySelector(`#valor`);
const sliderSize = document.querySelector('#slider');
const btnGenerate = document.querySelector("#btn-generate");
let newPassword = "";
// const options = document.querySelectorAll(".fields-optionals input");

const maiusculas = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numb = document.querySelector("#number");
const simbolos = document.querySelector("#symbol");

sizePassword.innerHTML = sliderSize.value;
sliderSize.oninput = function passwordSize(){
    sizePassword.innerHTML = this.value;
}

btnGenerate.addEventListener("click", () => callGenerate());

const callGenerate = () => {
  if (sliderSize.value > 50) alert("A senha gerada pode ter no máximo 50 caracteres");
  newPassword = generatePassword(
    sliderSize.value,
    maiusculas.checked,
    lowercase.checked,
    numb.checked,
    simbolos.checked
  );
  if (!newPassword) return;
  // passwordGenerated.classList.remove('hide');
  passwordGenerated.style.display = "flex";
  passwordField.innerHTML = newPassword;
};

function copyPassword() {
  navigator.clipboard.writeText(newPassword);
}


// Gerador de senha
const generatePassword = (qtde, maiusculas, minusculas, numb, symb) => {
  const rand = (max, min) => Math.floor(Math.random() * (max - min) + min);
  const generateMaiuscula = () => String.fromCharCode(rand(65, 91));
  const generateMinuscula = () => String.fromCharCode(rand(97, 123));
  const generateNumbers = () => String.fromCharCode(rand(48, 58));
  const symbols = "!@#$%&*-.~()?/^_";
  const generateSymbols = () => symbols[rand(0, symbols.length)];
  const passwordArray = [];
  qtde = Number(qtde);
  if (qtde <= 0 || (!maiusculas && !minusculas && !numb && !symb))
    return alert(
      "Selecione um tamanho para senha e ao menos uma das opções abaixo"
    );

  for (let i = 0; i < qtde; i++) {
    maiusculas && passwordArray.push(generateMaiuscula());
    minusculas && passwordArray.push(generateMinuscula());
    numb && passwordArray.push(generateNumbers());
    symb && passwordArray.push(generateSymbols());
  }
  return passwordArray.join("").slice(0, qtde);
};
