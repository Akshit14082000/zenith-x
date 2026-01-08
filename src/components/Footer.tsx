export default function Footer() {
    return (
        <footer className="py-12 px-6 md:px-12 bg-black border-t border-white/10 text-center md:text-left relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tighter text-white">ZENITH X</h2>
                    <p className="text-sm text-white/40 mt-1">© 2026 Zenith Audio. All rights reserved.</p>
                </div>
                <div className="flex gap-6 text-sm text-white/60">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
