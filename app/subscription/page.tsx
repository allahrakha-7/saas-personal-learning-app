import { PricingTable } from "@clerk/nextjs"

const Subscription = () => {
  return (
    <main className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5">
      <PricingTable />
    </main>
  )
}

export default Subscription
