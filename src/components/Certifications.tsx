import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';

type Cert = {
  title: string;
  issuer: string;
  file: string; // public path, e.g. "/certs/my-cert.pdf"
};

const certifications: Cert[] = [
  {
    title: 'Java',
    issuer: 'Sololearn',
    file: 'src/assets/Java Intermediate.jpg',
  },
  
  {
    title: 'Web Design Training',
    issuer: 'Besant Technologies',
    file: 'src/assets/web Designing Training.png',
  },
  {
    title: 'React JS Training',
    issuer: 'Besant Technologies',
    file: 'src/assets/React.js Training.png',
  },
  {
    title: 'SQL Training',
    issuer: 'Besant Technologies',
    file: 'src/assets/SQL Training.png',
  },
 
];

export default function Certifications() {
  const [openCert, setOpenCert] = useState<Cert | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenCert(null);
    }
    if (openCert) {
      prevActiveRef.current = document.activeElement as HTMLElement | null;
      document.addEventListener('keydown', onKey);
      // focus close button shortly after open
      setTimeout(() => closeBtnRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden'; // prevent background scroll
    } else {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      // restore focus
      prevActiveRef.current?.focus?.();
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openCert]);

  const isPdf = (url: string) => /\.pdf(\?.*)?$/i.test(url);
  const isImage = (url: string) => /\.(jpe?g|png|webp|gif|svg)(\?.*)?$/i.test(url);

  return (
    <section id="certifications" className="section-padding bg-surface relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Credentials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-3">
            Certifications
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="glass rounded-2xl p-6 text-center group hover:bg-card/90 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-primary" />
              </div>

              <h3 className="font-display font-bold mb-2">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cert.issuer}</p>

              <button
                onClick={() => setOpenCert(cert)}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                aria-haspopup="dialog"
              >
                View Certificate
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Card viewer */}
      <AnimatePresence>
        {openCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            onClick={() => setOpenCert(null)} // click backdrop to close
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
              className="relative z-10 w-full max-w-4xl mx-auto bg-surface/95 rounded-2xl shadow-xl overflow-hidden"
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()} // prevent backdrop close when interacting with card
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <h3 className="text-lg font-semibold">{openCert.title}</h3>
                  <p className="text-sm text-muted-foreground">{openCert.issuer}</p>
                </div>

                <button
                  ref={closeBtnRef}
                  onClick={() => setOpenCert(null)}
                  aria-label="Close certificate viewer"
                  className="p-2 rounded-md hover:bg-accent/10 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[75vh] overflow-auto">
                {isPdf(openCert.file) ? (
                  <iframe
                    src={openCert.file}
                    title={openCert.title}
                    className="w-full h-[70vh] rounded"
                  />
                ) : isImage(openCert.file) ? (
                  <img src={openCert.file} alt={openCert.title} className="max-h-[75vh] mx-auto rounded" />
                ) : (
                  <p className="text-center text-muted-foreground">
                    This file type cannot be previewed.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
