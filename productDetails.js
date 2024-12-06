const url = "https://dummyjson.com/products";
let product = [];
//extracting id from the url
const urlParams = window.location.search;
console.log(urlParams);
const productId = urlParams.toString().slice(4);
console.log(typeof productId);

window.onload = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    product = data.products;
    // console.log("Product", product);

    const filterData = product.filter((item) => item.id === Number(productId));
    console.log(filterData);

    filterData.forEach((item) => {
      const mainDiv = document.getElementById("listProducts");
      const leftImages = document.getElementById("leftImages");
      const mainImageDiv = document.getElementById("mainImage");
      const productDetails = document.getElementById("productDetails");
      const smallImagesDiv = document.getElementById("smallImages");
      const priceRating = document.getElementById("price-rating");

      //   Creating elements
      const smallImage = document.createElement("img");
      const image = document.createElement("img"); //mainImage
      const title = document.createElement("p");
      const category = document.createElement("p");
      const description = document.createElement("p");
      const price = document.createElement("p");
      const rating = document.createElement("p");

      //setting image attributes
      smallImage.src = item.thumbnail;
      smallImage.classList.add("w-20", "object-contain");
      image.src = item.images[0];
      image.classList.add("w-[400px]", "h-[400px]", "object-contain"); // image.setAttribute("width", "50%");

      //setting product details attributes
      title.classList.add("text-xl", "text-start", "py-2", "truncate");
      category.classList.add(
        "font-semibold",
        "text-start",
        "py-2",
        "truncate",
        "capitalize"
      );
      description.classList.add("text-lg", "text-start", "py-2");
      price.classList.add(
        "font-medium",
        "text-black",
        "text-start",
        "border",
        "py-2",
        "max-w-[7.5rem]",
        "px-2"
      );
      rating.classList.add(
        "font-medium",
        "text-black",
        "text-start",
        "border",
        "py-2",
        "max-w-[6.5rem]",
        "px-2",
        "mt-5"
      );

      const productTitle = document.createTextNode(item.title);
      const productCategory = document.createTextNode(item.category);
      const productDescription = document.createTextNode(item.description);
      const productPrice = document.createTextNode(`Price: $ ${item.price}`);
      const productRating = document.createTextNode(
        `Rating: ${Math.round(item.rating * 10) / 10}`
      );

      title.appendChild(productTitle);
      category.appendChild(productCategory);
      description.appendChild(productDescription);
      price.appendChild(productPrice);
      rating.appendChild(productRating);

      smallImagesDiv.appendChild(smallImage);
      mainImageDiv.appendChild(image);

      leftImages.appendChild(smallImagesDiv);
      leftImages.appendChild(mainImageDiv);
      productDetails.appendChild(title);
      productDetails.appendChild(category);
      productDetails.appendChild(description);

      productDetails.appendChild(price);
      productDetails.appendChild(rating);
      mainDiv.appendChild(leftImages);
    });
  } catch (error) {
    console.log(error);
  }
};
