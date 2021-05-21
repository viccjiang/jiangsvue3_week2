
const url = 'https://vue3-course-api.hexschool.io';
const path = 'jiangsvue3';

const productList = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');

function init() {
    getProductList();
}

function getProductList() {
    axios.get(`${url}/api/${path}/products`)
        .then(function (response) {
            console.log(response.data);
            productData = response.data.products; //把產品資料存起來
            console.log(productData);
            renderProductList();//渲染產品列表，要先寫fn
        })
}

function renderProductList() {
    let str = '';
    productData.forEach(function (item) {
        str += ` 
        <tr>
            <td>${item.title}</td>
            <td>${item.origin_price}</td>
            <td>${item.price}</td>
            <td>${item.is_enabled}</td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"  data-id=""> 刪除 </button>
            </td>
        </tr > `;
    });

    productList.innerHTML = str;
    productCount.textContent = productData.length;
}

productList.addEventListener('click', function (e) {
    let cartId = e.target.getAttribute('data-id');
    if (cartId == null) {
        return;
    }
    deleteProductList(cartId);
})

function deleteProductList(cartId) {
    axios.delete(`${url}/api/${path}/cart/${cartId}`)
        .then(function (response) {
            console.log(response);
            alert('已刪除');
            getProductList();
        })
}

init();
