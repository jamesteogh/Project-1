const formEl = document.querySelector("#search-everything")
const stockContainerEl = document.querySelector(".stock-container")
const stockTableEl = document.querySelector(".tabledata")
const generateQueryUrl = queryTerm => {
    return `https://api.twelvedata.com/time_series?interval=1min&apikey=03123b25aa2f4028818b13c9ea66f3a2&symbol=${queryTerm}&outputsize=3`
}

const formSubmitted = async (e) => {
    e.preventDefault()
    const tickerInput = document.querySelector("#ticker-input").value
    const tickerData = await fetchData(tickerInput) // invoke fetchData function to do API call
    console.log(tickerData.values[0].close);
    const priceInput = document.querySelector("#price-input").value
    const dateInput = document.querySelector("#date-input").value
    const selectInput = document.querySelector("#input-select").value
    const quantityInput = document.querySelector("#quantity").value
    // renderData(priceInput, dateInput)
    const tickerPrice = tickerData.values[0].close
    const tickerSym = tickerData.meta.symbol 
    rowData(dateInput, tickerSym, selectInput, quantityInput, priceInput, tickerPrice)
}

const fetchData = async(ticker) => {
    try {
        const response = await fetch(generateQueryUrl(ticker))
        const data = await response.json()
        return data
    // console.log(data.values[0].close)
    } catch (err) {
        console.log('err: ', err)
    }
}

const rowData = (dateInput, tickerInput, selectInput, quantityInput, priceInput, currentPrice) => {
    const tableElement = document.querySelector("table")
    
    const rowElement = document.createElement("tr")
    
    const dateElement = document.createElement("td")
    dateElement.innerHTML = dateInput

    const securityElement = document.createElement("td")
    securityElement.innerHTML = tickerInput

    const actionElement = document.createElement("td")
    actionElement.innerHTML = selectInput

    const quantityElement = document.createElement("td")
    quantityElement.innerHTML = quantityInput

    const priceElement = document.createElement("td")
    priceElement.innerHTML = "$" + priceInput

    const totalElement = document.createElement("td")
    totalElement.innerHTML = "$" + (priceInput * quantityInput)

    const currentpriceElement = document.createElement("td")
    currentpriceElement.innerHTML = "$" + currentPrice

    rowElement.append(dateElement, securityElement, actionElement, quantityElement, priceElement, totalElement, currentpriceElement)

    tableElement.append(rowElement)
}

formEl.addEventListener("submit", formSubmitted)