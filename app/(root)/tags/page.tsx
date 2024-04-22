import LocalSearch from "@/components/shared/search/LocalSearch";
import Filters from "@/components/shared/Filters";
import {TagFilters} from "@/constants/fitlers";
import {getAllTags} from "@/lib/actions/tag.action";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import RenderTags from "@/components/shared/RenderTags";
// import {Badge} from "@/components/ui/badge";

const Page = async () => {
    const results = await getAllTags({});

    return (
        <>
            <h1 className="h1-bold text-dark100_light900">All Tags</h1>
            <div  className="mt-11 flex justify-between gap-5
       max-sm:flex-col sm:items-center">
                <LocalSearch imgSrc="/assets/icons/search.svg"
                             iconPlace="left" placeHolder='Search amazing tags here...' otherClasses='flex-3' route='/commnity'/>
                <Filters  filters={TagFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {results.tags.length > 0 ? (
                    results.tags.map((tag) => (
                        <Link key={tag._id} href={`/tags/${tag._id}`}  className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
                            <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                                <RenderTags  _id={tag._id} name={tag.name}/>
                                <p>
                                    javascript is very helpful language
                                </p>
                                <p className="small-medium text-dark-400_light500 mt-3.5">
                                    <span className="body-semibold primary-text-gradient mt-2.5">
                                        {tag.questions.length}+
                                    </span>
                                    Questions

                                </p>
                            </article>
                        </Link>
                    ))
                ): (<Badge>Tags Not found</Badge>)}
            </section>
        </>
    );
};

export default Page;
