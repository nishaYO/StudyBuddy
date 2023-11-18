const BASE_URL = 'http://localhost:5000/contact';

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to submit contact form');
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
