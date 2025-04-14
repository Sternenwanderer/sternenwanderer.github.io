const form = document.getElementById('reservation');
const meldung = document.getElementById('meldung');

document.addEventListener("DOMContentLoaded", async () => {
    const datumSelect = document.getElementById("datum");
    const infoBox = document.createElement("span");
    datumSelect.parentNode.insertBefore(infoBox, datumSelect.nextSibling);
  
    // Hole Verfügbarkeiten aus Google Script (ersetze die URL mit deiner!)
    const res = await fetch("https://script.google.com/macros/s/AKfycbz32b099_Gi39ggTrkCkg0qSy91RDVDsf4KWDcgALAbPmEEzaNjlmImjY14fTczc8HT/exec");
    const daten = await res.json();
  
    daten.forEach(({ date, remaining }) => {
      if (remaining > 0) {
        const option = document.createElement("option");
        option.value = date;
        option.textContent = `${date}`;
        option.dataset.remaining = remaining;
        datumSelect.appendChild(option);
      }
    });
  
    datumSelect.addEventListener("change", () => {
      const selected = datumSelect.selectedOptions[0];
      const remaining = selected?.dataset?.remaining;
      infoBox.textContent = "";
  
      if (remaining && remaining < 6) {
        infoBox.textContent = `⚠️ Nur noch ${remaining} Karten verfügbar`;
        infoBox.style.color = "red";
        infoBox.style.marginLeft = "1em";
      }
    });
  });

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: params,
        });

        const text = await response.text();

        if (text.trim() === 'OK') {
            meldung.textContent = '✅ Reservierung erfolgreich! Wir freuen uns auf Ihren Besuch.';
            form.reset();
            form.style.display = "None";
        } else {
            meldung.style.color = 'red';
            meldung.textContent = '❌ Es gab ein Problem: ' + text;
        }
    } catch (error) {
        meldung.style.color = 'red';
        meldung.textContent = '❌ Netzwerkfehler – bitte versuchen Sie es später erneut.';
    }
});