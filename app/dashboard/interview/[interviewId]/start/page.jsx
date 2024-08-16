"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../../../utils/db'
import { MockInterview } from '../../../../../utils/schema'
import { eq } from 'drizzle-orm'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnsSection from './_components/RecordAnsSection'
import { Button } from '../../../../../@/components/ui/button'
import Link from 'next/link'

function StartInterview({params}) {
    const [interviewData, setInterviewData] = useState({})
    const [MockInterviewQues, setMockInterviewQues] = useState()
    const [activeQuesIndex, setActiveQuesIndex] = useState(0)
    useEffect(()=>{
        GetInterviewDetails()
    },[])
    const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId))
        setInterviewData(result[0])
        const jsonMockResp = JSON.parse(result[0].jsonMockResp)
        setMockInterviewQues(jsonMockResp)
        console.log(jsonMockResp)
      }
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionsSection mockInterviewQues = {MockInterviewQues} activeQuesIndex={activeQuesIndex}
        />
        {/* Video/Audio recording */}
        <RecordAnsSection mockInterviewQues = {MockInterviewQues} activeQuesIndex={activeQuesIndex} interviewData={interviewData}/>
      </div>
      <div className='flex justify-end gap-6 mb-5'>
        {activeQuesIndex>0 && 
        <Button onClick={()=>setActiveQuesIndex(activeQuesIndex-1)}>Previous Question</Button>}
        {activeQuesIndex!=MockInterviewQues?.length-1 && 
        <Button onClick={()=>setActiveQuesIndex(activeQuesIndex+1)}>Next Question</Button>}
        {activeQuesIndex==MockInterviewQues?.length-1 && 
        <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
        <Button>End Interview</Button>
        </Link>}
      </div>
    </div>
  )
}

export default StartInterview
