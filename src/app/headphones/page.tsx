import Navbar from "@/components/Navbar";
import HeadphoneScroll from "@/components/HeadphoneScroll";
import Features, { headphoneFeatures } from "@/components/Features";
import Specs, { headphoneSpecs } from "@/components/Specs";
import Footer from "@/components/Footer";

export default function HeadphonesPage() {
    return (
        <main className="min-h-screen bg-black">
            <Navbar />
            <HeadphoneScroll />
            <Features features={headphoneFeatures} />
            <Specs specs={headphoneSpecs} title="Technical Dominance." />
            <Footer />
        </main>
    );
}
