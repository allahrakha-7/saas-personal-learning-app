import CompanionCard from "@/components/CompanionCard";

const Page = () => {
    return (
        <>
        <main>
        <h1 className="text-2xl underline">Popular Companions</h1>
            <section className="home-section">
                <CompanionCard />
                <CompanionCard />
                <CompanionCard />
            </section>
        </main>
        </>
    )
}

export default Page