import Navbar from "@/components/Navbar";
import EarbudScroll from "@/components/EarbudScroll";
import Features from "@/components/Features";
import Specs from "@/components/Specs";
import Footer from "@/components/Footer";
import { Battery, Bluetooth, Droplets, Mic } from "lucide-react";

export default function Home() {
  const earbudFeatures = [
    {
      title: "Hybrid ANC",
      description: "Block out the noise. Focus on your flow.",
      icon: <Mic className="w-6 h-6 text-white" />,
      colSpan: "md:col-span-2",
    },
    {
      title: "30hr Playtime",
      description: "With charging case.",
      icon: <Battery className="w-6 h-6 text-white" />,
      colSpan: "md:col-span-1",
    },
    {
      title: "IPX5 Waterproof",
      description: "Sweat and rain resistant.",
      icon: <Droplets className="w-6 h-6 text-white" />,
      colSpan: "md:col-span-1",
    },
    {
      title: "Bluetooth 5.4",
      description: "Ultra-low latency connection.",
      icon: <Bluetooth className="w-6 h-6 text-white" />,
      colSpan: "md:col-span-2",
    },
  ];

  const earbudSpecs = [
    { label: "Driver", value: "11mm Dynamic" },
    { label: "Connectivity", value: "Bluetooth 5.4" },
    { label: "Battery", value: "7h + 23h (Case)" },
    { label: "Rating", value: "IPX5 Water Resistant" },
    { label: "Codecs", value: "AAC, SBC" },
    { label: "Weight", value: "4.5g per bud" },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <EarbudScroll />
      <Features features={earbudFeatures} />
      <Specs specs={earbudSpecs} title="Compact Power." />
      <Footer />
    </main>
  );
}
