let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");

// displaying items

const displayProducts = () => {
  const productsData = filteredProducts
    .map((product) => {
      // console.log(product);
      const { id, title, image, price } = product;
      return `<article class="product">
    <img
      src=${image}
    class="product-img img"
      alt="image ${id}" 
    />
    <footer>
      <h5 class="product-name">${title}</h5>
      <span class="product-price">$${price}</span>
    </footer>
    </article>`;
    })
    .join("");
  productsContainer.innerHTML = productsData;
  // display some text when the search doesn't have matching results
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<h4>sorry , no products matched your search</h4>`;
    return;
  }
};

displayProducts();

const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  // keyup - fired when key released
  const inputValue = searchInput.value;

  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

// displaying the buttons dynamically
const companies = document.querySelector(".companies");

const displayButtons = () => {
  const uniqueCompanies = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  const companiesDisplayed = uniqueCompanies
    .map((company) => {
      // console.log(company);
      return `<button data-id=${company} class="company-btn">${company}</button>`;
    })
    .join("");

  companies.innerHTML = companiesDisplayed;
};

displayButtons();

//filtering the products based on the company
const companyButtons = document.querySelectorAll(".company-btn");

companyButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const el = e.target;

    if (el.classList.contains("company-btn")) {
      if (el.dataset.id === "all") {
        filteredProducts = [...products];
      } else {
        filteredProducts = products.filter((product) => {
          return product.company === el.dataset.id;
        });
      }
    }
    searchInput.value = "";
    displayProducts();
  });
});
