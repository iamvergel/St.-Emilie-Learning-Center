document.addEventListener("DOMContentLoaded", () => {
  const navigationRequest = new XMLHttpRequest();
  const mobilenavRequest = new XMLHttpRequest();
  const landingPageRequest = new XMLHttpRequest();
  const aboutUsRequest = new XMLHttpRequest();
  const staffsRequest = new XMLHttpRequest();
  const contactRequest = new XMLHttpRequest();
  const footerRequest = new XMLHttpRequest();

  navigationRequest.onload = function () {
    if (navigationRequest.status === 200) {
      document.getElementById("navigation").innerHTML =
        navigationRequest.responseText;
    }
  };

  mobilenavRequest.onload = function () {
    if (mobilenavRequest.status === 200) {
      document.getElementById("mobilenav").innerHTML =
        mobilenavRequest.responseText;
    }
  };

  landingPageRequest.onload = function () {
    if (landingPageRequest.status === 200) {
      document.getElementById("landingPage").innerHTML =
        landingPageRequest.responseText;
    }
  };

  aboutUsRequest.onload = function () {
    if (aboutUsRequest.status === 200) {
      document.getElementById("aboutUs").innerHTML =
        aboutUsRequest.responseText;
    }
  };

  staffsRequest.onload = function () {
    if (staffsRequest.status === 200) {
      document.getElementById("staff").innerHTML =
        staffsRequest.responseText;
    }
  };

  contactRequest.onload = function () {
    if (contactRequest.status === 200) {
      document.getElementById("contactUs").innerHTML =
        contactRequest.responseText;
    }
  };

  footerRequest.onload = function () {
    if (footerRequest.status === 200) {
      document.getElementById("footer").innerHTML =
        footerRequest.responseText;
    }
  };

  navigationRequest.open("GET", "/components/navigation.html", true);
  navigationRequest.send();

  mobilenavRequest.open("GET", "/components/mobilenav.html", true);
  mobilenavRequest.send();

  landingPageRequest.open("GET", "/views/landingPage.html", true);
  landingPageRequest.send();

  aboutUsRequest.open("GET", "/views/aboutus.html", true);
  aboutUsRequest.send();

  staffsRequest.open("GET", "/views/staffs.html", true);
  staffsRequest.send();

  contactRequest.open("GET", "/views/contact.html", true);
  contactRequest.send();

  footerRequest.open("GET", "/components/footer.html", true);
  footerRequest.send();
});

document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  const homeLink = document.querySelector(".nav-link[href='#home']");
  const aboutUsLink = document.querySelector(".nav-link[href='#aboutus']");
  const staffLink = document.querySelector(".nav-link[href='#staff']");
  const contactUsLink = document.querySelector(".nav-link[href='#contact']");

  const landingPage = document.getElementById("landingPage");
  const aboutUs = document.getElementById("aboutUs");
  const staff = document.getElementById("staff");
  const contactUs = document.getElementById("contactUs");

  const landingPageHeight = landingPage.offsetHeight;
  const aboutUsHeight = aboutUs.offsetHeight;
  const staffHeight = staff.offsetHeight;

  // Change navbar styles on scroll
  if (window.scrollY > 0) {
    navbar.style.paddingBlock = "0.5rem";
    navbar.style.boxShadow = "0 0 8px 3px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.paddingBlock = "1rem";
    navbar.style.boxShadow = "0 0 0 0 rgba(0, 0, 0, 0)";
  }

  homeLink.style.fontWeight = "normal";
  aboutUsLink.style.fontWeight = "normal";
  staffLink.style.fontWeight = "normal";
  contactUsLink.style.fontWeight = "normal";

  // Set font weights based on scroll position
  if (window.scrollY < landingPageHeight) {
    homeLink.style.fontWeight = "700"; 
  } else if (window.scrollY < landingPageHeight + aboutUsHeight) {
    aboutUsLink.style.fontWeight = "700";
  } else if (window.scrollY < landingPageHeight + aboutUsHeight + staffHeight) {
    staffLink.style.fontWeight = "700";
  } else if (window.scrollY < landingPageHeight + aboutUsHeight + staffHeight + contactUs) {
    contactUsLink.style.fontWeight = "700";
  } else {
    contactUsLink.style.fontWeight = "700";
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Get the current URL hash
  const currentPage = window.location.hash || '#home';

  // Remove 'active' class from all links
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.classList.remove('active'));

  // Add 'active' class to the current page link
  const activeLink = document.querySelector(`a[href="${currentPage}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
});
