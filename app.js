let loader = document.querySelector(".loader");
let img_container = document.querySelector(".img-container");

let initial_count = 5;
const apikey = "l4Mx_egpvBLDE5u6ypQUPJ_RANn-NEokNUUR4bsqbp4";
let apiurl = `https://api.unsplash.com/photos/random?count=${initial_count}&client_id=${apikey}`;

// variables used
let photos_array = []
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoader(){
    imagesLoaded++;

    if(imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
    }
}

function setAttribute(element, attribute_object){
    for(const attribute in attribute_object){
        element.setAttribute(attribute, attribute_object[attribute]);
    }
}


function displayPhotos(photos_array) {
    imagesLoaded = 0;
    totalImages = photos_array.length;

    photos_array.forEach(photo => {
        let item = document.createElement("a");
        setAttribute(item, {
            "href": photo.links.html,
            "class": "flex w-[400px]",
            "target": "_blank"
        });
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("class", "flex");
        // item.setAttribute("target", "_blank");

        let img = document.createElement("img");
        setAttribute(img, {
            "src": photo.urls.small,
            "title": photo.title,
            "class": "rounded-lg border-2 border-red-300"
        })

        img.addEventListener("load", imageLoader)

        item.appendChild(img);
        img_container.appendChild(item);
    });
}

async function getPhotos() {
    
    const response = await fetch(apiurl);
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("HTTP error rate-limiting!");
        } else {
            throw new Error("HTTP error: " + response.status);
        }
    }
    photos_array = await response.json();
    displayPhotos(photos_array);

}

window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready){
        ready = false;
        loader.hidden = false;
        getPhotos();
    }
})

getPhotos();
