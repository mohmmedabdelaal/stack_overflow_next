
import Filters from '@/components/shared/Filters';
import { QuestionFilters} from '@/constants/fitlers';
import HomeFilters from '@/components/home/HomeFilters';

// import NoResults from '@/components/shared/NoResults';
import QuestionCard from '@/components/card/QuestionCard';
import {getAllSavedQuestions} from '@/lib/actions/questions.actions';
import {auth} from "@clerk/nextjs";

export default async function Collections() {
    const {userId} = auth()
    if(!userId) return  null;
    const result = await getAllSavedQuestions({clerkId: userId});

    return (
        <>
            <div
                className="mt-11 flex justify-between gap-5
       max-sm:flex-col sm:items-center"
            >
                <h1 className="h1-bold text-dark100_light900">All Saved Questions</h1>
                <Filters
                    filters={QuestionFilters}
                    otherClasses="min-h-[56px] sm:min-w-[170px]"
                    containerClasses="max-md:flex"
                />
            </div>

            <div className="mt-5 flex w-full flex-col gap-6">
                {result.questions.length > 0 ? (
                    result.questions.map((question) => (
                        <QuestionCard
                            key={question._id}
                            _id={question._id}
                            title={question.title}
                            tags={question.tags}
                            author={question.author}
                            upvotes={question.upvotes}
                            views={question.views}
                            answers={question.answers}
                            createdAt={question.createdAt}
                        />
                    ))
                ) : (
                    <div>No results now</div>
                )}
            </div>
        </>
    );
}
