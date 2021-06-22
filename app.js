fetchPosts()
function fetchPosts(){
    fetch("data.json")
        .then((response) =>{
            return response.json()
        })
        .then(data =>{
            console.log(data)
            const userData = data.map((item) =>{
                let socialPhoto='';
                if (item.source_type === "facebook")
                     socialPhoto = "./icons/facebook.svg"

                else
                    socialPhoto ="./icons/instagram-logo.svg"

                const date = new Date(item.date);
                let formated_date = date.toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                })
                return `
                        <div class = "post" name = "post" style="display: none" >
                            <div class = "profile-header">
                                <div class = "profile-image" >
                                     <img src = "${item.profile_image}"  /> 
                                </div>
                                 <div class = "username">
                                   ${item.name} 
                                 </div>
                                 <div class = "soc_media">
                                        <img class = "social-media" src="${socialPhoto}" /> 
                                 </div>
                                
                            </div>
                             <div class = "date">
                                ${formated_date}
                             </div>
                             <div class = "photo"  >
                                 <img src = "${item.image}" style = "width: 100%;
                                     height: 350px; object-fit: cover; margin-top: 15px; " /> 
                            </div> 
                            <div class = "description">
                                ${item.caption}
                            </div>
                            <div>
                            <hr style = "border: 0.1px solid #e4e3e0">
                            </div>
                            <div class="favorite-icon">
                                  <img src="./icons/heart.svg" style="height: 20px; width: 20px; float: left; margin-right: 6px " />    
                            </div>  
                            <div class = "favorite">
                                ${item.likes}
                            </div>   
                        </div>
                `
            }).join("")
            document.querySelector(".posts").insertAdjacentHTML("beforeend", userData)
        })
        .then(loadMore)
}


    //
    // const loadMore = document.querySelector("#btn")
    // let currentItems = 2;
    // loadMore.addEventListener('click', (e) => {
    //     const postsList = [...document.querySelectorAll('.posts .post')];
    //     console.log(postsList)
    //     console.log("HSd")
    //     for(let i = currentItems; i < currentItems + 2; i++)
    //         if(postsList[i])
    //             postsList[i].style.display = "block"
    //
    //     currentItems += 2;
    //     if(currentItems >= postsList.length)
    //         e.target.style.display="none"
    //
    // })

function loadMore() {
    let br = 0;
    let posts = document.getElementsByName("post");
    let buton = document.getElementById("btn");
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].style.display === "none") {
            posts[i].style.display = "block";
            br++;
        }
        if (posts[i + 1] === undefined)
            buton.style.display = "none";
        if (br === 4)
            return;
    }
}




