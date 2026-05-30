import UndergroundLanding from "@/components/UndergroundLanding";
import RadioPlayerProvider from "@/components/RadioPlayerProvider";

export default function Home() {
  return (
    <RadioPlayerProvider>
      <UndergroundLanding />
    </RadioPlayerProvider>
  );
}
