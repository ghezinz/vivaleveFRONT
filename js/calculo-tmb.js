// Calculo da Taxa Metabólica Basal

const formTMB = document.getElementById('formTMB');
const resultadoTMB = document.getElementById('resultadoTMB');

formTMB.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o envio do formulário

  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  const idade = parseInt(document.getElementById('idade').value);
  const sexo = document.getElementById('sexo').value;

  if (!peso || peso <= 0 || !altura || altura <= 0 || !idade || idade <= 0) {
    resultadoTMB.textContent = 'Por favor, insira valores válidos.';
    resultadoTMB.style.color = 'red';
    return;
  }

  let tmb;
  if (sexo === 'masculino') {
    tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade); // Fórmula para homens
  } else {
    tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade); // Fórmula para mulheres
  }

  resultadoTMB.textContent = `Sua TMB é aproximadamente ${tmb.toFixed(2)} calorias por dia.`;
  resultadoTMB.style.color = 'green';
});
