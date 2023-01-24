
let menu = document.getElementById("menu-list");
let btn = document.getElementById("btn-menu");
let promo = document.getElementById("promo");
let shop =  document.getElementById("product");

function toggleMenu(){

    menu.classList.toggle("show");
    promo.classList.toggle("show");

};

    btn.addEventListener("click",(event)=>{
    event.stopPropagation();  
    toggleMenu();
    
        
    })
   

    document.documentElement.addEventListener("click", (event)=> {
            if (menu.classList.contains("show")) {
                toggleMenu();
                 
    }
   
    });

// to retrieve the array of objects domiciled in local storage
let basket = JSON.parse(localStorage.getItem("cartData"))||[];



let generateShop= ()=>{

    return (shop.innerHTML = shopItemData.map((x)=>{
       
        let {id,name,img,price}=x;
        let search = basket.find((x)=> x.id === id)||[];

        
    return ` <div   class="items">
                    <img src=${img} alt="${name}" />
                    <div class="item-price">
                        <h4>${name}</h4>
                        <h6>$${price}</h6>
                        <h6  class="quantity">Quantity in Cart: <span id=${id}>${search.quantity===undefined?0:search.quantity}</span></h6>
                       
                
                    </div>
                    <div class="add-to-bag">
                        <button onclick="incrementQuantity(${id})" type="button">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7.95403 19.68C8.03448 18.6776 8.48953 17.7423 9.22857 17.0603C9.96762 16.3784 10.9364 15.9998 11.942 16H36.058C37.0636 15.9998 38.0324 16.3784 38.7715 17.0603C39.5105 17.7423 39.9656 18.6776 40.046 19.68L41.652 39.68C41.6962 40.2304 41.6259 40.784 41.4457 41.3059C41.2654 41.8278 40.9791 42.3067 40.6046 42.7125C40.2302 43.1183 39.7758 43.4422 39.2701 43.6638C38.7643 43.8854 38.2182 43.9998 37.666 44H10.334C9.78187 43.9998 9.23573 43.8854 8.72998 43.6638C8.22424 43.4422 7.76985 43.1183 7.39542 42.7125C7.02099 42.3067 6.73463 41.8278 6.55437 41.3059C6.37411 40.784 6.30385 40.2304 6.34803 39.68L7.95403 19.68V19.68Z"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M32 22V12C32 9.87827 31.1571 7.84344 29.6569 6.34315C28.1566 4.84285 26.1217 4 24 4C21.8783 4 19.8434 4.84285 18.3431 6.34315C16.8429 7.84344 16 9.87827 16 12V22"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>Add to bag
                
                        </button>
                        <button>
                             <svg onclick="decrementQuantity(${id})" class="bi bi-dash-circle" fill="#ff0000" height="20" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>
                        </button>
 
                    </div>
                
                </div>`



    }).join(""))


};

generateShop();



             
let incrementQuantity = (id)=>{

  let selectedItem = id;
  let search = basket.find((x)=>x.id == selectedItem.id);
    if (search === undefined){
        basket.push(
            {id: selectedItem.id,
             quantity: 1 , 
            })}
    else {search.quantity += 1;}

   // set the data of items added to local storage 
   localStorage.setItem("cartData",JSON.stringify(basket));
   updateQuantity(selectedItem.id);

} 

let decrementQuantity = (id)=>{

  let selectedItem = id;
  let search = basket.find((x)=>x.id == selectedItem.id);
  if (search ===undefined) return;
  else if(search.quantity === 0 )  return;
  else {search.quantity -= 1;}
  
     updateQuantity(selectedItem.id);
    // set the data of items in local storage whenever an item is removed from cart
    
    basket=basket.filter((x)=>x.quantity !==0);
    localStorage.setItem("cartData",JSON.stringify(basket));
   

} 


let updateQuantity=(id)=>{

let search = basket.find((x)=>x.id == id);
document.getElementById(id).innerHTML = search.quantity;
addToBag();

}


let addToBag=()=>{

        let cartIcon=  document.getElementById("bagAmount");
        let addition = basket.map((x)=> x.quantity).reduce((x,y)=> x+y,0);

        cartIcon.innerHTML = addition;

}
addToBag();