document.addEventListener("DOMContentLoaded", () => {
  const requests = [
      { url: "components/navigation.html", elementId: "navigation" },
      { url: "components/mobilenav.html", elementId: "mobilenav" },
      { url: "views/landingPage.html", elementId: "landingPage" },
      { url: "views/aboutus.html", elementId: "aboutUs" },
      { url: "views/staffs.html", elementId: "staff" },
      { url: "views/contact.html", elementId: "contactUs" },
      { url: "components/footer.html", elementId: "footer" }
  ];

  requests.forEach(request => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
          if (xhr.status === 200) {
              document.getElementById(request.elementId).innerHTML = xhr.responseText;
          }
      };
      xhr.open("GET", request.url, true);
      xhr.send();
  });
});

document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const links = {
      home: document.querySelector(".nav-link[href='#home']"),
      aboutUs: document.querySelector(".nav-link[href='#aboutus']"),
      staff: document.querySelector(".nav-link[href='#staff']"),
      contactUs: document.querySelector(".nav-link[href='#contact']")
  };

  const sections = {
      landingPage: document.getElementById("landingPage"),
      aboutUs: document.getElementById("aboutUs"),
      staff: document.getElementById("staff"),
      contactUs: document.getElementById("contactUs")
  };

  const heights = {
      landingPage: sections.landingPage.offsetHeight,
      aboutUs: sections.aboutUs.offsetHeight,
      staff: sections.staff.offsetHeight
  };

  // Change navbar styles on scroll
  if (window.scrollY > 0) {
      navbar.style.paddingBlock = "0.5rem";
      navbar.style.boxShadow = "0 0 8px 3px rgba(0, 0, 0, 0.3)";
  } else {
      navbar.style.paddingBlock = "1rem";
      navbar.style.boxShadow = "none";
  }

  Object.values(links).forEach(link => {
      link.style.fontWeight = "normal";
  });

  // Set font weights based on scroll position
  if (window.scrollY < heights.landingPage) {
      links.home.style.fontWeight = "700";
  } else if (window.scrollY < heights.landingPage + heights.aboutUs) {
      links.aboutUs.style.fontWeight = "700";
  } else if (window.scrollY < heights.landingPage + heights.aboutUs + heights.staff) {
      links.staff.style.fontWeight = "700";
  } else {
      links.contactUs.style.fontWeight = "700";
  }
});

fetch("components/chatBot.html")
  .then((response) => response.text())
  .then((data) => {
      document.getElementById("chatBot").innerHTML = data;

      const script = document.createElement("script");
      script.text = `
          const qaPairs = {
              "What is the age range for students at St. Emilie Learning Center?": "We accept students from kindergarten through grade 6, typically ages 4 to 12.",
              "How can I enroll my child at St. Emilie Learning Center?": "You can begin the enrollment process by filling out the application form available on our website or by visiting our school office.",
              "What are the tuition fees?": "Tuition fees vary by grade level. Please visit the Tuition & Fees section of our website or contact our office for more details.",
              "Does the school have a uniform policy?": "Yes, we have a standard uniform that all students are required to wear. You can purchase uniforms at our school store.",
              "What are the school hours?": "School hours are from 8:00 AM to 4:00 PM, Monday to Friday."
          };

          function init() {
              let res_elm = document.createElement("div");
              res_elm.innerHTML = "Welcome to St. Emilie Learning Center! How can I assist you today?";
              res_elm.setAttribute("class", "left");
              document.getElementById('msg').appendChild(res_elm);

              const questionContainer = document.getElementById('questionContainer');
              for (const question in qaPairs) {
                  const button = document.createElement("button");
                  button.innerHTML = question;
                  button.className = "question-button";
                  button.onclick = () => handleQuestionClick(question);
                  questionContainer.appendChild(button);
              }
          }

          const handleQuestionClick = (question) => {
              document.getElementById('msg_send').value = question;
              document.getElementById('reply').click();
          };

          document.getElementById('reply').addEventListener("click", (e) => {
              e.preventDefault();
              const req = document.getElementById('msg_send').value.trim();

              if (!req) return;

              let data_req = document.createElement('div');
              let container1 = document.createElement('div');

              container1.setAttribute("class", "msgCon1");
              data_req.innerHTML = req;
              data_req.setAttribute("class", "right");

              let message = document.getElementById('msg');
              message.appendChild(container1);
              container1.appendChild(data_req);

              document.getElementById('msg_send').value = "";

              setTimeout(() => {
                  let res = qaPairs[req] || "Sorry, I couldn't find an answer to that.";

                  let data_res = document.createElement('div');
                  let container2 = document.createElement('div');

                  container2.setAttribute("class", "msgCon2");
                  data_res.innerHTML = res;
                  data_res.setAttribute("class", "left");

                  message.appendChild(container2);
                  container2.appendChild(data_res);

                  const scroll = () => {
                      const scrollMsg = document.getElementById('msg');
                      scrollMsg.scrollTop = scrollMsg.scrollHeight;
                  };
                  scroll();
              }, 800); 
          });

          init(); 

          document.addEventListener("click", function (event) {
              const offcanvas = document.getElementById("offcanvasScrolling");
              const chatBotButton = document.querySelector(".chatBotButton");

              if (!offcanvas.contains(event.target) && !chatBotButton.contains(event.target)) {
                  const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
                  if (offcanvasInstance) {
                      offcanvasInstance.hide();
                  }
              }
          });
      `;
      document.body.appendChild(script);
  })
  .catch((error) => console.error("Error loading chatbot:", error));
