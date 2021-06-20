const api_key='3b9a4ed1cc6b263951a62ad52b276f52';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}`;
const recommendedArea = document.getElementById("Recommended area");
const movieTitle = document.getElementById("movieTitle");
const movieOverview = document.getElementById("movieOverview");
const moviePopularity = document.getElementById("popularity");
const releaseDate = document.getElementById("releaseDate");
const voteCount = document.getElementById("voteCount");
const voteAverage = document.getElementById("voteAverage");
const poster = document.getElementById("poster");
const recommendationTitle = document.getElementById("recommendationTitle");


//Fetch Movie Information
const  fetchData = async(movieName) =>{
    const response = await fetch(`${url}&query=${movieName}`);
    const data = response.json();
    return data;
}

//Fetch Recommended Data
const recommendation_fetchData = async(id) =>{
    const recommendationUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&page=1`
    let recommendation = await fetch(`${recommendationUrl}`)
    recommendation = recommendation.json();
    return recommendation;
}

const errorMsg = async() =>{
    await swal({
        title: "Error",
        text: "Movie Not Found",
        icon: "error",
      });
      window.location.href="index.html";
}



// Function To get Perfect Movie
const getMovie = (data,movieName) =>{
    const{results} = data;
    console.log(results);
    let resultData = results.sort((a, b) => (a.vote_count > b.vote_count) ? 1 : -1)
    let movieDetails = resultData[0];
    console.log("In");
    resultData.forEach(result => {
        console.log(result.title == movieName);
        console.log(result.title,result.popularity)
        if(result.title.toLowerCase() == movieName.toLowerCase())
        {
            movieDetails = result;
        }
    });

    return movieDetails;
}


//Movie Info Card
const movieInfoCard = async(movieName) =>{
    const data = await fetchData(movieName);
    if(data.results.length != 0)
    {
        const {title,id,overview,popularity,vote_count,release_date,vote_average,poster_path} = getMovie(data,movieName);
        console.log("In card",popularity);
        if(overview != 'No description.')
        {
            movieTitle.innerText = title;
            movieOverview.innerText = overview;
            moviePopularity.innerText = popularity;
            voteCount.innerText = vote_count;
            releaseDate.innerText = release_date;
            voteAverage.innerText = `${vote_average}/10`;
            poster.src = `https://image.tmdb.org/t/p/w300/${poster_path}`;

            recommendation(id);//Call To Recommendation Function
        }
        else
        {
            await errorMsg();
        }
    }
    else
    {
        await errorMsg();
    }
}




//Recommendation Card
const recommendedCards = (Title,src,date,rating) =>{
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("lg:w-1/4","md:w-1/2","p-4","w-full");
    const a = document.createElement("a");
    a.classList.add("block","relative","h-48","rounded","overflow-hidden");
    const img = document.createElement("img");
    img.classList.add("object-contain","object-left", "w-full","h-full","block");
    img.src = src;

    a.href = `./recommendation.html?movieName=${Title}`;

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


    recommendedArea.appendChild(mainDiv);
    
}



//Function That Recommended and call call api function and call card function
const recommendation = async (id) =>{


    const recommendation = await recommendation_fetchData(id);

    const{results} = recommendation;

    if(results.length != 0)
    {
        results.forEach(result =>
            {
                const {title,release_date,poster_path,vote_average,backdrop_path} = result;
                recommendedCards(title,`https://image.tmdb.org/t/p/w300/${backdrop_path}`,release_date,vote_average);
            });
    }
    else
    {
        recommendationTitle.style.display = "None";
    }

}



// Main Code Start From Here
const validateData = async() =>
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieName = urlParams.get('movieName')
    if(movieName)
    {
        movieInfoCard(movieName); //Call To movie Information Function
    }
    else{
        await errorMsg();
        }
}


/*----------Main Function Call-------------------*/


validateData()


/*----------------------------------------------*/
