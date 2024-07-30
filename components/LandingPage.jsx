"use client";
import Link from "next/link";
import FootballModel from "./FootballModel";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Elevate Your Football League
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive football league management system streamlines
                your operations, empowering you to focus on growing your league.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-2xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-2xl border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last lg:aspect-square">
              <FootballModel />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid gap-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your League Management
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our football league management system provides the tools you
                  need to efficiently manage your league, from team registration
                  to schedule creation and reporting.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl divide-y divide-border rounded-lg border md:grid-cols-3 md:divide-x md:divide-y-0">
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold">Team Management</h3>
                <p className="text-muted-foreground">
                  Easily manage your teams, players, and coaches with our
                  comprehensive tools.
                </p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold">Player Registration</h3>
                <p className="text-muted-foreground">
                  Streamline the player registration process with our online
                  forms and automated workflows.
                </p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold">Schedule Management</h3>
                <p className="text-muted-foreground">
                  Easily create, manage, and distribute your league schedules
                  with our intuitive tools.
                </p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold">Reporting</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive reports on your league&apos;s
                  performance and statistics.
                </p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold">Communication</h3>
                <p className="text-muted-foreground">
                  Keep your league members informed with our built-in
                  communication tools.
                </p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold">Mobile Access</h3>
                <p className="text-muted-foreground">
                  Access your league information on the go with our
                  mobile-friendly interface.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from league administrators who have transformed their
                  operations with our football league management system.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl divide-y divide-border rounded-lg border md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="grid gap-4 p-8 md:p-10">
                <div className="flex items-start gap-4">
                  {/* <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar> */}
                  <div>
                    <p className="text-lg font-medium">John Doe</p>
                    <p className="text-muted-foreground">
                      League Administrator, Acme FC
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;The Football League Management System has been a
                  game-changer&apos; for our league. It has streamlined our
                  operations, making it easier to manage teams, players, and
                  schedules. The reporting features have been invaluable in
                  tracking our league&apos;s performance.&quot;
                </p>
              </div>
              <div className="grid gap-4 p-8 md:p-10">
                <div className="flex items-start gap-4">
                  {/* <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar> */}
                  <div>
                    <p className="text-lg font-medium">Sarah Miller</p>
                    <p className="text-muted-foreground">
                      League Administrator, Dynamo FC
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;I highly recommend the Football League Management System
                  to any league administrator looking to streamline their
                  operations. The user-friendly interface and comprehensive
                  features have made my job so much easier. It&apos;s a
                  must-have for any serious football league.&quot;
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
