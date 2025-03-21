import aroundLogo from "../../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img src={aroundLogo} alt="logotipo EUA Afora" className="header__logo" />
    </header>
  );
}
