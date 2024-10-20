import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour gérer l'envoi du formulaire
    console.log("Contact Form Submitted:", { name, email, message });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border-2 border-bleu rounded-2xl"
    >
      <div className="bg-bleu p-6 rounded-t-xl">
        <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
      </div>
      <div className="p-6">
        <div className="mb-4 ">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-2 border-bleu rounded-2xl p-3 w-full"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-bleu rounded-2xl p-3 w-full"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="border-2 border-bleu rounded-2xl p-3 w-full"
            placeholder="Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-white border-2 border-bleu text-bleu hover:text-white rounded-2xl px-6 py-2 mt-4 hover:bg-blue-700"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
