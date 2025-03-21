// drop-button
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

//   login-function
const datasubmit = () => {
    let userdata = {
        name: document.querySelector('#uname').value,
        email: document.querySelector('#uemail').value,
        number: document.querySelector('#unumber').value,
        password: document.querySelector('#upasswd').value,
    };
    localStorage.setItem("userdata", JSON.stringify(userdata));
    alert("Signup successful!");
};

const logindata = () => {
    let ulogindata = {
        login_email: document.querySelector('#ulemail').value,
        login_passwd: document.querySelector('#ulpasswd').value,
    };

    let udata = JSON.parse(localStorage.getItem("userdata"));

    if (udata && ulogindata.login_email === udata.email && ulogindata.login_passwd === udata.password) {
        alert("Login successful!");
        localStorage.setItem("logindata",JSON.stringify(ulogindata))
        localStorage.setItem("loginemail", ulogindata.login_email)
        document.location.href ="index.html"
        return false
    } else {
        alert("Email or password is incorrect.");
    }

    // localStorage.setItem("logindata", JSON.stringify(ulogindata));
};
const logout = () => {
    localStorage.removeItem("logindata");
    alert("You have been logged out.");
    document.location.href = "index.html"; 
};

window.onload = () => {
  if (document.location.pathname.endsWith("index.html")) {
      let udata = JSON.parse(localStorage.getItem("userdata"));
      let logindata = JSON.parse(localStorage.getItem("logindata"));

      if (!udata || !logindata || logindata.login_email !== udata.email || logindata.login_passwd !== udata.password) {
          alert("Please login or signup to access this page.");
          document.location.href = "login_page.html"; // Redirect to login page
      }
  }
};
// Admin Login
function Admin_login() {
  let Admin_email = "viveksingh6034@gmail.com"
  let Admin_password = "6034@"

  let email =document.getElementById("admin_email").value;
  let password = document.getElementById("admin_pwd").value;

  if(email ==Admin_email && password==Admin_password){
    alert("Admin Login Successfull!")
    localStorage.setItem("Admin_login", "true")
    document.location.href ="booking_details.html"
  }
  else{
    document.getElementById("error_msg").textContent="Invalid Email or Password ";
  }
}