import React, { useState } from "react";
import { FiChevronDown, FiMessageCircle, FiPlus } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
// import hero from '../../assets/footer/hero_footer.png'
import aboutHero from '../../assets/footer/About_hero.png'

const FAQPage = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "What is Derayo Brand?",
      answer:
        "Derayo Brand is a fashion and lifestyle brand dedicated to delivering stylish, high-quality products that combine elegance, comfort, and value."
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place an order through our website, social media platforms, or any official Derayo Brand sales channel."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, debit/credit cards, and other secure online payment options where available."
    },
    {
      question: "How long does delivery take?",
      answer:
        "Lagos: 1-3 business days. Major cities: 2-5 business days. Other locations: 3-7 business days."
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Yes. Eligible items may be exchanged or returned if they are unused, in original condition, and accompanied by proof of purchase."
    },
    {
      question: "What should I do if I receive a damaged item?",
      answer:
        "Contact our support team within 48 hours of delivery with your order number and clear photos of the item."
    },
    {
      question: "Do you offer custom orders?",
      answer:
        "Custom orders may be available depending on the product category. Please contact us directly for details."
    },
  ];

  return (
    <section className="">
        {/* Hero */}
        <div className="relative">
            <div className="h-screen sm:h-135">
                <img 
                    src={aboutHero} alt="hero image"
                    className="w-full h-full object-cover" 
                />
            </div>
            <div className="absolute top-1/3 left-1/9 text-amber-100">
                <div className="flex items-center gap-4 md:gap-8">
                    <h2 className="md:text-md text-xs font-semibold tracking-widest">SUPPORT</h2>
                    <div className="md:w-13 w-10 h-0.5 bg-amber-200/70"></div>
                </div>
                <h1 className="text-7xl md:text-9xl font-serif mb-3">FAQ</h1>
                <p className="md:text-4xl text-2xl font-serif italic">Answers to your <br />most common questions.</p>
            </div>
        </div>
        {/* Main */}
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex justify-between gap-10 md:flex-row flex-col w-full">
                {/* Write ups Details*/}
                <div className="md:w-2/5 flex items-center w-full text-center md:text-start mx-auto justify-center">
                    <div className="text-gray-700">
                        <div className="mb-15">
                            <h2 className="font-semibold text-sm mb-3">GET THE DETAILS</h2>
                            <h1 className="text-5xl font-semibold font-serif mb-6">Everything you <br />need to know.</h1>
                            <p className="text-gray-600 text-sm font-sans font-medium">We've gathered the most frequently asked questions to help you shop with confidence, understand our process, and learn more about Derayo.</p>
                        </div>
                        <div>
                            <div className="flex justify-center md:justify-start">
                                <div className="h-0.5 mb-8 w-3/5 md:w-25 bg-amber-400/30"></div>
                            </div>
                            <h2 className="font-semibold text-sm text-gray-600 mb-2">STILL NEED HELP?</h2>
                            <p className="text-gray-600 text-sm font-sans font-medium">Reach out to our team at</p>
                            <span className="font-bold">derayo.brand.ng@gmail.com</span>
                        </div>
                    </div>
                </div>
                {/* FAQ Accordion */}
                <div className="space-y-4 md:w-3/5 text-center w-full md:text-start mx-auto">
                    {faqs.map((faq, index) => (
                        <div
                        key={index}
                        className="rounded-2xl text-gray-700 overflow-hidden"
                        >
                        <button
                            onClick={() =>
                            setOpen(open === index ? null : index)
                            }
                            className="w-full flex border-b border-gray-200 justify-between items-center p-6 text-left"
                        >
                            <span className="font-semibold text-lg font-sans">
                            {faq.question}
                            </span>

                            
                            <FiPlus
                            className={`transition-transform duration-300 ${
                                open === index ? "rotate-180" : ""
                            }`}
                            />
                        </button>

                        {open === index && (
                            <div className="px-6 pb-6 text-gray-600 text-md font-sans font-medium leading-relaxed mt-3">
                            {faq.answer}
                            </div>
                        )}
                        </div>
                    ))}
                </div>
            </div>
      </div>
    </section>
  );
}

export default FAQPage;