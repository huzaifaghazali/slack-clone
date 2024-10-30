import Editor from '@/components/editor';

interface ChatInputProps {
  placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  return (
    <div className='w-full px-5'>
      <Editor placeholder={placeholder} />
    </div>
  );
};
