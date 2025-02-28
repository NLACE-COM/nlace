
export const PartnerLogos = () => {
  return (
    <div className="w-full border-t border-b border-[#3A3A3A] py-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="w-full xl:w-2/3 xl:mx-auto flex items-center justify-around flex-wrap md:flex-nowrap gap-8 md:gap-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" className="h-8 opacity-70 brightness-0 invert" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Bard_logo.svg" alt="Gemini" className="h-8 opacity-70 brightness-0 invert" />
          {/* Usamos un enfoque diferente para cargar estos logos */}
          <img 
            src="https://dev-app.nlace.com/langchain.svg" 
            alt="LangChain" 
            className="h-9 opacity-70 brightness-0 invert"
            onError={(e) => {
              console.log("Error cargando LangChain logo");
              e.currentTarget.onerror = null; // Prevenir bucle infinito
              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjx0ZXh0IHg9IjEwIiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+TGFuZ0NoYWluPC90ZXh0Pjwvc3ZnPg==";
            }}
          />
          <img 
            src="https://dev-app.nlace.com/n8n.svg" 
            alt="n8n" 
            className="h-9 opacity-70 brightness-0 invert"
            onError={(e) => {
              console.log("Error cargando n8n logo");
              e.currentTarget.onerror = null;
              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjx0ZXh0IHg9IjEwIiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+bjhuPC90ZXh0Pjwvc3ZnPg==";
            }}
          />
          <img 
            src="https://dev-app.nlace.com/metricool.svg" 
            alt="Metricool" 
            className="h-8 opacity-70 brightness-0 invert"
            onError={(e) => {
              console.log("Error cargando Metricool logo");
              e.currentTarget.onerror = null;
              e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjx0ZXh0IHg9IjEwIiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSI+TWV0cmljb29sPC90ZXh0Pjwvc3ZnPg==";
            }}
          />
        </div>
      </div>
    </div>
  );
};
