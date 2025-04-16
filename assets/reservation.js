const form = document.getElementById('reservation');
const meldung = document.getElementById('meldung');
const reserveButton = document.getElementById("submitButton");

document.addEventListener("DOMContentLoaded", async () => {
    const datumSelect = document.getElementById("datum");
    const anzahlInput = document.getElementById("anzahl");
    const infoBox = document.createElement("span");
    datumSelect.parentNode.insertBefore(infoBox, datumSelect.nextSibling);

    const spreadsheetDeployment = datumSelect.dataset.spreadsheetDeployment;

    // Verfügbarkeiten merken
    const remainingMap = new Map();

    try {
        const res = await fetch(spreadsheetDeployment);
        const daten = await res.json();

        daten.forEach(({ date, remaining }) => {
            if (remaining > 0) {
                const option = document.createElement("option");
                option.value = date;
                option.textContent = `${date}`;
                datumSelect.appendChild(option);

                remainingMap.set(date, remaining); // Merken!
            }
        });
    } catch (err) {
        console.error("Fehler beim Laden der Daten", err);
        infoBox.textContent = "⚠️ Fehler beim Laden der Verfügbarkeiten";
        infoBox.style.color = "red";
        reserveButton.disabled = true;
        return;
    }

    function validateReservation() {
        const selectedDate = datumSelect.value;
        const remaining = Number(remainingMap.get(selectedDate) || 0);
        const anzahl = Number(anzahlInput.value || 0);
        infoBox.textContent = "";

        if ((remaining < 6 || anzahl > remaining) && selectedDate) {
            infoBox.textContent = `⚠️ Nur noch ${remaining} Karten verfügbar`;
            infoBox.style.color = "red";
            infoBox.style.marginLeft = "1em";
        }

        if (anzahl > remaining || anzahl <= 0 || !selectedDate) {
            reserveButton.disabled = true;
        } else {
            reserveButton.disabled = false;
        }
    }

    datumSelect.addEventListener("change", validateReservation);
    anzahlInput.addEventListener("input", validateReservation);

    // Wie haben Sie von uns erfahren?
    const herkunftSelect = document.getElementById("herkunft");
    const herkunftDetails = document.getElementById("herkunftAnderesFeld");

    herkunftSelect.addEventListener("change", () => {
    if (herkunftSelect.value === "Anderes") {
        herkunftDetails.style.display = "block";
    } else {
        herkunftDetails.style.display = "none";
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
            form.style.display = "none";
        } else {
            meldung.style.color = 'red';
            meldung.textContent = '❌ Es gab ein Problem: ' + text;
        }
    } catch (error) {
        meldung.style.color = 'red';
        meldung.textContent = '❌ Netzwerkfehler... bitte versuchen Sie es später erneut.';
    }
});
