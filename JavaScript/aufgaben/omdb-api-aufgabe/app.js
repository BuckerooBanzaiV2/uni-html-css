async function fetchWithRetry(url, delay = 2000) {
    while (true) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Problem mit der API-Verbindung: ${response.status} ${response.statusText}`);
            }
            return response;
        } catch (error) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Fehler: ' + error.message;
            errorMessage.style.display = 'block';
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function getMovie(movieTitle) {
    const apiKey = 'b6003d8a';
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;
    const loadingBar = document.getElementById('loadingBar');
    const resultTable = document.getElementById('resultTable');
    const resultBody = document.getElementById('resultBody');
    const errorMessage = document.getElementById('errorMessage');

    loadingBar.style.display = 'block';
    resultTable.style.display = 'none';
    resultBody.innerHTML = '';
    errorMessage.style.display = 'none';

    try {
        const response = await fetchWithRetry(url);
        const data = await response.json();

        if (data.Response === 'False') {
            errorMessage.textContent = `Fehler: Film "${movieTitle}" wurde nicht gefunden.`;
            errorMessage.style.display = 'block';
        } else {
            resultBody.innerHTML = `<tr>
                <td>${data.Title}</td>
                <td>${data.Year}</td>
                <td>${data.Genre}</td>
                <td>${data.Plot}</td>
            </tr>`;
            resultTable.style.display = 'table';
        }
    } catch (error) {
        errorMessage.textContent = 'Fehler: ' + error.message;
        errorMessage.style.display = 'block';
    } finally {
        loadingBar.style.display = 'none';
    }
}

function fetchMovie() {
    const movieTitle = document.getElementById('movieTitle').value;
    if (movieTitle) {
        getMovie(movieTitle);
    } else {
        alert('Bitte geben Sie einen Filmtitel ein.');
    }
}
