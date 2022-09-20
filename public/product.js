

//add product to the product database 


async function editProduct(x) {


}

function addProduct() {
  event.preventDefault();


  let name = document.getElementById("productname").value;
  let price = document.getElementById("productPrice").value;
  let category = document.querySelector('select').value;
  let description = document.getElementById("description").value;



  let allergens = [];
  for (var option of document.getElementById('allergen').options) {
    if (option.selected) {
      allergens.push(option.value);
    }
  }



  db.collection("products").add({
    name: name,
    price: price,
    category: category,
    description: description,
    allergens: allergens


  })
}


function removeProduct(x) {

  let row = x.parentElement.parentElement;
  id = row.id;
  db.collection('products').doc(id).delete();
  x.parentElement.parentElement.remove();
}

window.onload = function () {
  //create products list

  //initilize products page

  const productList = document.getElementById("productContainer");

  let htmlproducts = "";
  // set up the table for the products

  li = `
<h1> Product List </h1> <hr> <br>
<h2> Food </h2> <hr> <br>


<h3> Starters And Sharers </h3>
<div class="container" id="Starters"> 
</div><br>

<h3> Pub Classics </h3>
<div class="container" id="Classics"> 
</div><br>


<h3> Loaded Fries </h3>
<div class="container" id="Fries"> 
</div><br>

<h3> Stone Backed Pizza </h3>
<div class="container" id="Pizza"> 
</div><br>

<h3> Loaded Mac and Cheese </h3>
<div class="container" id="Maccaroni"> 
</div><br>

<h3> Vegan </h3>  
<div class="container" id="Vegan"> 
</div><br> 

<h3> Toasted Sandwiches </h3>
<div class="container" id="Sandwich"> 
</div><br> 

<h3> Kids</h3>
<div class="container" id="Kids"> 
</div><br>

<h3> Salads </h3>
<div class="container" id="Salad"> 
</div><br>

<h3> Sides </h3>
<div class="container" id="Side"> 
</div><br>

<h3> Burgers </h3>
<div class="container" id="Burger"> 
</div><br>

<h3> Desserts </h3>
<div class="container" id="Dessert"> 
</div><br>
 
`
  htmlproducts += li;
  productList.innerHTML = htmlproducts;


  // take a snapshot of the products database and render on the products page

  db.collection('products').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {

      if (change.type == 'added') {
        setupProducts(change.doc);
      }
    })

  })

  // set up each categories containers
  function setupProducts(doc) {

    const products = doc.data();

    let productName = "";
    let productPrice = "";
    let category = "";
    let description = "";
    let allergen = [];



    productName = products.name;
    productPrice = products.price;
    category = products.category;
    description = products.description;

    for (let i = 0; i < products.allergens.length; i++) {
      allergen.push(products.allergens[i]);
    }





    const elem = document.getElementById(category);

    li = `

    <div class="container grey lighten-4 z-depth-2" id="${doc.id}">

    

      <div class="col s5" style="margin: 20px;" id="productName">Product - ${productName}</div>
      <div class="col s5" style="margin: 20px;"id="productPrice">Price - £${productPrice}</div> <br>
      <div class="col s5" style="margin: 10px;"id="productDescription">Description - ${description}</div> <br>
      <div class="col s5" style="margin: 10px;"id="productAllergens">Allergens - ${allergen}</div> <br>

      <div>
      <button class="btn waves-effect waves-red" onclick="removeProduct(this)"><i class="material-icons right" ></i>Delete</button></td>
      <button data-target="modal-edit" class="btn modal-trigger">Edit</button>
      </div>
      
    </div>
    
    `
    elem.innerHTML += li;
  };

}