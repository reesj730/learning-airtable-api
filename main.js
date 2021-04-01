

console.log("Hello, Airtable");

var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({ apiKey: "key86MAXxUo55ChQs" }).base(
  "appZw6j5yWVZHCRDj"
);

base("manhattan").select({}).eachPage(gotPageOfPhotos, gotAllPhotos);

const photos = [];

function gotPageOfPhotos(records, fetchNextPage) {
  console.log("gotPageOfPhotos()");
  photos.push(...records);
  fetchNextPage();
}

function gotAllPhotos(err) {
  console.log("gotAllPhotos()");

  if (err) {
    console.log("error loading photos");
    console.error(err);
    return;
  }

  showPhotos();
}

function showPhotos() {
  console.log("showPhotos()");

  const street = document.getElementById("street");

  photos.forEach((photo) => {
    const div = document.createElement("div");
    div.innerText = photo.fields.title;
    div.classList.add("sky-scraper");
    div.addEventListener("click", () => {
      showPhoto(photo, div);
    });
    street.appendChild(div);
  });
}


function showPhoto(photo, div) {
  console.log("showPhoto()", photo);

  const photoDetail = document.getElementById("photo-detail");

  photoDetail.getElementsByClassName("title")[0].innerText = photo.fields.title; //
  photoDetail.getElementsByClassName("description")[0].innerText =
    photo.fields.description;
  photoDetail.getElementsByClassName("more")[0].href = photo.fields.url;
  photoDetail.getElementsByClassName("cover-image")[0].src =
    photo.fields.image[0].url;

  const street = document.getElementById("street");
  const skyScrapers = street.getElementsByClassName("active");
  for (const skyScraper of skyScrapers) {
    skyScraper.classList.remove("active");
  }
  div.classList.add("active");

  photoDetail.classList.remove("hidden");
}

/* skate board animation */
document.onclick=function() {
  document.getElementById('skateboard').className='trick';
  setTimeout(function() {
    document.getElementById('skateboard').className='';
  },400);
}

