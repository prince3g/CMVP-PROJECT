import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Track which question is open

  const faqData = [
    {
      question: 'Lorem ipsum dolor sit amet?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      question: 'Consectetur adipiscing elit?',
      answer:
        'Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    },
    {
      question: 'Sed do eiusmod tempor incididunt?',
      answer:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Duis aute irure dolor in reprehenderit?',
      answer:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      question: 'Fugiat nulla pariatur?',
      answer:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    {
      question: 'Quis autem vel eum iure reprehenderit?',
      answer:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.',
    },
  ];

  // Handle toggling of active accordion items
  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close accordion if it's already active
    } else {
      setActiveIndex(index); // Open clicked accordion
    }
  };

  return (
    <div className="faq-section">
      <div className="site-container">
        <div className="faq_header">
          <h2 className="big-text">Frequently Asked Questions</h2>
        </div>
        <div className="faq_Main">
          <ul>
            {faqData.map((item, index) => (
              <li key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                <div className="faq-content">
                  <div className="faq-question" onClick={() => toggleAccordion(index)}>
                    <h3>{item.question}</h3>
                    <span>{activeIndex === index ? '-' : '+'}</span> {/* Toggle icon */}
                  </div>
                  <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
