import Image from 'next/image';
import { Delta, Op } from 'quill/core';
import { MdSend } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';
import Quill, { type QuillOptions } from 'quill';
import { ImageIcon, Smile, XIcon } from 'lucide-react';
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import 'quill/dist/quill.snow.css';

interface EditorProps {
  // disabled?: boolean;
  // onCancel?: () => void;
  placeholder?: string;
  // defaultValue?: Delta | Op[];
  // variant?: "create" | "update";
  // innerRef?: MutableRefObject<Quill | null>;
  // onSubmit: ({ image, body }: EditorValue) => void;
}

const Editor = ({ placeholder }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // const submitRef = useRef(onSubmit);
  //   const disabledRef = useRef(disabled);
  const placeholderRef = useRef(placeholder);
  //   const quillRef = useRef<Quill | null>(null);
  //   const defaultValueRef = useRef(defaultValue);
  const imageElementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      // modules: {
      //   toolbar: [
      //     ['bold', 'italic', 'strike'],
      //     ['link'],
      //     [{ list: 'ordered' }, { list: 'bullet' }],
      //   ],
      //   keyboard: {
      //     bindings: {
      //       enter: {
      //         key: 'Enter',
      //         handler: () => {
      //           const text = quill.getText();
      //           const addedImage = imageElementRef.current?.files?.[0] || null;

      //           const isEmpty =
      //             !addedImage &&
      //             text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

      //           if (isEmpty) return;

      //           const body = JSON.stringify(quill.getContents());
      //           //  submitRef.current?.({
      //           //    body,
      //           //    image: addedImage,
      //           //  });
      //         },
      //       },
      //       shift_enter: {
      //         key: 'Enter',
      //         shiftKey: true,
      //         handler: () => {
      //           quill.insertText(quill.getSelection()?.index || 0, '\n');
      //         },
      //       },
      //     },
      //   },
      // },
    };

    const quill = new Quill(editorContainer, options);

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);

      if (container) {
         container.innerHTML = "";
       }
    };
  }, []);

  return (
    <div className='flex flex-col'>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm'
        )}
      >
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default Editor;
