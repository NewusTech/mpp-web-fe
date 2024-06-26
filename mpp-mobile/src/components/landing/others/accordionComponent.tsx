import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqType } from "@/types/type";

export default function AccordingComponent({ faq }: { faq: faqType }) {
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
