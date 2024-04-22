import {getAllAnswers} from "@/lib/actions/answer.actions";
import AnswersCard from "@/components/card/AnswersCard";
import Filters from "@/components/shared/Filters";
import {AnswerFilters} from "@/constants/fitlers";
import Votes from "@/components/shared/Votes";
import Link from "next/link";
import Image from "next/image";
import {getTimestamp} from "@/lib/utils";
import RenderHTML from "@/components/shared/RenderHTML";
import React from "react";

interface Props{
    questionId: string;
    totalAnswers: number;
    userId: string;
}
const AllAnswers = async ({questionId,totalAnswers,userId}: Props) => {
    const result = await getAllAnswers({questionId})

    return (
        <div className="mt-11">
            <div className="flex items-center justify-between gap-1">
               <h3 className="primary-text-gradient">{totalAnswers} Answer</h3>
                <Filters filters={AnswerFilters}/>
            </div>
            <div>

            {result.answers.length > 0 ? (result.answers.map((answer) => (
                <div key={answer._id}>

                    <article  className="light-border border-b py-10">
                        <div className="mb-8 flex flex-col-reverse justify-between gap-5">
                            <Link href={`/profile/${answer.author.clerkId}`} className="flex flex-1 items-start gap-1 sm:items-center">
                                <Image src={answer.author.picture} width={18} height={18} alt="profile"  className="rounded-full object-cover max-sm:mt-0.5"/>
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <p className="body-smibold text-dark-300_light700">
                                        {answer.author.name}
                                    </p>
                                    <p className="small-regular text-light-400_light500 ml-0.5 mt-0.5 line-clamp-1">
                                        Answered {getTimestamp(answer.createdAt)}
                                    </p>
                                </div>

                            </Link>
                        </div>
                        <RenderHTML data={answer.content} />
                    </article>
                <Votes type="answer" itemId={JSON.stringify(answer._id)} userId={JSON.stringify(userId)}
                       upvotes={answer.upvotes.length}
                       hasupVoted={answer.upvotes.includes(userId)}
                       downvotes={answer.downvotes.length} hasdownVoted={answer.downvotes.includes(userId)} />
                </div>
            ))) : (<div>No Answers yet</div>)}
            <div>
            </div>
            </div>
            <div className="mt-10 w-full">
                Pagination
            </div>
        </div>
    );
};

export default AllAnswers;
