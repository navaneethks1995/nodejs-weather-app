// fetch('/weather?address=Boston')
// .then(res=>res.json())
// .then(res => console.log(res))
// .catch(console.error)

const weatherForm = document.querySelector("form");
const address = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  let location = address.value;
  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      messageOne.textContent = "";
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = `Location: ${data.location}`;
        messageTwo.textContent = `${data.forecast}`;
      }
    })
    .catch(console.error);
});
