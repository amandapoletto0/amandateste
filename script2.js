document.addEventListener('DOMContentLoaded', () => {

  const SESSION_KEY = 'consultorio.session';

  function safeGet(key){ try { return localStorage.getItem(key); } catch { return null; } }
  const session = JSON.parse(safeGet(SESSION_KEY) || 'null');

  if (!session || !session.email) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('user-email').textContent = session.email;

  document.getElementById('logout').addEventListener('click', () => {
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    window.location.href = 'index.html';
  });

  const form = document.getElementById('symptom-form');
  const result = document.getElementById('result');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sintomasSelecionados = Array.from(
      form.querySelectorAll('input[type="checkbox"]:checked')
    ).map(cb => cb.value);
    if (sintomasSelecionados.length === 0) {
      result.textContent = "Por favor, selecione pelo menos um sintoma.";
      return;
    }
    const diagnosticos = [];
    if (sintomasSelecionados.includes("febre") && sintomasSelecionados.includes("tosse")) {
      diagnosticos.push("Possível gripe");
    }
    if (sintomasSelecionados.includes("dor_cabeca") && sintomasSelecionados.includes("nausea")) {
      diagnosticos.push("Possível enxaqueca");
    }
    if (sintomasSelecionados.includes("fadiga") && sintomasSelecionados.includes("falta_ar")) {
      diagnosticos.push("Possível anemia ou problema respiratório");
    }
    if (sintomasSelecionados.includes("dor_abdomen")) {
      diagnosticos.push("Possível problema gastrointestinal");
    }
    if (diagnosticos.length === 0) {
      result.textContent = "Nenhum diagnóstico claro com base nos sintomas selecionados. Procure um médico para avaliação detalhada.";
    } else {
      result.innerHTML = "<strong>Diagnósticos possíveis:</strong><ul>" +
        diagnosticos.map(d => `<li>${d}</li>`).join('') + "</ul>";
    }
  });
});