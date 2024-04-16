import { data } from "./data.js";

let proizvodi = document.getElementById("proizvodi");

if (sumTotal() == 0){
    document.getElementsByClassName("dot_sum")[0].style.display = "none";
}
else{
    document.getElementsByClassName("dot_sum")[0].innerHTML = sumTotal();
}

appendProduct()

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

function appendProduct() {
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) == "zadnje_posjecena")
            continue;
        let name = localStorage.key(i);
        
        let proizvod = document.createElement("div");
        proizvod.className = "proizvod";
        proizvod.innerHTML = name;
        proizvodi.appendChild(proizvod);

        let kol = document.createElement("div");
        kol.className = "kolicina";
        let btnmin = document.createElement("button");
        btnmin.innerHTML = "-";
        kol.appendChild(btnmin);
        kol.append(localStorage.getItem(name));
        let btnmax = document.createElement("button");
        btnmax.innerHTML = "+";
        kol.appendChild(btnmax);
        proizvodi.appendChild(kol)
    }
}
