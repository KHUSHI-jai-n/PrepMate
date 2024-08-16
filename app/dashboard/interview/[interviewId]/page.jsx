"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { db } from '../../../../utils/db'
import { MockInterview } from '../../../../utils/schema'
import { eq } from 'drizzle-orm'
import { Button } from '../../../../@/components/ui/button'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'

function Interview ({ params }) {
  //params contain the interview id
  const [interviewData, setInterviewData] = useState({})
  const [webCamEnabled, setWebCamEnabled] = useState(false)
  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails()
  }, [])

  /**
   * Used to get Interview Details by MockId/InterviewId
   */

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
    console.log(result[0])
    setInterviewData(result[0])
  }
  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div className='flex flex-col my-5 gap-4'>
          <div className='flex flex-col gap-5 p-5 rounded-lg border'>
            <h2 className='text-md'>
              <strong>Job Role/Job Position: </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className='text-md'>
              <strong>Job Description/Tech Stack: </strong>
              {interviewData.jobDesc}
            </h2>
            <h2 className='text-md'>
              <strong>Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg- bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'>
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className='pt-2 text-sm text-yellow-500'>
              Enable Webcam and Microphone to start the interview. The interview
              consists of 5 questions which you have to answer and get the
              report on the basis of your answers. NOTE: We never record your
              video. You can disable the camera whenever you want.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className='h-64 w-full my-7 p-20 bg-secondary border rounded-lg' />
              <Button className='w-full bg-[#EDE8F5]' variant='ghost' onClick={() => setWebCamEnabled(true)}>
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-end items-end'>
          <Link href={'/dashboard/interview/'+params.interviewId+'/start'}><Button>Start Interview</Button></Link>
        </div>
    </div>
  )
}

export default Interview
