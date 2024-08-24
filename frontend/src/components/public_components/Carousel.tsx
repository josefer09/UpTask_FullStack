

export default function Carousel() {

    const technologies = [
        { title: "React", src: "/technologies/react.svg" },
        { title: "NodeJs", src: "/technologies/nodejs.svg" },
        { title: "Git", src: "/technologies/git.svg" },
        { title: "Ts", src: "/technologies/ts.svg" },
        { title: "Tailwind", src: "/technologies/tailwind.svg" },
        { title: "Express", src: "/technologies/express.svg" },
        { title: "MongoDB", src: "/technologies/mongodb.svg" },
        { title: "Vite", src: "/technologies/vite.svg" },
        { title: "Docker", src: "/technologies/docker-3.svg" },
        { title: "Postman", src: "/technologies/postman.svg" },
    
    
    
        // Añade más tecnologías aquí
      ];

  return (
    <>
    <div className="relative overflow-hidden w-full mt-8">
      <h1 className="text-4xl font-bold text-center">Technologies & Tools</h1>
      <div className="flex animate-marquee whitespace-nowrap my-8">
        {/* Primera fila de imágenes */}
        {technologies.map((tech, index) => (
          <div key={index} className="flex-shrink-0 w-32 h-32 mx-10">
            <img
              src={tech.src}
              alt={tech.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
        {/* Segunda fila de imágenes duplicada */}
        {technologies.map((tech, index) => (
          <div key={index + technologies.length} className="flex-shrink-0 w-32 h-32 mx-10">
            <img
              src={tech.src}
              alt={tech.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
