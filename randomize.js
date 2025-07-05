const shuffler = document.getElementById("shuffler");
const randoName = document.getElementById("rando-name");
const nameP = document.createElement("p");
randoName.appendChild(nameP);
nameP.classList.add("nameP");

let nameData =[];

async function fetchNameData() {
  try {
    const response = await fetch("names.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    kidsData = data.kids;
    if (shuffler) {
      displayNames(kidsData);
    }
    return kidsData;
  } catch (error) {
    console.error("Failed to load kidsData in fetchNameData:", error);
    return [];
  }
}

function displayNames(kids) {
  shuffler.innerHTML = "";
  const ul = document.createElement("ul");
  shuffler.appendChild(ul);

  kids.forEach((kid) => {
    const li = document.createElement("li");
    li.classList.add("present");
    const fname = document.createElement("p");
    li.appendChild(fname);
    const radioBtn = document.createElement("button");
    radioBtn.classList.add("present-btn");
    radioBtn.innerHTML = "🔵";

    radioBtn.addEventListener("click",() => {
        li.classList.toggle("present");
        radioBtn.innerHTML = radioBtn.innerHTML === "🔘" ? "🔵" : "🔘";
        if (
          radioBtn.innerHTML === "🔵"
            ? (kid.present = true)
            : (kid.present = false)
        );       
    });
    li.appendChild(radioBtn);
    fname.textContent = kid.name;
    ul.appendChild(li);
  });
}

function checkPresent(kids){
    return kids.present;
}

const button = document.createElement("button");
button.classList.add("choose-btn");
button.textContent = "Choose";
randoName.appendChild(button);

function displayRandomName(kids) {
    nameP.innerHTML = "";
  let presentKids = kids.filter(checkPresent);


  const randomIndex = Math.floor(Math.random() * presentKids.length);
  
  const randomName = presentKids[randomIndex].name;

  nameP.innerHTML = randomName;
}



button.addEventListener("click", () => {
  displayRandomName(kidsData);
});



fetchNameData();
