let proizvodi = document.getElementById("proizvodi");

document.getElementById("logo").addEventListener("click", function() { window.location.href = "index.html" })

if (sumTotal() == 0){
    document.getElementsByClassName("dot_sum")[0].style.display = "none";
}
else{
    document.getElementsByClassName("dot_sum")[0].innerHTML = sumTotal();
}

if(localStorage.getItem("zadnje_posjecena") != null){
    document.getElementById("kategorija_head").innerHTML = localStorage.getItem("zadnje_posjecena").toUpperCase();
}
else{
    document.getElementById("kategorija_head").innerHTML = "SLOBODNO VRIJEME";
}

appendProducts()

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

function reduceAmount(name, kol){
    let val = localStorage.getItem(name);
    localStorage.setItem(name, parseInt(val) - 1);

    kol.innerHTML = '';
    let btnmin = document.createElement("button");
    btnmin.className = "btnmin";
    btnmin.innerHTML = "-";
    kol.appendChild(btnmin);
    kol.append(localStorage.getItem(name));
    let btnmax = document.createElement("button");
    btnmax.className = "btnmax";
    btnmax.innerHTML = "+";
    kol.appendChild(btnmax);

    btnmin.addEventListener("click", function(){
        reduceAmount(name, kol);
    })
    btnmax.addEventListener("click", function(){
        increaseAmount(name, kol);
    })

    if(parseInt(val) - 1 < 0){
        localStorage.removeItem(name);
        proizvodi.innerHTML = '';
        appendProducts();
    }

    if (sumTotal() == 0){
        document.getElementsByClassName("dot_sum")[0].style.display = "none";
    }
    else{
        document.getElementsByClassName("dot_sum")[0].innerHTML = sumTotal();
    }
}

function increaseAmount(name, kol){
    let val = localStorage.getItem(name);
    localStorage.setItem(name, parseInt(val) + 1);

    kol.innerHTML = '';
    let btnmin = document.createElement("button");
    btnmin.className = "btnmin";
    btnmin.innerHTML = "-";
    kol.appendChild(btnmin);
    kol.append(localStorage.getItem(name));
    let btnmax = document.createElement("button");
    btnmax.className = "btnmax";
    btnmax.innerHTML = "+";
    kol.appendChild(btnmax);

    btnmin.addEventListener("click", function(){
        reduceAmount(name, kol);
    })
    btnmax.addEventListener("click", function(){
        increaseAmount(name, kol);
    })

    if (sumTotal() == 0){
        document.getElementsByClassName("dot_sum")[0].style.display = "none";
    }
    else{
        document.getElementsByClassName("dot_sum")[0].style.display = "block";
        document.getElementsByClassName("dot_sum")[0].innerHTML = sumTotal();
    }
}

function appendProducts() {
    let proizvod = document.createElement("div");
    proizvod.className = "proizvod";
    proizvod.innerHTML = "NAZIV PROIZVODA";
    proizvodi.appendChild(proizvod);

    let kol = document.createElement("div");
    kol.className = "kolicina";
    kol.innerHTML = "KOLICINA"
    proizvodi.appendChild(kol)

    proizvodi.appendChild(document.createElement("hr"));

    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == "zadnje_posjecena")
            continue;
        let named = localStorage.key(i);
        
        let proizvod = document.createElement("div");
        proizvod.className = "proizvod";
        proizvod.innerHTML = localStorage.key(i).split("-")[0]
        proizvodi.appendChild(proizvod);

        let kol = document.createElement("div");
        kol.className = "kolicina";
        let btnmin = document.createElement("button");
        btnmin.className = "btnmin";
        btnmin.innerHTML = "-";
        kol.appendChild(btnmin);
        kol.append(localStorage.getItem(named));
        let btnmax = document.createElement("button");
        btnmax.className = "btnmax";
        btnmax.innerHTML = "+";
        kol.appendChild(btnmax);
        proizvodi.appendChild(kol)

        btnmin.addEventListener("click", function(){
            reduceAmount(named, kol)
        })
        btnmax.addEventListener("click", function(){
            increaseAmount(named, kol)
        })
    }
}
