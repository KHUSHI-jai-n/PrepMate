'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Button } from '../../../../../../@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '../../../../../../utils/GeminiAIModel'
import { UserAnswer } from '../../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '../../../../../../utils/db'

function RecordAnsSection ({
  mockInterviewQues,
  activeQuesIndex,
  interviewData
}) {
  const [userAns, setUserAns] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  })
  useEffect(() => {
    results.map(result => {
      setUserAns(prevAns => prevAns + result?.transcript)
    })
  }, [results])

  useEffect(()=>{
    if(!isRecording && userAns.length>10){
      UpdateUserAns()
    }
    // if (userAns.length < 10) {
    //   setLoading(false)
    //   toast('Error while saving your answer. Please record again.')
    // }
  },[userAns])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText()
    } else startSpeechToText()
  }
  const UpdateUserAns = async () => {
    setLoading(true)
    const feedbackPrompt =
      'Question:' +
      mockInterviewQues[activeQuesIndex]?.question +
      ', User Answer:' +
      userAns +
      '. Depending on question and user answer' +
      ' please give us rating for answer and feedback for area of improvement if any in just ' +
      '3 to 5 lines in JSON format with rating field and feedback field'

    const result = await chatSession.sendMessage(feedbackPrompt)

    const mockJsonResp = result.response
      .text()
      .replace('```json', '')
      .replace('```', '')
    console.log(mockJsonResp)
    const JsonFeedbackResp = JSON.parse(mockJsonResp)
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQues[activeQuesIndex]?.question,
      correctAns: mockInterviewQues[activeQuesIndex]?.answer,
      userAns: userAns,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress.emailAddress,
      createdAt: moment().format('DD-MM-YYYY')
    })

    if (resp) {
      console.log(resp)
      toast('User Answer recorded successfully')
      setUserAns('')
      setResults([])
    }
    setResults([])
    setLoading(false)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-20'>
        <Image
          src={'/round-webcam.png'}
          height={150}
          width={150}
          className='absolute'
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant='outline'
        className='my-5'
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className='text-red-600 flex gap-2'>
            <Mic />
            Recording...
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>
    </div>
  )
}

export default RecordAnsSection
