import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <SignUp />
    </section>
  );
}
