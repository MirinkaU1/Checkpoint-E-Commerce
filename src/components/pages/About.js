import React from "react";
import { Link } from "react-router-dom";

import ContactForm from "../ContactForm";

const About = () => {
  return (
    <div className="mx-20 py-8 my-[5rem]">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold">About Us</h1>
      </header>

      {/* Company Overview */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Company Overview</h2>
        <p className="py-4">
          Welcome to [Company Name], where we bring the latest technology to
          your fingertips. We are a dedicated team of professionals committed to
          providing you with the best iPhone shopping experience. <br /> <br />{" "}
          Founded in 2011, [Company Name] started as a small business with a big
          dream: to make the latest technology accessible to everyone. Over the
          years, we have grown into a trusted name in the industry, serving
          thousands of satisfied customers.
          <br />
          <br /> Our journey began with a passion for technology and a vision to
          provide top-quality products at unbeatable prices. From the very first
          day, we have been focused on building strong relationships with our
          customers, offering personalized service, and ensuring complete
          satisfaction.
        </p>
        <img src="/img/about.png" alt="" className="w-full my-3" />
      </section>

      {/* Mission Statement */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Our Mission</h2>
        <p className="py-4">
          Our mission is to make the latest iPhone models accessible to
          everyone, while providing exceptional customer service and unbeatable
          prices. We believe in the power of technology to enhance lives, and we
          are dedicated to bringing you the best products with the highest level
          of trust.
        </p>
      </section>

      {/* Values Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Our Values</h2>
        <p className="py-4">
          <span className="font-semibold">Quality: </span>We are committed to
          offering only genuine and high-quality products.
          <br /> <span className="font-semibold">Customer-Centric: </span>Our
          customers are at the heart of everything we do. We strive to exceed
          your expectations every time.
          <br /> <span className="font-semibold">Innovation: </span> We embrace
          change and continuously seek to innovate, offering you the latest in
          technology.
          <br /> <span className="font-semibold">Responsibility: </span>We take
          our responsibilities seriously, whether it's ensuring product
          authenticity or providing fast and reliable shipping.
        </p>
      </section>

      {/* Meet the Team */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Meet the Team</h2>
        <p className="py-4">
          Meet the dedicated professionals behind [Company Name]. Our team is
          passionate about technology and committed to delivering an outstanding
          shopping experience.
        </p>
      </section>

      {/* Corporate Social Responsibility */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
          Corporate Social Responsibility
        </h2>
        <p className="py-4">
          At [Company Name], we believe in giving back to the community and
          making a positive impact on the world. We are proud to support
          [Charity/Initiative], helping to [describe the cause]. By choosing us,
          you also contribute to these important efforts.
          <br /> Thank you for taking the time to leam more about us. We invite
          you to explore our latest iPhone collection and experience the
          difference at iMasterStore."
        </p>
      </section>

      {/* Contact Section */}
      <section className="flex flex-row gap-8 bg-white">
        {/* Colonne gauche : Informations de contact */}
        <div className="flex flex-col border-2 w-1/3 border-bleu rounded-2xl p-10">
          {/* Email */}
          <div className="flex flex-col items-center mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-9 text-bleu"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            <h3 className="text-lg font-bold text-bleu">Email</h3>
            <p className="text-gray-700">loginipsum@gmail.com</p>
          </div>
          {/* Téléphone */}
          <div className="flex flex-col items-center mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-9 text-bleu"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-bold text-bleu">Telephone</h3>

            <p className="text-gray-700">(229) 555-0109</p>
            <p className="text-gray-700">(229) 657-0118</p>
          </div>
          {/* Réseaux sociaux */}
          <div className="flex justify-center space-x-4 mt-auto">
            <Link
              to="https://instagram.com"
              className="bg-bleu pb-1 p-3 rounded-full text-white text-3xl"
            >
              <i class="fi fi-brands-instagram"></i>
            </Link>
            <Link
              to="https://linkedin.com"
              className="bg-bleu pb-1 p-3 rounded-full text-white text-3xl"
            >
              <i class="fi fi-brands-linkedin"></i>
            </Link>
            <Link
              to="https://twitter.com"
              className="bg-bleu pb-1 p-3 rounded-full text-white text-3xl"
            >
              <i class="fi fi-brands-twitter"></i>
            </Link>
          </div>
        </div>
        {/* Colonne droite : Formulaire de contact */}
        <ContactForm />
      </section>
    </div>
  );
};

export default About;
