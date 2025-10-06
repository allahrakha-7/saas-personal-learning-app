import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

// params

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  const { name, subject, topic, duration } = companion;

  if (!user) redirect('/sign-in');
  if(!name) redirect('/companions');

  console.log(name);
  
  return (
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5">
      <article className="flex rounded-4xl mt-2 border border-black justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div className="size-[72px] flex justify-center items-center rounded-lg max-md:hidden" style={{backgroundColor: getSubjectColor(subject)}}>
            <Image src={`/icons/${subject}.svg`} alt="subject" width={35} height={35}/>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="bg-black text-white rounded-4xl text-sm px-2 py-1 capitalize max-sm:hidden">
                {subject}
              </div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <span className="items-start inline text-[22px] max-md:hidden">
          {duration} Mins
        </span>
      </article>
      <CompanionComponent 
      {...companion}
      companionId = {id}
      userName = {user.firstName!}
      userImage = {user.imageUrl!}
      />
    </main>
  )
}

export default CompanionSession
