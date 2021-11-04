function navbar(){
    return `
    <nav id="nav">
      <ul>
        <li><a href="foodApp1.html">Search receipe by name</a></li>
        <li><a href="foodApp2.html">Get receipe of the day</a></li>
        <li><a href="foodApp3.html">Show latest receipe</a></li>
      </ul>
      </nav>
      `
  }
  
   async function fetchIt(link, id) {
          var resultDiv = document.getElementById(id);
          resultDiv.innerHTML = "";
          var res = await fetch(link);
          var res = await res.json()
          .then((res)=>{
            return res.meals;
          })
          .then((res)=>{
            
            console.log(res);
            var container = document.createElement('div');
            container.style.display = "flex";
            container.style.flexWrap = "wrap";
            container.style.justifyContent = "space-evenly"
            for(var recipe of res){
              var div = document.createElement('div');
              var image = document.createElement('div');
              var name = document.createElement('p');
              var ingredients = document.createElement('p');
              var category = document.createElement('p');
              var instructions = document.createElement('p');
              var vidLink = recipe.strYoutube.split("=")
              image.innerHTML = `<iframe src="https://www.youtube.com/embed/${vidLink[1]}">`
              name.textContent = `Meal : `+recipe.strMeal;
              var ing = [recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3, recipe.strIngredient4, recipe.strIngredient5]
              
              console.log(ing)
              ingredients.textContent = `Ingredients: `+ing.join(",\r\n");
              category.textContent = `Category: `+recipe.strCategory;
              instructions.textContent = `Instructions: `+recipe.strInstructions;
              div.style.fontSize = "20px";
              div.style.fontWeight = "600";
              div.style.border = "1px solid black";
              div.style.borderRadius = "0.5rem";
              div.style.color = "black";
              // div.style.width = "310px"
              div.style.padding = "25px";
              div.style.flexBasis = "20%";
              // div.style.gap = "0.5 rem";
              div.style.margin = "5px"
              div.append(image,name,ingredients,category,instructions);
              container.append(div);
            }
            resultDiv.append(container);
            return res;
          })
          .catch(err=>{ 
            var resultDiv = document.getElementById(id);
            resultDiv.innerHTML = null;
            const img = document.createElement('img');
            img.src = './404.png';
            resultDiv.append(img)

          })
    }
  
  export {navbar,fetchIt};