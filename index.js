//Fetch products data
//setting at global level
const url = "https://dummyjson.com/products";
let products = [];

const fetchProducts = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    products = data.products;
    console.log("this", products);

    //products Details
    data.products.forEach((item) => {
      if (item) {
        const newDiv = document.createElement("a"); //create a new div for each cell
        const image = document.createElement("img"); //create img
        const title = document.createElement("p");
        const price = document.createElement("p");

        //setting newDiv attributes
        newDiv.href = `/productDetails.html?id=${item.id}`; //this will navigate to another page ie products details
        newDiv.classList.add(
          "border-[1px]",
          "border-black",
          "p-2",
          "w-[218px]",
          "h-[339px]",
          "cursor-pointer",
          "hover:scale-105",
          "transition-all",
          "hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
        );

        //setting image attributes
        image.src = item.thumbnail;
        image.classList.add("w-full", "h-[200px]", "object-contain"); // image.setAttribute("width", "50%");

        //setting title attributes
        title.classList.add("font-semibold", "text-start", "py-2", "truncate");

        //setting price attributes
        price.classList.add(
          "font-medium",
          "text-green-500",
          "text-start",
          "py-4"
        );

        const productTitle = document.createTextNode(item.title);
        const productPrice = document.createTextNode(`$ ${item.price}`);

        title.appendChild(productTitle);
        price.appendChild(productPrice);

        const element = document.getElementById("listProducts");

        newDiv.appendChild(image);
        newDiv.appendChild(title);
        newDiv.appendChild(price);

        element.appendChild(newDiv);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Autoload data on autoClick
window.onload = function () {
  document.getElementById("fetchProducts").click();
};

//Filter category
const filterCategory = async () => {
  //todoo-------------------Getting values of elements---------------------------
  const value = document.getElementById("filterOptions").value; //from select option

  const rangeMinValue = document.getElementById("rangeMinValue").value; //from range min option
  document.getElementById("rangeNumberMin").innerText = "Min:" + rangeMinValue;

  const rangeMaxValue = document.getElementById("rangeMaxValue").value; //from range max option
  document.getElementById("rangeNumberMax").innerText = "Max:" + rangeMaxValue;

  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase(); //we got search value from search input

  //setting range to Number
  const setMinPrice = Number(rangeMinValue);
  const setMaxPrice = Number(rangeMaxValue);

  //todoo-------------------Filter Products---------------------------
  let filterData = products.filter((item) => {
    const priceRange = item.price >= setMinPrice && item.price <= setMaxPrice;

    const category = value === "all" || item.category === value;

    const searchItems =
      !searchValue ||
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue);

    return priceRange && category && searchItems;
  });

  console.log(value, filterData);

  //we have to clear this outside
  const element = document.getElementById("listProducts");
  element.innerHTML = "";

  //todoo--------Mapping data for each products-----------
  filterData.forEach((item) => {
    const newDiv = document.createElement("a"); //create a new div for each cell
    if (item) {
      const image = document.createElement("img"); //create img
      const title = document.createElement("p");
      const cate = document.createElement("p");
      const price = document.createElement("p");

      newDiv.href = `/productDetails.html?id=${item.id}`;

      //navigate to new page

      //setting newDiv attributes
      newDiv.classList.add(
        "border-[1px]",
        "border-black",
        "p-2",
        "w-[218px]",
        "h-[339px]",
        "cursor-pointer",
        "hover:scale-105",
        "transition-all",
        "hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)]"
      );

      //setting image attributes
      image.src = item.thumbnail;
      image.classList.add("w-full", "h-[200px]", "object-contain"); // another way ===> image.setAttribute("width", "50%");

      //setting title attributes
      title.classList.add("font-semibold", "text-start", "py-2", "truncate");
      cate.classList.add("font-semibold", "text-start", "py-2", "truncate");

      //setting price attributes
      price.classList.add(
        "font-medium",
        "text-green-500",
        "text-start",
        "py-4"
      );

      const productTitle = document.createTextNode(item.title);
      const productCate = document.createTextNode(item.category);
      const productPrice = document.createTextNode(`$ ${item.price}`);

      title.appendChild(productTitle);
      cate.appendChild(productCate);
      price.appendChild(productPrice);

      newDiv.appendChild(image);
      newDiv.appendChild(title);
      newDiv.appendChild(cate);
      newDiv.appendChild(price);

      element.appendChild(newDiv);
    }
  });
};
