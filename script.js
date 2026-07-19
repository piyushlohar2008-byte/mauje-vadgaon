emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY",
});

const form = document.getElementById("contactForm");
const msg = document.getElementById("msg");
const btn = form.querySelector("button");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("exampleInputText").value.trim();
    const mobile = document.getElementById("exampleInputPhoneNumber").value.trim();
    const email = document.getElementById("exampleInputEmail1").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^[6-9]\d{9}$/;

    if (name === "") {
        msg.style.color = "red";
        msg.innerHTML = "कृपया नाव टाका.";
        return;
    }

    if (!mobilePattern.test(mobile)) {
        msg.style.color = "red";
        msg.innerHTML = "कृपया वैध 10 अंकी मोबाईल नंबर टाका.";
        return;
    }

    if (!emailPattern.test(email)) {
        msg.style.color = "red";
        msg.innerHTML = "कृपया वैध ई-मेल टाका.";
        return;
    }

    if (message === "") {
        msg.style.color = "red";
        msg.innerHTML = "कृपया माहिती लिहा.";
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "Sending...";

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        name: name,
        mobile: mobile,
        email: email,
        message: message
    })

    .then(() => {

        msg.style.color = "green";
        msg.innerHTML = "Submitted Successfully...!";

        form.reset();

        btn.disabled = false;
        btn.innerHTML = "सबमिट";

        setTimeout(() => {
            msg.innerHTML = "";
        }, 3000);

    })

    .catch(() => {

        msg.style.color = "red";
        msg.innerHTML = "Failed to submit!";

        btn.disabled = false;
        btn.innerHTML = "सबमिट";
    });

});