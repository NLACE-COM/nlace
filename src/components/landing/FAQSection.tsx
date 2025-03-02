
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const { language } = useLanguage();
  
  const faqs = [
    {
      question: "¿Qué es NLACE AI Studio?",
      answer: "NLACE AI Studio es una plataforma segura que permite a las empresas crear y gestionar agentes de inteligencia artificial personalizados, sin compartir datos con terceros ni depender de modelos públicos."
    },
    {
      question: "¿Qué hace diferente a NLACE AI Studio de otras soluciones de IA?",
      answer: "A diferencia de otras soluciones, NLACE AI Studio garantiza total privacidad y control sobre los datos, una implementación rápida sin fricciones y una flexibilidad total para adaptar la IA a los objetivos de cada empresa."
    },
    {
      question: "¿Es seguro usar NLACE AI Studio?",
      answer: "Sí. La plataforma está diseñada para garantizar la privacidad total de los datos, entrenando agentes de IA con información interna sin exponerla a terceros."
    },
    {
      question: "¿Qué tipos de integraciones ofrece?",
      answer: "NLACE AI Studio se integra fácilmente con herramientas como Metricool, HubSpot, CRMs, plataformas de marketing y sistemas internos de las empresas. Además, es compatible con todos los modelos de lenguaje grandes (LLM) disponibles en el mercado, lo que significa que no estás limitado a OpenAI ni a ningún proveedor específico."
    },
    {
      question: "¿Cuánto tiempo toma la implementación?",
      answer: "Depende de la complejidad del proyecto, pero en la mayoría de los casos, la implementación es rápida y sin fricciones, permitiendo ver resultados en poco tiempo."
    },
    {
      question: "¿Necesito conocimientos avanzados en IA para usar NLACE AI Studio?",
      answer: "No. NLACE AI Studio está diseñado para ser intuitivo y fácil de usar, permitiendo que cualquier empresa pueda implementar IA sin necesidad de conocimientos técnicos avanzados."
    },
    {
      question: "¿En qué sectores se puede aplicar NLACE AI Studio?",
      answer: "NLACE AI Studio es ideal para empresas B2B y B2C en tecnología, marketing, servicio al cliente, ventas, e-commerce, salud, finanzas, y más."
    },
    {
      question: "¿Cómo puedo acceder a NLACE AI Studio?",
      answer: "Actualmente estamos en fase Alpha cerrada. Puedes registrarte en la lista de espera para obtener acceso anticipado y probarlo antes que nadie."
    },
    {
      question: "¿Cuáles son los costos de NLACE AI Studio?",
      answer: "Los costos varían según el plan y las necesidades de cada empresa. Contamos con opciones escalables que se adaptan a diferentes requerimientos."
    },
    {
      question: "¿Ofrecen soporte y acompañamiento?",
      answer: "Sí. Nuestro equipo de expertos te guiará en la implementación y optimización de tu agente de IA para que obtengas los mejores resultados."
    }
  ];

  return (
    <section className="py-20 bg-[#1D1D1D]">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Preguntas Frecuentes
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-[#2A2A2A] rounded-lg overflow-hidden border-none"
            >
              <AccordionTrigger className="py-5 px-6 text-white hover:no-underline hover:bg-[#333333] transition-colors">
                <span className="text-left font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2 text-[#9E9E9E]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <p className="text-[#9E9E9E] text-center mt-8">
          Si tienes más dudas, contáctanos y con gusto te ayudaremos.
        </p>
      </div>
    </section>
  );
};
