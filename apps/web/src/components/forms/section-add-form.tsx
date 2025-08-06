import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PreviewDesktop, { DataProps } from '@/components/product/PreviewDesktop';
import { ProductEditor } from '@/components/product/ProductEditor';
import { ProductBlocks } from '@/components/product/Data';

// Define your form’s shape
type FormValues = {
  sections: DataProps[];
};

export default function PageEditor({ defaultSections }: { defaultSections: DataProps[] }) {
  const { watch, setValue } = useForm<FormValues>({
    defaultValues: { sections: defaultSections },
  });

  // react-hook-form gives us the live array:
  const sections = (watch('sections') ?? []).filter((s): s is DataProps => !!s);

  // Which one am I editing?
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Called when the child ProductEditor “saves” a section
  const handleSectionSave = (updated: DataProps) => {
    const newSections = [...sections];
    newSections[selectedIdx] = updated;
    setValue('sections', newSections, { shouldDirty: true });
  };

  // Remove a section by index
  const removeSection = (idx: number) => {
    const newSections = sections.filter((_, i) => i !== idx);
    setValue("sections", newSections, { shouldDirty: true });

    // adjust selectedIdx so we don't end up past the end
    if (idx === selectedIdx) {
      // if we deleted the currently‐selected, bump back one (or zero)
      setSelectedIdx(Math.max(0, selectedIdx - 1));
    } else if (idx < selectedIdx) {
      // if we deleted something before the selected, shift left
      setSelectedIdx(selectedIdx - 1);
    }
  };

  // Add a brand-new blank section
  const addSection = () => {
    const newSection: DataProps = {
      id: `section-${sections.length + 1}`,
      blocks: [],         // start empty
      columns: 2,         // or whatever default you like
    };
    const newSections = [...sections, newSection];
    setValue('sections', newSections, { shouldDirty: true });
    setSelectedIdx(newSections.length - 1);
  };

  return (
    <div className="flex h-full">
      {/* ← Sidebar: list of sections + Add button */}
      <aside className="w-1/4 border-r p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Sections</h2>
        <ul className="space-y-2">
          {sections.map((sec, i) => (
            <li key={sec.id}>
              <button
                onClick={() => setSelectedIdx(i)}
                className={`w-full text-left px-2 py-1 rounded ${
                  i === selectedIdx ? 'bg-blue-200 font-semibold' : 'hover:bg-gray-100'
                }`}
              >
                {sec.id}
              </button>
              <button
                onClick={() => removeSection(i)}
                className="ml-2 text-red-500 px-2 py-1 hover:bg-red-100 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={addSection}
          className="mt-6 w-full px-3 py-2 bg-green-600 text-white rounded"
        >
          + Add Section
        </button>
      </aside>

      {/* → Main: editor for the selected section */}
      <main className="flex-1 p-4 overflow-auto">
        {sections[selectedIdx] ? (
          <ProductEditor
            key={sections[selectedIdx].id} 
            initial={sections[selectedIdx]}
            onSave={handleSectionSave}
          />
        ) : (
          <p>Select or add a section to begin editing.</p>
        )}
      </main>
    </div>
  );
}

// Usage example, in your page:
export function EditorPageWrapper() {
  const initial: DataProps = {
    id: 'product',
    blocks: ProductBlocks,
    columns: 2,
  };
  return <PageEditor defaultSections={[initial]} />;
}
