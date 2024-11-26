let btn = document.querySelector(".get-button");
let input = document.querySelector("input");
let showData = document.querySelector(".show-data");

function search() {
    let val = input.value;
    showData.style.padding = "20px";
    if (!val) 
        showData.innerHTML = `<h2 style="margin:0">Please Write Github Username</h2>`;
    else {
        showData.innerHTML = "";
        fetch(`https://api.github.com/users/${val}/repos`)
            .then(repositories => {
                if (!repositories.ok) 
                    throw new Error("The User Name Is Wrong");
                return repositories.json();
            }).then(repositories => {
                let h2 = document.createElement("h2");
                showData.appendChild(h2);
                if (repositories.length) 
                    h2.textContent = `The Number of  Repositories Is ${repositories.length}`
                else {
                    h2.textContent = `No Repositories Is Founded`;
                    h2.style.margin = "0";
                }
                repositories.forEach(repos => {
                let div = document.createElement("div");
                div.className = "details";
                let span = document.createElement("span");
                span.className = "repos";
                span.textContent = `${repos.name}`;
                let a = document.createElement("a");
                a.href = `https://github.com/${val}/${repos.name}`;
                a.setAttribute("target", "_blank");
                a.textContent = "Visit";
                div.append(span, a);
                showData.appendChild(div);
            })
        }).catch(err => showData.innerHTML = `<h2 style="margin:0">${err.message}</h2>`);
    }
    input.value = "";
    input.focus();
}
btn.onclick = search;
input.addEventListener("keydown", e => {
    if (e.key === "Enter") 
        search();
})