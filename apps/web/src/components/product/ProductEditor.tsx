// components/product/ProductEditor.tsx
import React, { useState } from 'react';
import SectionDesktop, { DataProps } from '@/components/product/SectionPreview';
import { BlockConfig } from './ProductRender';
import { BlockEditor } from './BlockEditor';

// A helper to generate a “blank” block of the chosen type:
const makeBlankBlock = (type: BlockConfig['type']): BlockConfig => ({
  id: `${type}-${Date.now()}`,
  type,
  column: 1,
  props: (() => {
    switch (type) {
      case 'title': return { children: 'New title', className: '' };
      case 'content': return { children: 'New content…', className: '' };
      case 'image': return { src: '/images/placeholder.jpg', alt: '', className: 'h-[200px] w-full object-cover' };
      case 'bullets': return { items: [{ title: '', text: '' }] };
      case 'details': return { items: [{ label: '', value: '' }] };
      case 'made': return { items: [{ componentProcess: '', supplier: '', country: '' }] };
      case 'recycling': return { children: 'Recycling info…', className: 'prose' };
      default: return {};
    }
  })(),
});

export const ProductEditor: React.FC<{
  initial: DataProps;
  onSave: (data: DataProps) => void;
}> = ({ initial, onSave }) => {
  const [section, setSection] = useState<DataProps>(initial);

  const updateBlock = (idx: number, b: BlockConfig) => {
    const blocks = [...section.blocks];
    blocks[idx] = b;
    setSection({ ...section, blocks });
  };

  const removeBlock = (idx: number) => {
    const blocks = section.blocks.filter((_, i) => i !== idx);
    setSection({ ...section, blocks });
  };

  const addBlock = (type: BlockConfig['type']) => {
    setSection({
      ...section,
      blocks: [...section.blocks, makeBlankBlock(type)],
    });
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return; // nothing above item 0
    const blocks = [...section.blocks];

    
    const above = blocks[idx - 1]!;
    const current = blocks[idx]!;

    blocks[idx - 1] = current;
    blocks[idx]     = above;

    setSection({ ...section, blocks });
  };

  const moveDown = (idx: number) => {
    if (idx === section.blocks.length - 1) return; // nothing below last
    const blocks = [...section.blocks];

    const below   = blocks[idx + 1]!;
    const current = blocks[idx]!;

    blocks[idx + 1] = current;
    blocks[idx]     = below;

    setSection({ ...section, blocks });
  };


  return (
    <div className="flex h-full">
      {/* Inspector */}
      <aside className="w-1/3 p-4 overflow-auto border-r">
        <h3 className="text-lg font-bold mb-4">Edit Section: {section.id}</h3>

        {section.blocks.map((block, i) => (
          <div key={block.id}>
            <BlockEditor
              block={block}
              onChange={b => updateBlock(i, b)}
              onRemove={() => removeBlock(i)}
            />
            <div className="flex space-x-2 mb-4">
              <button onClick={() => moveUp(i)} disabled={i === 0} className="px-2 py-1 border">↑</button>
              <button
                onClick={() => moveDown(i)}
                disabled={i === section.blocks.length - 1}
                className="px-2 py-1 border"
              >
                ↓
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6">
          <label className="block mb-1 font-medium">Add new block:</label>
          <select
            onChange={e => addBlock(e.target.value as any)}
            defaultValue=""
            className="w-full p-1 border"
          >
            <option value="" disabled>
              -- choose type --
            </option>
            {['title','content','image','bullets','details','made','recycling'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onSave(section)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Section
        </button>
      </aside>

      {/* Live Preview */}
      <main className="flex-1 p-4 overflow-auto">
        <SectionDesktop sections={[section]} />
      </main>
    </div>
  );
};
