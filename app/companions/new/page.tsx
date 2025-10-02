import CompanionForm from "@/components/CompanionForm"

const NewCompanion = () => {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <article className="w-full max-w-md bg-white p-8">
          <h1 className="text-3xl font-bold mb-6">Companion Builder</h1>
          <CompanionForm />
        </article>
      </main>
    </>
  )
}

export default NewCompanion
