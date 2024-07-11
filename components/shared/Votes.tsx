'use client'
import React, {useEffect} from 'react';
import Image from "next/image";
import {formatAndDivideNumber} from "@/lib/utils";
import {downvoteQuestion, toggleSavedQuestions, upvoteQuestion} from "@/lib/actions/questions.actions";
import {usePathname, useRouter} from "next/navigation";
import {downvoteAnswer, upvoteAnswer} from "@/lib/actions/answer.actions";
import {viewQuestion} from "@/lib/actions/interaction.action";

interface Props{
    type: string;
    itemId: string;
    userId: string;
    upvotes: number;
    hasupVoted: boolean;
    downvotes: number;
    hasdownVoted: boolean;
    hasSaved?: boolean;
}
const Votes = ({type,itemId,userId,downvotes,upvotes,hasdownVoted,hasupVoted,hasSaved}:Props) => {
    const pathname = usePathname();
    const router = useRouter();
    async function handleSave(){
        await toggleSavedQuestions({userId:JSON.parse(userId),questionId: JSON.parse(itemId), path: pathname});
    }

    useEffect(() => {
        viewQuestion({
            questionId: JSON.parse(itemId),
            userId: JSON.parse(userId)
        })
        
    }, [itemId,userId,pathname,router]);


    async function  handleVote(actions:string) {
        if(!userId)return ;

        if(actions === 'upvote'){
            if(type === 'question'){
                await upvoteQuestion({questionId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasdownVoted,hasupVoted,path: pathname})
            }
            else if(type === 'answer'){
                await upvoteAnswer({answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId),
                    hasdownVoted,hasupVoted,path: pathname})
            }
            return 'Not found';
        }
        if(actions === 'downvote'){
            if(type === 'question'){
            await downvoteQuestion({questionId: JSON.parse(itemId),
                userId: JSON.parse(userId),
                hasupVoted,hasdownVoted,path: pathname});

            }
            else if(type === 'answer'){
                await downvoteAnswer({answerId: JSON.parse(itemId),
                    userId: JSON.parse(userId) ,
                    hasupVoted,hasdownVoted,path: pathname})
            }
        return 'not found';
        }

    }
    return (
        <div className="flex gap-5">
            <div className="flex gap-2">
                <div className="flex gap-1.5">
                    <Image src={hasupVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'} height={18} width={18} alt="upvote"
                           onClick={() => handleVote('upvote')} className="cursor-pointer" />
                    <div className="background-light700_dark400 min-w-[18px] rounded-sm p-1">
                        <p className="subtle-meduim text-dark-400_light700 ">
                            {formatAndDivideNumber(upvotes)}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <Image src={hasdownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'} height={18} width={18} alt="downvote"
                           onClick={() => handleVote('downvote')} className="cursor-pointer" />
                    <div className="background-light700_dark400 min-w-[18px] rounded-sm p-1">
                        <p className="subtle-meduim text-dark-400_light700 ">
                            {formatAndDivideNumber(downvotes)}
                        </p>
                    </div>
                </div>
            </div>
            <Image src={hasSaved ? '/assets/icons/star-filled.svg': '/assets/icons/star-red.svg'} alt="star" width={18} height={18}
             className="cursor-pointer" onClick={handleSave}
            />
        </div>
    );
};

export default Votes;
