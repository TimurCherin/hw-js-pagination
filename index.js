const wrap = document.querySelector(".wrap")
let page = 1;
const moreBtn = document.querySelector(".add")
const perPage = 100
const url = `https://pixabay.com/api/?key=43135945-0fa309f6e906fbaa5e36dac33&q=yellow+flowers&image_type=photo&per_page=${perPage}`
moreBtn.addEventListener("click",addPages)
function addPages() {
    page ++
    fetchImages(page)
}

function fetchUrl(page){
    const data = fetch(`${url}&page=${page}`)
    return data
}

function MarkUp(data){
    const markUp = data.map((obj) => {
        return `<img src=${obj.webformatURL}>`
    })
    wrap.insertAdjacentHTML("beforeend", markUp.join(""))
}

function fetchImages(page){
    fetchUrl(page).then((response) => response.json()).then((data) => {
        MarkUp(data.hits)
        if(data.totalHits/perPage <= page){
            moreBtn.classList.add("hide")
        }
    })
}

fetchImages(page)