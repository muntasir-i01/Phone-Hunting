const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    /* clear data */
    searchField.value = '';
   /*  if (searchText == '') {
        alert('Please, Search by Phone Name!')
    } */
    /* load data */
   if(searchText == 'iphone' || searchText == 'IPHONE' || searchText == 'samsung' || searchText == 'SAMSUNG' || searchText == 'oppo' || searchText == 'OPPO' 
   || searchText == 'WATCH' || searchText == 'watch') {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.data.slice(0, 20));
    }
    else {
        alert('Please, Search by Phone Name!');
    }
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        alert('No Results Found');
    }
    // searchResult.textContent = "";    
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML =
            `<div class="col-sm-12">
        <div class="card h-50 w-50 m-5">
          <img src="${phone.image}" class="p-5 mb-0" alt="...">
          <div class="card-body mx-auto">
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


const loadPhoneDetail = async slug => {
    console.log(slug);
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');

    div.innerHTML = ` 
    <div class ="col-sm-12">
        <img src="${phone.image}" class="p-5 mx-auto" alt="...">
            <div>
                <h4>Name: ${phone.name}</h5>
                <h5>Release Date: ${phone.releaseDate ? phone.releaseDate : 'Not Available'}</h5>
                <h5>Brand: ${phone.brand}</h5>
                <h5>Memory: ${phone.mainFeatures.memory}</h5>
                <h5>Storage: ${phone.mainFeatures.storage}</h5>
                <h5>Display: ${phone.mainFeatures.displaySize}</h5>
                <h5>Chipset: ${phone.mainFeatures.chipSet}</h5>    
                <h5>Sensors: ${phone.mainFeatures.sensors}</h5> 
                <h5>Bluetooth: ${phone.others.Bluetooth}</h5>      
                <h5>GPS: ${phone.others.GPS}</h5>      
                <h5>NFC: ${phone.others.NFC}</h5>      
                <h5>Radio: ${phone.others.Radio}</h5>      
                <h5>WLAN: ${phone.others.WLAN}</h5>    
            </div>
    </div> `;
    phoneDetails.appendChild(div);
}