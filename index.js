// // const url = "https://api.twelvedata.com/stocks?apikey=03123b25aa2f4028818b13c9ea66f3a2"
// const url="https://api.twelvedata.com/time_series?interval=1min&apikey=03123b25aa2f4028818b13c9ea66f3a2&symbol="
// function stockGenerator (ticker) {
//   return url + ticker
// }
// async function fetchData(ticker) {
//   try {
//     const response = await fetch(stockGenerator(ticker))
//     const data = await response.json() // get json format

//     console.log(data.values[0].close)
    

//   } catch (err) {
//     console.log('err: ', err)
//   }
// }

// // fetchData("GOOGL");

const formEl = document.querySelector("#search-everything")
const generateQueryUrl = queryTerm => {
    return `https://api.twelvedata.com/time_series?interval=1min&apikey=03123b25aa2f4028818b13c9ea66f3a2&symbol=${queryTerm}&outputsize=3`
}

const fetchData = async(ticker) => {
    try {
        const response = await fetch(generateQueryUrl(ticker))
        const data = await response.json()
        renderStock(data)
            // console.log(data);
            // console.log(data.values[0].close)


    } catch (err) {
        console.log('err: ', err)
    }
}

const formSubmitted = (e) => {
    e.preventDefault()
    const inputEl = document.querySelector('#search-term').value
    fetchData(inputEl) //input.value

    const purchasedPrice = document.querySelector("#purchased-price").value
    const purchasedDate = document.querySelector("#purchased-date").value
    renderData(purchasedPrice, purchasedDate)
}

const renderStock = (data) => {
    const stockContainerEl = document.querySelector(".stock-container")
    const divEl = document.createElement("div")
    const stockTicker = data.meta.symbol 
    const currentPrice = data.values[0].close // last closed price of stock
    divEl.innerHTML = stockTicker + " " + "$" + parseFloat(currentPrice) 
    stockContainerEl.appendChild(divEl)
}

const renderData = (purchasedPrice, purchasedDate) => {
    const divEl = document.createElement("div")
    divEl.innerHTML = purchasedPrice + " " + purchasedDate
    stockContainerEl.appendChild(divEl)
}

formEl.addEventListener("submit", formSubmitted)