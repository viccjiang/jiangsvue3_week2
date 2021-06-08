// 加入站點
const url = 'https://vue3-course-api.hexschool.io';
// 加入 API Path
const path = 'jiangsvue3';

// 取出資料
// 產品呈現
// this 寫法
const app = {
  data: {
    products: [],//新增列表
  },
  // 取得商品列表資料方法
  getData() {
    axios.get(`${url}/api/${path}/admin/products`)
      .then((res) => {
        // console.log(res);
        if (res.data.success) { //成功的話，把資料存起來
          this.data.products = res.data.products;//把產品資料存起來
          // console.log(this.data.products);
          this.render(); //觸發31行的render 渲染產品列表，要先寫fn 
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 渲染產品列表
  render() {
    //要把畫面渲染在productList，把DOM取出來#productList
    const productsListDom = document.querySelector('#productList');
    //計算產品數量
    const productLen = document.querySelector('#productCount');

    //定義 把陣列內容組成 tr 
    let str = '';
    this.data.products.forEach((item) => {
      str += `
      <tr>
        <td>${item.title}</td>
        <td width="120">${item.origin_price}</td>
        <td width="120">${item.price}</td>
        <td width="100"><div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id=" ${item.id}" ${item.is_enabled ? 'checked' : ''} data-action="complete" data-id="${item.id}">
        <label class="form-check-label" for="is_enabled">${item.is_enabled ? '啟用' : '未啟用'}</label>
        </div></td>
        <td width="120">
          <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
        </td>
      </tr>
      `;
    });
    // console.log(str);
    productsListDom.innerHTML = str;
    productLen.textContent = `${this.data.products.length}`;

    // 刪除按鈕監聽
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    // console.log(deleteBtns);
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', this.deleteProduct); //為所有按鈕加上監聽 ，用 deleteProduct 函式觸發事件
    });
  },

  // 刪除產品方法，觸發刪除事件
  deleteProduct(evt) {
    // console.log('觸發刪除事件');
    // 監聽會觸發事件物件
    // dataset 可以找到 id
    const id = evt.target.dataset.id; //DOM元素操作
    // console.log('deleteProduct',evt, id);
    axios.delete(`${url}/api/${path}/admin/product/${id}`)
      .then((res) => {
        // console.log(res);
        // 因為是在deleteBtns DOM元素內，this指向會有問題，所以不能寫this.render()
        app.getData(); //用 getData 觸發 render
        alert('刪除成功!');
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // 初始化
  init() {
    // 取出cookie 記得hexToken要寫進去 
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    console.log(token);
    //把 token 加到 axios 之後每次發送API時 才能再把 Token 帶出去
    axios.defaults.headers.common['Authorization'] = token;
    // console.log(token);
    // 針對同一個站點

    //直接發送驗證 API檢查，檢查用戶是否登入
    axios.post(`${url}/api/user/check`)
      .then(res => {
        console.log(res);
        if (res.data.success) {
          console.log('登入成功');
        } else {
          alert('登入失敗，請重新輸入帳號、密碼');
          window.location = 'login.html'; //未登入的話跳轉到 login
        }
      })
      .catch((error) => {
        console.log(error);

      })


    // 取得商品列表資料
    this.getData();
  },
};
app.init();
