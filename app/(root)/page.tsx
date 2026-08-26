import { cards } from "@/fake-data/courses";
import CardSlider from "./_components/card-slider";
import Hero from "./_components/hero";
import BestCategories from "./_components/best-categories";
import Introduction from "./_components/introduction";

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <Hero />

      <CardSlider title="محبوب" courses={cards}/>

      <BestCategories />

      <CardSlider title="رایگان" courses={cards}/>

      <CardSlider title="تخفیفی" courses={cards}/>

      <Introduction />
    </div>
  );
}
