import { currentUser } from "@/data/users";

export function WelcomeCard() {
  return (
    <section aria-labelledby="welcome-heading" className="rounded border p-4">
      <h2 id="welcome-heading" className="text-base font-medium">
        Welcome
      </h2>
      <p className="mt-2 text-sm">{currentUser.name}</p>
      <p className="text-sm">{currentUser.role}</p>
    </section>
  );
}
