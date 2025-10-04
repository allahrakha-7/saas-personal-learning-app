import CompanionCard from "@/components/CompanionCard";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  console.log(companions);

  return (
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5">
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1 className="text-3xl font-bold">Companions Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>

      <section className="flex flex-wrap gap-4 w-full max-md:justify-center justify-between">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} 
          color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
