const products=[
{id:1,name:"Margherita Pizza",category:"Pizza",price:249,desc:"Classic tomato, mozzarella & fresh basil.",tag:"Bestseller",img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80"},
{id:2,name:"Farmhouse Pizza",category:"Pizza",price:329,desc:"Loaded with fresh veggies and cheese.",tag:"Popular",img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"},
{id:3,name:"Classic Smash Burger",category:"Burger",price:199,desc:"Juicy patty, lettuce, cheese & house sauce.",tag:"Chef's pick",img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
{id:4,name:"Crispy Veg Burger",category:"Burger",price:159,desc:"Crispy veggie patty with creamy dressing.",tag:"Veg favourite",img:"https://images.unsplash.com/photo-155 burger?auto=format&fit=crop&w=700&q=80".replace("155 burger","1553979459-d2229ba7433b")},
{id:5,name:"Creamy Alfredo Pasta",category:"Pasta",price:279,desc:"Silky parmesan cream sauce and herbs.",tag:"Comfort food",img:"https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=700&q=80"},
{id:6,name:"Penne Arrabbiata",category:"Pasta",price:249,desc:"Penne tossed in a spicy tomato sauce.",tag:"Spicy",img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"},
{id:7,name:"Chocolate Lava Cake",category:"Dessert",price:149,desc:"Warm chocolate cake with a gooey centre.",tag:"Sweet treat",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"},
{id:8,name:"Berry Cheesecake",category:"Dessert",price:179,desc:"Creamy cheesecake topped with berries.",tag:"New",img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"},
{id:9,name:"Fresh Lime Soda",category:"Drinks",price:79,desc:"Refreshing lime, mint and a little fizz.",tag:"Refreshing",img:"https://images.unsplash.com/photo-1513558161293-cf1b9c719f8d?auto=format&fit=crop&w=700&q=80"},
{id:10,name:"Cold Coffee",category:"Drinks",price:119,desc:"Chilled coffee blended until smooth.",tag:"Customer love",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
{id:11,name:"Paneer Tikka",category:"Burger",price:219,desc:"Smoky paneer, spices and fresh chutney.",tag:"House special",img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"},
{id:12,name:"Garlic Bread",category:"Pizza",price:129,desc:"Toasted bread with garlic butter and herbs.",tag:"Side favourite",img:"https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=700&q=80"}
];
let cart=JSON.parse(localStorage.getItem("foodiehub-cart")||"[]"),activeCategory="All";
const $=s=>document.querySelector(s),grid=$("#foodGrid");
const money=n=>"₹"+n.toLocaleString("en-IN");
function renderProducts(){let q=$("#searchInput").value.toLowerCase();let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));grid.innerHTML=list.length?list.map(p=>`<article class="food-card"><div class="food-photo" style="background-image:url('${p.img}')"><span class="food-tag">${p.tag}</span></div><div class="food-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="food-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button></div></div></article>`).join(""):'<p class="no-results">No dishes found. Try another search.</p>'}
function save(){localStorage.setItem("foodiehub-cart",JSON.stringify(cart));renderCart()}
function add(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();toast("Added to your cart!")}
function changeQty(id,d){let item=cart.find(x=>x.id===id);if(!item)return;item.qty+=d;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);save()}
function renderCart(){let count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);$("#cartCount").textContent=count;$("#drawerCount").textContent=`(${count})`;$("#cartTotal").textContent=money(total);$("#checkoutTotal").textContent=money(total);$("#cartItems").innerHTML=cart.length?cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div><h4>${p.name}</h4><small>${money(p.price)} each</small><div class="qty"><button data-qty="${p.id}" data-delta="-1">−</button><b>${x.qty}</b><button data-qty="${p.id}" data-delta="1">+</button></div></div><strong>${money(p.price*x.qty)}</strong></div>`}).join(""):'<p class="empty-cart">Your cart is hungry. Add something delicious!</p>'}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")}
$("#filters").addEventListener("click",e=>{let b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#searchInput").addEventListener("input",renderProducts);
grid.addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(b)add(Number(b.dataset.add))});
$("#cartItems").addEventListener("click",e=>{let b=e.target.closest("[data-qty]");if(b)changeQty(Number(b.dataset.qty),Number(b.dataset.delta))});
$("#cartOpen").onclick=openCart;$("#cartClose").onclick=closeCart;$("#overlay").onclick=closeCart;
$("#checkoutButton").onclick=()=>{if(!cart.length){toast("Your cart is empty!");return}closeCart();$("#checkoutModal").classList.add("show")};
$("#checkoutClose").onclick=()=>$("#checkoutModal").classList.remove("show");
$("#checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")$("#checkoutModal").classList.remove("show")});
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();let name=new FormData(e.target).get("name");cart=[];save();$("#checkoutModal").classList.remove("show");e.target.reset();toast(`Thank you ${name}! Your demo order is confirmed.`)});
$("#bookingDate").min=new Date().toISOString().split("T")[0];
$("#bookingForm").addEventListener("submit",e=>{e.preventDefault();let d=new FormData(e.target);toast(`Thanks ${d.get("name")}! Your table request is confirmed.`);e.target.reset()});
$("#menuToggle").onclick=()=>$("#nav").classList.toggle("open");
$("#nav").addEventListener("click",e=>{if(e.target.tagName==="A")$("#nav").classList.remove("open")});
$("#year").textContent=new Date().getFullYear();renderProducts();renderCart();
