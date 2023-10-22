import { FC, memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';



import { FLASK_API_URL } from '@/pages/api/chat';



import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';


export interface Props {}

export const InsightsMenu: FC<Props> = ({}) => {

  const query = useQuery(['insights'], () => {
    const PROMPT = "Please analyze my conversations in the past day and identify the top 6 most significant topics. Format as a bullet point list, only one point/one to two lines for each of the topics. if there are less than 6 significant topics, thats fine, and there's no need to mention it in your response" + `.
    Format these bullet points as` + '"' + "${title} / ${person/people} / ${description} /" + '"' + "for each topic in your response, and in your response, do not acknowledge receiving my request or answering my request. The ONLY thing you should reply with is the bullet point list, no title, no greeting, no signature, no acknowledgement, no nothing."


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

      <DialogContent className="bg-zinc-800  w-full h-5/6">
        <DialogHeader className="bg-rounded w-full h-5/6">
          <DialogTitle className="text-white"> Insights </DialogTitle>
          <DialogDescription className="text-white">
            {query.isLoading ? (
              <div>Loading...</div>
            ): (
              <div> {(query.data) ? <InsightsDisplay data={query.data.response}/> : ""} </div>
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

interface TopicProps {
  title: string;
  person: string;
  description: string;
}

interface InsightsDisplayProps {
  data: string;
}

const Topic: React.FC<TopicProps> = ({ title, person, description }) => (
  <div className="bg-white p-3 my-2 rounded text-black shadow w-full">
    <h2 className="font-bold text-xl">{title}</h2>
    <p className="italic">{person}</p>
    <p>{description}</p>
  </div>
);

const InsightsDisplay: React.FC<InsightsDisplayProps> = ({ data }) => {
  // Step 1: Split data by new lines
  const lines = data.split('\n');

  // Step 2: Filter lines with two slashes
  const validLines = lines.filter(
    (line) => (line.match(/\//g) || []).length === 2,
  );

  // Parsing valid lines to extract title, person, and description
  const topics: TopicProps[] = validLines.map((line) => {
    const [title, person, description] = line.split(' / ');
    return { title, person, description };
  });

  return (
    <div>
      {topics.map((topic, index) => (
        <Topic key={index} {...topic} />
      ))}
    </div>
  );
};