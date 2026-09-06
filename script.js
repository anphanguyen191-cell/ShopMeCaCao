// ==========================================
// SHOP MẸ CACAO - DATA SẢN PHẨM
// ==========================================

const products = [
    {
        id: 1,
        name: "Bộ Tole Bé Gái Hoa Xinh",
        price: 99000,
        category: "girl",
        image: "images/sp01.JPG",
        sizes: ["1", "2", "3", "4"]
    },

    {
        id: 2,
        name: "Bộ Tole Bé Gái Dễ Thương",
        price: 109000,
        category: "girl",
        image: "images/sp02.JPG",
        sizes: ["1", "2", "3", "4"]
    },

    {
        id: 3,
        name: "Bộ Tole Bé Trai Năng Động",
        price: 99000,
        category: "boy",
        image: "images/sp03.JPG",
        sizes: ["1", "2", "3", "4"]
    },

    {
        id: 4,
        name: "Bộ Tole Bé Xinh Xắn",
        price: 119000,
        category: "all",
        image: "images/sp04.JPG",
        sizes: ["1", "2", "3", "4"]
    }
];


// ==========================================
// GIỎ HÀNG
// ==========================================

let cart = [];


// ==========================================
// HIỂN THỊ SẢN PHẨM
// ==========================================

function displayProducts(productList) {

    const productContainer = document.getElementById("product-list");

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-price">
                    ${formatPrice(product.price)}
                </div>

                <select
                    class="product-size"
                    id="size-${product.id}"
                >

                    <option value="">
                        Chọn size
                    </option>

                    ${product.sizes.map(size => `
                        <option value="${size}">
                            Size ${size}
                        </option>
                    `).join("")}

                </select>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Thêm vào giỏ
                </button>

            </div>
        `;

        productContainer.appendChild(card);

    });
}


// ==========================================
// ĐỊNH DẠNG TIỀN
// ==========================================

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


// ==========================================
// THÊM SẢN PHẨM VÀO GIỎ
// ==========================================

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    const sizeSelect =
        document.getElementById(`size-${productId}`);

    const size = sizeSelect.value;


    if (!size) {

        alert("Bro hãy chọn size cho bé trước nhé!");

        return;
    }


    const existingItem = cart.find(
        item =>
            item.productId === productId &&
            item.size === size
    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            productId: productId,

            name: product.name,

            price: product.price,

            size: size,

            quantity: 1

        });

    }


    updateCart();

    alert("Đã thêm sản phẩm vào giỏ hàng!");
}


// ==========================================
// CẬP NHẬT GIỎ HÀNG
// ==========================================

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    // Tổng số sản phẩm

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    cartCount.textContent =
        totalQuantity;


    // Nếu giỏ hàng trống

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                padding:30px 0;
                color:#927b73;
            ">
                Giỏ hàng đang trống.
            </p>
        `;

        cartTotal.textContent = "0đ";

        return;
    }


    // Hiển thị sản phẩm

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-detail">
                    Size ${item.size}
                    × ${item.quantity}
                </div>

                <button
                    onclick="removeFromCart(${index})"
                    style="
                        border:none;
                        background:none;
                        color:#b85c67;
                        padding:5px 0;
                        font-size:12px;
                    "
                >
                    Xóa
                </button>

            </div>

            <div class="cart-item-price">

                ${formatPrice(
                    item.price * item.quantity
                )}

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    // Tính tổng tiền

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    cartTotal.textContent =
        formatPrice(total);

}


// ==========================================
// XÓA SẢN PHẨM
// ==========================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// MỞ GIỎ HÀNG
// ==========================================

function openCart() {

    const modal =
        document.getElementById("cart-modal");

    modal.style.display = "flex";

}


// ==========================================
// ĐÓNG GIỎ HÀNG
// ==========================================

function closeCart() {

    const modal =
        document.getElementById("cart-modal");

    modal.style.display = "none";

}


// ==========================================
// LỌC SẢN PHẨM
// ==========================================

function filterProducts(category) {

    if (category === "all") {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    displayProducts(filtered);

}


// ==========================================
// CUỘN ĐẾN SẢN PHẨM
// ==========================================

function scrollToProducts() {

    const section =
        document.getElementById("products");

    section.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// LIÊN HỆ SHOP
// ==========================================

function contactShop() {

    alert(
        "Shop Mẹ CaCao sẽ tư vấn cho bro ngay nhé!"
    );

}


// ==========================================
// ĐẶT HÀNG
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Giỏ hàng đang trống!"
        );

        return;
    }


    let message =
        "Xin chào Shop Mẹ CaCao!%0A%0A";

    message +=
        "Tôi muốn đặt hàng:%0A%0A";


    cart.forEach(item => {

        message +=
            `- ${item.name}%0A` +
            `  Size: ${item.size}%0A` +
            `  Số lượng: ${item.quantity}%0A` +
            `  Thành tiền: ${formatPrice(
                item.price * item.quantity
            )}%0A%0A`;

    });


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    message +=
        `TỔNG TIỀN: ${formatPrice(total)}%0A%0A`;


    message +=
        "Tên người nhận:%0A" +
        "Số điện thoại:%0A" +
        "Địa chỉ nhận hàng:%0A";


    alert(
        "Thông tin đơn hàng đã được tạo. Bước tiếp theo chúng ta sẽ kết nối với Zalo/Facebook của Shop."
    );


    console.log(
        decodeURIComponent(message)
    );

}


// ==========================================
// KHỞI ĐỘNG APP
// ==========================================

displayProducts(products);

updateCart();
