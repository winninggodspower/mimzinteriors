export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-lg font-semibold">Dummy Navbar</h1>
        <ul className="flex items-center gap-4 text-sm text-gray-700">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}