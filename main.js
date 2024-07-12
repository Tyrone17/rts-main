console.log("Running main.js script");

let carts = document.querySelectorAll('.add-cart');
let changeQuantityBtns = document.querySelectorAll('.btn');

let items = [
    {
        name:'Product 1',
        tag: 'product1',
        price: 99,
        inCart:0
    },
    {
        name:'Product 2',
        tag: 'product2',
        price: 149,
        inCart:0
    },
    {
        name:'Product 3',
        tag: 'product3',
        price: 299,
        inCart:0
    },
    {
        name:'Product 4',
        tag: 'product4',
        price: 699,
        inCart:0
    }
]


for (let i=0; i<carts.length; i++){

    carts[i].addEventListener('click', () =>{
        console.log("added to cart!");
        cartTotals(items[i]);
        totalCost(items[i]);

    })
}

for (let i=0; i< changeQuantityBtns.length; i++){

    changeQuantityBtns[i].addEventListener('click', () =>{
        console.log("working");
        // changeQuantity(items[i]);
        
    })
}

function onLoad() {
    let productTotals = localStorage.getItem('productTotals');

    if (productTotals) {
        document.getElementById('cart').textContent = productTotals;
    } else {
        return;
    }
}

function setItem(item) {

    let cartItems = localStorage.getItem('itemInCart')
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[item.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [item.tag]: item
            }
        }
        cartItems[item.tag].inCart += 1;
    } else {
        item.inCart =  1;
        cartItems = {
            [item.tag]: item
        }
    }

    // item.inCart =  1;

    // cartItems = {
    //     [item.tag]: item
    // }

    localStorage.setItem('itemInCart', JSON.stringify(cartItems));    
}

function totalCost(item) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + item.price);
    } else {
        localStorage.setItem('totalCost', item.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('itemInCart');
    console.log("in storage as string object"+ cartItems);
    console.log(typeof cartItems);
    cartItems = JSON.parse(cartItems);
    console.log("JSON parsed string, object");
    console.log(cartItems);

    let itemContainer = document.getElementById('products');

    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && itemContainer) {
        // console.log('display function hit ');
        itemContainer.innerHTML = '';
        Object.values(cartItems).map(product =>{
            itemContainer.innerHTML += `
            <div class="product">
            <span class="material-symbols-outlined">cancel</span>
            <img src="./images/cover.png">
            <span>${product.name}</span>
            </div>
            <div class="price">R${product.price},00</div>
            <div class="quantity">
                <span class="material-symbols-outlined" id="add" name="${product.name}" onClick="changeQuantity('add', '${product.name}')">add_circle</span>
                <span>${product.inCart}</span>
                <span class="material-symbols-outlined" id="subtract" onClick="changeQuantity('subtract')">do_not_disturb_on</span>
            </div>
            <div class="total">
                R${product.inCart * product.price},00
            </div>
            `
        });

        itemContainer.innerHTML += `
        <div class="basketContainer">
            <h4 class="basketTotalDesc">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                R${cartCost},00
            </h4>
        </div>
        `
    } 
  
}

function changeQuantity(item, action ) {

    let cItems = localStorage.getItem('itemInCart');
    cItems = JSON.parse(cItems);

    let add = document.getElementById('add');
    let subtract = document.getElementById('subtract');

    console.log(item)
    console.log(action)

    if (item == 'add') {
        
        Object.values(cItems).map( i =>{
            if (i.name == action){
                console.log(i.inCart)
                console.log(i.tag)
                // cartTotals(i);
                // totalCost(i);
                // displayCart()
            }
            // console.log(i.price)
        })
  

        console.log()

    }

   

    // console.log(action)

    
}


function cartTotals (item){
    let productTotals = localStorage.getItem('productTotals');

    productTotals = parseInt(productTotals);

    console.log(item);

    if (productTotals) {
        localStorage.setItem('productTotals', productTotals +1);
        document.getElementById('cart').textContent = productTotals +1 ;
    } else{
        localStorage.setItem('productTotals', 1);
        document.getElementById('cart').textContent = 1;
    }
     
    setItem(item)
}

onLoad()
displayCart()