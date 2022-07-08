const APIUrl = 'https://api.openbrewerydb.org/breweries'
const ulList = document.getElementById('breweries-list')
const form_state = document.getElementById('select-state-form')
const form_filter = document.getElementById('filter-by-type')
const toShow = ['micro', 'regional', 'brewpub']


let state = {
    breweries: [],
    filter: []
}

const createElement = (brew) => {


        // console.log('im here')

        //create
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

        // console.log('im also here')

        //set attributes and values

        divEl.setAttribute('class', 'type')
        sectionEl.setAttribute('class', 'address')
        sectionEl2.setAttribute('class', 'phone')
        sectionEl3.setAttribute('class', 'link')

        h2El.innerText = `${brew.name}`
        divEl.innerText = `${brew.brewery_type}`
        h3El.innerText = 'Address:'
        pEl.innerText = (brew.street === null) ? '-' : `${brew.street}`
        strongEl.innerText = `${brew.city}, ${brew.postal_code}`
        h3El2.innerText = 'Phone:'
        pEl3.innerText = (brew.phone === null) ? '-' : `${brew.phone}`
        aEl.innerText = 'Visit Website'
        aEl.href = (brew.website_url === null) ? aEl.innerText = 'No Website' : `${brew.website_url}`
        aEl.target = '_blank'
        // console.log('here as well')

        //Append

        ulList.append(liEl)
        liEl.append(h2El, divEl, sectionEl, sectionEl2, sectionEl3)
        sectionEl.append(h3El, pEl, pEl2)
        pEl2.append(strongEl)
        sectionEl2.append(h3El2, pEl3)
        sectionEl3.append(aEl)
}

const setEventListenerForStateSearch = () => {
    form_state.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = document.getElementById('select-state').value

        fetch(`${APIUrl}?by_state=${value}&per_page=50`)
        .then(resp => resp.json())
        .then(resp => {
            state.breweries = resp
            console.log(state)
            ulList.innerHTML = ''
            
            state.breweries.forEach(element => {
                toShow.forEach(type => {
                    if ((element.brewery_type === type)) {
                    createElement(element)
                    }
                })
            })
            form_state.reset()
        })
        //Extension 2 part
        .then(() => {
            state.filter = []
            const citiesForm = document.querySelector('#filter-by-city-form')
            citiesForm.innerHTML = ''
            const myCities = []
            state.breweries.forEach(brewery => {
                if (!myCities.includes(brewery.city) || myCities.length === 0) {
                    createCitiesElements(brewery)
                    myCities.push(brewery.city)
                }
            })
        })
    }
)}

const setEventListenerForFilterSearch = () => {
    form_filter.addEventListener('change', () => {
        const dropdown_value = document.getElementById('filter-by-type').value

        fetch(`${APIUrl}?by_type=${dropdown_value}&per_page=50`)
        .then(resp => resp.json())
        .then( resp => {
            state.breweries = resp
            console.log('my value',dropdown_value, 'state', state)
            ulList.innerHTML = ''
            state.breweries.forEach(element => {
                toShow.forEach(type => {
                    if ((element.brewery_type === type)) {
                    createElement(element)
                    }
                })
            })
        })
    })
}

// Extension 1

const createSearchSection = () => {
    //create
    const parent = document.getElementById("breweries-list").parentNode.parentNode
    const article = document.getElementById("breweries-list").parentNode

    const headerEl = document.createElement('header')
    const formEl = document.createElement('form')
    const labelEl = document.createElement('label')
    const h2El = document.createElement('h2')
    const inputEl = document.createElement('input')

    // set values and attributes
    headerEl.setAttribute('class', 'search-bar')
    formEl.autocomplete = 'off'
    formEl.addEventListener('submit', (event) => {
        event.preventDefault()
    })
    formEl.setAttribute('id', 'search-breweries-form')
    labelEl.htmlFor = 'search_breweries'
    h2El.innerText = 'Search breweries:'
    inputEl.name = 'search_breweries'
    inputEl.type = 'text'
    inputEl.setAttribute('id', 'search-breweries')
    console.log(parent)
    
    //Append
    parent.insertBefore(headerEl, article)
    headerEl.append(formEl)
    formEl.append(labelEl, inputEl)
    labelEl.append(h2El)
}

const setEventListenerforSearchSection = () => {
    const searchBreweries = document.getElementById('search-breweries')

    searchBreweries.addEventListener('input', () => {
        const searchValue = searchBreweries.value
        fetch(`${APIUrl}/search?query=${searchValue}&per_page=50`)
        .then(resp => resp.json())
        .then(resp => {
            state.breweries = resp
            ulList.innerHTML = ''
            state.breweries.forEach(element => {
                toShow.forEach(type => {
                    if ((element.brewery_type === type)) {
                    createElement(element)
                    }
                })
            })
        })
    })
}

// Extension 2

const createFilterByCityMenu = () => {
    const aside = document.querySelector('#filter-by-type-form').parentNode

    //create
    const divEl = document.createElement('div')
    const h3El = document.createElement('h3')
    const buttonEl = document.createElement('button')
    const formEl = document.createElement('form')

    //set values and attributes
    divEl.setAttribute('class', 'filter-by-city-heading')
    buttonEl.setAttribute('class', 'clear-all-btn')
    formEl.setAttribute('id', 'filter-by-city-form')

    h3El.innerText = 'Cities'
    buttonEl.innerText = 'clear all'
    buttonEl.style.cursor = 'pointer'

    // Event Listner

    buttonEl.addEventListener('click', () => {
        formEl.innerHTML = ''
    })
    //append
    aside.append(divEl)
    divEl.append(h3El, buttonEl)
    aside.append(formEl)
}

const createCitiesElements = (brew) => {
    const citiesForm = document.querySelector('#filter-by-city-form')

    const input = document.createElement('input')
    const label = document.createElement('label')

    input.type = 'checkbox'
    input.name = `${brew.city}`
    input.value = `${brew.city}`

    input.addEventListener('change', (event) => {
        ulList.innerHTML = ''
        console.log('my event', event.target.checked)
        if (event.target.checked === true) {
            state.filter.push(event.target.name)
            console.log(state.filter)
            filterByCity()
        }
        else {
            state.filter.splice(state.filter.indexOf(event.target.name), 1)
            console.log(state.filter)
            filterByCity()
        }
    })

    label.htmlFor = `${brew.city}`
    label.innerText = `${brew.city}`

    citiesForm.append(input, label)
}

const filterByCity = () => {
    if (state.filter.length === 0) {
        state.breweries.forEach(element => {
            toShow.forEach(type => {
                if ((element.brewery_type === type)) {
                createElement(element)
                }
            })
        })
    }
     else {
        const myBreweries = []
        state.breweries.forEach(brew => {
            state.filter.forEach(state => {
                if (brew.city === state) {
                    myBreweries.push(brew)
                }
            })
        })
        console.log(myBreweries)
        myBreweries.forEach(element=> {
                toShow.forEach(type => {
                    if ((element.brewery_type === type)) {
                        createElement(element)
                    }
                })
        })
    }
}


const run = () => {
setEventListenerForStateSearch()
setEventListenerForFilterSearch()
createSearchSection()
setEventListenerforSearchSection()
createFilterByCityMenu()
}

run()


