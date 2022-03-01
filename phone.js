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
        console.log(phone);
        // console.log(phones[phone]);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = 
        `<div class="col">
        <div onclick="loadPhoneDetail(${phone.slug})" class="card h-100 m-5">
          <img src="${phone.image}" class="card-img-top p-5" alt="..." height="500" width="100">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>`;
        searchResult.appendChild(div);

    })
}


const loadPhoneDetail = id => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.phones[0]));
}