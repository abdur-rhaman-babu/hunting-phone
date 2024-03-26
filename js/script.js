const phoneHunterLoader = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    displayData(phones)
}



const displayData = (phones) =>{
    const main = document.getElementById('main')
    main.textContent = ''

    const showAllItem = document.getElementById("show-all-item")
    if(phones.length > 12){
      showAllItem.classList.remove('hidden')
    }else{
      showAllItem.classList.add('hidden')
    }
    
    phones = phones.slice(0,12)
    phones.forEach((phone)=> {
        // console.log(phone)
        const child = document.createElement('div')
        child.classList = `card card-compact w-96 bg-base-100 shadow-xl mt-8`
        child.innerHTML = `
        <figure><img src= ${phone.image} alt="Shoes" /></figure>
              <div class="card-body">
                  <h2 class="card-title">${phone.brand}</h2>
                  <h2>${phone.phone_name}</h2>
                  <p>${phone.slug}</p>
                  <div class="card-actions justify-end">
                  <button class="btn btn-primary">Buy Now</button>
              </div>
        `
        main.appendChild(child)
    })

    loadingSinner(false)
}


// search result
const searchInput = document.getElementById('search-input')
const searchPhone = () =>{
    loadingSinner(true)
    const searchText = searchInput.value;
    phoneHunterLoader(searchText)
    searchInput.value = ''
}

const loadingSinner = (isLoading) =>{
  const loadingData = document.getElementById('loading-spiner')
  if(isLoading){
    loadingData.classList.remove('hidden')
  }else{
    loadingData.classList.add('hidden')
  }
}