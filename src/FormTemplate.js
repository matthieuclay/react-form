import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const FormTemplate = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const formMessage = document.querySelector(".form-message");

    emailjs
      .sendForm(
        "service_vhum8l9",
        "template_b5o7zlj",
        form.current,
        process.env.REACT_APP_EMAILJS_ID
      )
      .then(
        (result) => {
          form.current.reset();
          formMessage.innerHTML = "<p class='success'>Message sent!</p>";
          setTimeout(() => {
            formMessage.innerHTML = "";
          }, 2500);
        },
        (error) => {
          formMessage.innerHTML =
            "<p class='error'>An error has occurred, please try again.</p>";
          setTimeout(() => {
            formMessage.innerHTML = "";
          }, 2500);
        }
      );
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" required autoComplete="off" />
        <label>Email</label>
        <input type="email" name="email" required autoComplete="off" />
        <label>Message</label>
        <textarea name="message" required />
        <input type="submit" value="Send" />
      </form>

      <div className="form-message"></div>
    </div>
  );
};

export default FormTemplate;
