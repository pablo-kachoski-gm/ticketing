import Link from "next/link";
import styled from "styled-components";
const NavMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #d4d4d4;
  align-items: center;
  font-size: 20px;

  & > ul {
    display: flex;

    & > li {
      list-style-type: none;
      &:not(:first-child) {
        margin-left: 2em;
      }
      & > a {
        text-decoration: none;
        color: #3359e6;
      }
    }
  }
`;
const MenuTitle = styled.a`
  text-transform: uppercase;
  font-weight: bold;
`;
const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li key={href}>
        <Link href={href}>{label}</Link>
      </li>
    ));
  return (
    <NavMenu>
      <Link href="/">
        <MenuTitle>Ticketing</MenuTitle>
      </Link>
      <ul>{links}</ul>
    </NavMenu>
  );
};
export default Header;
