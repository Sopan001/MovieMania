const api_key='3b9a4ed1cc6b263951a62ad52b276f52';
const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`;
const trendingArea = document.getElementById("RecommendedArea");

const  fetchData = async() =>{
    const response = await fetch(url);
    const data = response.json();
    return data;
}

const recommendedCards = (Title,src,date,rating) =>{
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("lg:w-1/4","md:w-1/2","p-4","w-full");
    const a = document.createElement("a");
    a.classList.add("block","relative","h-48","rounded","overflow-hidden");
    const img = document.createElement("img");
    img.classList.add("object-contain","object-left", "w-full","h-full","block");
    img.src = src;

    const subDiv = document.createElement("div");
    subDiv.classList.add("mt-4");
    const h3 = document.createElement("h3");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");

    h3.classList.add("text-gray-500","text-xs","tracking-widest","title-font","mb-1");
    h2.classList.add("text-gray-900","title-font","text-lg","font-medium");
    p.classList.add("mt-1");


    h2.innerText = Title;
    h3.innerText = date;
    p.innerText = `${Math.floor(rating)}/10`;

    subDiv.appendChild(h3);
    subDiv.appendChild(h2);
    subDiv.appendChild(p);

    a.appendChild(img);


    mainDiv.appendChild(a);
    mainDiv.appendChild(subDiv);


    trendingArea.appendChild(mainDiv);
    
}







const trending = async () =>{


    const trendingData = await fetchData();

    const{results} = trendingData;


    if(results.length != 0)
    {
        results.forEach(result =>
            {
                const {name,release_date,poster_path,vote_average,backdrop_path} = result;
                recommendedCards(name,`https://image.tmdb.org/t/p/w300/${backdrop_path}`,release_date,vote_average);
            });
    }

}

trending();

