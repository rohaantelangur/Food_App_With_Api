let navbar = () =>{
    // console.log("check")
    return `
    <a href="index.html"><h1>Home</h1></a>
    <a href="search.html"><h1>Search</h1></a>
    <a href="daily.html"><h1>Daily Top</h1></a>
    <a href="random.html"><h1>Monthy Top</h1></a>
    <a href="login.html"><h1>Login</h1></a>
    <a href="signup.html"><h1>Sigh up</h1></a>
    `;
}

let id;

const debounce = async () => {
    if (id) {
        clearTimeout(id);
      }
      id = setTimeout(function () {
          receipe();
      }, 500);
  };
  
  let receipe = () => {
    let search_receipe = document.getElementById("search-receipe").value;
    getReceipe(search_receipe);
  };

  let getReceipe = async (keyword) => {
    // const FetchData =()=>{
    // }
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`
  );
  let result = await res.json();
  // return result.meals
  let data = result.meals;
//   console.log(data);
  displayData(data)
  }


  let displayData =(data)=>{
    if (data == undefined) {
        document.getElementById("show-receipe").innerHTML = null;
      } else {
        document.getElementById("show-receipe").innerHTML = null;

        data.forEach((element) => {
          console.log(element);

          let div = document.createElement("div");
          let image = document.createElement("img");
          image.src = element.strMealThumb;

          let div1 = document.createElement("div");

          let h2 = document.createElement("h3");
          h2.innerHTML = element.strMeal + "<br>";

          let p1 = document.createElement("p");
          p1.innerHTML = `Area: ${element.strArea}` + "<br>";

          let p2 = document.createElement("p");
          p2.innerHTML = `Category: ${element.strCategory}` + "<br>";

          let p3 = document.createElement("p");
          p3.innerHTML =
            `Ingredient: ${element.strIngredient1}, ${element.strIngredient2}, ${element.strIngredient3}, ${element.strIngredient4}, ${element.strIngredient5}, ${element.strIngredient6}, ${element.strIngredient7}, ${element.strIngredient8}, ${element.strIngredient9}, ${element.strIngredient10}, ${element.strIngredient11}, ${element.strIngredient12}, ${element.strIngredient13}, ${element.strIngredient14}, ${element.strIngredient15}, ${element.strIngredient16}, ${element.strIngredient17}, ${element.strIngredient18}, ${element.strIngredient19}, ${element.strIngredient20}` +
            "<br>";

          let p4 = document.createElement("p");
          p4.innerHTML =
            `Instructions: ${element.strInstructions}` + "<br>" + "<br>";

          div1.append(h2, p1, p2, p3, p4);

          div.append(image, div1);
          document.getElementById("show-receipe").append(div);
        });
      }
    }

    let getUserDetail = async (username, token) => {
      console.log("here");
    let res = await fetch(
      `https://masai-api-mocker.herokuapp.com/user/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    localStorage.setItem("Login",JSON.stringify (data))
    console.log("user data: ", data);

  };


  const append1=()=>{
    let UserData = JSON.parse(localStorage.getItem("Login")) || []
    console.log(UserData);
    if(UserData.name!==undefined){

      document.getElementById("Name").innerText=`Name: ${UserData.name}`
      document.getElementById("UserEmail").innerText=`Email: ${UserData.email}`
      document.getElementById("UserMobile").innerText=`Mobile: ${UserData.mobile}`
      document.getElementById("UserName").innerText=`User Name: ${UserData.username}`
      document.getElementById("UserDescription").innerText=`Description: ${UserData.description}`
    }else{
      document.getElementById("User-Details").innerHTML=`<h1 id="not-login">User Not Loged In</h1>`
    }
  }
    
    // export default { navbar, debounce }
    export { navbar, debounce, append1, getUserDetail }
    
