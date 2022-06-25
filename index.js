const formEl = document.querySelector("#search-everything")
const stockContainerEl = document.querySelector(".stock-container")
const stockTableEl = document.querySelector(".tabledata")
const generateQueryUrl = queryTerm => {
    return `https://api.twelvedata.com/time_series?interval=1min&apikey=03123b25aa2f4028818b13c9ea66f3a2&symbol=${queryTerm}&outputsize=3`
}

const formSubmitted = (e) => {
    e.preventDefault()
    const tickerInput = document.querySelector("#ticker-input").value
    fetchData(tickerInput) // invoke fetchData function to do API call

    const priceInput = document.querySelector("#price-input").value
    const dateInput = document.querySelector("#date-input").value
    renderData(priceInput, dateInput)
    // rowData(dateInput)
}

const fetchData = async(tickerInput) => {
    try {
        const response = await fetch(generateQueryUrl(tickerInput))
        const data = await response.json()
        renderStock(data)
            // console.log(data);
            // console.log(data.values[0].close)
    } catch (err) {
        console.log('err: ', err)
    }
}

// append stock ticker and current price using div
const renderStock = (data) => {
    
    const divEl = document.createElement("div")
    const stockTicker = data.meta.symbol 
    const currentPrice = data.values[0].close // last closed price of stock
    divEl.innerHTML = stockTicker + " " + "$" + parseFloat(currentPrice) 
    stockContainerEl.appendChild(divEl)
}
// append price and date using div
const renderData = (priceInput, dateInput) => {
    const divEl = document.createElement("div")
    divEl.innerHTML = "$" + priceInput + " " + dateInput
    stockContainerEl.appendChild(divEl)
    
}

// const rowData = (dateInput) => {
//     const createTr = document.createElement("tr")
//     createTr.innerHTML = <th scope="row">dateInput</th> // CHECK
//     stockTableEl.appendChild(createTr)
// }

formEl.addEventListener("submit", formSubmitted)