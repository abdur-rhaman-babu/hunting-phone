const phoneHunterLoader = async (searchText = '13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    displayData(phones, isShowAll)
}

phoneHunterLoader()

const displayData = (phones, isShowAll) =>{
    const main = document.getElementById('main')
    main.textContent = ''

    const showAllItem = document.getElementById("show-all-item")
    if(phones.length > 12 && !isShowAll){
      showAllItem.classList.remove('hidden')
    }else{
      showAllItem.classList.add('hidden')
    }
    
    // console.log('show all data', isShowAll)

   if(!isShowAll){
      phones = phones.slice(0,12)
   }

    phones.forEach((phone)=> {
        // console.log(phone)
        const child = document.createElement('div')
        child.classList = `card card-compact w-96 bg-base-100 shadow-xl mt-8`
        child.innerHTML = `
        <figure><img src= ${phone.image} alt="Shoes" /></figure>
              <div class="card-body">
                  <h2 class="card-title">${phone.brand}</h2>
                  <h2 class = "text-2xl">${phone.phone_name}</h2>
                  <div class="card-actions justify-center my-3">
                  <button onclick = "showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
              </div>
        `
        main.appendChild(child)
    })

    loadingSinner(false)
}

const showDetails = async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phones = data.data;
  console.log(phones)
  showPhoneDetails(phones)
  // console.log('show details')
}

const showPhoneDetails = (phones) =>{
  show_details_modal.showModal()
  const phoneName = document.getElementById('phone-name')
  phoneName.innerText = phones.name;
  const phoneDetails = document.getElementById('phoneDetails')
  phoneDetails.innerHTML  = `
    <img src = ${phones.image} />
    <p> <span class="text-base font-semibold">Release Date:</span> ${phones.releaseDate}</p>
    <p> <span class="text-base font-semibold">Memory:</span> ${phones.mainFeatures.memory}</p>
    <p> <span class="text-base font-semibold">Chip Set:</span> ${phones.mainFeatures.chipSet}</p>
    <p> <span class="text-base font-semibold">Display Size:</span> ${phones.mainFeatures.displaySize}</p>
  `
}

// search result
const searchInput = document.getElementById('search-input')
const searchPhone = (isShowAll) =>{
    loadingSinner(true)
    const searchText = searchInput.value;
    // searchInput.value = ''
    phoneHunterLoader(searchText, isShowAll)
}

const loadingSinner = (isLoading) =>{
  const loadingData = document.getElementById('loading-spiner')
  if(isLoading){
    loadingData.classList.remove('hidden')
  }else{
    loadingData.classList.add('hidden')
  }
}


// show all result
const showAllData = () =>{
  searchPhone(true)
}