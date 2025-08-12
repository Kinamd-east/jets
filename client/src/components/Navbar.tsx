import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useUserAuthentication from "@/hooks/useUserAuthentication";

const NavigationBar = () => {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Shop",
      link: "/shop",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUserAuthentication();
  const navigate = useNavigate();

  const navigateToLogIn = () => {
    setIsMobileMenuOpen(false);
    navigate("/login");
  };
  const navigateToSignUp = () => {
    setIsMobileMenuOpen(false);
    navigate("/signup");
  };

  const navigateToProfile = () => {
    setIsMobileMenuOpen(false);
    navigate("/profile");
  };

  return (
    <Navbar className="shadow-md">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {user ? (
            <div>
              <NavbarButton
                variant="secondary"
                onClick={() => navigate("/profile")}
              >
                <Plus /> List Product
              </NavbarButton>
              <NavbarButton
                variant="secondary"
                onClick={() => navigate("/profile")}
              >
                Profile
              </NavbarButton>
            </div>
          ) : (
            <div>
              <NavbarButton
                variant="secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </NavbarButton>
              <NavbarButton
                variant="primary"
                onClick={() => navigate("/signup")}
              >
                Signup
              </NavbarButton>
            </div>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            {user ? (
              <NavbarButton
                onClick={navigateToProfile}
                variant="primary"
                className="w-full"
              >
                Profile
              </NavbarButton>
            ) : (
              <div>
                <NavbarButton
                  onClick={navigateToLogIn}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
                <NavbarButton
                  onClick={navigateToSignUp}
                  variant="primary"
                  className="w-full"
                >
                  Signup
                </NavbarButton>
              </div>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default NavigationBar;
