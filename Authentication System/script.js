// ✅ Password Strength Validation
function validatePassword(password) {
  const firstChar = password.charAt(0);
  const hasUppercase = firstChar === firstChar.toUpperCase();
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasUppercase && hasLetter && hasNumber && hasSymbol;
}

// ✅ Registration Logic
function register(e) {
  e.preventDefault();
  const username = document.getElementById('regUser').value;
  const password = document.getElementById('regPass').value;

  if (!validatePassword(password)) {
    alert("Password must start with uppercase and include letters, numbers, and symbols.");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Registration successful!");
  window.location.href = "index.html";
}

// ✅ Login Logic
function login(e) {
  e.preventDefault();
  const username = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;
  const remember = document.getElementById('rememberMe').checked;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.username === username && user.password === password) {
    localStorage.setItem("loggedIn", "true");

    if (remember) {
      localStorage.setItem("savedUsername", username);
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedUsername");
      localStorage.removeItem("savedPassword");
    }

    window.location.href = "secure.html";
  } else {
    alert("Invalid credentials");
  }
}

// ✅ Logout Logic
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// ✅ Reset Password Page Logic
function resetPassword(e) {
  e.preventDefault();
  const username = document.getElementById('resetUser').value;
  const newPassword = document.getElementById('newPass').value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.username === username) {
    if (!validatePassword(newPassword)) {
      alert("New password must start with uppercase and include letters, numbers, and symbols.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password: newPassword }));
    alert("Password reset successful! Please login.");
    window.location.href = "index.html";
  } else {
    alert("Username not found!");
  }
}

// ✅ Recover Username Page Logic
function recoverUsername(e) {
  e.preventDefault();
  const enteredPassword = document.getElementById('recoverPass').value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.password === enteredPassword) {
    document.getElementById('resultMsg').textContent = `Your username is: ${user.username}`;
  } else {
    alert("Password is incorrect. Try again.");
  }
}

// ✅ Auto-fill and Access Control Logic
window.onload = function () {
  // Check access on secure page
  if (window.location.pathname.includes("secure.html")) {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn !== "true") {
      alert("Access denied. Please login.");
      window.location.href = "index.html";
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      document.getElementById("userInfo").textContent = `Hello, ${user.username}`;
    }
  }

  // Pre-fill login credentials if "Remember Me" is checked
  if (document.getElementById("loginUser") && localStorage.getItem("savedUsername")) {
    document.getElementById("loginUser").value = localStorage.getItem("savedUsername");
    document.getElementById("loginPass").value = localStorage.getItem("savedPassword");
    document.getElementById("rememberMe").checked = true;
  }
};
