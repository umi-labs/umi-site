'use client';

import React, { useRef } from 'react';
import { PortableTextBlock } from 'next-sanity';
import { FormBuilderBlock } from '@/app/_components/global/FormBuilder/Component';
import { CustomPortableText } from '@/app/_components/shared/CustomPortableText';
import { FormType } from '@/types/components/form';
import Container from '@/app/_components/ui/container';
import { motion, useInView } from 'motion/react';

interface Props {
  data: {
    enableIntro?: boolean;
    introContent?: PortableTextBlock[];
    form: FormType;
  };
}

export default function FormBlock({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { enableIntro, introContent, form } = data;
  
  if (!form) {
    return <div>FormBlock: No form data found</div>;
  }
  
  return (
    <Container 
      id="FormBlock" 
      options={{
        colour: 'transparent',
        maxWidth: false,
      }}
      className="gap-y-4 py-16 md:py-24"
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.56, ease: "easeOut" }}
        className="space-y-8 max-w-[900px] mx-auto w-full"
      >
        {enableIntro && introContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.42, delay: 0.14, ease: "easeOut" }}
          >
            <CustomPortableText
              value={introContent}
              paragraphClasses="text-center"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.56, delay: 0.28, ease: "easeOut" }}
          className="w-full"
        >
          <FormBuilderBlock
            form={form}
            uid={form._key || form._id || 'form'}
            className="w-full"
          />
        </motion.div>
      </motion.div>
    </Container>
  );
}
