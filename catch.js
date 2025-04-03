const accessKey = "R6KSKLQZk7Bp5tD3zugcLPbqgy_nEhw__8AFu-shus0"; // Add your Unsplash API access key

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let hansh = 1;

async function searchImage() {
    keyword = searchBox.value; // Fixed capitalization issue

    const url = `https://api.unsplash.com/search/photos?page=${hansh}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url); // Fixed typo `fatch` → `fetch`
        const data = await response.json();

        if (hansh === 1) {
            searchResult.innerHTML = ""; // Clear previous results on a new search
        }

        const results = data.results;

        results.map((result) => { // Fixed incorrect variable name
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block"; // Show the "Show More" button
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    hansh = 1; // Reset to first page
    searchImage();
});

// Load more images when clicking "Show More"

showMoreBtn.addEventListener("click",()=>{
    hansh++;
    searchImage();
});

//add thems mode
document.getElementById("btn").addEventListener("click",function(){
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme",document.body.classList.contains("dark-mode")?"dark":"light");
});
if(localStorage.getItem("theme")==="dark"){
    document.classList.add("dark-mode");
}else{
    document.classList.add("light-mode");
}

