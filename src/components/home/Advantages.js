import React from "react";

const Advantages = () => {
  return (
    <section className="bg-white w-full text-center text-bleu py-16">
      <div className="mx-10 lg:mx-20">
        <h2 className="text-3xl font-bold mb-3 text-left">
          Pourquoi Nous Choisir?
        </h2>
        <p className="mb-8 text-left">
          Votre partenaire de confiance pour les derniers iPhones, avec des
          avantages sur lesquels vous pouvez compter.
        </p>
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-bleu text-white rounded-lg shadow-md">
            <i class="fi fi-rr-shipping-fast text-[4rem]"></i>
            <h3 className="text-xl font-bold mb-2">Livraison Rapide</h3>
            <p>Recevez votre iPhone rapidement directement à votre porte.</p>
          </div>
          <div className="p-6 bg-bleu text-white rounded-lg shadow-md">
            <i class="fi fi-rr-user-key text-[4rem]"></i>
            <h3 className="text-xl font-bold mb-2">100% Authentique</h3>
            <p>
              Achetez en toute confiance en sachant que tous les iPhones sont
              authentiques et neufs.
            </p>
          </div>
          <div className="p-6 bg-bleu text-white rounded-lg shadow-md">
            <i class="fi fi-rr-award text-[4rem]"></i>
            <h3 className="text-xl font-bold mb-2">Meilleurs Prix</h3>
            <p>Des offres imbattables sur les derniers iPhones garanties.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
