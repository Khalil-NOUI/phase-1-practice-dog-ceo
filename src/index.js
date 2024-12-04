const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";


/// DomContent ///

document.addEventListener("DOMContentLoaded", () => {
    fetcherAll(imgUrl, imgRender);
    fetcherAll(breedUrl, breedRender);
});

async function fetcherAll(ref, callBack) {
    try {
        const res = await fetch(ref);
        if(!res.ok) throw new Error(`server not responding, status : ${res.status}`);
        const data = await res.json();
        callBack(data);
    }
    catch(err) {
        displayError(err.message);
    };
}



// Helper Function//

function imgRender(data) {
    const imgDisplayer = document.getElementById("dog-image-container");
    const fragment = document.createDocumentFragment()
    data.message.forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `dog picture`;
        img.loading = "lazy";
        fragment.appendChild(img);
    });
    imgDisplayer.appendChild(fragment)
};



function breedRender(data) {

    const breedDisplayer = document.getElementById("dog-breeds");
    const fragment = document.createDocumentFragment()
    const input = document.getElementById("breed-dropdown");
    ////////////

    breedDisplayer.addEventListener("click", (e) => {
        e.target.style.color = "Green"
    })

    ////////////

    Object.keys(data.message).forEach((ele) => {
        const breedItem = document.createElement("li");
        breedItem.textContent = `${ele}`
        breedDisplayer.appendChild(breedItem)
    })
    breedDisplayer.appendChild(fragment)

    /////////////
    input.addEventListener("change", (e) => {
    breedFilter(breedDisplayer, data, e)
    })
};


function breedFilter(breedDisplayer, data, e) {
    const fragment = document.createDocumentFragment()
    breedDisplayer.replaceChildren();

        Object.keys(data.message).forEach((ele) => {

            if (ele.startsWith(e.target.value)) {

            const breedItem = document.createElement("li");
            breedItem.textContent = `${ele}`
            fragment.appendChild(breedItem)
            }
            else {
                null
            };
            
        });

        breedDisplayer.appendChild(fragment);
    };