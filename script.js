// --- DOM READY ---
document.addEventListener("DOMContentLoaded", () => {

  // ---- USER SESSION ----
  const username = localStorage.getItem("username");
  const loginNav = document.getElementById("loginNav");
  const logoutNav = document.getElementById("logoutNav");
  const logo = document.getElementById("logo");

  if (username) {
    loginNav?.classList.add("disabled");
    logoutNav?.classList.remove("d-none");
    logo && (logo.textContent = `Welcome ${username}`);
  }

  // ---- LOGOUT ----
  logoutNav?.addEventListener("click", () => {
    localStorage.removeItem("username");
    window.location.href = "login.html";
  });

  // .... DARK MODE ...
  document.getElementById("darkModeBtn")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // ..... LOAD EVENTS / PACKAGES ....
  const container = document.getElementById("priceContainer");
  if (container) {
    fetch("events.json")
      .then(res => res.json())
      .then(data => {
        container.innerHTML = "";
        data.events.forEach(item => {
          const col = document.createElement("div");
          col.className = "col-md-4 mb-3";

          col.innerHTML = `
            <div class="card h-100">
              <img src="${item.img}" class="card-img-top" alt="${item.name}">
              <div class="card-body text-center">
                <h5 class="package">${item.name}</h5>
                <h3 class="amount">€${item.price}</h3>
                ${item.features.map(f => `<p><i class="fa-solid fa-square-check"></i> ${f}</p>`).join('')}
                <button class="btn btn-dark chooseBtn">Choose Plan</button>
              </div>
            </div>
          `;
          container.appendChild(col);
        });

        document.querySelectorAll(".chooseBtn").forEach(btn => {
          btn.addEventListener("click", () => alert("Plan booked successfully!"));
        });
      })
      .catch(err => console.error("Error loading events:", err));
  }

  // ....CONTACT FORM .....
  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !/^\d{10,15}$/.test(mobile) || !message) {
      alert("Please fill all fields correctly.");
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent.`);
    contactForm.reset();
  });

  // ... REVIEWS SECTION ....
  const reviewsData = [
    { name: "Sarah & Ali", rating: 5, message: "They made our wedding unforgettable! Every detail was perfect." },
    { name: "Maryam & Hamid", rating: 5, message: "Professional, creative, and caring team. Highly recommend!" },
    { name: "Farid & Laila", rating: 4, message: "Beautiful decorations and seamless coordination. Great experience." }
  ];

  const reviewContainer = document.getElementById("review");
  if (reviewContainer) {
    reviewContainer.innerHTML = `
      <div class="container text-center">
        <h2 class="mb-4">Client Reviews</h2>
        <div class="row justify-content-center">
          ${reviewsData.map(r => `
            <div class="col-md-4 mb-3">
              <div class="card p-3 h-100">
                <h5>${r.name}</h5>
                <p>${"⭐".repeat(r.rating)}</p>
                <p>"${r.message}"</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // .... BACK TO TOP BUTTON ....
  const backToTop = document.querySelector('footer i.fa-circle-arrow-up');
  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.style.display = window.scrollY > 300 ? 'inline-block' : 'none';
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // .... APPOINTMENT FORM ....
  const appointmentForm = document.getElementById("appointmentForm");
  appointmentForm?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Your appointment request has been submitted successfully!");
    appointmentForm.reset();
  });

  // .... LOGIN HANDLER ....
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  loginForm?.addEventListener("submit", e => {
    e.preventDefault();

    const usernameInput = document.getElementById("user").value.trim();
    const passwordInput = document.getElementById("pass").value.trim();

    if (!usernameInput || !passwordInput) {
      loginError.textContent = "Username & Password required";
      return;
    }

    if (usernameInput === "admin" && passwordInput === "1234") {
      localStorage.setItem("username", usernameInput);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      loginError.textContent = "Invalid username or password!";
    }
  });

});


fetch('events.json')
  .then(response => response.json())
  .then(data => {
    const events = data.events;

  })
  .catch(error => console.error('Error loading events:', error));
