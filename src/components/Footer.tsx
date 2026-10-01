import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { site } from "@/data/site";

/**
 * All identity and contact details come from src/data/site.ts. Previously the
 * footer hard-coded a different email address from the one on the contact
 * page, and the three legal links pointed at routes that did not exist.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { label: "GitHub", href: site.social.github, Icon: Github },
    { label: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
    { label: "Twitter", href: site.social.twitter, Icon: Twitter },
    { label: "Email", href: `mailto:${site.contact.email}`, Icon: Mail },
  ];

  return (
    <footer className="w-full bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-display font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                {site.name}
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              {site.tagline}
            </p>
            <div className="flex space-x-4 mt-6">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {site.nav.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/legal"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Legal &amp; Policies
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Designed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
