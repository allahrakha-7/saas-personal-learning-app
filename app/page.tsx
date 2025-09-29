import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";

const Page = () => {
  return (
    <>
      <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5">
        <h1 className="text-3xl font-bold">Popular Companions</h1>
        <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
          <CompanionCard
            id="123"
            name="Learn the Science Subject"
            topic="Biotechnology"
            subject="Science"
            duration={45}
            color="#ffda6e"
          />
          <CompanionCard
            id="456"
            name="Learn the Math Subject"
            topic="Applied Mathematics"
            subject="Math"
            duration={30}
            color="#e5d"
          />
          <CompanionCard
            id="789"
            name="Learn the English Subject"
            topic="Professional Communication"
            subject="English"
            duration={55}
            color="#bde"
          />
        </section>

        <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center">
          <CompanionsList
            title="Recently Completed Sessions"
            companions={[
              {
                id: "1",
                subject: "science",
                name: "Neura the Brainy Explorer",
                topic: "Neural Network of the Brain",
                duration: 45,
                color: "#E5D0FF",
              },
              {
                id: "2",
                subject: "maths",
                name: "Countsy the Number Wizard",
                topic: "Derivatives & Integrals",
                duration: 30,
                color: "#FFDA6E",
              },
              {
                id: "3",
                subject: "language",
                name: "Verba the Vocabulary Builder",
                topic: "English Literature",
                duration: 30,
                color: "#BDE7FF",
              },
              {
                id: "4",
                subject: "coding",
                name: "Codey the Logic Hacker",
                topic: "Intro to If-Else Statements",
                duration: 45,
                color: "#FFC8E4",
              },
              {
                id: "5",
                subject: "history",
                name: "Memo, the Memory Keeper",
                topic: "World Wars: Causes & Consequences",
                duration: 15,
                color: "#FFECC8",
              },
              {
                id: "6",
                subject: "economics",
                name: "The Market Maestro",
                topic: "The Basics of Supply & Demand",
                duration: 10,
                color: "#C8FFDF",
              },
            ]}
            classNames='w-2/3 max-lg:w-full'
          />
          <CTA />
        </section>
      </main>
    </>
  );
};

export default Page;
