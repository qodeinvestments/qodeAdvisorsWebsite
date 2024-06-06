import React from "react";

const OurBeliefs = () => {
  const services = [
    { title: "Asesoria Técnica Personal", icon: "🤖" },
    { title: "Periodico Digital", icon: "📰" },
    { title: "Cursos", icon: "📚" },
    { title: "Personal", icon: "👥" },
    { title: "Punto de Venta", icon: "💰" },
    { title: "El Rincón de Moda", icon: "👚" },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={index} className="relative">
            <div className="absolute -inset-1 bg-black transform rotate-12" />
            <div className="relative flex items-center justify-center bg-white h-32 w-32">
              <div className="text-center">
                <span className="text-3xl">{service.icon}</span>
                <p className="text-sm font-bold">{service.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurBeliefs;
