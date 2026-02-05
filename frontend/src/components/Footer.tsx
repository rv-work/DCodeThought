export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted dark:text-muted-dark">
        © {new Date().getFullYear()} DCodeThought — Made with ❤️ for Coders
      </div>
    </footer>
  );
}
