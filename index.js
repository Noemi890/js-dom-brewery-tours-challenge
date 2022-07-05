const ulList = document.getElementById('breweries-list')
const form_state = document.getElementById('select-state-form')
const form_filter = document.getElementById('filter-by-type')
console.log(form_filter)

const state = []
console.log('My State', state)

const setState = () => {
    fetch('https://api.openbrewerydb.org/breweries')
    .then(resp => resp.json())
    .then(resp => resp.forEach(element => {
      state.push(element)  
    }))
}

const createElement = (brew) => {

        console.log('im here')

        //Set Up
        const liEl = document.createElement('li')
        const h2El = document.createElement('h2')
        const divEl = document.createElement('div')
        const sectionEl = document.createElement('section')
        const h3El = document.createElement('h3')
        const pEl = document.createElement('p')
        const pEl2 = document.createElement('p')
        const strongEl = document.createElement('strong')
        const sectionEl2 = document.createElement('section')
        const h3El2 = document.createElement('h3')
        const pEl3 = document.createElement('p')
        const sectionEl3 = document.createElement('section')
        const aEl = document.createElement('a')

        console.log('im also here')

        //Give classes and values

        divEl.setAttribute('class', 'type')
        sectionEl.setAttribute('class', 'address')
        sectionEl2.setAttribute('class', 'phone')
        sectionEl3.setAttribute('class', 'link')

        h2El.innerText = `${brew.name}`
        divEl.innerText = `${brew.brewery_type}`
        h3El.innerText = 'Address:'
        pEl.innerText = `${brew.street}`
        strongEl.innerText = `${brew.city}, ${brew.postal_code}`
        h3El2.innerText = 'Phone:'
        pEl3.innerText = `${brew.phone}`
        aEl.innerText = 'Visit Website'
        aEl.href = `${brew.website_url}`
        aEl.target = '_blank'
        console.log('here as well')

        //Append

        ulList.append(liEl)
        liEl.append(h2El, divEl, sectionEl, sectionEl2, sectionEl3)
        sectionEl.append(h3El, pEl, pEl2)
        pEl2.append(strongEl)
        sectionEl2.append(h3El2, pEl3)
        sectionEl3.append(aEl)
}

const setEventListenerForStateSearch = () => {
    const notShow = 'planning'
    let result
    form_state.addEventListener("submit", (event) => {
        console.log(event.target)
        event.preventDefault();
        ulList.innerHTML = ''
        const searchedState = document.getElementById('select-state').value
        console.log('state searched', searchedState)
        state.forEach(element => {
            if (element.state = searchedState && element.brewery_type !== notShow) {
             result = element
             console.log(result)
             createElement(result)
            }
        })
        form_state.reset()
    })
}

const setEventListenerForFilterSearch = () => {
    form_filter.addEventListener('change', (event) => {
        const dropdown_value = document.getElementById('filter-by-type').value
        console.log('my value',dropdown_value)
        const myResult = state.filter(brew => brew.brewery_type === dropdown_value.toLowerCase())
        console.log(myResult)
        ulList.innerHTML = ''
        myResult.forEach(brew => createElement(brew))
    })
}
const getBy = () => {
    
}



const run = () => {
setState()
setEventListenerForStateSearch()
setEventListenerForFilterSearch()
}

run()