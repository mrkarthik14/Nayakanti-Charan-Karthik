import React, { useState } from 'react';
import { UserPersonalization } from '../types';
import { soundFx } from '../utils/audio';

interface PersonalizationDialogProps {
  isOpen: boolean;
  initialData: UserPersonalization;
  onClose: () => void;
  onSave: (data: UserPersonalization) => void;
}

const TAMIL_ENDEARMENTS = [
  { term: 'En Anbe', tamil: 'என் அன்பே', meaning: 'My Beloved / My Love' },
  { term: 'Kanmani', tamil: 'கண்மணி', meaning: 'Apple of My Eyes' },
  { term: 'Thangam', tamil: 'தங்கம்', meaning: 'My Precious Gold' },
  { term: 'Chellam', tamil: 'செல்லம்', meaning: 'My Sweetheart / Treasure' },
  { term: 'Uyire', tamil: 'உயிரே', meaning: 'My Life and Soul' },
  { term: 'Azhage', tamil: 'அழகே', meaning: 'My True Beauty' },
];

export const PersonalizationDialog: React.FC<PersonalizationDialogProps> = ({
  isOpen,
  initialData,
  onClose,
  onSave,
}) => {
  const [partnerName, setPartnerName] = useState(initialData.partnerName || '');
  const [senderName, setSenderName] = useState(initialData.senderName || '');
  const [selectedEndearment, setSelectedEndearment] = useState(
    initialData.preferredTamilEndearment || 'En Anbe'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(1.2);
    onSave({
      partnerName: partnerName.trim(),
      senderName: senderName.trim(),
      relationshipStatus: 'In Love',
      preferredTamilEndearment: selectedEndearment,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity"
    >
      {/* Dialog Surface (Material 3 Surface Elevation 3, 28px corners) */}
      <div className="relative w-full max-w-md bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface)] rounded-[28px] p-6 sm:p-7 shadow-[var(--md-sys-elevation-3)] border border-[var(--md-sys-color-outline-variant)]/30 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] flex items-center justify-center">
            <span className="material-symbols-rounded text-2xl text-[var(--md-sys-color-primary)]">
              favorite
            </span>
          </div>
          <div>
            <h2 id="dialog-title" className="text-xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]">
              Personalize Valentine’s Week
            </h2>
            <p className="text-xs text-[var(--md-sys-color-outline)]">
              Add your names to make every day special
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Partner Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--md-sys-color-on-surface-variant)] mb-1.5">
              Partner’s Name (பெயர்)
            </label>
            <div className="relative">
              <input
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g., Priya / Charan / Anbe"
                maxLength={40}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)] focus:border-[var(--md-sys-color-primary)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)]/20 outline-none text-sm transition-all text-[var(--md-sys-color-on-surface)] placeholder:text-[var(--md-sys-color-outline)]/60"
              />
            </div>
            <p className="text-[11px] text-[var(--md-sys-color-outline)] mt-1">
              Will be placed inside romantic letters, cards, and vows.
            </p>
          </div>

          {/* Your Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--md-sys-color-on-surface-variant)] mb-1.5">
              Your Name / Sender (உங்கள் பெயர்)
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g., Karthik / Your Valentine"
              maxLength={40}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--md-sys-color-surface)] border border-[var(--md-sys-color-outline-variant)] focus:border-[var(--md-sys-color-primary)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)]/20 outline-none text-sm transition-all text-[var(--md-sys-color-on-surface)] placeholder:text-[var(--md-sys-color-outline)]/60"
            />
          </div>

          {/* Tamil Endearment Choice */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--md-sys-color-on-surface-variant)] mb-2">
              Favorite Tamil Endearment (கொஞ்சும் சொல்)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TAMIL_ENDEARMENTS.map((item) => {
                const isSelected = selectedEndearment === item.term;
                return (
                  <button
                    key={item.term}
                    type="button"
                    onClick={() => setSelectedEndearment(item.term)}
                    className={`px-3 py-2 rounded-xl text-left border transition-all text-xs flex flex-col ${
                      isSelected
                        ? 'bg-[var(--md-sys-color-secondary-container)] border-[var(--md-sys-color-secondary)] text-[var(--md-sys-color-on-secondary-container)] font-semibold shadow-xs'
                        : 'bg-[var(--md-sys-color-surface)] border-[var(--md-sys-color-outline-variant)]/40 hover:bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface-variant)]'
                    }`}
                  >
                    <span className="font-bold text-xs">{item.term}</span>
                    <span className="text-[10px] opacity-75">{item.tamil}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--md-sys-color-outline-variant)]/30">
            <button
              type="button"
              onClick={onClose}
              className="m3-state-layer px-4 py-2 text-sm font-semibold rounded-full text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/8 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="m3-state-layer px-5 py-2 text-sm font-semibold rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-sm hover:shadow transition-all"
            >
              Save & Apply
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
