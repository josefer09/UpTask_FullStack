import { useState } from "react";

export default function InfoCards() {
    const features = [
        {
          title: "Create Teams",
          content: "Use our application to manage team participation in your project. Create teams, assign roles, and start collaborating effectively.",
          img: "/uptask/uptask_collaboratosv2.png",
        },
        {
          title: "Role Management",
          content: "Efficiently manage and oversee your projects by assigning different roles with specific permissions to ensure tasks are completed effectively.",
          img: "/uptask/uptask_projectAuth2.png",
        },
        {
          title: "Security and Authentication",
          content: "We prioritize your security and privacy with stringent authentication and authorization processes, ensuring the highest level of user privacy and data integrity.",
          img: "/uptask/uptask_token2.png",
        },
      ];

      const [selectedFeature, setSelectedFeature] = useState(features[0]);
  return (
    <>
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 mt-2 p-4">
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6 text-center">
                Key Features of Uptask
            </h2>
        
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-7xl">
                {/* Columna izquierda: Títulos y contenido */}
                <div className="flex flex-col w-full md:w-1/3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 border cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                            onClick={() => setSelectedFeature(feature)}
                        >
                            <h3 className="text-2xl font-semibold">{feature.title}</h3>
                            <p className=" text-gray-500 font-semibold text-lg mt-2">{feature.content}</p>
                        </div>
                    ))}
                </div>

                {/* Columna derecha: Imagen */}
                <div className="w-full md:w-2/3 flex items-center justify-center h-auto">
                    <img
                        src={selectedFeature.img}
                        alt={selectedFeature.title}
                        className="w-full h-full object-contain transition-transform duration-500 rounded-lg"
                    />
                </div>
            </div>
        </div>
    </>
  )
}
