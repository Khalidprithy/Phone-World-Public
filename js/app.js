// search input data

const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const noInput = document.getElementById('no-input');
    const noResult = document.getElementById('no-result');
    const searchText = searchField.value;
    // clear input
    searchField.value = '';
    noInput.textContent = '';
    noResult.textContent = '';

    if (searchText == '') {
        const div = document.createElement('div');
        div.innerHTML = `
        <span class="bg-danger p-1 rounded-3">Please search a Phone</span>
        `;
        noInput.appendChild(div);
    }
    else {
        // fetch input data
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhoneResults(data.data))

    }

}

const displayPhoneResults = phones => {
    const searchResults = document.getElementById('search-results');
    const noResult = document.getElementById('no-result');
    searchResults.textContent = '';
    noResult.textContent = '';

    if (phones.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <span class="bg-danger p-1 rounded-3">No result found</span>
        `;
        noResult.appendChild(div);
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 border-0">
                <img src="${phone.image}" class="card-img-top w-50 mt-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">Brand: ${phone.brand}</p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-outline-primary btn-sm">Details</button>
                </div>
            </div>
            
            `;
            searchResults.appendChild(div);
        })
    }

}

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('phone-container');
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top w-25" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <p class="card-text">${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
                </div>
                <div>
                 <ul class="list-group list-group-flush bg-secondary">
                    <li class="list-group-item">Brand: ${phone.brand}</li>
                    <li class="list-group-item">Storage: ${phone.mainFeatures.storage}</li>
                    <li class="list-group-item">Chipset: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No chipset found'}</li>
                    <li class="list-group-item">Display Size: ${phone.mainFeatures.displaySize}</li>
                    <li class="list-group-item">Sensors: ${phone.mainFeatures.sensors}</li>
                 </ul>
                </div>
    </div>
    
    `;
    phoneDetails.appendChild(div);
}