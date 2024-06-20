import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface faqType {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
}

export default function AccordingComponent({ faq }: faqType) {
  return (
    <div className="md:w-full">
      <Accordion type="single" collapsible>
        <AccordionItem className="w-full h-full" value="item-1">
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent className="md:text-start text-justify w-full h-full md:px-[70px]">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
