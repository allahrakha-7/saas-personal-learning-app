import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        {canCreateCompanion ? (
          <article className="w-full max-w-md bg-white p-8">
            <h1 className="text-3xl font-bold mb-6">Companion Builder</h1>
            <CompanionForm />
          </article>
        ) : (
          <article className="items-center justify-center flex flex-col gap-4 w-full min-2xl:w-1/2 pt-20 text-center">
            <Image
              src="/images/limit.svg"
              alt="Companion limit reached"
              width={360}
              height={230}
            />
            <div className="bg-[#fccc41] rounded-4xl px-3 py-1.5 text-black">
              Upgrade Your Plan
            </div>
            <h1>You’ve Reached Your Limit</h1>
            <p>
              You’ve reached your companion limit. Upgrade to create more
              companions and premium features.
            </p>
            <Link
              href="/subscription"
              className="bg-black w-full justify-center"
            >
              Upgrade My Plan
            </Link>
          </article>
        )}
      </main>
    </>
  );
};

export default NewCompanion;
