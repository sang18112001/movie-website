const accountDashboardPerform = () => {
  const dashboardBox = document.querySelector('.dashboard-box');
  dashboardBox.classList.remove('wishListClass');
  dashboardBox.innerHTML = `
     <h1 style="text-align: center">Account Modification</h1>
     <div class="dashboard-box-main">
        <div class="dashboard-avt">
           <p style="font-size: 18px;">Change your avatar:</p>
           <div class="avatar-container">
             <img class="account_avt" width="100%"></img>
             <label for="inputTag">
                <div class="icon-change">
                  <i class="fa-regular fa-pen" ></i>
                </div>
                <input type="file" name="avatar" id="inputTag" title=" " style="display:none"/>
              </label>
          </div>
        </div>
        <div class="form_box">
          <form class="dashboard-content">
            <div class="name-change">
              <label for="username">Username:</label>
              <input name="username" placeholder="Change your name">
            </div>
            <div class="password-old">
              <label for="old_password">Your Password:</label>
              <input name="old_password" type="password"placeholder="Your password">
              <p class="checkPassword active-hidden">Passwords don't match</p>
            </div>
          </form>
          <form>
            <div class="password-change">
              <label for="password">New Password:</label>
              <input name="password" type="password"placeholder="New password">
            </div>
            <div class="password-confirm">
              <label for="confirm_password">Confirm Password:</label>
              <input name="confirm_password" type="password"placeholder="Confirm password">
              <p class="checkPassword active-hidden">Passwords don't match</p>
            </div>
          </form>
        </div>
      </div>
      <button class="btn dashboard-submit">Save</button>
     `;
  const avtBox = document.querySelector('.dashboard-box-main .account_avt');
  const avtarBtn = document.querySelector('input[name="avatar"]');
  const nameBtn = document.querySelector('input[name="username"]');
  const passBtn = document.querySelector('input[name="password"]');
  const oldPass = document.querySelector('input[name="old_password"]');
  const confirmPass = document.querySelector('input[name="confirm_password"]');
  const submitBtn = document.querySelector('.dashboard-submit');
  const wrongBox = document.querySelectorAll('.checkPassword');

  getAPI.getInfoUser(uid).then((userInfo) => {
    submitBtn.disabled = userInfo.password != oldPass.value;
    handleOldPassword(oldPass, wrongBox, userInfo, submitBtn);
    handleConfirmPassword(confirmPass, wrongBox, passBtn);
    handleSubmit(avtarBtn, nameBtn, passBtn, avtBox, submitBtn, userInfo);
  });
};

const handleOldPassword = (oldPass, wrongBox, userInfo, submitBtn) => {
  oldPass.addEventListener('input', (e) => {
    if (e.target.value != userInfo.password) {
      wrongBox[0].classList.remove('active-hidden');
      oldPass.classList.add('wrong-account');
      submitBtn.disabled = true;
    } else {
      wrongBox[0].classList.add('active-hidden');
      oldPass.classList.remove('wrong-account');
      submitBtn.disabled = false;
    }
  });
};

const handleConfirmPassword = (confirmPass, wrongBox, passBtn) => {
  confirmPass.addEventListener('input', (e) => {
    if (e.target.value != passBtn.value) {
      wrongBox[1].classList.remove('active-hidden');
      confirmPass.classList.add('wrong-account');
    } else {
      wrongBox[1].classList.add('active-hidden');
      confirmPass.classList.remove('wrong-account');
    }
  });
};

const handleSubmit = (avtarBtn, nameBtn, passBtn, avtBox, submitBtn, userInfo) => {
  let newAvatarUrl = '';
  avtarBtn.addEventListener('change', (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    newAvatarUrl = reader;
    reader.addEventListener('load', () => {
      avtBox.src = reader.result;
    });
  });
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newObject = {
      avatar: newAvatarUrl ? newAvatarUrl.result : userInfo.avatar,
      email: userInfo.email,
      name: nameBtn.value || userInfo.name,
      password: passBtn.value || userInfo.password,
    };
    fetch(`https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${uid}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
    });
    alert('Success');
    window.location.reload();
  });
};
