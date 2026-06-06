import { currentUser } from "@/data/users";

export function WelcomeCard() {
  return (
    <section aria-labelledby="welcome-heading" className="rounded border p-4">
      <h2 id="welcome-heading" className="text-lg font-medium">
        Welcome back, {currentUser.name.split(" ")[0]}!
      </h2>
      <p className="mt-2 text-sm">
        Here&apos;s your daily overview on Bitscale.
      </p>
    </section>
  );
}
