import Logo from "./Logo";

export default function Navbar({ children }) {
  return (
    <nav>
      <Logo /> {children}
    </nav>
  );
}
 