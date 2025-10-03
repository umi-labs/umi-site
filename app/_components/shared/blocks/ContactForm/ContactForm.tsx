'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { STATUS, STATUS_TYPE } from './types';

import { INPUT, TEXTAREA, FIELDSET } from '@/app/_components/ui/Forms';
import { Button } from '@/app/_components/ui/button';
import { sendGTMEvent } from '@next/third-parties/google';

export default function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const { register, handleSubmit } = useForm();

  const [status, setStatus] = React.useState<STATUS_TYPE>(STATUS[0]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (data: any) => {
    setStatus(STATUS[1]);

    try {
      const response = await fetch('/api/contact/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus(STATUS[2]);
        
        // Send GTM event for successful form submission
        sendGTMEvent({
          event: 'form_submit',
          form_id: 'contact-form',
          form_title: 'Contact Form',
          form_type: 'contact',
          success: true
        });
      } else {
        setStatus(STATUS[3]);
        
        // Send GTM event for failed form submission
        sendGTMEvent({
          event: 'form_submit',
          form_id: 'contact-form',
          form_title: 'Contact Form',
          form_type: 'contact',
          success: false,
          error_message: 'Form submission failed'
        });
      }
    } catch (error) {
      setStatus(STATUS[3]);
      
      // Send GTM event for form submission error
      sendGTMEvent({
        event: 'form_submit',
        form_id: 'contact-form',
        form_title: 'Contact Form',
        form_type: 'contact',
        success: false,
        error_message: 'Network error or server issue'
      });
    }
  };

  return (
    <section className="px-8 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FIELDSET name="Name" id="name">
          <INPUT
            id="name"
            name="name"
            placeholder="Name*"
            required
            register={register}
          />
        </FIELDSET>
        <FIELDSET id="email" name="Email">
          <INPUT
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            required
            register={register}
          />
        </FIELDSET>
        <FIELDSET id="message" name="Message">
          <TEXTAREA
            id="message"
            name="message"
            placeholder="Message*"
            required
            register={register}
          />
        </FIELDSET>
        <Button
          type="submit"
          variant="umi-primary"
          size="lg"
          className="px-12 py-4 text-lg font-semibold"
        >
          Send Message
        </Button>
        {status?.MESSAGE && (
          <p className={`text-center font-medium ${
            status === STATUS[2] ? 'text-green-600' : 
            status === STATUS[3] ? 'text-red-600' : 
            'text-[#368DB1]'
          }`}>
            {status?.MESSAGE}
          </p>
        )}
      </form>
    </section>
  );
}
