// Calculo do PESO IDEAL

const formPesoIdeal = document.getElementById('formPesoIdeal');
const resultadoPesoIdeal = document.getElementById('resultadoPesoIdeal');

formPesoIdeal.addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o envio do formulário

  const altura = parseFloat(document.getElementById('altura').value);
  const sexo = document.getElementById('sexo').value;

  if (!altura || altura <= 0) {
    resultadoPesoIdeal.textContent = 'Por favor, insira uma altura válida.';
    resultadoPesoIdeal.style.color = 'red';
    return;
  }

  let pesoIdeal;
  if (sexo === 'masculino') {
    pesoIdeal = 50 + 0.91 * (altura - 152.4); // Fórmula para homens
  } else {
    pesoIdeal = 45.5 + 0.91 * (altura - 152.4); // Fórmula para mulheres
  }

  resultadoPesoIdeal.textContent = `Seu peso ideal é aproximadamente ${pesoIdeal.toFixed(2)} kg.`;
  resultadoPesoIdeal.style.color = 'green';
});
