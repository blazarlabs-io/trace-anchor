// components/product/BlockEditor.tsx
import React, { useEffect, useState } from 'react';
import { BlockConfig } from './ProductRender';

interface BlockEditorProps {
  block: BlockConfig;
  onChange: (newBlock: BlockConfig) => void;
  onRemove: () => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({
  block,
  onChange,
  onRemove,
}) => {
  const updateProp = (key: string, value: any) => {
    onChange({ ...block, props: { ...block.props, [key]: value } });
  };

  type AnyElement = React.ReactElement<{ children?: React.ReactNode }>

   const [text, setText] = useState('')

  useEffect(() => {
    if (block.type !== 'content') return

    const raw = block.props.children  
    let extracted = ''

    // 1) if it's already a string
    if (typeof raw === 'string') {
      extracted = raw

    // 2) if it's a single React element
    } else if (React.isValidElement(raw)) {
      // assert the props so TS knows about .props.children
      const el = raw as AnyElement
      if (typeof el.props.children === 'string') {
        extracted = el.props.children
      }

    // 3) if it's an array of React nodes
    } else if (Array.isArray(raw)) {
      extracted = raw
        .map(child => {
          if (React.isValidElement(child)) {
            const el = child as AnyElement
            return typeof el.props.children === 'string'
              ? el.props.children
              : ''
          }
          return ''
        })
        .join('\n')
    }

    setText(extracted)
  }, [block.props.children, block.type])

  // Helpers for bullets items
  const items: { title: string; text: string }[] =
    Array.isArray(block.props.items) ? block.props.items : []

  const updateItem = (idx: number, updatedItem: { title: string; text: string }) => {
    const newItems = [...items]
    newItems[idx] = updatedItem
    updateProp('items', newItems)
  }

  const removeItem = (idx: number) => {
    const newItems = items.filter((_, i) => i !== idx)
    updateProp('items', newItems)
  }

  const addItem = () => {
    updateProp('items', [...items, { title: '', text: '' }])
  }

  return (
    <div className="p-4 border rounded mb-4">
      <div className="flex justify-between items-center mb-2">
        <strong>{block.type} — {block.id}</strong>
        <button onClick={onRemove} className="text-red-500">×</button>
      </div>

      {block.type === 'title' && (
        <input
          type="text"
          value={block.props.children}
          onChange={e => updateProp('children', e.target.value)}
          className="w-full p-1 border"
        />
      )}

      {block.type === 'content' && (
        <textarea
          value={text}
          onChange={e => updateProp('children', e.target.value)}
          className="w-full p-1 border"
        />
      )}

      {block.type === 'image' && (
        <>
          <label className="block mb-1">Src</label>
          <input
            type="text"
            value={block.props.src}
            onChange={e => updateProp('src', e.target.value)}
            className="w-full p-1 border mb-2"
          />
          <label className="block mb-1">ClassName (e.g. height)</label>
          <input
            type="text"
            value={block.props.className}
            onChange={e => updateProp('className', e.target.value)}
            className="w-full p-1 border"
          />
        </>
      )}

      {block.type === 'bullets' && (
        <>
          <label className="block font-medium mb-2">Bulleted Items</label>

          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col space-y-2 mb-2 items-start ">
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  updateItem(idx, { ...item, title: e.target.value })
                }
                className="flex-1 p-1 border"
              />
              <input
                type="text"
                placeholder="Text"
                value={item.text}
                onChange={(e) =>
                  updateItem(idx, { ...item, text: e.target.value })
                }
                className="flex-1 p-1 border"
              />
              <button
                onClick={() => removeItem(idx)}
                className="text-red-500 px-2"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={addItem}
            className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700"
          >
            + Add item
          </button>
        </>
      )}

      
    </div>
  );
};
