let card = document.getElementById("card");
        let url = "https://api.thecatapi.com/v1/images/search";
        let data = async () => (await fetch(url)).json();
        let btn = document.getElementById("more_please");
        btn.onclick = () => {
          data().then((res) => {
            let img = document.createElement("img");
            img.src = res[0].url;
            card.appendChild(img);
          }).catch((err) => {
            alert(err);
          });
        }