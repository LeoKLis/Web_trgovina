
// Zamjena kategorije sa GET
const categoryReq = new XMLHttpRequest();
const category = document.querySelectorAll('.kategorija');
category.forEach((element, index) => {
    element.addEventListener('click', () => {
        categoryReq.open('GET', `/home/getProducts/${index}`);
        categoryReq.send();
        categoryReq.responseType = 'json';
        categoryReq.onload = () => {
            if(categoryReq.readyState == 4 && categoryReq.status == 200){
                let jsonContents = categoryReq.response;
                document.getElementById('kategorija_head').innerHTML = jsonContents.name.toUpperCase();
                document.getElementById('proizvodi').innerHTML = '';
                jsonContents.products.forEach((element) => {
                    createCard(element, jsonContents.name);
                });
            }
            else {
                console.log(`Error: ${categoryReq.status}`);
            }
        }
    })
});

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

function createCard(product, categoryName){
    let card = document.createElement('div');
    card.className = 'kartica';
    
    let image = document.createElement('img');
    image.src = product.image;
    image.alt = 'slika' + product.name;
    card.appendChild(image);

    let cart_hov = document.createElement('div');
    cart_hov.className = 'cart_hov';
    let icn = document.createElement('img');
    icn.src = 'images/shopping-cart-icon64.png';
    icn.alt = 'Cart icon';
    cart_hov.appendChild(icn);
    card.appendChild(cart_hov);

    let dot = document.createElement('div');
    dot.style.display = 'none';
    dot.className = 'dot';
    card.appendChild(dot);

    cart_hov.addEventListener('click', function() {
        // Kod za server (dodavanje u kosaricu)
    });

    let ime = document.createElement('div');
    ime.className = 'ime';
    ime.innerHTML = product.name;
    card.appendChild(ime);

    let kateg = document.createElement('div');
    kateg.className = 'kategorija';
    kateg.innerHTML = categoryName;
    card.appendChild(kateg);

    document.getElementById('proizvodi').appendChild(card);
}