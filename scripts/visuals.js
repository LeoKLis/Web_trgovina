function show_nav(){
    var x = document.getElementById("nav_links");
    if(x.style.display === "block" || window.innerWidth > 1024){
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}