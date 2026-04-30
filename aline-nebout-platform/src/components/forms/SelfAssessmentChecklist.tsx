"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DoctolibButton from "@/components/booking/DoctolibButton";

interface ChecklistItem {
  id: string;
  label: string;
}

interface SelfAssessmentChecklistProps {
  items: ChecklistItem[];
  threshold?: number;
}

export default function SelfAssessmentChecklist({
  items,
  threshold = 3,
}: SelfAssessmentChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const count = checked.size;
  const showRecommendation = count >= threshold;

  return (
    <div>
      <p className="text-text-muted mb-6">
        Cochez les signes que vous observez chez votre enfant :
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {items.map((item) => (
          <label
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-colors duration-200 cursor-pointer select-none ${
              checked.has(item.id)
                ? "border-primary bg-primary/5"
                : "border-transparent bg-white/60 hover:border-primary-light"
            }`}
          >
            <input
              type="checkbox"
              checked={checked.has(item.id)}
              onChange={() => toggle(item.id)}
              className="mt-0.5 w-5 h-5 rounded border-2 border-primary-light text-primary accent-primary focus:ring-2 focus:ring-accent cursor-pointer"
            />
            <span className="text-text-dark text-sm leading-snug">{item.label}</span>
          </label>
        ))}
      </div>

      {/* Counter */}
      <p className="text-sm text-text-muted mb-4">
        {count} signe{count > 1 ? "s" : ""} coché{count > 1 ? "s" : ""} sur {items.length}
      </p>

      {/* Recommendation */}
      <AnimatePresence>
        {showRecommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg text-text-dark mb-2">
                Un bilan des réflexes archaïques pourrait aider votre enfant
              </h3>
              <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
                Vous avez identifié {count} signes. Ces difficultés peuvent être liées à des
                réflexes archaïques non intégrés. Un bilan permettra d&apos;identifier les réflexes
                concernés et de proposer un programme d&apos;intégration adapté.
              </p>
              <DoctolibButton label="Prendre rendez-vous pour un bilan" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
