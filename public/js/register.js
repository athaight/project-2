
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  console.log(name, email, password)


    if (name && password && email) {
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
