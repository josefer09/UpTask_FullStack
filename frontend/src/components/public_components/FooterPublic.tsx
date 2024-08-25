
export default function FooterPublic() {
  return (
    <>
    <footer className="bg-gray-800 py-8">
        <div className="container mx-auto text-center text-gray-400">
          <div className="flex justify-center mb-4 space-x-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jos%C3%A9-fernando-hernandez-angulo-7862882b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm12.5 12.268h-3v-5.5c0-1.378-.029-3.148-2.064-3.148-2.067 0-2.384 1.523-2.384 3.044v5.604h-3v-11h2.882v1.504h.04c.402-.762 1.386-1.561 2.856-1.561 3.052 0 3.614 2.007 3.614 4.617v6.44z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/josefer09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.614-4.042-1.614-.546-1.387-1.333-1.757-1.333-1.757-1.091-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.933 0-1.312.47-2.383 1.237-3.223-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.403 1.02.004 2.047.137 3.005.403 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.24 2.874.118 3.176.77.84 1.237 1.911 1.237 3.223 0 4.61-2.804 5.628-5.475 5.921.43.37.814 1.102.814 2.222 0 1.606-.014 2.903-.014 3.293 0 .319.218.694.824.576 4.765-1.59 8.2-6.087 8.2-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* Contacto */}
            <a
              href="mailto:josefer.hdeza@hotmail.com"
              className="hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 12.713l11.985-6.713v12c0 1.104-.897 2-2 2h-20c-1.103 0-2-.896-2-2v-12l11.985 6.713zm11.985-9.713c.011-.183.015-.367.015-.551 0-1.103-.897-2-2-2h-20c-1.103 0-2 .897-2 2 0 .184.004.368.015.551l10.985 6.149 10.985-6.149z" />
              </svg>
            </a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Fernando Hernandez. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
