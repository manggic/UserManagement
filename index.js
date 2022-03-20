document.getElementById("name").addEventListener("keyup", function (e) {
  console.log("e", e.target.value);
  user.name = e.target.value;
});
document.getElementById("email").addEventListener("keyup", function (e) {
  console.log("e", e.target.value);
  user.email = e.target.value;
});
document.getElementById("mobile").addEventListener("keyup", function (e) {
  console.log("e", e.target.value);
  user.mobile = e.target.value;
});
document.getElementById("age").addEventListener("keyup", function (e) {
  console.log("e", e.target.value);
  user.age = e.target.value;
});
document.getElementById("dob").addEventListener("keyup", function (e) {
  console.log("e", e.target.value);
  user.dob = e.target.value;
});

let user = {};

var data = null;

// create
if (document.getElementById("addBtn")) {
  document
    .getElementById("addBtn")
    .addEventListener("click", async function (e) {
      e.preventDefault();
      // alert('add');

      var form = document.getElementById("user-form");
      form.classList.add("was-validated");
      console.log("form", form);
      if (form.checkValidity()) {
        console.log("full data", user);
        await fetch("http://localhost:3001/add", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(user), // body data type must match "Content-Type" header
        })
          .then((res) => {
            res.json().then((res) => {
              console.log("response", res);
              if (res.success) {
                document.getElementById("alert").style.display = "block";

                setTimeout(
                  () =>
                    (document.getElementById("alert").style.display = "none"),
                  3000
                );

                document.getElementById(`name`).value = "";
                document.getElementById(`email`).value = "";
                document.getElementById(`mobile`).value = "";
                document.getElementById(`age`).value = "";
                document.getElementById(`dob`).value = null;

                form.classList.remove("was-validated");
              }
            });
          })
          .catch((err) => console.log("err", err));
        console.log("Data", data);
      }
    });
}

const fillRandomDetail = () => {
  document.getElementById(`name`).value = "singh";
  document.getElementById(`email`).value = "manya@gmail.com";
  document.getElementById(`mobile`).value = "123";
  document.getElementById(`age`).value = "23";

  var now = new Date();

  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);

  var today = now.getFullYear() + "-" + month + "-" + day;

  document.getElementById(`dob`).value = today;

  user = {
    name: "singh",
    email: "manya@gmail.com",
    mobile: 12345,
    age: 23,
    dob: today,
  };
};

document.getElementById("alert").style.display = "none";
