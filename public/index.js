document.getElementById('fetchData').addEventListener('click', fetchFlags);

function fetchFlags() {
    const countryName = document.getElementById('makeInput').value;
    let url = 'http://localhost:3000/api/flags';
    
    // Add query parameter if countryName is provided
    if (countryName) {
        url += `?country=${countryName}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => displayFlags(data))
        .catch(error => console.error('Error fetching flags:', error));
}

function displayFlags(flags) {
    const flagsContainer = document.getElementById('flagsContainer');
    flagsContainer.innerHTML = ''; // Clear previous flags

    flags.forEach(flag => {
        const flagCard = document.createElement('div');
        flagCard.className = 'flag-card';
        flagCard.innerHTML = `
            <img src="${flag.flags.svg}" alt="${flag.name.common} flag">
            <p>${flag.name.common}</p>
        `;
        flagsContainer.appendChild(flagCard);
    });
}
