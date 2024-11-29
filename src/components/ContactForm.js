import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, email, message };

    try {
      const response = await axios.post("/api/contact", formData);
      console.log(response.data.message);
      // Afficher l'alerte
      setShowAlert(true);
      // Réinitialiser le formulaire après envoi
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  return (
    <>
      {showAlert && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Message envoyé !</strong>
          <span className="block sm:inline">
            {" "}
            Nous vous remercions de nous avoir contactés.
          </span>
          <button
            onClick={() => setShowAlert(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Fermer</title>
              <path d="M14.348 5.652a1 1 0 01.022 1.415l-4.838 5.008a1 1 0 01-1.45 0L3.83 7.067a1 1 0 011.414-1.414l3.274 3.384 4.44-4.592a1 1 0 011.39-.017z" />
            </svg>
          </button>
        </div>
      )}
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
    </>
  );
};

export default ContactForm;
