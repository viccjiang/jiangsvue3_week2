// 加入站點
const url = 'https://vue3-course-api.hexschool.io';
// 加入 API Path
const path = 'jiangsvue3';

// 登入頁 取出dom元素
const usernameInput = document.querySelector('#username'); // 使用者名稱
const passwordInput = document.querySelector('#password'); // 使用者密碼
const loginBtn = document.querySelector('#login'); // 登入按鈕


// 登入按鈕監聽  觸發按鈕監聽事件   
loginBtn.addEventListener('click', login);

// 登入方法
// 取得 Token
// 將 Token 存到 Cookie
function login() {
  // console.log('成功觸發');
  //這裡是個雷，要把帳密放到fn裡才會取到值，不能放到fn外 (函式觸發後才能取到值)
  const username = usernameInput.value;
  const password = passwordInput.value;
  const loginData = {
    username, //縮寫形式
    password,
  };

  // console.log(loginData);
  // 發出登入請求，登入用 post
  // 取得 Token
  // 將 Token 存到 Cookie
  axios.post(`${url}/admin/signin`, loginData)// 發出請求，在登入時會把帳號密碼資料 loginData 送出去
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        // const token = res.data.token;
        // const expired = res.data.expired;
        // 使用解構手法，取得 res.data 內的 token 及 expired
        const { token, expired } = res.data;
        console.log(token, expired);
        // 儲存cookie
        // 儲存 cookie ( 這段程式碼來自 MDN ) 代入token ＆ 有效日期
        // hexToken 要記得寫進去
        document.cookie = `hexToken=${token};expired=${new Date(expired)}; path=/`;
        window.location = 'index.html'; //成功的話跳轉到 index
      } else {
        alert('登入失敗，請重新輸入帳號、密碼');
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


