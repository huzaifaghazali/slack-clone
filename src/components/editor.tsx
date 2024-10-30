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

import { Hint } from './hint';

import { cn } from '@/lib/utils';

import 'quill/dist/quill.snow.css';
import { Button } from './ui/button';

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  variant?: 'create' | 'update';
  innerRef?: MutableRefObject<Quill | null>;
  onCancel?: () => void;
  onSubmit: ({ image, body }: EditorValue) => void;
}

const Editor = ({
  disabled = false,
  placeholder = 'Write something...',
  defaultValue = [],
  variant = 'create',
  innerRef,
  onCancel,
  onSubmit,
}: EditorProps) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const disabledRef = useRef(disabled);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef(defaultValue);
  const imageElementRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    disabledRef.current = disabled;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    );

    const options: QuillOptions = {
      theme: 'snow',
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ['bold', 'italic', 'strike'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                const text = quill.getText();
                const addedImage = imageElementRef.current?.files?.[0] || null;

                const isEmpty =
                  !addedImage &&
                  text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

                if (isEmpty) return;

                const body = JSON.stringify(quill.getContents());
                submitRef.current?.({
                  body,
                  image: addedImage,
                });
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quill.insertText(quill.getSelection()?.index || 0, '\n');
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);

    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);

    setText(quill.getText());
    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);

      if (container) {
        container.innerHTML = '';
      }

      if (quillRef.current) {
        quillRef.current = null;
      }

      if (innerRef) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector('.ql-toolbar');

    if (toolbarElement) {
      toolbarElement.classList.toggle('hidden');
    }
  };

  // We consider the editor empty if either:
  //  the text content of the editor is empty, after removing all HTML tags (we use a regular expression to remove all HTML tags, and then check that the resulting string is empty)
  const isEmpty = !image && text.replace(/<(.|\n)*?>/g, '').trim().length === 0;

  return (
    <div className='flex flex-col'>
      <div
        className={cn(
          'flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm'
        )}
      >
        <div ref={containerRef} className='ql-custom h-full' />
        <div className='z-[5] flex px-2 pb-2'>
          <Hint label={isToolbarVisible  ? 'Hide formatting' : 'Show formatting'}>
            <Button
              disabled={disabled}
              size='iconSm'
              variant='ghost'
              onClick={toggleToolbar}
            >
              <PiTextAa className='size-4' />
            </Button>
          </Hint>

          <Button disabled={disabled} size='iconSm' variant='ghost'>
            <Smile className='size-4' />
          </Button>

          {variant === 'create' && (
            <Hint label='Image'>
              <Button
                disabled={disabled}
                size='iconSm'
                variant='ghost'
                onClick={() => {}}
              >
                <ImageIcon className='size-4' />
              </Button>
            </Hint>
          )}

          {variant === 'update' && (
            <div className='ml-auto flex items-center gap-x-2'>
              <Button
                size='sm'
                disabled={disabled}
                variant='outline'
                onClick={onCancel}
              >
                Cancel
              </Button>

              <Button
                size='sm'
                disabled={disabled || isEmpty}
                onClick={() => {}}
                className='bg-[#007a5a] text-white hover:bg-[#007a5a]/80'
              >
                Save
              </Button>
            </div>
          )}

          {variant === 'create' && (
            <Button
              size='iconSm'
              disabled={disabled || isEmpty}
              onClick={() => {}}
              className={cn(
                'ml-auto',
                isEmpty
                  ? 'bg-white text-muted-foreground hover:bg-white'
                  : 'bg-[#007a5a] text-white hover:bg-[#007a5a]/80'
              )}
            >
              <MdSend className='size-4' />
            </Button>
          )}
        </div>
      </div>

      {variant === 'create' && (
        <div
          className={cn(
            'flex justify-end p-2 text-[10px] text-muted-foreground opacity-0 transition',
            !isEmpty && 'opacity-100'
          )}
        >
          <p>
            <strong>Shift + Return</strong> to add a new line
          </p>
        </div>
      )}
    </div>
  );
};

export default Editor;
