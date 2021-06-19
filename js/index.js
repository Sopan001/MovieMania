const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");


const handleSearch = () =>{
    if(searchBar.value)
    {
        console.log("in");
        window.location.href = `recommendation.html?movieName=${searchBar.value}`;
    }
    else
    {
        swal({
            title: "Oops...",
            text: "Please Enter Movie Name!",
            icon: "warning",
            button: "Okay",
          });
    }
}


searchBtn.addEventListener("click",handleSearch);
