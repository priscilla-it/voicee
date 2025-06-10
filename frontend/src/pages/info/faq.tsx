import { FC, useState } from 'react'

import '../../styles/globals.css'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import { Faq } from '../../constants/text'

interface FAQItemProps {
  faq: Faq
  isOpen: boolean
  onClick: () => void
}

const FAQItem: FC<FAQItemProps> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <h3
        className="cursor-pointer font-semibold bg-gray-200 p-3 rounded hover:bg-gray-300 transition-colors"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick()
        }}
      >
        {faq.question}
      </h3>
      {isOpen && (
        <p className="p-3 border border-gray-300 rounded bg-white mt-2">
          {faq.answer}
        </p>
      )}
    </div>
  )
}

const FaqPage: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { faqs } = require('../../constants/text')

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <NavBar />

      <main className="flex-grow flex justify-center items-start bg-lavender p-5 text-gray-800 overflow-y-auto">
        <div className="w-full max-w-2xl">
          {faqs.map((faq: Faq, index: number) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </main>

    </div>
  )
}

export default FaqPage
