let logo = document.querySelector(".logo");
let ul = document.getElementsByTagName("ul")[0];
let homeButton = ul.getElementsByTagName("li")[0];
let catalogue = ul.getElementsByTagName("li")[1];

const tl = gsap.timeline({ defaults: { duration: 1.9 } });

//load animation

gsap.fromTo(
  ".navbar",
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0, duration: 1 }
);
gsap.fromTo(
  ".content",
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0, duration: 1 }
);

//hover nav animation

logo.addEventListener("mouseover", function () {
  logo.style.transitionDuration = "1s";
  logo.style.width = "250px";
  logo.style.height = "250px";
});
logo.addEventListener("mouseout", function () {
  logo.style.transitionDuration = "1s";
  logo.style.width = "200px";
  logo.style.height = "200px";
});
homeButton.addEventListener("mouseover", () => {
  homeButton.style.transitionDuration = "0.5s";
  homeButton.style.fontSize = "25px";
});
homeButton.addEventListener("mouseout", () => {
  homeButton.style.transitionDuration = "0.5s";
  homeButton.style.fontSize = "20px";
});
catalogue.addEventListener("mouseover", () => {
  catalogue.style.transitionDuration = "0.5s";
  catalogue.style.fontSize = "25px";
});
catalogue.addEventListener("mouseout", () => {
  catalogue.style.transitionDuration = "0.5s";
  catalogue.style.fontSize = "20px";
});

// //send email
// const form = document.querySelector(".contact-form");
// const sendEmail = (e) => {
//   const userEmail = form.querySelector(".footer-email");
//   alert(`Message send to ${userEmail.value}`);
//   Email.send({
//     SecureToken: " 2065dfdd-99b6-426f-ae24-13c60ed47603 ",
//     To: userEmail.value,
//     From: userEmail.value,
//     Subject: "Hello",
//     Body: "You successfully subscribed to our newsletter, you will receive all info about our website on this mail adress",
//   }).then((message) => alert(message));
// };

// form.addEventListener("submit", sendEmail);
