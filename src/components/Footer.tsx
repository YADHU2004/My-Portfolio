import { motion } from 'framer-motion';
import { Instagram, Mail, Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/yadhu_1_0', label: 'Instagram' },
  { icon: Mail, href: 'mailto:yadhuanand2004@gmail.com', label: 'Email' },
  { icon: Github, href: 'https://github.com/YADHU2004', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/yadhu-anand-p-1b2007264/', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-custom px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 bg-secondary/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"          // 🔥 Opens in new tab**
                rel="noopener noreferrer" // 🔥 Security & performance**
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            Designed & Built by Yadhu Anand P — © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
