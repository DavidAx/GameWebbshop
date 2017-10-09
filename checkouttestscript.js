

//item object
function item(id, amount)
{
    this.id=id;
    this.price=games[id-1].price;
    this.name=games[id-1].name;
    this.amount=amount;
}

//list for items (the shoppingcart)
var items=new Array();


//temporary array of avaible items
var game1={price:200,name:"Broccoli"};
var game2={price:499,name:"Dragoon"};
var game3={price:150,name:"Molten Core"};
var games=[game1,game2,game3];



//add item to list (shoppingcart)
function addItem(id)
{
    var found=false;
    var i=0;
    while(i<items.length&&found==false)
    {
        if(items[i]!=undefined&&items[i].id==id)
        {
            items[i].amount++;
            found=true;
        }
        i++;
    }
    if(!found)
    {
        items.push(new item(id,1)) 
    }
    saveItems();
}

//saves the list(shoppingcart) to localstorage
function saveItems()
{
    localStorage.setItem("games",JSON.stringify(items));
}
//loads the list(shoppingcart) from localstorage
function loadItems()
{
    items=JSON.parse(localStorage.getItem("games"));
}

//sets up the checkout-page
function checkout()
{
    loadItems();
    //hideAll();
    for(var i=0;i<items.length;i++)
    {
        if(items[i]!=undefined)
        {   
            //showElement(items[i].id);
            addElement(items[i].id);
            var elementselect_id = document.querySelectorAll("div#game"+items[i].id+" p.id");
            var elementselect_price = document.querySelectorAll("div#game"+items[i].id+" p.price");
            var elementselect_amount = document.querySelectorAll("div#game"+items[i].id+" p.amount");
            $(elementselect_id).text(items[i].name);
            $(elementselect_price).text(items[i].price);
            $(elementselect_amount).text(items[i].amount);
            
        }
    }
    sumPrice();
}
//checkout-page functions
function checkout_addItem(id)
{
    var pos=findPos(id);
    items[pos].amount++;
    var elementselect_amount = document.querySelectorAll("div#game"+items[pos].id+" p.amount");
    $(elementselect_amount).text(items[pos].amount);
    sumPrice();
}

function checkout_removeItem(id)
{
    var pos=findPos(id);
    items[pos].amount--;
    var elementselect_amount = document.querySelectorAll("div#game"+items[pos].id+" p.amount");
    $(elementselect_amount).text(items[pos].amount);
    if(items[pos].amount==0)
    {
        //hideElement(items[pos].id);
        removeElement(items[pos].id);
        items.splice(pos,1);
    }
    sumPrice();
    
}

//search function
function findPos(id)
{
    var found=false;
    var i=0;

    while(!found&&i<items.length)
    {
        if(items[i].id==id)
        {
            found=true;
        }
        else
        {
            i++;
        }
    }
    return i;

}

//item "hider"
function hideElement(id)
{
    var elementselect=document.querySelectorAll("div#game"+id);
    $(elementselect).hide();
}

function hideAll()
{
    $("div").hide();
}

function showElement(id)
{
    var elementselect=document.querySelectorAll("div#game"+id);
    $(elementselect).show();
}

function addElement(id)
{
    var element="<div id='game"+id+"'>";
    element+="<il>";
    element+="<p class='id'>game"+id+"</p>";
    element+="<p class='price'>0</p>";
    element+="<p class='amount'>0</p>";
    element+="<button onclick='checkout_addItem("+id+")'>add</button>";
    element+="<button onclick='checkout_removeItem("+id+")'>remove</button>";
    element+="</il>";
    element+="</div";
    $("ul#item_list").after(element);

}

function removeElement(id)
{
    var elementselect=document.querySelectorAll("div#game"+id);
    $(elementselect).empty();
    $(elementselect).remove();
}

//summerises the price
function sumPrice()
{
    var sum=0;
    for(var i=0;i<items.length;i++)
    {
        sum+=items[i].price*items[i].amount;
    }
    $("p#summary").text(sum);
}


