// Transission sign in and sign up
const signInBox = document.querySelector(".sign-in-body");
const signUpBox = document.querySelector(".sign-up-body");
const signInTitle = document.querySelector(".sign-in-title");
const signUpTitle = document.querySelector(".sign-up-title");
const signInBtn = document.querySelector(".sign-in-body button");
const signUpBtn = document.querySelector(".sign-up-body button");
const signIntoUp = document.querySelector(
  ".sign-in-body .sign-converting span"
);
const signUptoIn = document.querySelector(
  ".sign-up-body .sign-converting span"
);

function inToUp() {
  signInBox.classList.add("active-hidden");
  signUpBox.classList.remove("active-hidden");
  signInTitle.classList.add("active-sign");
  signUpTitle.classList.remove("active-sign");
  document.querySelector(".sign-in-wrong").classList.add("active-hidden");
}
function upToIn() {
  signInBox.classList.remove("active-hidden");
  signUpBox.classList.add("active-hidden");
  signInTitle.classList.remove("active-sign");
  signUpTitle.classList.add("active-sign");
}

signIntoUp.addEventListener("click", inToUp);
signUptoIn.addEventListener("click", upToIn);

// Continue to the next page
function continuePage(uid) {
	document.querySelector('.successful_continue').addEventListener("click", (event) => {
		event.preventDefault()
		window.location.assign(`index.html?uid=${uid}`);
	})
}

// Sign in and sign up account
// sign in
function signInAccount() {
  signInBox.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(signInBox);
    const your_account = Object.fromEntries(formData);
    console.log(your_account);
    async function modifyAPI() {
      const res = await fetch(
        "https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
      );
      const data = await res.json();
      const keysArr = Object.keys(data);
      const valuesArr = Object.values(data);
      let check = false;
      for (i = 0; i < valuesArr.length; i++) {
        if (
          valuesArr[i].email == your_account.email &&
          valuesArr[i].password == your_account.password
        ) {
          check = true;
          valuesArr[i].checkSignIn = true;
          document.querySelector('.successful_sign').classList.add('active-flex')
          document.querySelector(".sign-in-wrong-container").classList.add("active-hidden");
			 continuePage(keysArr[i])
          break;
        }
      }
      if (check === false) {
        document
          .querySelector(".sign-in-wrong-container")
          .classList.remove("active-hidden");
      }
      fetch(
        `https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user/${keysArr[i]}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valuesArr[i]),
        }
      );
    }
    modifyAPI();
  });
}

signInAccount();

// Sign up account
function signUpAccount() {
  checkPassword = document.querySelector(".checkPassword");
  retype = document.querySelector(".retype");
  email = document.querySelector(".email");
  checkEmail = document.querySelector(".checkEmail");
  checkAllow = document.querySelector(".checkAllow");
  image_path = document.querySelector(".image");

  signUpBox.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(signUpBox);
    const new_account = Object.fromEntries(formData);
    new_account.checkSignIn = false;
    const addNewAccount = {
      checkSignIn: "false",
      email: new_account.email,
      name: new_account.firstName + new_account.lastName,
      password: new_account.password,
    };
    console.log(addNewAccount);
    fetch(
      "https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
    )
      .then((res) => res.json())
      .then((accounts) => {
        if (accounts) {
          const account = Object.values(accounts);
          const emails = account.map((element) => element.email);
          if (
            !emails.includes(addNewAccount.email) &&
            new_account.password === new_account.retype &&
            new_account.checkLincence === "on"
          ) {
            email.style.border = "none";
            retype.style.border = "none";
            checkEmail.classList.add("active-hidden");
            checkPassword.classList.add("active-hidden");
            checkAllow.classList.add("active-hidden");
            uploadAccountAPI(addNewAccount);
            upToIn();
          } else if (emails.includes(addNewAccount.email)) {
            email.style.border = "3px solid red";
            checkEmail.classList.remove("active-hidden");
          } else if (new_account.password !== new_account.retype) {
            checkPassword.classList.remove("active-hidden");
            retype.style.border = "3px solid red";
          } else if (new_account.checkLincence !== "on") {
            checkAllow.classList.remove("active-hidden");
          }
        } else {
          uploadAccountAPI(addNewAccount);
        }
      });
  });
}
signUpAccount();
const uploadAccountAPI = (addNewAccount) => {
  fetch(
    "https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app/user.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addNewAccount),
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};
