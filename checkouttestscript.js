

//item object
function item(id, price, amount)
{
    this.id=id;
    this.price=price;
    this.amount=amount;
}

//list for items (the shoppingcart)
var items=new Array();

//add item to list (shoppingcart)
function addItem(id)
{
    var found=false;
    var i=0;
    while(i<items.length&&found==false)
    {
        console.log(i);
        if(items[i]!=undefined&&items[i].id==id)
        {
            items[i].amount++;
            found=true;
        }
        i++;
    }
    if(!found)
    {
        items.push(new item(id,200,1)) 
    }
    saveItems();
    console.log(items);
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
    console.log(items);
    for(var i=0;i<items.length;i++)
    {
        if(items[i]!=undefined)
        {   
            var elementselect_price = document.querySelectorAll("div#game"+items[i].id+" p.price");
            var elementselect_amount = document.querySelectorAll("div#game"+items[i].id+" p.amount");
            $(elementselect_price).text(items[i].price);
            $(elementselect_amount).text(items[i].amount);
            
        }
    }
}
//checkout-page functions
function checkout_addItem(id)
{
    console.log(id);
    var pos=findPos(id);
    items[pos].amount++;
    var elementselect_amount = document.querySelectorAll("div#game"+items[pos].id+" p.amount");
    $(elementselect_amount).text(items[pos].amount);
}

function checkout_removeItem(id)
{
    console.log(id);
    var pos=findPos(id);
    items[pos].amount--;
    var elementselect_amount = document.querySelectorAll("div#game"+items[pos].id+" p.amount");
    $(elementselect_amount).text(items[pos].amount);
    if(items[pos].amount==0)
    {
        console.log(items[id-1]);
        var elementselect=document.querySelectorAll("div#game"+items[pos].id);
        items.splice(pos,1);
        console.log(elementselect);
        $(elementselect).hide();
    }
    
}

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