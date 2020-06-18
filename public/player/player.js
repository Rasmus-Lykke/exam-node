const url = window.location.href;
let pictureId = url.substr(url.lastIndexOf("/") + 1);

// Appends a image tag with the image to the id "Player" in the player.html file and adds title,
// and description to the corresponding paragraph fields
$.get(`/pictures/${pictureId}`)
    .done((data) => {

        $("#title").text(data.response.title).addClass("container mt-3 mb-3");

        const player = `<img class="container w-50" id="player" source src="/${pictureId}"></img>`;

        $("#player").append(player);

        $("#description").append(`  <p class="container border-secondary" > 
                                        ${data.response.description}
                                    </p>`).addClass("container mt-5")

        data.comments.map((comment) => {
            $("#comments")
                .append(`   <li class="list-group-item list-group-item-action w-50"> 
                                <a class= "text-primary"> ${comment.username}: </a>
                                <ul>
                                    <li>
                                        <a>${comment.comment}</a>
                                    </li>
                                </ul>
                            </li>`).addClass("container text-center mt-5")
        });
    })
    .catch((error) => {
        console.log(error);
        $("#title").text("Couldn't find the picture");
    });