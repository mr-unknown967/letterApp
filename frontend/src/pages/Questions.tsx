import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Questions: React.FC = () => {
  const [email, setEmail] = useState('');
  const [howAreYou, setHowAreYou] = useState('');
  const [guessWho, setGuessWho] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Optimistic UI update
      toast({
        title: "Sending your response...",
        description: "Please wait while we process your message.",
      });

      // Prepare form data
      const formData = {
        name: sessionStorage.getItem('userName') || '',
        email: email,
        additionalInfo: `How are you? ${howAreYou}\n\nCan you guess who I am? ${guessWho}\n\nWhich number is yours? ${phoneNumber}`
      };

      // Send request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${import.meta.env.VITE_API_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to submit response');
      }

      // Success handling
      toast({
        title: "Success! ✨",
        description: "Your response has been sent successfully.",
        duration: 3000,
      });

      // Navigate to thank you page
      navigate('/thanks');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit response. Please try again.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit response. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Render your form here */}
    </div>
  );
};

export default Questions; 