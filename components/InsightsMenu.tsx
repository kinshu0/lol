import { FC, memo, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useQuery } from 'react-query';
import { FLASK_API_URL } from '@/pages/api/chat';

export interface Props {}

export const InsightsMenu: FC<Props> = ({}) => {

  const query = useQuery(['insights'], () => {
    const PROMPT = "Please analyze my conversations in the past day and identify the top 6 most significant topics. Format as a bullet point list, only one point/one to two lines for each of the topics. if there are less than 6 significant topics, thats fine, and there's no need to mention it in your response" + `.
    Format these bullet points as` + '"' + "${title} / ${person/people} / ${description}" + '"' + "for each topic in your response, and do not acknowledge receiving my request."


    const apiUrl = encodeURI(`${FLASK_API_URL}/get?msg=${PROMPT}`)
    
    const r = fetch(
      apiUrl
    ).then((res)=>res.json())
    console.log("FETCH RESULT", r)
    return r
  })

  console.log(query)
  
  return (
    <Dialog>
      <DialogTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-lg mx-auto underline font-bold transition-colors duration-200 hover:bg-[#282828]/90">
      Insights
      </DialogTrigger>

      <DialogContent className="bg-zinc-800  w-5/6 h-5/6">
        <DialogHeader className="bg- rounded w-5/6 h-5/6">
          <DialogTitle className="text-white"> Insights </DialogTitle>
          <DialogDescription className="text-white">
            <div className="">
              Insights
            </div>


            {query.isLoading ? (
              <div>Loading...</div>
            ): (
              <div> {query.data.response} </div>
            )}

            
            {/* <button>
              Refresh
            </button> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
