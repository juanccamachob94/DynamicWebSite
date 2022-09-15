function selectCategory(idtabs){
    containerArticles = document.getElementById("container-article");
    var tabs = document.getElementsByClassName("tabs-video");
    for(var i = 0; i < tabs.length; i++){
        if(tabs[i].id == idtabs){
            tabs[i].classList.add('tv-active');
            setTimeout(() => {
                containerArticles.classList.add("animate__backInLeft");
            }, 300);
        }else{
            tabs[i].classList.remove('tv-active');
            containerArticles.classList.remove("animate__backInLeft");
            
        }
    }
}
