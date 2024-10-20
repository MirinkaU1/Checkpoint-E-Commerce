import React from "react";

const Advantages = () => {
  return (
    <section className="bg-white w-full text-center text-bleu py-16">
      <div className="mx-20">
        <h2 className="text-3xl font-bold mb-3 text-left">Why Choose Us?</h2>
        <p className="mb-8 text-left">
          Your trusted partner for the latest iPhones, with benefits you can
          count on.
        </p>
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-bleu text-white rounded-lg shadow-md">
            <i class="fi fi-rr-shipping-fast text-[4rem]"></i>
            <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
            <p>Get your iPhone delivered quickly right to your doorstep.</p>
          </div>
          <div className="p-6 bg-bleu text-white rounded-lg shadow-md">
            <i class="fi fi-rr-user-key text-[4rem]"></i>
            <h3 className="text-xl font-bold mb-2">100% Authentic</h3>
            <p>
              Shop with confidence knowing all iPhones are genuine and brand
              new.
            </p>
          </div>
          <div className="p-6 bg-bleu text-white rounded-lg shadow-md">
            <i class="fi fi-rr-award text-[4rem]"></i>
            <h3 className="text-xl font-bold mb-2">Best Prices</h3>
            <p>Unbeatable deals on the latest iPhones garanted.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
