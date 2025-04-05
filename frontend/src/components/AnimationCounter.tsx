"use client"

import React, { useRef } from 'react'
import { animate, KeyframeOptions, useInView, useIsomorphicLayoutEffect } from 'framer-motion'

interface animationTypes {
    from: number,
    to: number,
    animationOptions?: KeyframeOptions
}

export default function AnimationCounter(
    {
        from,
        to,
        animationOptions
    }: animationTypes) {

        const ref = useRef<HTMLSpanElement >(null)
        const inView = useInView(ref, {once : true});


        useIsomorphicLayoutEffect(()=>{
            const element = ref.current;
          
            if(!element) return
            if(!inView) return

            element.textContent = String(from)

            const controls  = animate(from , to ,{
                duration : 1.5,
                ease : "easeOut",
                ...animationOptions,
                onUpdate(value){
                    element.textContent = value.toFixed(0)
                }
            })

            return () => {
                controls.stop();
              };
        },[ref , inView])
 
        return (
     <span ref={ref} />
    )
}