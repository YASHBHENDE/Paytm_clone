import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card"

interface Testimonial{
    experience:string,
    by:string
}
export default function Testimonials(){
  const Testimonials:Testimonial[]=[
    {
        experience:"Good product!",
        by:"Ethan"
    },
    {
        experience:"A clean design with lightning-fast transactions!",
        by:"john M"
    },
    {
        experience:"perfect for everyday payments",
        by:"Olivia"
    },
    {
        experience:"Seamless payments with a modern feel",
        by:"Noah"
    }
  ]
  return (
    <div>
    
        <Carousel
        opts={{
            align: "start",
        }}
        className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm"
        >
        <CarouselContent className="-ml-4">
            {Testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/2 pl-4">
                <div className="p-1">
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="font-semibold ">"{testimonial.experience}"   ~{testimonial.by}</span>
                    
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
    </div>
  )
}