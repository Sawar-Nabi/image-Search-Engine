const form = document.querySelector("form");
const userInput = document.querySelector("input");
const images_container = document.querySelector(".images_container");
const button = document.querySelector(".more_button button");
const errorMsg = document.querySelector(".erMsg");
const download_image_wrapper = document.querySelector(
  ".download_image_wrapper"
);
// const model_image = document.querySelector("img_wrapper img");

let model = false;

const access_key = "wbeF9SEATtkLs9wc8op7k0lUDKcfRESFvKIwQZtInUo";
let pages = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  pages = 1;
  searchImage();
});

const searchImage = async () => {
  let value = userInput.value;
  try {
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${
      value === "" ? "random" : value
    }&client_id=${access_key}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();
    displayImage(data.results);
  } catch (error) {
    console.log(error);
  }
};

const displayImage = (data) => {
  if (pages === 1) {
    images_container.innerHTML = "";
  }

  if (data.length === 0) {
    errorMsg.innerHTML = `<p>Photo not found Please try another photo</p>`;
  } else {
    errorMsg.innerHTML = "";
    data.map((img) => {
      let div = document.createElement("div");
      div.className = "image_wrapper";
      let image = document.createElement("img");
      image.src = img.urls.regular;
      div.appendChild(image);
      images_container.appendChild(div);
    });
    button.style.display = "block";
    downloadImg();
  }
};

button.addEventListener("click", () => {
  pages++;
  searchImage();
});

searchImage();

const downloadImg = () => {
  const GetAllImages = document.querySelectorAll("img");
  GetAllImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      download_image_wrapper.style.display = "block";
      const imgUrl = e.target.getAttribute("src");
      download_image_wrapper.innerHTML = `
      <div class="model_wrapper">
          <div class="model_header">
            <a class="download_div" href="${imgUrl}" download><i class="fa-solid fa-download" ></i></a>
            <i class="fa-solid fa-xmark" onclick="closeModel()"></i>
          </div>
          <div class="img_wrapper">
          
            <div class="image_container">
              <img
                src="${imgUrl}"
                alt="Image"
              />
            </div>
          </div>
        </div>
      `;
    });
  });
};

function closeModel() {
  download_image_wrapper.style.display = "none";
}

function downloadImage(img) {
  console.log("hello", img);
}
