const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";
    // Object.keys(phones).
    phones.forEach(phone => {
        /* console.log(phone); */
        // console.log(phones[phone]);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =
            `<div class="col">
        <div class="card h-100 m-5">
          <img src="${phone.image}" class="card-img-top p-5" alt="..." height="500" width="100">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            
          </div>
          <div class="card-footer">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          
          <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary" type="button">Details</button>
        </div>
          </div>
        </div>
      </div>`;
        searchResult.appendChild(div);

    })
}


const loadPhoneDetail = slug => {
    console.log(slug); 
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));   
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="${phone.image}" class="card-img-top" alt="..." height="300" width="50">
    <div class="card-body">
    <h5 class="card-title">${phone.name}</h5>
    <h5 class="card-title">${phone.releaseDate}</h5>
    <h5 class="card-title">${phone.brand}</h5>
    </div>`;
    phoneDetails.appendChild(div);
}