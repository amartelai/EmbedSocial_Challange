fetchData();
function fetchData() {
    fetch("data.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const html = data
                .map(post => {
                    let postlogo = "";
                    if (post.source_type==="facebook")
                        postlogo = "icons/facebook.svg";
                    else
                        postlogo = "icons/instagram-logo.svg";

                    const date = new Date(post.date);
                    let formattedDate = date.toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })

                    return `<div class="post" name="post" style="display: none" onclick="showPost(this)">
                                <div class="profile">
                                    <div class="profile-image"><img src="${post.profile_image}"></div> 
                                    <div class="profile-info"><div class="name">${post.name}</div><div class="date">${formattedDate}</div></div>
                                    <div class="logo"><img src="${postlogo}"></div>
                                </div>
                                <div class="image"><img src="${post.image}"></div>
                                <div class="caption">${post.caption}</div>
                                <hr>
                                <div class="likes"><img src="icons/heart.svg"> 
                                        <div style = "    margin-left: 20px; margin-top: -18px; margin-left: 23px;">
                                                ${post.likes}
                                        </div>
                                </div>
                            </div>
                            `;
                }).join("");


            document.querySelector(".posts").insertAdjacentHTML("beforeend", html);

        })
        .then(loadMore)
}
function loadMore(){
    let br=0;
    let posts = document.getElementsByName("post");
    let buton = document.getElementById("buton");
    for (let i=0;i<posts.length;i++){
        if (posts[i].style.display === "none") {
            posts[i].style.display = "block";
            br++;
        }
        if (posts[i+1]===undefined)
            buton.style.display = "none";
        if (br===4)
            return;
    }
}

function showPost(post){

    post.removeAttribute("onclick");
    let profile = post.childNodes[1];
    let image = post.childNodes[3];
    let caption = post.childNodes[5];
    let likes = post.childNodes[9];

    post = `<div class="post">${image.outerHTML}${profile.outerHTML}<hr>${caption.outerHTML}${likes.outerHTML}</div>`;
    post = new DOMParser().parseFromString(post, "text/html").body.firstChild;

    console.log(post);
    post.style.border = "none";
    post.style.padding = "0";
    let modal = document.getElementById("myModal");

    document.querySelector(".modal-content").append(post);
    modal.style.display = "block";
}
