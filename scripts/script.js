import { data } from "./data.js";

var kategorijaHead = document.getElementById("kategorija_head")

document.getElementById("slobVr").addEventListener("click", function() { changeCategory("Slobodno vrijeme") })
document.getElementById("trc").addEventListener("click", function() { changeCategory("Trcanje") })
document.getElementById("hod").addEventListener("click", function() { changeCategory("Hodanje") })
document.getElementById("nog").addEventListener("click", function() { changeCategory("Nogomet") })
document.getElementById("fut").addEventListener("click", function() { changeCategory("Futsal") })
document.getElementById("kos").addEventListener("click", function() { changeCategory("Kosarka") })
document.getElementById("ten").addEventListener("click", function() { changeCategory("Tenis") })
document.getElementById("ruk").addEventListener("click", function() { changeCategory("Rukomet") })
document.getElementById("odb").addEventListener("click", function() { changeCategory("Odbojka") })
document.getElementById("boks").addEventListener("click", function() { changeCategory("Boks") })

if (sumTotal() == 0){
    document.getElementsByClassName("dot_sum")[0].style.display = "none";
}
else{
    document.getElementsByClassName("dot_sum")[0].innerHTML = sumTotal();
}

window.onload = function() {
    if(localStorage.getItem("zadnje_posjecena") != null){
        changeCategory(localStorage.getItem("zadnje_posjecena"));
    }
    else{
        changeCategory("Slobodno vrijeme");
    }
}

function changeCategory(categoryName) {
    localStorage.setItem("zadnje_posjecena", categoryName)
    kategorijaHead.innerHTML = categoryName.toUpperCase();
    let products = fetchCategoryData(categoryName);
    document.getElementById("proizvodi").innerHTML = '';
    for(let i = 0; i < products.length; i++){
        createCard(products, i, categoryName);
    }
}

function fetchCategoryData(categoryName){
    for(const i of data.categories){
        if(i.name == categoryName){
            return i.products;
        }
    }
}

function addToCart(i, categoryName){
    console.log(i+categoryName)
    if(localStorage.getItem(i+categoryName) == null){
        localStorage.setItem(i+categoryName, 1);
    }
    else{
        let val = localStorage.getItem(i+categoryName);
        localStorage.setItem(i+categoryName, parseInt(val) + 1);
    }
}

function sumTotal(){
    let sum = 0;
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == "zadnje_posjecena")
            continue;
        let name = localStorage.key(i);
        sum += parseInt(localStorage.getItem(name));
    }
    return sum
}

console.log(sumTotal());

function createCard(products, i, categoryName){
    let card = document.createElement("div");
    card.className = "kartica";
    
    let image = document.createElement("img");
    image.src = products[i].image;
    image.alt = 'slika' + String(i);
    card.appendChild(image);

    let cart_hov = document.createElement("div");
    cart_hov.className = "cart_hov";
    let icn = document.createElement("img");
    icn.src = "images/shopping-cart-icon64.png";
    icn.alt = "Cart icon";
    cart_hov.appendChild(icn);
    card.appendChild(cart_hov);

    cart_hov.addEventListener("click", function() {
        addToCart(i, categoryName);
        dot.style.display = "block";
        dot.innerHTML = localStorage.getItem(i+categoryName);
        document.getElementsByClassName("dot_sum")[0].style.display = "block";
        document.getElementsByClassName("dot_sum")[0].innerHTML = sumTotal();
    });

    let dot = document.createElement("div");
    dot.className = "dot";
    if(localStorage.getItem(i+categoryName) == null){
        dot.style.display = "none";
    }
    else{
        dot.innerHTML = localStorage.getItem(i+categoryName)
    }
    card.appendChild(dot)

    let ime = document.createElement("div");
    ime.className = "ime";
    ime.innerHTML = products[i].name;
    card.appendChild(ime);

    let kateg = document.createElement("div");
    kateg.className = "kategorija";
    kateg.innerHTML = categoryName;
    card.appendChild(kateg);

    document.getElementById("proizvodi").appendChild(card);
}

console.log(localStorage)
for(let i = 0; i < localStorage.length; i++){
    if(localStorage.key(i) == "zadnje_posjecena")
        continue;
    console.log(localStorage.key(i));
}