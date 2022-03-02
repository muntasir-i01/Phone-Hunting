const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    /* clear data */
    searchField.value = '';
    if(searchText == '') {
        alert('Please, Search by Phone Name!')
    }
    /* load data */
    else  {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    
    displaySearchResult(data.data.slice(0,20));   
    
    }
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(phones.length == 0) {
        alert('No Results Found');
    }    
    // searchResult.textContent = "";    
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        
        div.innerHTML =
            `<div class="col">
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
    <div class ="col mx-auto">
        <img src="${phone.image}" class="p-5 mx-auto" alt="...">
            <div class="mx-auto">
                <h4 class="card-title">Name: ${phone.name}</h5>
                <h5 class="card-title">Release Date: ${phone.releaseDate?phone.releaseDate:'Not Available'}</h5>
                <h5 class="card-title">Brand: ${phone.brand}</h5>
                <h5 class="card-title">Memory: ${phone.mainFeatures.memory}</h5>
                <h5 class="card-title">Storage: ${phone.mainFeatures.storage}</h5>
                <h5 class="card-title">Display: ${phone.mainFeatures.displaySize}</h5>
                <h5 class="card-title">Chipset: ${phone.mainFeatures.chipSet}</h5>    
                <h5 class="card-title">Sensors: ${phone.mainFeatures.sensors}</h5> 
                <h5 class="card-title">Bluetooth: ${phone.others.Bluetooth}</h5>      
                <h5 class="card-title">GPS: ${phone.others.GPS}</h5>      
                <h5 class="card-title">NFC: ${phone.others.NFC}</h5>      
                <h5 class="card-title">Radio: ${phone.others.Radio}</h5>      
                <h5 class="card-title">WLAN: ${phone.others.WLAN}</h5>    
            </div>
    </div>  
`;    
    phoneDetails.appendChild(div);      
}