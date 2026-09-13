// ==============================
// HEAD ASSETS (icons + favicon)
// ==============================

function loadHeadAssets() {

    let faLink =
        document.createElement("link");

    faLink.rel = "stylesheet";

    faLink.href =
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";

    document.head.appendChild(faLink);

    let favicon =
        document.createElement("link");

    favicon.rel = "icon";

    favicon.type = "image/svg+xml";

    favicon.href =
        "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
        "<circle cx='32' cy='32' r='32' fill='%23101923'/>" +
        "<text x='32' y='44' font-size='34' text-anchor='middle' fill='white' font-family='Arial' font-weight='bold'>R</text>" +
        "</svg>";

    document.head.appendChild(favicon);
}


// ==============================
// PROTECT PAGES
// ==============================

function protectPage() {

    let protectedElements = [
        "menuList",
        "accountName",
        "myOrderItems",
        "confirmItems"
    ];

    let onProtectedPage = protectedElements.some(function(id) {
        return document.getElementById(id) !== null;
    });

    if (!onProtectedPage) return;

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) {
        window.location.href = "login.html";
    }
}


// ==============================
// CONFIRM MODAL
// ==============================

function showConfirm(message, onConfirm) {

    let overlay =
        document.createElement("div");

    overlay.className = "modalOverlay";

    overlay.innerHTML = `
        <div class="modalBox">
            <p>${message}</p>
            <div class="modalButtons">
                <button type="button" class="modalCancel">
                    Cancel
                </button>
                <button type="button" class="modalConfirm">
                    Confirm
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector(".modalCancel").onclick = function() {
        overlay.remove();
    };

    overlay.querySelector(".modalConfirm").onclick = function() {
        overlay.remove();
        onConfirm();
    };
}


// ==============================
// LOADING OVERLAY
// ==============================

function showLoadingOverlay(message) {

    let overlay =
        document.createElement("div");

    overlay.className = "loadingOverlay";

    overlay.innerHTML = `
        <div class="spinner"></div>
        <p>${message}</p>
    `;

    document.body.appendChild(overlay);
}


// ==============================
// ERROR HELPERS
// ==============================

function showError(id, message) {

    let el = document.getElementById(id);

    if (!el) return;

    el.textContent = message;
    el.style.display = "block";
}

function clearError(id) {

    let el = document.getElementById(id);

    if (!el) return;

    el.style.display = "none";
    el.textContent = "";
}


// ==============================
// VALIDATION
// ==============================

function isValidPhone(phone) {

    return /^[0-9]{8,15}$/.test(phone);
}


// ==============================
// FOOD DATA (for details page)
// ==============================

let foodDetails = {

    "Pizza": {
        price: 10,
        image: "images/pizza.jpg",
        category: "Pizza",
        description: "A delicious cheese pizza with a crispy, oven-baked crust.",
        ingredients: "Mozzarella cheese, tomato sauce, fresh basil, olive oil."
    },

    "Burger": {
        price: 8,
        image: "images/burger.jpg",
        category: "Burger",
        description: "A fresh, juicy burger grilled to perfection.",
        ingredients: "Beef patty, lettuce, tomato, cheese, brioche bun."
    },

    "Chicken": {
        price: 12,
        image: "images/chicken.jpg",
        category: "Chicken",
        description: "Crispy, golden fried chicken with a savory seasoning.",
        ingredients: "Chicken breast, breadcrumbs, house spice blend."
    }

};


// ==============================
// DATE FORMATTING
// ==============================

function formatOrderDate(timestamp) {

    let date = new Date(timestamp);

    let datePart =
        date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    let timePart =
        date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        });

    return datePart + " - " + timePart;
}


// ==============================
// FOOD DETAILS PAGE
// ==============================

function loadFoodDetails() {

    let nameElement =
        document.getElementById("detailName");

    if (!nameElement) return;

    let params =
        new URLSearchParams(window.location.search);

    let food =
        params.get("food");

    let data =
        foodDetails[food];

    if (!data) {

        window.location.href = "menu.html";

        return;
    }

    document.getElementById("detailImage").src = data.image;
    document.getElementById("detailImage").alt = food;

    document.getElementById("detailName").textContent = food;

    document.getElementById("detailDescription").textContent =
        data.description;

    document.getElementById("detailIngredients").textContent =
        data.ingredients;

    document.getElementById("detailPrice").textContent =
        "$" + data.price;

    document.getElementById("detailAddBtn").setAttribute(
        "onclick",
        `addToCart('${food}', ${data.price}, 'detailQuantity')`
    );
}


// ==============================
// CATEGORY FILTER
// ==============================

function filterMenu(category) {

    let foods =
        document.querySelectorAll("#menuList .food");

    foods.forEach(function(food) {

        if (
            category === "All" ||
            food.dataset.category === category
        ) {

            food.style.display = "block";

        } else {

            food.style.display = "none";

        }

    });

    document.querySelectorAll(".categoryBtn").forEach(function(btn) {

        btn.classList.toggle(
            "activeCategory",
            btn.dataset.category === category
        );

    });
}


// ==============================
// NAVIGATION
// ==============================

function showAccountButton() {

    let mainNav = document.getElementById("mainNav");

    if (!mainNav) return;

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) {

        mainNav.innerHTML = `
            <a href="index.html">Home</a>
            <a href="login.html">Login</a>
            <a href="signup.html">Create Account</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        `;

        return;
    }

    mainNav.innerHTML = `

        <a href="index.html">Home</a>

        <a href="menu.html">View Menu</a>

        <a href="account.html">My Account</a>

        <a href="orders.html">My Orders</a>

        <a href="about.html">About</a>

        <a href="contact.html">Contact</a>

        <input
            type="text"
            id="searchBox"
            placeholder="Search food..."
        >

        <a href="menu.html" class="cartLink">
            <i class="fa-solid fa-cart-shopping"></i>
            <span id="cartBadge" class="cartBadge">0</span>
        </a>

        <button
            type="button"
            class="logoutButton"
            onclick="logout()"
        >
            Logout
        </button>

    `;

    setupSearch();
    updateCartBadge();
}


// ==============================
// CART BADGE
// ==============================

function updateCartBadge() {

    let badge =
        document.getElementById("cartBadge");

    if (!badge) return;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let count =
        cart.reduce(function(sum, item) {
            return sum + item.quantity;
        }, 0);

    badge.textContent = count;
}


// ==============================
// CREATE ACCOUNT
// ==============================

function createAccount() {

    clearError("signupError");

    let name =
        document.getElementById("name").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let address =
        document.getElementById("address").value.trim();

    let password =
        document.getElementById("password").value.trim();

    let confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        password === ""
    ) {

        showError("signupError", "Please fill in all information.");

        return;
    }

    if (!isValidPhone(phone)) {

        showError("signupError", "Phone number must contain 8-15 digits.");

        return;
    }

    if (password.length < 6) {

        showError("signupError", "Password must be at least 6 characters.");

        return;
    }

    if (password !== confirmPassword) {

        showError("signupError", "Passwords do not match.");

        return;
    }

    let account = {

        name: name,
        phone: phone,
        address: address,
        password: password

    };

    localStorage.setItem(
        "restaurantAccount",
        JSON.stringify(account)
    );

    window.location.href = "index.html";
}


// ==============================
// LOGIN
// ==============================

function loginAccount() {

    clearError("loginError");

    let phone =
        document.getElementById("loginPhone").value.trim();

    let password =
        document.getElementById("loginPassword").value.trim();

    if (phone === "" || password === "") {

        showError("loginError", "Please enter your phone and password.");

        return;
    }

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) {

        showError("loginError", "No account found. Please create one first.");

        return;
    }

    let account =
        JSON.parse(accountData);

    if (
        account.phone !== phone ||
        account.password !== password
    ) {

        showError("loginError", "Incorrect phone or password.");

        return;
    }

    window.location.href = "menu.html";
}


// ==============================
// LOGOUT
// ==============================

function logout() {

    showConfirm(
        "Are you sure you want to logout?",
        function() {

            localStorage.removeItem("restaurantAccount");

            localStorage.removeItem("cart");

            window.location.href = "login.html";

        }
    );
}


// ==============================
// HOME HERO BUTTONS
// ==============================

function loadHeroButtons() {

    let heroButtons =
        document.getElementById("heroButtons");

    if (!heroButtons) return;

    let extraSections =
        document.getElementById("homeExtraSections");

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (accountData) {

        let account =
            JSON.parse(accountData);

        heroButtons.innerHTML = `

            <p class="heroWelcomeBack">
                Welcome back,
                <strong>${account.name}</strong>!
            </p>

            <a href="menu.html">
                <button type="button" class="btnFilled">
                    Go to Menu
                </button>
            </a>

        `;

        if (extraSections) {
            extraSections.style.display = "block";
        }

        return;
    }

    if (extraSections) {
        extraSections.style.display = "none";
    }

    heroButtons.innerHTML = `

        <a href="login.html">
            <button type="button" class="btnOutline">
                Login
            </button>
        </a>

        <a href="signup.html">
            <button type="button" class="btnFilled">
                Create Account
            </button>
        </a>

    `;
}


// ==============================
// FOOTER
// ==============================

function loadFooter() {

    let footer =
        document.createElement("footer");

    footer.className = "siteFooter";

    footer.innerHTML = `

        <div class="footerContent">

            <div class="footerCol">
                <h3>Our Restaurant</h3>
                <p>Delicious food, made with love.</p>
            </div>

            <div class="footerCol">
                <h3>Quick Links</h3>
                <a href="index.html">Home</a>
                <a href="menu.html">Menu</a>
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
            </div>

            <div class="footerCol">
                <h3>Hours</h3>
                <p>Sat - Thu: 11:00 AM - 12:00 AM</p>
                <p>Friday: 2:00 PM - 12:00 AM</p>
            </div>

            <div class="footerCol">
                <h3>Follow Us</h3>
                <div class="footerSocial">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                </div>
            </div>

        </div>

        <p class="footerBottom">
            &copy; ${new Date().getFullYear()} Our Restaurant. All rights reserved.
        </p>

    `;

    document.body.appendChild(footer);
}

function loadAccount() {

    let nameElement =
        document.getElementById("accountName");

    if (!nameElement) return;

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) {

        window.location.href = "login.html";

        return;
    }

    let account =
        JSON.parse(accountData);

    document.getElementById("accountName").textContent =
        account.name;

    document.getElementById("accountPhone").textContent =
        account.phone;

    document.getElementById("accountAddress").textContent =
        account.address;
}


// ==============================
// EDIT ACCOUNT
// ==============================

function editAccount() {

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) return;

    let account =
        JSON.parse(accountData);

    let card =
        document.querySelector(".accountCard");

    card.innerHTML = `

        <h2>Edit Account</h2>

        <p id="accountError" class="errorMsg"></p>

        <label>Name:</label>

        <input type="text" id="editName" value="${account.name}">

        <label>Phone:</label>

        <input type="text" id="editPhone" value="${account.phone}">

        <label>Address:</label>

        <input type="text" id="editAddress" value="${account.address}">

        <button type="button" onclick="saveAccount()">
            Save Changes
        </button>

        <button type="button" onclick="location.reload()">
            Cancel
        </button>

    `;
}


// ==============================
// SAVE ACCOUNT
// ==============================

function saveAccount() {

    clearError("accountError");

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) return;

    let account =
        JSON.parse(accountData);

    let newName =
        document.getElementById("editName").value.trim();

    let newPhone =
        document.getElementById("editPhone").value.trim();

    let newAddress =
        document.getElementById("editAddress").value.trim();

    if (
        newName === "" ||
        newPhone === "" ||
        newAddress === ""
    ) {

        showError("accountError", "Please fill in all information.");

        return;
    }

    if (!isValidPhone(newPhone)) {

        showError("accountError", "Phone number must contain 8-15 digits.");

        return;
    }

    account.name = newName;
    account.phone = newPhone;
    account.address = newAddress;

    localStorage.setItem(
        "restaurantAccount",
        JSON.stringify(account)
    );

    location.reload();
}


// ==============================
// CART
// ==============================

function addToCart(food, price, quantityId) {

    let quantityElement =
        document.getElementById(quantityId);

    let quantity =
        Number(quantityElement.value);

    if (quantity < 1) {

        quantity = 1;

        quantityElement.value = 1;
    }

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let existingFood =
        cart.find(function(item) {
            return item.food === food;
        });

    if (existingFood) {

        existingFood.quantity += quantity;

    } else {

        cart.push({
            food: food,
            price: price,
            quantity: quantity
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
    updateCartBadge();
}


// ==============================
// REMOVE FROM CART
// ==============================

function removeFromCart(food) {

    showConfirm(
        "Remove this item from your cart?",
        function() {

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            cart = cart.filter(function(item) {
                return item.food !== food;
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            showCart();
            updateCartBadge();

        }
    );
}


// ==============================
// SHOW CART
// ==============================

function showCart() {

    let cartItems =
        document.getElementById("cartItems");

    if (!cartItems) return;

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let cartTotal = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "No items added yet.";

        document.getElementById("cartTotal").textContent = "0";

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function(item) {

        let itemTotal =
            item.price * item.quantity;

        cartTotal += itemTotal;

        cartItems.innerHTML += `
            <p class="cartRow">
                <span>
                    <strong>${item.food}</strong>
                    &times;
                    ${item.quantity}
                    =
                    $${itemTotal}
                </span>
                <button
                    type="button"
                    class="removeBtn"
                    onclick="removeFromCart('${item.food}')"
                >
                    &times;
                </button>
            </p>
        `;

    });

    document.getElementById("cartTotal").textContent = cartTotal;
}


// ==============================
// COMPLETE ORDER
// ==============================

function completeOrder() {

    clearError("cartError");

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        showError("cartError", "Please add food to your order first.");

        return;
    }

    let total =
        cart.reduce(function(sum, item) {
            return sum + (item.price * item.quantity);
        }, 0);

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let newOrder = {
        id: Date.now(),
        dateTime: Date.now(),
        items: cart,
        total: total,
        status: "Preparing"
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.setItem("lastOrder", JSON.stringify(newOrder));

    localStorage.removeItem("cart");

    showLoadingOverlay("Processing your order...");

    setTimeout(function() {

        window.location.href = "confirmation.html";

    }, 900);
}


// ==============================
// CONFIRMATION
// ==============================

function loadCartConfirmation() {

    let confirmItems =
        document.getElementById("confirmItems");

    if (!confirmItems) return;

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) {

        window.location.href = "login.html";

        return;
    }

    let account =
        JSON.parse(accountData);

    document.getElementById("confirmName").textContent = account.name;
    document.getElementById("confirmPhone").textContent = account.phone;
    document.getElementById("confirmAddress").textContent = account.address;

    let orderData =
        localStorage.getItem("lastOrder");

    if (!orderData) {

        confirmItems.innerHTML = "<p>No order found.</p>";

        document.getElementById("confirmTotal").textContent = "0";

        return;
    }

    let order =
        JSON.parse(orderData);

    confirmItems.innerHTML = "";

    order.items.forEach(function(item) {

        let itemTotal =
            item.price * item.quantity;

        confirmItems.innerHTML += `
            <p>
                <strong>${item.food}</strong>
                &times;
                ${item.quantity}
                =
                $${itemTotal}
            </p>
        `;

    });

    document.getElementById("confirmTotal").textContent = order.total;
}


// ==============================
// MY ORDERS (FULL HISTORY + STATUS)
// ==============================

function loadOrders() {

    let orderItems =
        document.getElementById("myOrderItems");

    if (!orderItems) return;

    let accountData =
        localStorage.getItem("restaurantAccount");

    if (!accountData) {

        window.location.href = "login.html";

        return;
    }

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {

        orderItems.innerHTML = "<p>No orders yet. Order now!</p>";

        return;
    }

    orderItems.innerHTML = "";

    orders.slice().reverse().forEach(function(order) {

        let itemsHtml =
            order.items.map(function(item) {
                return `${item.food} &times; ${item.quantity}`;
            }).join(", ");

        let statusClass =
            "status" + order.status.replace(/\s/g, "");

        orderItems.innerHTML += `
            <div class="pastOrder">
                <p class="orderDate">${formatOrderDate(order.dateTime)}</p>
                <p>${itemsHtml}</p>
                <span class="statusBadge ${statusClass}">
                    ${order.status}
                </span>
                <p class="orderTotal">Total: $${order.total}</p>
            </div>
        `;

    });
}

// ==============================
// ADMIN ACCESS
// ==============================

let ADMIN_PASSWORD = "admin123";

function checkAdminAccess() {

    let loginBox =
        document.getElementById("adminLoginBox");

    if (!loginBox) return;

    let isAdmin =
        sessionStorage.getItem("adminSession");

    if (isAdmin === "true") {

        showAdminDashboard();

    }
}

function adminLogin() {

    clearError("adminError");

    let password =
        document.getElementById("adminPassword").value.trim();

    if (password !== ADMIN_PASSWORD) {

        showError("adminError", "Incorrect admin password.");

        return;
    }

    sessionStorage.setItem("adminSession", "true");

    showAdminDashboard();
}

function showAdminDashboard() {

    document.getElementById("adminLoginBox").style.display = "none";

    document.getElementById("adminDashboard").style.display = "block";

    loadAdminOrders();
}

function adminLogout() {

    sessionStorage.removeItem("adminSession");

    window.location.href = "admin.html";
}


// ==============================
// ADMIN ORDERS
// ==============================

function loadAdminOrders() {

    let orderItems =
        document.getElementById("adminOrderItems");

    if (!orderItems) return;

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {

        orderItems.innerHTML =
            "<p>No orders found on this browser yet.</p>";

        return;
    }

    orderItems.innerHTML = "";

    let statuses =
        ["Preparing", "Out for Delivery", "Delivered"];

    orders.slice().reverse().forEach(function(order) {

        let itemsHtml =
            order.items.map(function(item) {
                return `${item.food} &times; ${item.quantity}`;
            }).join(", ");

        let statusClass =
            "status" + order.status.replace(/\s/g, "");

        let currentIndex =
            statuses.indexOf(order.status);

        let nextButtonHtml = "";

        if (currentIndex < statuses.length - 1) {

            nextButtonHtml = `
                <button
                    type="button"
                    class="statusBtn"
                    onclick="advanceOrderStatus(${order.id})"
                >
                    Advance Status
                </button>
            `;

        }

        orderItems.innerHTML += `
            <div class="pastOrder">
                <p class="orderDate">${formatOrderDate(order.dateTime)}</p>
                <p>${itemsHtml}</p>
                <span class="statusBadge ${statusClass}">
                    ${order.status}
                </span>
                <p class="orderTotal">Total: $${order.total}</p>
                ${nextButtonHtml}
            </div>
        `;

    });
}

function advanceOrderStatus(orderId) {

    let orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    let statuses =
        ["Preparing", "Out for Delivery", "Delivered"];

    let order =
        orders.find(function(o) {
            return o.id === orderId;
        });

    if (!order) return;

    let currentIndex =
        statuses.indexOf(order.status);

    if (currentIndex < statuses.length - 1) {

        order.status = statuses[currentIndex + 1];

    }

    localStorage.setItem("orders", JSON.stringify(orders));

    loadAdminOrders();
}


// ==============================
// SEARCH
// ==============================

function setupSearch() {

    let searchBox =
        document.getElementById("searchBox");

    if (!searchBox) return;

    searchBox.addEventListener("keydown", function(event) {

        if (event.key !== "Enter") return;

        let searchText =
            searchBox.value.trim();

        if (searchText === "") return;

        window.location.href =
            "menu.html?search=" + encodeURIComponent(searchText);

    });
}


// ==============================
// SEARCH MENU
// ==============================

function searchMenu() {

    let menuList =
        document.getElementById("menuList");

    if (!menuList) return;

    let params =
        new URLSearchParams(window.location.search);

    let search =
        params.get("search");

    if (!search) return;

    search = search.toLowerCase();

    let foods =
        menuList.querySelectorAll(".food");

    let found = false;

    foods.forEach(function(food) {

        let text =
            food.textContent.toLowerCase();

        if (text.includes(search)) {

            food.style.display = "block";
            found = true;

        } else {

            food.style.display = "none";

        }

    });

    if (!found) {

        menuList.innerHTML = `
            <div class="noFood">
                <h2>No food found</h2>
                <p>Try searching for Pizza, Burger or Chicken.</p>
            </div>
        `;

    }
}


// ==============================
// OLD SINGLE ORDER SYSTEM
// ==============================

function loadOrder() {

    let foodElement =
        document.getElementById("selectedFood");

    if (!foodElement) return;

    let params =
        new URLSearchParams(window.location.search);

    let food = params.get("food");
    let price = params.get("price");
    let quantity = params.get("quantity");

    if (food) {
        document.getElementById("selectedFood").textContent = food;
    }

    if (price) {
        document.getElementById("foodPrice").textContent = "Price: $" + price;
    }

    if (quantity) {
        document.getElementById("quantity").value = quantity;
    }

    calculateTotal();
}

function calculateTotal() {

    let quantityElement = document.getElementById("quantity");
    let totalElement = document.getElementById("total");

    if (!quantityElement || !totalElement) return;

    let params = new URLSearchParams(window.location.search);
    let price = Number(params.get("price"));
    let quantity = Number(quantityElement.value);
    let total = price * quantity;

    totalElement.textContent = total;
}

function sendOrder() {

    let params = new URLSearchParams(window.location.search);
    let food = params.get("food");
    let price = Number(params.get("price"));
    let quantity = Number(document.getElementById("quantity").value);
    let total = price * quantity;

    localStorage.setItem("orderFood", food);
    localStorage.setItem("orderQuantity", quantity);
    localStorage.setItem("orderTotal", total);

    window.location.href = "confirmation.html";
}


// ==============================
// RUN
// ==============================

loadHeadAssets();

protectPage();

showAccountButton();

loadOrder();

loadAccount();

loadOrders();

searchMenu();

showCart();

loadCartConfirmation();

loadHeroButtons();

loadFoodDetails();

loadFooter();

checkAdminAccess();