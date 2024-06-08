let aktivnaKategorija;
const fetchCategoryReq = new XMLHttpRequest();
let categoryReq = new XMLHttpRequest();
const categoryFrame = document.getElementById('nav_links');
fetchCategoryReq.open('GET', '/home/getCategories');
fetchCategoryReq.send();
fetchCategoryReq.responseType = 'json';
fetchCategoryReq.onload = () => {
    console.log('hello?');
    const jsonContents = fetchCategoryReq.response;
    aktivnaKategorija = jsonContents.activeCategory;
    for(const [key, value] of Object.entries(jsonContents.categories)) {
        console.log('hello?');
        let kategorija = document.createElement('li');
        kategorija.className = 'kategorija';
        kategorija.innerHTML = value;
        categoryFrame.appendChild(kategorija);

        kategorija.addEventListener('click', () => {
            categoryReq.open('GET', `/home/getProducts/${key}`);
            categoryReq.send();
            categoryReq.responseType = 'json';
            categoryReq.onload = () => {
                let jsonContents = categoryReq.response;
                document.getElementById('kategorija_head').innerHTML = jsonContents.data.name.toUpperCase();
                document.getElementById('proizvodi').innerHTML = '';
                jsonContents.data.products.forEach((element) => {
                    createCard(element, jsonContents.data, jsonContents.cart);
                });
            }
        });
    }
}

let dotArr = document.querySelectorAll('.dot');
const product = document.querySelectorAll('.cart_hov');
product.forEach((element, index) => {
    element.addEventListener('click', () => {
        // Kod za server (dodavanje u kosaricu)
        const productReq = new XMLHttpRequest();
        productReq.open('GET', `/cart/add/${index + "_" + aktivnaKategorija}`);
        productReq.send();
        productReq.responseType = 'json';
        productReq.onload = () => {
            console.log(productReq.response);
            dotArr[index].style.display = 'block';
            dotArr[index].innerHTML = productReq.response.productTotal;
            let dot_sum = document.getElementById('dot_sum');
            dot_sum.style.display = 'block';
            dot_sum.innerHTML = productReq.response.cartTotal;
        }
    })
})

// Funkcionalnost hamburger menija
document.getElementById('hamburger').addEventListener('click', () => {
    let meni = document.getElementById('nav_links');
    if(meni.style.display === 'none'){
        meni.style.display = 'block';
    }
    else {
        meni.style.display = 'none';
    }
});

// Kod sa promjenom velicine i navbarom
window.addEventListener('resize', () => {
    if(window.innerWidth > 1024) {
        document.getElementById('nav_links').style.display = 'block';
    }
})

// Izrada kartica
function createCard(product, category, cart){
    let card = document.createElement('div');
    card.className = 'kartica';
    
    let image = document.createElement('img');
    image.src = product.image;
    image.alt = 'slika' + product.name;
    card.appendChild(image);

    let cart_hover = document.createElement('div');
    cart_hover.className = 'cart_hov';
    let icn = document.createElement('img');
    icn.src = 'images/shopping-cart-icon64.png';
    icn.alt = 'Cart icon';
    cart_hover.appendChild(icn);
    card.appendChild(cart_hover);

    let dot = document.createElement('div');
    dot.className = 'dot' 
    dot.className += cart[product.id + "_" + category.id] !== undefined ? ' show' : ' no_show';
    dot.innerHTML = cart[product.id + "_" + category.id];
    card.appendChild(dot);

    cart_hover.addEventListener('click', () => {
        // Kod za server (dodavanje u kosaricu)
        const productReq = new XMLHttpRequest();
        productReq.open('GET', `/cart/add/${product.id + "_" + category.id}`);
        productReq.send();
        productReq.responseType = 'json';
        productReq.onload = () => {
            console.log(productReq.response);
            dot.style.display = 'block';
            dot.innerHTML = productReq.response.productTotal;
            let dot_sum = document.getElementById('dot_sum');
            dot_sum.style.display = 'block';
            dot_sum.innerHTML = productReq.response.cartTotal;
        }
    });

    let ime = document.createElement('div');
    ime.className = 'ime';
    ime.innerHTML = product.name;
    card.appendChild(ime);

    let kateg = document.createElement('div');
    kateg.className = 'kategorija';
    kateg.innerHTML = category.name;
    card.appendChild(kateg);

    document.getElementById('proizvodi').appendChild(card);
}