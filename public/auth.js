




// functions 

// remove a order container
function remove(x) {

  let row = x.parentElement.parentElement;
  id = row.id;
  db.collection('Orders').doc(id).delete();
  x.parentElement.parentElement.parentElement.remove();

}








window.onload = function () {



  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.select');
    M.FormSelect.init(elems, options);
  });

  //sign up a user
  const signupForm = document.querySelector("#signup-form");

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
  });

  //logout a user

  const logout = document.querySelector("#logout");

  logout.addEventListener('click', (e) => {
    e.preventDefault();

    auth.signOut();
  })

  // login a user
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {

    });

  });

  //auth status changes

  auth.onAuthStateChanged(user => {

    if (user) {
      document.getElementById("removeWhenLoggedIn").style.visibility = "hidden";
      document.getElementById("navBar").style.visibility = "visible";






      //orders
      //create a snapshot of the orders database and remder on the main page

      db.collection('Orders').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();

        changes.forEach(change => {

          if (change.type == 'added') {
            setupOrders(change.doc);
          }

        })

      })

      // Get reference for html container

      const orderList = document.querySelector('.order-list');


      // setup the each order container on the staff display

      function setupOrders(doc) {
        // get values of the map datatypes, name and amount, used in product documents
        let htmlOrders = "";

        const order = doc.data();
        let productNames = [];
        let productAmounts = [];
        let productPrices = [];
        let productTotal = order.total;
        let message = order.message;



        // get data for product names and amounts
        let tbl = ``;
        for (let i = 0; i < order.products.length; i++) {

          let data = order.products[i];


          productNames.push(data.name);
          productAmounts.push(data.amount);
          productPrices.push(data.price);

        }

        //construct html table with name, amount and price

        let row = ``;
        for (let i = 0; i < productNames.length; i++) {

          row += `
    <tr>
    <td>${productNames[i]}</td>
    <td>${productAmounts[i]}</td>
    <td>${productPrices[i]}</td>
    </tr>
    

    `;
          tbl = row;

        }


        // construct html used in each container

        let li = `
    
    <li>
    <div class="removeWhenLoggedOut">
      <div class="container grey lighten-4 z-depth-2">

      <div class="z-depth-2" id="check" style="background-color:#CD1818; height:10%" onclick="check(this)">
      </div>
      
      <div class ="row" id="${doc.id}">
      
      <div class="col s5" style="margin: 20px;">Customer name - ${order.name}</div>
      <div class="col s5" style="margin: 20px;">Table number - ${order.tableNumber}</div>
      
      <div class="col s10" style="margin: 20px;"> Order

      <table>
      <thead>
        <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
        </tr>
      </thead>

      <tbody>
       ${tbl}
      </tbody>
    </table> <br>

    Total - £${productTotal}
    
    <h6><strong>Customer Message</strong> </h6> <br> - ${message} <hr> <br>
  
    <button class="btn waves-effect waves-red" style="left:90%;" onclick="remove(this)"><i class="material-icons right" ></i>Complete</button></td>
    </div> 
    </li> 
    </div>
    
  `;

        htmlOrders += li;

        orderList.innerHTML += htmlOrders
        document.getElementById("removeWhenLoggedIn").style.visibility = "hidden";

      };

    } else {


      document.getElementById("removeWhenLoggedIn").style.visibility = "visible";
      document.getElementById("navBar").style.visibility = "hidden";


      console.log("User Logged Out")

      elements = document.getElementsByClassName("removeWhenLoggedOut");

      for (let i = 0; i < elements.length; i++) {

        elements[i].style.display = "none";
      }

    }



  }



  )
};



