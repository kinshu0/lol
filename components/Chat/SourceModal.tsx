import { FC, memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { Message } from '@/types/chat';

import { TextSources } from '@/pages/api/chat';



import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { text } from 'stream/consumers';



export interface Props {
  message: Message;
}

export const SourceModal: FC<Props> = ({ message }) => {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-600">View Sources</DialogTrigger>

      <DialogContent className="bg-gray-700 rounded">
        <DialogHeader className="bg-gray-700 rounded">
          <DialogTitle className="text-white"> Sources</DialogTitle>
          <DialogDescription className="text-white">
            <div className="flex flex-col gap-5">
              {message.texts?.slice(-5).map((sourceMessage, index) => (
                <SourceMessage textMessage={sourceMessage} key={index} />
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};



function getServiceIconUrl(seed:string) {
  // Pick a random url for chat icon (whatsapp, telegram etc)
}

interface SourceMessageProps {
  textMessage: TextSources;
}

const SourceMessage: FC<SourceMessageProps> = ({ textMessage }) => {
  const query = useQuery(['profilePhoto', textMessage.user], () => {
    return fetch(
      `https://randomuser.me/api/?inc=picture&seed=${textMessage.user}`,
    )
      .then((res) => res.json())
      .then((res) => res.results[0].picture.large);
  });

  const serviceIconUrl = getServiceIconUrl(textMessage.user) //todo

  return (
    <div className="flex items-end gap-2 align-middle">
      <Avatar>
        <AvatarImage src={query.data} alt={textMessage.user} />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      
      

      <div>

        <div>
          <span>
            {/* <img
              src={serviceIconUrl}
              alt=""
              className="w-3 h-3"
              //TODO
            /> */} 
          </span>
          <span>{textMessage.user}</span>
        </div>

        <div>{textMessage.text}</div>
      </div>
    </div>
  );
};
