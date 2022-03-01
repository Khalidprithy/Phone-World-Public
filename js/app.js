// search input data

const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const noInput = document.getElementById('no-input');
    const noResult = document.getElementById('no-result');
    const phoneDetails = document.getElementById('phone-details');
    const searchResults = document.getElementById('search-results');
    const searchText = searchField.value;
    // Show sippner
    spinnerStyle('block');
    // clear input & search 
    searchField.value = '';
    noInput.textContent = '';
    noResult.textContent = '';
    phoneDetails.textContent = '';
    searchResults.textContent = '';

    if (searchText == '') {
        const div = document.createElement('div');
        div.innerHTML = `
        <span class="bg-danger p-1 rounded-3">Please search a Phone</span>
        `;
        noInput.appendChild(div);
        spinnerStyle('none');
    }
    else {
        // fetch input data
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhoneResults(data.data.slice(0, 20)))
    }
}

// spinner

const spinnerStyle = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Display phone search results

const displayPhoneResults = phones => {
    const searchResults = document.getElementById('search-results');
    const noResult = document.getElementById('no-result');
    searchResults.textContent = '';
    noResult.textContent = '';
    // No result message
    if (phones.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <span class="bg-danger p-1 rounded-3">No result found</span>
        `;
        noResult.appendChild(div);
        spinnerStyle('none');
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 border-0 mx-auto p-3">
                <img src="${phone.image}" class="card-img-top w-50 mt-3" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">Brand: ${phone.brand}</p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-outline-primary btn-sm">Details</button>
                </div>
            </div>
            
            `;
            searchResults.appendChild(div);
        });
        // hide spinner
        spinnerStyle('none');
    }
}
// fetch phone details by ID
const loadPhoneDetails = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
// Display phone details
const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('phone-container');
    const other = phone.others;
    div.innerHTML = `
    <div class="card bg-light" style="width: 18rem;">
                <img src="${phone.image}" class="mx-auto w-75 mt-2" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <p class="card-text">${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
                </div>
                <div>
                 <ul class="list-group list-group-flush bg-secondary">
                    <li class="list-group-item"><span class="fw-bold">Brand: </span>${phone.brand}</li>
                    <strong class="text-white ms-3">Main Features</strong>
                    <li class="list-group-item"><span class="fw-bold">Storage: </span>${phone.mainFeatures.storage}</li>
                    <li class="list-group-item"><span class="fw-bold">Memory: </span>${phone.mainFeatures.memory}</li>
                    <li class="list-group-item"><span class="fw-bold">Chipset: </span> ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No chipset found'}</li>
                    <li class="list-group-item"> <span class="fw-bold">Display Size: </span> ${phone.mainFeatures.displaySize}</li>
                    <li class="list-group-item"> <span class="fw-bold">Sensors: </span> ${(phone.mainFeatures.sensors).slice(0, 5)}</li>
                    <strong class="text-white ms-3">Other Features</strong>
                    <li class="list-group-item"> <span class="fw-bold">Bluetooth: </span> ${other ? other.Bluetooth : 'Not Found'}</li>  
                    <li class="list-group-item"> <span class="fw-bold">GPS: </span> ${other ? other.GPS : 'Not Found'}</li>  
                    <li class="list-group-item"> <span class="fw-bold">NFC: </span> ${other ? other.NFC : 'Not Found'}</li>  
                    <li class="list-group-item"> <span class="fw-bold">Radio: </span> ${other ? other.Radio : 'Not Found'}</li>  
                    <li class="list-group-item"> <span class="fw-bold">USB: </span> ${other ? other.USB : 'Not Found'}</li>  
                    <li class="list-group-item"> <span class="fw-bold">WLAN: </span> ${other ? other.WLAN : 'Not Found'}</li>  
                 </ul>
                </div>
    </div>
    
    `;
    phoneDetails.appendChild(div);
}