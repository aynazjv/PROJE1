
function ElementBuilder(name) {
  this.element = document.createElement(name);

  this.text = function (text) {
    this.element.textContent = text;
    return this;
  }

  this.type = function (type) {
    this.element.type = type;
    return this;
  }

  this.appendTo = function (parent) {
    if (parent instanceof ElementBuilder) {
      parent
        .build()
        .appendChild(this.element);
    }
    else {
      parent.appendChild(this.element);
    }
    return this;
  }

  this.placeholder = function (text) {
    this.element.placeholder = text;
    return this;
  }

  this.hide = function () {
    this.element.style.display = 'none';
    return this;
  }

  this.show = function () {
    this.element.style.display = 'block';
    return this;
  }

  this.className = function (className) {
    this.element.className = className;
    return this;
  }

  this.onclick = function (fn) {
    this.element.onclick = fn;
    return this;
  }

  this.html = function (htmlvalue) {
    this.element.innerHTML = htmlvalue;
    return this;
  }

  this.value = function (value) {
    this.element.value = value;
    return this;
  }

  this.build = function () {
    return this.element;
  }

  this.width = function (value) {
    this.element.width = value;
    return this;
  }

  this.on = function (event, fn) {
    this.element.addEventListener(event, fn);
    return this;
  }

  this.getValue = function () {
    return this.element.value;
  }

  this.src = function (src) {
    this.element.src = src;
    return this;
  }

  this.dataset = function (value) {
    this.element.dataset = value;
    return this;
  }

  this.disabled = function (value) {
    this.element.disabled = value;
    return this;
  }
  this.focus = function () {
    this.element.focus();
  }
  this.alt = function (value) {
    this.element.alt = value;
    return this;
  }
}

const builder = {
  create: function (name) {
    return new ElementBuilder(name);
  },
};





const RAW_DATA = JSON.parse(`
{
  "items": [
    {
      "sys": { "id": "1" },
      "fields": {
        "title": "queen panel bed",
        "price": 10.99,
        "image": { "fields": { "file": { "url": "./images/product-1.jpeg" } } }
      }
    },
    {
      "sys": { "id": "2" },
      "fields": {
        "title": "king panel bed",
        "price": 12.99,
        "image": { "fields": { "file": { "url": "./images/product-2.jpeg" } } }
      }
    },
    {
      "sys": { "id": "3" },
      "fields": {
        "title": "single panel bed",
        "price": 12.99,
        "image": { "fields": { "file": { "url": "./images/product-3.jpeg" } } }
      }
    },
    {
      "sys": { "id": "4" },
      "fields": {
        "title": "twin panel bed",
        "price": 22.99,
        "image": { "fields": { "file": { "url": "./images/product-4.jpeg" } } }
      }
    },
    {
      "sys": { "id": "5" },
      "fields": {
        "title": "fridge",
        "price": 88.99,
        "image": { "fields": { "file": { "url": "./images/product-5.jpeg" } } }
      }
    },
    {
      "sys": { "id": "6" },
      "fields": {
        "title": "dresser",
        "price": 32.99,
        "image": { "fields": { "file": { "url": "./images/product-6.jpeg" } } }
      }
    },
    {
      "sys": { "id": "7" },
      "fields": {
        "title": "couch",
        "price": 45.99,
        "image": { "fields": { "file": { "url": "./images/product-7.jpeg" } } }
      }
    },
    {
      "sys": { "id": "8" },
      "fields": {
        "title": "table",
        "price": 33.99,
        "image": { "fields": { "file": { "url": "./images/product-8.jpeg" } } }
      }
    }
  ]
}
`)

class Product {
  constructor(title, image, id, price) {
    this.title = title;
    this.id = id;
    this.image = image;
    this.price = price;
  }
  init() {
    const productCenter = document.getElementsByClassName("products-center")[0];
    const product =
      builder.create("div")
        .className("product")
        .appendTo(productCenter);
    const imagecountainer =
      builder.create("div")
        .className("img-container")
        .appendTo(product);

    builder.create("img")
      .src(this.image)
      .className("product-img")
      .alt(this.title)
      .appendTo(imagecountainer);

    builder.create("button")
      .className("bag-btn")
      .html(`<i class="fas fa-shopping-cart"></i>
    <span>Add to cart</span>
    <i class="fas fa-shopping-cart"></i>`)
      .on("click", () => {
        const index = cartManager.cartItemsList.findIndex(x => x.id === this.id);
        if (index === -1) {
          const cartItem = new CartItem(
            this.id,
            this.price,
            this.title,
            this.image);

          cartItem.countainer++;
          cartItem.totalItemPrice = cartItem.price * cartItem.countainer;
          cartManager.cartItemsList.push(cartItem);
          document.getElementsByClassName("cart-items")[0].textContent =
            ++cartManager.totalItem;
        } else {
          const item = cartManager.cartItemsList[cartManager.cartItemsList.findIndex(x => x.id === this.id)]
          item.totalItem++;
          item.countainer++;
          item.totalItemPrice = item.price * item.countainer;
          document.getElementsByClassName("cart-items")[0].textContent =
            ++cartManager.totalItem;
        }

        cartManager.init();
      })
      .appendTo(imagecountainer);
    builder.create("h3").html(this.title).appendTo(product)
  }
}

class ProductBuilder {
  constructor() {
    RAW_DATA.items.map((item) => {
      const productInstance = new Product(
        item.fields.title,
        item.fields.image.fields.file.url,
        item.sys.id,
        item.fields.price
      );
      productInstance.init();

    });

  }
}
const productBuilderInstance = new ProductBuilder();


class CartItem {
  constructor(id, price, title, image) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.countainer = 0;
    this.image = image;
    this.totalItemPrice = 0;

  }
  increase = () => {
    this.countainer++;

  }
  decrease = () => {
    this.countainer--;
  }
}

class CartManager {
  constructor() {
    this.cartItemsList = [];
    this.totalItem = 0;
    this.cartOverlay = document.getElementsByClassName("cart-overlay")[0];
    this.cart = document.getElementsByClassName("cart")[0];
    document.getElementById('cartbutton')
      .addEventListener("click", () => {
        this.cartOverlay.className = "cart-overlay transparentBcg";
        this.cart.className = "cart showCart";
        this.init();
      });
  }
  calculateTotalprice() {

    return this.cartItemsList.reduce((acc, item) => {
      return item.price * item.countainer + acc;
    }
      , 0
    );
  }


  init() {
    this.cart.innerHTML = "";

    builder.create("i").className("fas fa-window-close close-cart")
      .on("click", () => {
        this.cartOverlay.classList.remove("transparentBcg");
        this.cart.classList.remove("showCart");
      })
      .appendTo(this.cart);
    builder.create("h2").html("Your Cart").appendTo(this.cart);
    this.cartItemsList.forEach((item) => {
      const cartItem = builder.create("section").className("cart-item").appendTo(this.cart);
      builder.create("img").src(item.image).alt(item.title).appendTo(cartItem);
      const itin = builder.create("div").appendTo(cartItem);
      builder.create("h4").html(item.title).appendTo(itin);
      builder.create("h5").html(item.totalItemPrice).appendTo(itin);
      builder.create("div").className("remove-item").html("remove").on("click", () => {
        const index = this.cartItemsList.findIndex(x => x.id === item.id);
        if(index !== -1) {
          this.totalItem -= this.cartItemsList[index].countainer;
          this.cartItemsList.splice(index, 1);
          document.getElementsByClassName("cart-items")[0].textContent = cartManager.totalItem;
          cartManager.init();
        }
      })
        .appendTo(itin);
      const amDiv = builder.create("div").appendTo(cartItem);
      builder.create("i").className("fas fa-chevron-up")
        .on("click", () => {
          item.countainer++;
          item.totalItemPrice = item.countainer * item.price;
          cartManager.totalItem++;
          document.getElementsByClassName("cart-items")[0].textContent = cartManager.totalItem;
          cartManager.init();
        })
        .appendTo(amDiv);
      builder.create("div")
        .className("item-amount")
        .html(item.countainer)
        .appendTo(amDiv);
      builder.create("i").className("fas fa-chevron-down").on("click", () => {
        item.countainer--;
        item.totalItemPrice = item.countainer * item.price;
        cartManager.totalItem--;
        document.getElementsByClassName("cart-items")[0].textContent = cartManager.totalItem;
        if (item.countainer <= 0) {
          const index = cartManager.cartItemsList.findIndex(x => x.id === item.id);
          if(index !== -1) {
            this.cartItemsList.splice(index, 1);
          }
        }
        cartManager.init();

      })
        .appendTo(amDiv);
    });
    const crfooter = builder.create("section").className("cart-footer").appendTo(this.cart);
    builder.create("h3").html(`<h3>your total:<span>${this.calculateTotalprice()}</span></h3>`)
      .appendTo(crfooter);
    builder.create("button").className("banner-btn")
      .html("clear Cart").on("click", () => {
        cartManager.totalItem = 0;
        document.getElementsByClassName("cart-items")[0].textContent = cartManager.totalItem;
        cartManager.cartItemsList = [];
        cartManager.init();
      })
      .appendTo(crfooter);
  }

}
const cartManager = new CartManager();



