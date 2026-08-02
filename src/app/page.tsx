import { Container } from "@/components/container";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";

/*
 * Home page. A single screen holding nothing but the portrait, the name, the
 * role and the introduction. Mobile spacing is tightened so the block and
 * contact links stay in one viewport; the header navigation is the way onward.
 *
 * The root layout makes body a full height flex column, so flex-1 here takes
 * the space left by the header and centres the block inside it.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <Container className="flex w-full min-w-0 flex-1 items-center justify-center py-4 md:justify-start md:py-0">
        <main className="w-full min-w-0 py-2 md:py-12">
          <Hero />
        </main>
      </Container>
    </>
  );
}
