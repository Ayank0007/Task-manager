export default function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>
            <p>© 2025 Task Manager Pro. Built with Next.js 16 & AI.</p>
          </div>
          <div className="flex gap-4 items-center">
            <span>Created by: Ayan Khan</span>
            <span>•</span>
            <a
              href="https://github.com/Ayank0007"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub Profile
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/ayank0007/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
