const lodePhone =async(searchText, datalimite) =>{
const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(url);
const data = await res.json();
displayPhone(data.data, datalimite)
};

const displayPhone = (phones, datalimite) =>{
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.textContent = "";

   const showAll = document.getElementById('show-all');
   if( datalimite && phones.length > 10 ){
    phones = phones.slice(0,10);
    showAll.classList.remove('d-none')
   }
   else{
    showAll.classList.add('d-none')
   }
  
   const noPhone = document.getElementById('no-phone-msg');
   if(phones.length === 0){
    noPhone.classList.remove('d-none')
   }
   else{
    noPhone.classList.add('d-none')
   }
   phones.forEach(phone =>{
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML=`
    
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="lodePhoneDeatiles('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDeatileModal">Show Details</button>
            
                  

            </div>
            </div>
    `;
    phoneContainer.appendChild(phoneDiv);
   });

//    Stop Loder
togolLoder(false);
}

const processSearch = (datalimite) =>{
    togolLoder(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    lodePhone(searchText, datalimite);
};

document.getElementById('btn-search').addEventListener('click', function(){
    // start loder
    processSearch(10);
});

document.getElementById('search-field').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
        processSearch(10);
    }
});

const togolLoder = isLoding =>{
    const loderSection = document.getElementById('loder');
    if(isLoding){
        loderSection.classList.remove('d-none') 
    }
    else{
        loderSection.classList.add('d-none')
    }
   
};
document.getElementById('btn-show-all').addEventListener('click', function(){
processSearch()
})

const lodePhoneDeatiles = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDeatiles(data.data);
}

const displayPhoneDeatiles = phone =>{
console.log(phone);
const modelTitle = document.getElementById('phoneDeatileModalLabel');
modelTitle.innerText = phone.name;
const phoneDeatiles = document.getElementById('phone-deatiles');
phoneDeatiles.innerHTML = `
<p>Releas Date: ${phone.releaseDate ? phone.releaseDate : 'No Release date found'} </p>
<p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'Memory not found'} </p>
<p>others: ${phone.others ? phone.others.Bluetooth : 'Others futhers not found'} </p>
`;
}
// lodePhone()