export function makeListElemet(countries) {
    return countries.map(country => `
        <li class="country-item">
            <img class="country-flag" src="${country.flags.svg}" width="45" alt="${country.name.official}"/>
            <span>${country.name.official}</span>
        </li>
    `).join('');
}

export function makeInfoElement(country) {
    return `
        <div class="country-header">
            <img class="country-flag" src="${country.flags.svg}" width="55" alt="${country.name.official}"/>
            <span class="country-title">${country.name.official}</span>
        </div>
        <div>
            <span class="label">Capital:</span><span>${country.capital.join(', ')}</span>
        </div>
        <div>
            <span class="label">Population:</span><span>${country.population}</span>
        </div>
        <div>
            <span class="label">Languages:</span><span>${Object.values(country.languages).join(', ')}</span>
        </div>
    `
}
