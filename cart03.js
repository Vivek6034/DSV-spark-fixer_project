let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceContainer.textContent = "Total: ₹0";
    } else {
        let cartHTML = '';
        let totalPrice = 0;

        cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            cartHTML += `
                <div class="cart-item">
                    <span>${item.name} - ₹${item.price} x ${item.quantity} = ₹${itemTotal}</span>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        totalPriceContainer.textContent = `Total: ₹${totalPrice}`;
    }
}

document.addEventListener('DOMContentLoaded', displayCartItems);

async function retrive_data() {
    let data = await fetch("http://localhost:3000/orders")
    let final_data = await data.json()
    let tdata = final_data.map((e) => `
        <h2>=======================================</h2>
        <h2>Booking Details</h2>
        <p><strong>Id : </strong>${e.id}</p>
        <p><strong>Name : </strong>${e.name}</p>
        <p><strong>Email : </strong>${e.email}</p>
        <p><strong>Phone : </strong>${e.phone}</p>
        <p><strong>Address : </strong>${e.address}</p>
        <p><strong>Total-price : </strong>${e.totalPrice}</p>
        <ul>
            <h2>Cart Items</h2>
                ${e.cartItems.map(item => `
                <li>${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</li>
            `).join('')}
        </ul>
        <button onclick="mydelete('${e.id}')" >Delete</button>
        <button onclick="myedit('${e.id}')">Edit</button>

        
    `).join('')
    document.querySelector('#all_bokking').innerHTML = tdata
}


retrive_data()
function savedata() {
    let formData = {
        name: document.getElementById('booking-uname').value,
        email: document.getElementById('booking-uemail').value,
        phone: document.getElementById('Contact').value,
        address: document.getElementById('address').value,
        appliance: document.getElementById('appliance_type').value,
        brand: document.getElementById('Brand').value,
        model: document.getElementById('model_no').value,
        issue: document.getElementById('issue').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        payment: document.getElementById('payment').value,
        cartItems: cartItems,
        totalPrice: document.getElementById('total-price').textContent
    };


    fetch('http://localhost:3000/orders', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(r =>{ alert("Data inserted successfuly");
            localStorage.removeItem('cartItems');
            location.assign = "your_order.html";

        })
    


}

function mydelete(id) {
    fetch(`http://localhost:3000/orders/${id}`, {
        method: "DELETE",
    })
        .then(res => alert("Deleted.....!!!!"))
    location.reload()
}

async function myedit(id) {
    let data = await fetch(`http://localhost:3000/orders/${id}`)
    let resdata = await data.json()
    let frm = `
    <input type="text" value ="${resdata.id}" id="id1" readonly> <br><br>
    <input type="text" value ="${resdata.name}" id="name1" > <br><br>
    <input type="text" value ="${resdata.email}" id="age1"> <br><br>
    <input type="text" value ="${resdata.phone}" id="contact1" > <br><br>
    <input type="text" value ="${resdata.address}" id="city1"> <br><br>
    <input type="submit" value="Update" onclick="finalupdate('${resdata.id}')" > 
  `
    document.querySelector('#editfrm').innerHTML = frm
}

function finalupdate(id) {
    let formdata = {
        id: document.querySelector('#id1').value,
        name1: document.querySelector('#name1').value,
        age: document.querySelector('#age1').value,
        contact: document.querySelector('#contact1').value,
        city: document.querySelector('#city1').value,
    }
    fetch(`http://localhost:3000/orders/${id}`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
        .then(r => alert("Update successfuly"))

    location.reload()

}




