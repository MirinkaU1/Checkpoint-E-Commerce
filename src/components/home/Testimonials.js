import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arlene McCoy",
      feedback:
        "Lorem ipsum dolcr sit amet consectetur. Fames ut cursus magna eget. Varius pellentesque mattis maecenas aliquam tellus sagittis nec tempus malesuada. Id integer tincidunt eu adipiscing fringilla. Amet gravida tristique non sit elit rhoncus neque sodales dolor. Hendrerit tellus venenatis di ..",
      img: "https://example.com/avatar1.png",
    },
    {
      name: "Cameron Williamson",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Nisi mattis ornare eget amet pulvinar ut. Volutpat imperdiet eu volutpat eget ut magnis sem id feuglat. Ac sed ipsum luctus nibh vellt in sollicitudin nunc. Tortor phasellus sit sed scelerisque sed.",
      img: "https://example.com/avatar2.png",
    },
    {
      name: "Wade Warren",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Quis tortor in in lobortis amet consectetur felis consequat id. Euismod at tempor ut integer elit leo. Ultricies magna placerat sollicitudin posuere enim aliquam. Tristique dui in gravida erat.",
      img: "https://example.com/avatar3.png",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-bleu via-bleu to-blue-900 w-full py-16">
      <div className="mx-20 text-center">
        <h2
          id="reviews"
          className="text-3xl text-left text-white font-bold mb-8"
        >
          What our customers say about us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const initials = testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="avatar placeholder mb-3">
                  <div className="bg-blue-500 text-neutral-content w-24 rounded-full">
                    <span className="text-3xl">{initials}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.feedback}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
