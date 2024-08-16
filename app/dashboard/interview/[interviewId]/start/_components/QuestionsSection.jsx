import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection ({ mockInterviewQues, activeQuesIndex }) {
  const textToSpeech = text => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    } else {
      alert('Sorry your browser does not support text to speech')
    }
  }

  return (
    mockInterviewQues && (
      <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {mockInterviewQues &&
            mockInterviewQues.map((ques, index) => (
              <h2
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
                ${activeQuesIndex==index&&" text-white bg-pink-300"}`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className='my-5 text-sm md:text-md'>
          {mockInterviewQues[activeQuesIndex]?.question}
        </h2>

        <Volume2
          className='cursor-pointer'
          onClick={() =>
            textToSpeech(mockInterviewQues[activeQuesIndex]?.question)
          }
        />

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
          <h2 className='flex gap-2 items-center text-primary'>
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-primary my-2'>
            Click on record answer when you're ready to answer the question. You
            can find the feedback at the end of the interview along with the
            correct answer for each question.
          </h2>
        </div>
      </div>
    )
  )
}

export default QuestionsSection
