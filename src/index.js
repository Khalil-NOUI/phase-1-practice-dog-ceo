const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener("DOMContentLoaded", () => {
    
    imgFetcher(imgUrl)

})


//fetch images
async function imgFetcher(imgUrl) {

    try {     
        const res = await fetch(imgUrl)
        if (!res.ok) throw new Error(`server not responding, Status : ${res.status}`)
        const data = await res.json()
        displayHelp(data)
    }

    catch (error) {
        console.error("Error detected:", error.message);
    }
}

function displayHelp(data) {
    const imgDisplay = document.getElementById("dog-image-container")
    data.message.forEach((url) => {
        const img = document.createElement('img')
        img.setAttribute("src", `${url}`)
        img.setAttribute("alt", `dog picture`)
        imgDisplay.appendChild(img)
    })
}