function fetchProducts(){
    const productsReq = new XMLHttpRequest();
    productsReq.open('GET', '/cart/getAll');
    productsReq.send();
    productsReq.responseType = 'json';
    productsReq.onload = () => {
        let jsonContents = productsReq.response;
        console.log(jsonContents.products);
        for(const [key, value] of Object.entries(jsonContents.products)) {
            createProduct(key, value);
        }
    }
}

fetchProducts();

let cart = document.getElementById('proizvodi');
function createProduct(key, value) {
    let proizvod = document.createElement('div');
    proizvod.className = 'proizvod';
    proizvod.innerHTML = value.name;
    cart.appendChild(proizvod);

    let kolicina = document.createElement('div');
    kolicina.className = 'kolicina';
    let buttonMin = document.createElement('button');
    buttonMin.className = 'btnmin';
    buttonMin.innerHTML = '-';
    kolicina.appendChild(buttonMin);

    kolicina.append(value.quantity);

    let buttonMax = document.createElement('button');
    buttonMax.className = 'btnmax';
    buttonMax.innerHTML = '+';
    kolicina.appendChild(buttonMax);

    buttonMin.addEventListener('click', () => {
        let rmReq = new XMLHttpRequest();
        rmReq.open('GET', `/cart/remove/${key}`);
        rmReq.send();
        rmReq.responseType = 'json';
        rmReq.onload = () => {
            if(rmReq.response.productTotal == 0){
                cart.innerHTML = '';
                fetchProducts();
                document.getElementById('dot_sum').innerHTML = rmReq.response.cartTotal;
                if(rmReq.response.cartTotal == 0){
                    document.getElementById('dot_sum').className = 'no_show';
                }
            }
            else{
                kolicina.innerHTML = '';
                kolicina.appendChild(buttonMin);
                kolicina.append(rmReq.response.productTotal);
                kolicina.appendChild(buttonMax);
                document.getElementById('dot_sum').innerHTML = rmReq.response.cartTotal;
            }
        }
    });

    buttonMax.addEventListener('click', () => {
        let addReq = new XMLHttpRequest();
        addReq.open('GET', `/cart/add/${key}`);
        addReq.send();
        addReq.responseType = 'json';
        addReq.onload = () => {
            kolicina.innerHTML = '';
            kolicina.appendChild(buttonMin);
            kolicina.append(addReq.response.productTotal);
            kolicina.appendChild(buttonMax);
            document.getElementById('dot_sum').innerHTML = addReq.response.cartTotal;
        }
    });

    cart.appendChild(proizvod);
    cart.appendChild(kolicina);
}