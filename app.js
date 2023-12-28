const products = [
  {
    "id": 1,
    "name": "Bag",
    "price": 29,
    "image": "./img/bag.png",
    "alt": "bag product"
  },
  {
    "id": 2,
    "name": "elizabetBag",
    "price":85,
    "image": "./img/elizabetBag.png",
    "alt": "bag product"
  },
  {
    "id": 3,
    "name": "alisBag",
    "price":125,
    "image": "./img/alisBag.png",
    "alt": "bag product"
  },
  {
    "id": 4,
    "name": "blueRolexWatch",
    "price":1200,
    "image": "./img/blue Rolex.png",
    "alt": "blueRolex"
  },
  {
    "id": 5,
    "name": "blackRolexWatch",
    "price":2500,
    "image": "./img/black Rolex.png",
    "alt": "blackRolex"
  },
  {
    "id": 6,
    "name": "whiteRolexWatch",
    "price":5200,
    "image": "./img/white Rolex.png",
    "alt": "whiteRolex"
  },
  {
    "id": 7,
    "name": "greenRolexWatch",
    "price":6500,
    "image": "./img/green Rolex.png",
    "alt": "greenRolex"
  },
  {
    "id": 8,
    "name": "goldenRolexWatch",
    "price":1300,
    "image": "./img/golden Rolex.png",
    "alt": "goldenRolex"
  },
  {
    "id": 9,
    "name": "pen",
    "price":3,
    "image": "./img/pen.png",
    "alt": "pen product"
  },
  {
    "id": 10,
    "name": "note-book",
    "price":12,
    "image": "./img/note-book.png",
    "alt": "note book product"
  },
  {
    "id": 11,
    "name": "Colored Pencils",
    "price": 11,
    "image": "./img/colored-pencils.png",
    "alt": "colored pencils product"
  },
  {
    "id": 12,
    "name": "Pencil",
    "price": 3,
    "image": "./img/pencil.png",
    "alt": "pencil product"
  },
  {
    "id": 13,
    "name": "Ruler",
    "price": 8,
    "image": "./img/ruler.png",
    "alt": "ruler product"
  },
  {
    "id": 14,
    "name": "Mug",
    "price": 17,
    "image": "./img/mug.png",
    "alt": "mug product"
  },
  {
    "id": 15,
    "name": "eraser",
    "price": 2,
    "image": "./img/eraser.png",
    "alt": "eraser product"
  },
  {
    "id": 16,
    "name": "Glue Stick",
    "price":5,
    "image": "./img/glue-stick.png",
    "alt": "glue stick product"
  }
]
const createCard = (product) => {
cardEle = document.createElement('div')
const img = document.createElement('img')
img.src = product.image
img.alt = product.alt

const products = document.getElementById('products')
const info = document.createElement('div')
const productName = document.createElement('p')
const control = document.createElement('div')
const price = document.createElement('span')
const button = document.createElement('button')

productName.innerText = product.name
price.innerText = `$${product.price}`
button.innerText = '+'
info.setAttribute('id', 'product-info')
button.setAttribute('data-id',product.id)
control.append(price,button)
info.append(productName,control)
cardEle.append(img,info)
products.appendChild(cardEle)
button.addEventListener('click',addToCart)
}
products.forEach(product => createCard(product)) 

const carts = []

function addToCart(e){
    const productId = e.target.getAttribute('data-id')
    // console.log(typeof productId)
    const selectedProduct = products.find((product) => product.id === parseInt(productId) )
    const existingProduct = carts.find((product) => product.id === selectedProduct.id)
    if (existingProduct){
      existingProduct.quantity += 1
    }else{
      carts.push({...selectedProduct, quantity:1})
    }
    updateCart()
}
        
function updateCart(){
    const cartSection = document.querySelector('.selectProduct');
    const totalPriceParagraph = document.querySelector('.totalPrice')
    cartSection.innerText = ''
    carts.forEach((product) => {
      if (product.quantity > 0) {  
        const productDiv = document.createElement('div')
        productDiv.classList = "proDiv"
             
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.alt;
        productImage.style.width = '70px';

        // Append the img element to the productDiv
        productDiv.appendChild(productImage);
              
        const productInfo = document.createElement('div')
        const productName = document.createElement('p')
        const productPrice = document.createElement('span')
        productName.innerText = product.name
        productName.classList = 'product-Name'
        productPrice.innerText = `$${product.price}`
        productPrice.classList = 'priceStyle'
        productInfo.append(productName,productPrice)
        productInfo.classList = 'product-info-cart'
        productDiv.appendChild(productInfo);

        const div = document.createElement('div')
        const quantityPart = document.createElement('div')
        const incButton = document.createElement('button')
        const quantity = document.createElement('span')
        const decButton = document.createElement('button')
        const removeProduct = document.createElement('button')
              
        incButton.innerText = '+'
        quantity.innerText = product.quantity
        decButton.innerText = '-'
        removeProduct.innerText = 'Remove'
        quantityPart.classList = 'quantity'
        decButton.classList = 'decButton'
        incButton.classList = 'incButton'
        removeProduct.classList = 'removeProduct'
        quantityPart.append(incButton,quantity,decButton)
        div.append(quantityPart,removeProduct)
        productDiv.appendChild(div)
        cartSection.append(productDiv);

        const incBut = productDiv.querySelector('.incButton');
        incBut.addEventListener('click',()=>{
        product.quantity += 1;
        quantity.innerText = product.quantity;
        updateCart()
      })
        const decBut = productDiv.querySelector('.decButton');
        decBut.addEventListener('click',() => {
          if(product.quantity > 0){
            product.quantity -= 1;
            quantity.innerText = product.quantity;
            updateCart()
          } else {
             productDiv.remove()
             const productIndex = carts.findIndex(product)
             carts.splice(productIndex,1)
             totalPrice -= product.price;
             totalPriceParagraph.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
           }
        })
             const removePro = productDiv.querySelector('.removeProduct')
             removePro.addEventListener('click', () => {
               productDiv.remove()
               const productIndex = carts.indexOf(product)
               carts.splice(productIndex,1)
               updateCart()
              })
            }
    })
    let totalPrice = carts.reduce((acc,product) => acc + (product.quantity* product.price) ,0)
    totalPriceParagraph.innerText = `Total Price: $${totalPrice}`;
  }

  const filteredProducts = [...products]
  const searchInput = document.querySelector('.form-control')
  const searchButton = document.querySelector('form button')

  searchInput.addEventListener('input',filter)

function filter(event){
event.preventDefault()
const searchTerm = searchInput.value.toLowerCase()
const selectedProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm))
const productElement = document.getElementById('products')
productElement.innerHTML = ''

filteredProducts.length = 0
filteredProducts.push(...selectedProducts)
  if (filteredProducts.length === 0){
    const noProductModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    noProductModal.show();
 }else {
    filteredProducts.forEach(product => {
    createCard(product)
  }) 
 }
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
})
searchButton.addEventListener('click',filter)

const closeButton = document.querySelector('#exampleModal .btn-secondary');
const closeIcon = document.querySelector('#exampleModal .btn-close');
closeButton.addEventListener('click',reload)
closeIcon.addEventListener('click',reload)

function reload() {
location.reload()
}



