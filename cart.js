let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping");
// to retrieve the array of objects domiciled in local storage
let basket = JSON.parse(localStorage.getItem("cartData"))||[];

console.log(basket);

//the cart quantity is automatically updated to tally
//with the cart quantity in homepage
let addToBag=()=>{
 
        let cartIcon=  document.getElementById("bagAmount");
        let addition = basket.map((x)=> x.quantity).reduce((x,y)=> x+y,0);

        cartIcon.innerHTML = addition;

}
addToBag();

//generate cart items already added to cart from homepage
let generateCartItems=()=>{
    if (basket.length !== 0){
       label.innerHTML='';

        return shoppingCart.innerHTML = basket.map((x)=>{
            let {id,quantity} = x;
            let search = shopItemData.find((y)=>y.id === id )||[];
            

            return `
            <div class="cart-item">
                <div>
                    <img width="180" src="${search.img}" alt="black office dress" />
                </div>
                <div class="details">
                 
                    <div class="title-price-x">
                        <h5>${search.name}</h5>
                        <h5 class="priceX">$${search.price}</h5>
                        <svg onclick="clearCartItem(${id})" style="fill: red" data-name="Livello 1" id="Livello_1" viewBox="0 0 128 128"
                            xmlns="http://www.w3.org/2000/svg">
                            <title />
                            <path
                                d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z" />
                            <path
                                d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z" />
                        </svg>
                    </div>
                
                    <div class="cart-buttons">
                        <svg onclick="decrementQuantity(${id})" class="bi bi-dash-circle" fill="#ff0000" height="20" viewBox="0 0 16 16" width="16"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                        </svg>
                        <div class="quantity"> <span id=${id}>${quantity}</span></div>
                        <svg onclick="incrementQuantity(${id})" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2Z"
                                fill="#00ff00" />
                        </svg>
                
                
                    </div>
                    <h5>$${quantity*search.price}</h5>
                </div>
            </div>`

        } ).join("")         
        

    }
    else {

        shoppingCart.innerHTML= '';
        label.innerHTML = ` 
            <h2>Cart is Empty</h2>
            <a href="./index.html">
                <button type="button" class="homeBtn">Back to Home</button>
            </a>`
    }
    
     
};

generateCartItems();

//increases quantity when clicked
let incrementQuantity = (id)=>{

  let selectedItem = id;
  let search = basket.find((x)=>x.id == selectedItem.id);
    if (search === undefined){
        basket.push(
            {id: selectedItem.id,
             quantity: 1 , 
            })}
    else {search.quantity += 1;}

  
   generateCartItems();
    // set the data of items added to local storage 
   localStorage.setItem("cartData",JSON.stringify(basket));
   updateQuantity(selectedItem.id);

} 

//increases quantity when clicked
let decrementQuantity = (id)=>{

  let selectedItem = id;
  let search = basket.find((x)=>x.id == selectedItem.id);
  if (search ===undefined) return;
  else if(search.quantity === 0 )  return;
  else {search.quantity -= 1;}
  
     updateQuantity(selectedItem.id);
    // set the data of items in local storage whenever an item is removed from cart
   
    basket=basket.filter((x)=>x.quantity !== 0);
    generateCartItems();
    localStorage.setItem("cartData",JSON.stringify(basket));
    
   totalAmount();

} 

//quantity is updated whenever increment/decrement button is clicked
let updateQuantity=(id)=>{

let search = basket.find((x)=>x.id == id);
document.getElementById(id).innerHTML = search.quantity;
addToBag();
totalAmount();

}

//when the cross icon is clicked, the particular item is removed from basket.
let clearCartItem=(id)=>{

     let selectedItem = id;

 basket=basket.filter((x)=>x.id !== selectedItem.id);
 
 localStorage.setItem("cartData",JSON.stringify(basket));
 generateCartItems();
 addToBag();
  totalAmount();

}


let clearCartAll=()=>{

  basket=[];
 
 localStorage.setItem("cartData",JSON.stringify(basket));
 generateCartItems();
 addToBag();

}


let totalAmount=()=>{
    if (basket.length !==0){
        let amount = basket.map((x)=>{
            let {id,quantity} = x;
            let search = shopItemData.find((z)=> z.id === id)||[];
            return quantity*search.price;
        }).reduce((x,y)=> x+y,0);
         //console.log(amount)
         label.innerHTML=`
         <h2>Total Bill: $${amount}</h2>
         <button class="checkOut">Checkout</button>
         <button onclick="clearCartAll()" class="removeAll">Clear Cart</button>`
    }
    else return;
   
   
}
totalAmount();

