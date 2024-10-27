var ProductName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");

var productsContaner;
if(localStorage.getItem("productList") === null)
{
    productsContaner =[];
}
else
{
    productsContaner=JSON.parse(localStorage.getItem("productList"));
    displayProducts();
}
function addProduct()
{
        var product=
        {
            name:ProductName.value,
            price:productPrice.value,
            category:productCategory.value,
            Desc:productDesc.value
        };
        productsContaner.push(product);
        localStorage.setItem("productList",JSON.stringify(productsContaner));
        clearform();
        displayProducts();
   
    
}
function clearform()
{
    ProductName.value="";
    productPrice.value='';
    productCategory.value='';
    productDesc.value='';
}

function displayProducts()
{
    var cartoona=``;
    for (var i=0;i<productsContaner.length;i++)
    {
        cartoona+=`<tr>
        <td>` + i + `</td>
        <td>` + productsContaner[i].name + `</td>
        <td>${productsContaner[i].price}</td>
        <td>${productsContaner[i].category}</td>
        <td>${productsContaner[i].Desc}</td>
        <td><button onclick="updateproduct(${i})" class="btnU btnColorUpdate">Update</button></td>
        <td><button onclick="deleteProducts(${i})" class="btnD btnColorDelete">Delete</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML=cartoona;
}



function chickEmpity()
{
    if(ProductName.value ==="" || productPrice.value === "" || productCategory.value === "" || productDesc.value ==="")
    {
        return true;
    }
    else
    {
        return false;
    }
}



function deleteProducts(index) {
    productsContaner.splice(index , 1);
    displayProducts();
    localStorage.setItem("productList", JSON.stringify(productsContaner));
  }




function searchProduct(searchTerm)
{
    var cartoona=``;
    for(var i=0 ;i<productsContaner.length;i++)
    {
        
        if(productsContaner[i].name.toLowerCase().includes(searchTerm.toLowerCase()))
        {
            cartoona+=`<tr>
            <td>` + i + `</td>
            <td>` + productsContaner[i].name + `</td>
            <td>${productsContaner[i].price}</td>
            <td>${productsContaner[i].category}</td>
            <td>${productsContaner[i].Desc}</td>
            <td><button onclick="updateproduct(${i})" class="btnU btnColorUpdate">Update</button></td>
            <td><button onclick="deleteProducts(${i})" class="btnD btnColorDelete">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML=cartoona;
}

var btnA=document.getElementById("btnA");
var currentIndex=-1;
function updateproduct(index) {
    currentIndex = index; // تخزين الـ index الحالي للتحديث لاحقًا
    ProductName.value = productsContaner[index].name;
    console.log(ProductName.value);
    productPrice.value = productsContaner[index].price;
    console.log(productPrice.value);
    productCategory.value = productsContaner[index].category;
    console.log(productCategory.value);
    productDesc.value = productsContaner[index].Desc;
    console.log(productDesc.value);
    btnA.innerHTML = "Update Product"; // تغيير النص على الزر
}

btnA.addEventListener('click', function() {
    if (currentIndex === -1) {
        addProduct();
    } else {
        saveUpdate(currentIndex);
    }
});

function saveUpdate(index)
{
    productsContaner[index].name=ProductName.value;
    productsContaner[index].price=productPrice.value;
    productsContaner[index].category=productCategory.value;
    productsContaner[index].Desc=productDesc.value;
    localStorage.setItem("productList", JSON.stringify(productsContaner));
    displayProducts();
    clearform();
    btnA.innerHTML = "Add Product"; // إعادة تعيين النص إلى "Add Product"
    currentIndex = -1;
}