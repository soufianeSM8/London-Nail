// start shopping cart
let orders_bag = document.querySelector(".order_h"),
    addToCart = document.querySelectorAll(".add_to_cart");
    close_btn = document.querySelector(".close_cart"),
    items = document.querySelectorAll(".gels_box"),
    yourCartBox = document.querySelector(".yourcart"),
    ordersItems = document.querySelector(".orders_items"),
    totalOrderBag = document.querySelector("#total_Orders"),
    // array for item id
    arrayId = [];

//close order bag
orders_bag.onclick = () => {
  yourCartBox.classList.toggle("open_orders_bag");
  yourCartBox.classList.remove("close_orders_bag");
};
 close_btn.onclick = () => {
    yourCartBox.classList.toggle("close_orders_bag");
    yourCartBox.classList.remove("open_orders_bag");
  };
// end

// create Elements
function create_elements(item) {
  let DivItem = document.createElement("div"), // parent div  container
    D_itemImg = document.createElement("div"), // div for image  div_img-1
    ItemImg,    // img element    div_img-1
    D_itemInfo = document.createElement("div"), // div for info item div_info-1
    D_ItemTll = document.createElement("div"),   // div for title item div_info-2
    ItemTitle = document.createElement("h3"),     // item title  div_info-3
    D_ItemPrc = document.createElement("div"),      // div for price div_price-1
    ItemPrice = document.createElement("span"),     // price div_price-2
    dollar = document.createElement("span"),          // price div_price-3
    D_ItemQuantity = document.createElement("div"),   // div for quantity div_quantity-1
    tllQuantity = document.createElement("span"),     // total quantity div_quantity-2
    btnMinusQuantity = document.createElement("btn"),  // minus btn quantity div_quantity-3
    btnPlusQuantity = document.createElement("btn"),  //  plus btn quantity div_quantity-4
    Quantity = document.createElement("span"),        // quantity div_quantity-5
    deleteBtn = document.createElement("button");     // delete parent div div_quantity-6
  //  end
  // add class to element
  DivItem.classList.add("item");
  DivItem.setAttribute("id", items[item].id);
  D_itemImg.classList.add("item_img");
  D_itemInfo.classList.add("item_info");
  D_ItemTll.classList.add("item_ttl");
  ItemTitle.classList.add("item_title");
  D_ItemPrc.classList.add("item_prc");
  ItemPrice.classList.add("item_price");
  D_ItemQuantity.classList.add("item_Quantity");
  btnMinusQuantity.classList.add("minus", "btn_items");
  btnPlusQuantity.classList.add("plus", "btn_items");
  Quantity.classList.add("Quantity");
  deleteBtn.classList.add("delet_item");
  // end

  // add content to element
  dollar.textContent = " $";
  btnMinusQuantity.innerHTML = '<i class="fal fa-minus"></i>';
  btnMinusQuantity.disabled = true;
  btnPlusQuantity.innerHTML = '<i class="fal fa-plus"></i>';
  deleteBtn.innerHTML = '<i class="fal fa-times"></i>';
  tllQuantity.textContent = "Quantity";
  Quantity.textContent = 1;
  // end
  // append element to parent
  D_ItemTll.append(ItemTitle);
  D_ItemPrc.append(ItemPrice, dollar);
  D_ItemQuantity.append(tllQuantity,
                        btnMinusQuantity,
                        Quantity,
                        btnPlusQuantity);
  D_itemInfo.append(D_ItemTll, D_ItemPrc, D_ItemQuantity);
  DivItem.append(D_itemImg, D_itemInfo, deleteBtn);

  // add content from origin product : hna kanjibo ma3lomat mn prod asli o kan3amroh fi div
  // clone product image from origin prod
  ItemImg = items[item].querySelector(".img_product").cloneNode(true);

  ItemTitle.textContent = items[item].querySelector(".title_product").textContent;
  ItemPrice.textContent = items[item].querySelector(".price").textContent;
  D_itemImg.append(ItemImg);
  ordersItems.append(DivItem);

  //  start quantity

  // declaration btn for plus or minus
  let plusBtn = document.querySelectorAll(".plus"),
      minusBtn = document.querySelectorAll(".minus"),
      deleteBtnAll = document.querySelectorAll(".delet_item"),
      allquantity = document.querySelectorAll('.Quantity');

  // minus Quantity
  for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].onclick = () => {
       allquantity[i].textContent = Number( allquantity[i].textContent) + 1;

      CalcItemPrice_2(i);
      CalcTotalPrice();
      CalcBag();

    };
    // minus Quantity
    minusBtn[i].onclick = () => {
      if (Number( allquantity[i].textContent) != 1) {
         allquantity[i].textContent = Number( allquantity[i].textContent) - 1;
        CalcItemPrice_2(i);
        CalcBag();
      }
      CalcTotalPrice();
    };
  }

  // array for id item
  let storagePrice = Number(items[item].querySelector(".price").textContent);
  arrayId.push(items[item].id, storagePrice);
  // remove items
  for (let i = 0; i < ordersItems.childElementCount; i++) {
    deleteBtnAll[i].onclick = () => {
      // hadi bach kan7ayad id dyal item mn array
      arrayId.splice(arrayId.indexOf(deleteBtnAll[i].parentElement.id), 2);
      // hadi bach kan7ayad item mn item mn shopping cart
      deleteBtnAll[i].parentElement.remove();

      CalcTotalPrice();
      CalcBag();
    };
  }
}
//  itemPrice = document.querySelectorAll(".item_price"),
 let   Quantity = document.querySelectorAll(".Quantity");

// calc price
// Quantity
function QuantityCalc(getId) {
  // getId : origin product id
  //let Quantity = document.querySelectorAll(".Quantity");
  for (let index = 0; index < ordersItems.childElementCount; index++) {
    if (getId == ordersItems.children[index].id) {
      let quantity_calc = parseInt(Quantity[index].textContent) + 1;
      Quantity[index].textContent = quantity_calc;
    }
  }
}

// totat items
// calc item price from add to carte btn

function CalcItemPrice_1(idx) {
  let ip = document.querySelectorAll('.item_price'), // itemPrice
      qtt = document.querySelectorAll('.Quantity'), // Quantity
      off ;  // id prod

   for (let index = 0; index < ordersItems.childElementCount; index++) {
        if(idx == ordersItems.children[index].id){
              off = arrayId.indexOf(idx) +1;
              ip[index].textContent = arrayId[off] * Number(qtt[index].textContent) ;
        }


   }

 }
// calc item price from btn
function CalcItemPrice_2(itemIndex) {
  let itemPrice = document.querySelectorAll(".item_price"),
       Quantity = document.querySelectorAll(".Quantity"),
  off; // id prod

  off = arrayId.indexOf(ordersItems.children[itemIndex].id) + 1;
   itemPrice[itemIndex].textContent = arrayId[off] * Number( Quantity[itemIndex].textContent);
}
// calc item bag
function CalcBag() {
 let Quantity = document.querySelectorAll(".Quantity"),
    rsl = 0; // results
  for (let index = 0; index < ordersItems.childElementCount; index++) {
    rsl += Number(Quantity[index].textContent);
  }
  totalOrderBag.textContent = rsl;
}

// calc total
function CalcTotalPrice() {
  let AllOriginalPrice = document.querySelectorAll(".item_price"),
    totalPrice = 0;
  for (let index = 0; index < AllOriginalPrice.length; index++) {
    totalPrice += Number(AllOriginalPrice[index].textContent);
  }
  document.querySelector("#total_price").textContent = totalPrice;
}

//add event to all btn add to cart

for (let index = 0; index < addToCart.length; index++) {
  addToCart[index].onclick = () => {
    let  getId = items[index].id;

    if (arrayId.includes(items[index].id) == true) {
      QuantityCalc(getId);

    } else {
      create_elements(index);


    }

    CalcBag();
   CalcItemPrice_1(getId);
    CalcTotalPrice();
  };
}














