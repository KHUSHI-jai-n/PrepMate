'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { UserAnswer } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '../../../../../@/components/ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../../../../../@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback ({params}) {
  const [feedbackList, setFeedbackList] = useState([])
  const router = useRouter()
  useEffect(() => {
    getFeedback()
  }, [])

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id)
    console.log(params.interviewId)
    setFeedbackList(result)
  }
  return (
    <div className='p-10'>

    {feedbackList?.length==0?
    <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback record found</h2>
      :
      <>
      <h2 className='text-3xl font-bold text-pink-400'>Congratulations!</h2>
      <h2 className='font-bold text-2xl p-1'>Here's your Interview Feedback</h2>
      <h2 className='text-sm text-gray-500'>
        Find below the interview questions with correct answer, your answer and
        feedback for improvement
      </h2>
      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
              {item.question}<ChevronsUpDown className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-primary p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-500'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-600'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-500'><strong>Feedback: </strong>{item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        </>}
        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
