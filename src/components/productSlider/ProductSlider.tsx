'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export default function ProductSlider({ images, altContent }: { images: string[], altContent :string}) {
    return <>
        <Carousel opts={{
            loop: true
        }}
            plugins={[
                Autoplay({
                    delay: 1000,
                }),
            ]}>
            <CarouselContent>
                {images.map((img, index) => <CarouselItem className=' flex justify-center items-center' key={index}> <Image src={img} alt={altContent} width={400} height={400} />
                </CarouselItem>)}
            </CarouselContent>

        </Carousel>
    </>
}
