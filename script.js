let set_foods = document.querySelector(".get_food");
let food_details = document.querySelector(".food_details");
//display foods 
function get_item_name() {
  let getSearchValue = document.querySelector(".itemName").value;
  try {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${getSearchValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        let foods = data?.meals;
        console.log(foods);
        if (foods === null) {
          set_foods.innerHTML =
            "<p class='item_not_found_msg'> Item is not available </p>";
        } else {
          set_foods.innerHTML = "";
          foods.map(
            (item) =>
              (set_foods.innerHTML += `
                      <div class="col">
                      <div class="card mx-2 my-3 foods_card" style="width: 18rem;">
                      <img src="${
                        item?.strMealThumb
                      }" class="card-img-top" alt="${item?.strMeal}">
                      <div class="card-body">
                      <p class="card-title"><span class='text-info fs-6'> Item Name:  </span> ${
                        item?.strMeal.slice(0, 8) + "..."
                      }</p>
                      <p class="card-text"> <span class='text-info'> Item description:  </span> ${
                        item?.strInstructions.slice(0, 56) + "..."
                      }</p>
                       <span class='text-info'> Item video </span> <a href="${
                         item?.strYoutube
                       }" target="_blank" rel="noopener noreferrer">See video to make it</a>
                       <a href="#details">
                       <button onclick="get_food(${
                        item?.idMeal
                      })" class="btn btn-primary my-3"> Show Detail <i class="fa-solid fa-arrow-right px-2"></i> </button>
                      </a>
                       </div>
                      </div>
                      </div>
                      `)
          );
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
}
//display food details
async function get_food(food_id) {
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${food_id}`
  );
  const data = await api.json();
  data.meals.map((item) => {
    food_details.innerHTML = `
               <div class="col" id="details">
                      <div class="card mx-auto my-3" style="width: 48rem;">
                      <img src="${
                        item?.strMealThumb
                      }" class="card-img-top food_details_image" alt="${item?.strMeal}">
                      <div class="card-body">
                      <p class="card-title"><span class='text-info fs-4 fw-bold'> Item Name:  </span> ${
                        item?.strMeal
                      }</p>
                      <p class="card-title"><span class='text-info fs-4 fw-bold'> Item Category:  </span> ${
                        item?.strCategory
                      }</p>
                      <p class="card-text"> <span class='text-info  fs-4 fw-bold'> Item description:  </span> ${
                        item?.strInstructions
                      }</p>
                       <span class='text-info fs-4 fw-bold'> Item video </span> <a href="${
                         item?.strYoutube
                       }" target="_blank" rel="noopener noreferrer">See video to make it</a>
                       <p class="fs-4 fw-bold  text-primary my-2">Equipment for this item:</p>
                      <ul>
                          <li>${item?.strIngredient1}</li>
                          <li>${item?.strIngredient2}</li>
                          <li>${item?.strIngredient3}</li>
                          <li>${item?.strIngredient4}</li>
                          <li>${item?.strIngredient5}</li>
                          <li>${item?.strIngredient6}</li>
                          <li>${item?.strIngredient7}</li>
                      </ul>
                       </div>
                      </div>
                      </div>
    `;
  });
}
