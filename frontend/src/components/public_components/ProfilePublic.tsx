export default function ProfilePublic() {
  return (
    <>
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center bg-gray-50 p-8 rounded-lg shadow-lg">
        {/* Columna izquierda: Texto y botón */}
        <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About My Project</h2>
          <p className="text-gray-700 mb-4">
          This project is a task management application, designed to function as a Kanban board, allowing users to create, organize, and track their tasks efficiently. Developed with React, Zod, React Query, Express, Node.js, TypeScript, MongoDB, and Tailwind CSS, the application demonstrates a strong grasp of both front-end and back-end technologies. Following Agile principles and the SCRUM methodology, I managed the entire development process, ensuring iterative progress and effective collaboration. This project showcases my ability to deliver high-quality software solutions in a dynamic, agile environment.
          </p>
          <a
            href="https://github.com/josefer09/UpTask_FullStack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-800 text-white font-bold text-2xl px-6 py-3 rounded-lg shadow hover:bg-gray-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            View Repository
          </a>
        </div>

        {/* Columna derecha: Imagen */}
        <div className="md:w-1/3 flex items-center justify-center">
          <img
            src="/uptask/uptask_logo.png"
            alt="Profile"
            className="rounded-lg shadow-lg object-contain w-48 h-48"
          />
        </div>
      </div>
    </>
  );
}
