import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center bg-muted p-6 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">League</h3>
          <Link href="#" prefetch={false}>
            About
          </Link>
          <Link href="#" prefetch={false}>
            Teams
          </Link>
          <Link href="#" prefetch={false}>
            Players
          </Link>
          <Link href="#" prefetch={false}>
            Schedule
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Features</h3>
          <Link href="#" prefetch={false}>
            Team Management
          </Link>
          <Link href="#" prefetch={false}>
            Player Registration
          </Link>
          <Link href="#" prefetch={false}>
            Schedule Management
          </Link>
          <Link href="#" prefetch={false}>
            Reporting
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Resources</h3>
          <Link href="#" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" prefetch={false}>
            FAQ
          </Link>
          <Link href="#" prefetch={false}>
            Support
          </Link>
          <Link href="#" prefetch={false}>
            Blog
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link href="#" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" prefetch={false}>
            Cookie Policy
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link href="#" prefetch={false}>
            Email
          </Link>
          <Link href="#" prefetch={false}>
            Phone
          </Link>
          <Link href="#" prefetch={false}>
            Twitter
          </Link>
          <Link href="#" prefetch={false}>
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
