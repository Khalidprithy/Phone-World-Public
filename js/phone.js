// search input data

const searchPhones = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    // clear input
    searchField.value = '';

    if (searchText == '') {
        const noInput = document.getElementById('no-input');
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
    searchResults.textContent = '';


    if (phones.length === 0) {
        const noResult = document.getElementById('no-result');
        const div = document.createElement('div');
        div.innerHTML = `
        <span class="bg-danger p-1 rounded-3">No result found</span>
        `;
        noResult.appendChild(div);
    }
    else {
        phones.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 border-0">
                <img src="${phone.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">Brand: ${phone.brand}</p>
                  <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-outline-primary  btn-sm">Details</button>
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
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('phone-container');
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top w-25" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <p class="card-text">${phone.releaseDate}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">An item</li>
                  <li class="list-group-item">A second item</li>
                  <li class="list-group-item">A third item</li>
                </ul>
            </div>
    
    `;
    phoneDetails.appendChild(div);
}