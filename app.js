function fetchPosts(){
    fetch("data.json")
        .then((response) =>{
            return response.json()
        })
        .then(data =>{
            console.log(data)
            const userData = data.map((item) =>{
                let socialPhoto='';
                if (item.source_type === "facebook"){
                     socialPhoto = "./icons/facebook.svg"
                }
                else {
                    socialPhoto ="./icons/instagram-logo.svg"
                }

                return `
                        <div class = "post">
                            <div class = "profile-header">
                                <div class = "profile-image" >
                                     <img src = "${item.profile_image}"  /> 
                                </div>
                                 <div class = "username">
                                   ${item.name} 
                                 </div>
                                
                            </div>
                            
                            
                             <div class = "date">
                                ${item.date}
                             </div>
                             <div class = "photo"  >
                                 <img src = "${item.image}" style = "width: 100%;
                                     height: 350px; object-fit: cover; margin-top: 15px; border-radius: 0px " /> 
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

}


fetchPosts()