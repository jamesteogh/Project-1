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

// append stock ticker and current price using div
// const renderStock = (data) => { 
//     const divEl = document.createElement("div")
//     const stockTicker = data.meta.symbol 
//     const currentPrice = data.values[0].close // last closed price of stock
//     divEl.innerHTML = stockTicker + " " + "$" + parseFloat(currentPrice) 
//     stockContainerEl.appendChild(divEl)
// }
// get data and return stock current price

// append price and date using div
const renderData = (priceInput, dateInput) => {
    const divEl = document.createElement("div")
    divEl.innerHTML = "$" + priceInput + " " + dateInput
    stockContainerEl.appendChild(divEl)    
}

const rowData = (dateInput, tickerInput, selectInput, quantityInput, priceInput, currentPrice) => {
    const createTr = document.createElement("tr")
    createTr.classList.add("trInner")
    createTr.innerHTML = '<th scope="row" class = "rowth"></th>' 
    stockTableEl.append(createTr)
    document.querySelector(".rowth").innerHTML = dateInput

    const createTd = document.createElement("td")
    createTd.innerHTML = tickerInput.toUpperCase() // Append Stock Ticker into the table
    document.querySelector(".trInner").appendChild(createTd)
    createTd.innerHTML = currentPrice // Append action Buy, Sell etc   
    document.querySelector(".trInner").appendChild(createTd)
}

formEl.addEventListener("submit", formSubmitted)