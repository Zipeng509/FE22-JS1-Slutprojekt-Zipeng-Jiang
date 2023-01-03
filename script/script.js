const formElement = document.getElementById("form");
const contentElement = document.getElementById("content");
const error = document.getElementById("error");

//Url
function apiUrl(options) {
  return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7679ce306682d707d264de1673508f7d&text=${options.text}&sort=${options.sort}&per_page=${options.pageSize}&page=${options.page}&format=json&nojsoncallback=1`;
}


//Photo Image URLs från flickr
function getImageUrl(item, size) {
  return `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_${size}.jpg`;
}


//Fetch data från Flickr
async function searchPhotoByText(options){
  console.log(options);
  const response = await fetch(apiUrl(options));
  const data = await response.json();
  displayImg(data.photos.photo, options.imageSize);
}

function displayImg(imgArray, size){
  contentElement.innerHTML = "";
  imgArray.forEach((imgData) => {
    const img = document.createElement("img");
    img.src = getImageUrl(imgData, size);
    contentElement.append(img);
  });
}

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  let searchText = event.target[1].value;
  let imageAmount = event.target[2].value;

    // console.log(searchText);
    // console.log(imageAmount);

  //error om search Input är tom
  error.innerHTML = "";

  if (searchText === undefined || searchText === "") {
    error.innerHTML = `<h1 id='errorText'><p>Please fill in the search field!</p></h1>`;
  } else {
    //kvantitet på bild
    if (imageAmount === undefined || imageAmount === "") {
      imageAmount = 10;
    }

    const imageSizeSM = document.getElementById("imageSizeSm");
    const imageSizeMD = document.getElementById("imageSizeMd");
    const imageSizeLG = document.getElementById("imageSizeLg");

    //checkbox
    if (imageSizeSM.checked) {
      imageSize = imageSizeSM.value;
    }

    if (imageSizeMD.checked) {
      imageSize = imageSizeMD.value;
    }

    if (imageSizeLG.checked) {
      imageSize = imageSizeLG.value;
    }

    const dateUploaded = document.getElementById("dateUploaded");
    const relevance = document.getElementById("relevance");
    const interesting = document.getElementById("interesting");

    //checkbox
    if (dateUploaded.checked) {
      sort = dateUploaded.value;
    }

    if (relevance.checked) {
      sort = relevance.value;
    }

    if (interesting.checked) {
      sort = interesting.value;
    }

    await searchPhotoByText({
      page: 1,
      pageSize: imageAmount,
      sort,
      text: searchText,
      imageSize,
    });
  }

  //animation för search button
  //animejs
  const animationInfo = {
    targets: "#searchBtn",
    keyframes: [{ translateX: 250 }, { translateX: 0 }],
    duration: 4000,
    easing: "easeOutElastic(1, .8)",
    loop: false,
    backgroundColor: "hsl(0, 50%, 80%)",
    borderRadius: ["0%", "50%"],
    easing: "easeInOutQuad",

  };

  anime(animationInfo);
});
