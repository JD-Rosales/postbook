import React from 'react';
import EmojiPicker, {
  EmojiClickData,
  SuggestionMode,
} from 'emoji-picker-react';

interface EmojiPickerProps {
  onEmojiClick?: (emoji: EmojiClickData, event: MouseEvent) => void;
  height?: number;
  width?: number;
}
const Index = React.forwardRef<HTMLDivElement, EmojiPickerProps>(
  ({ onEmojiClick, height, width }, ref) => {
    return (
      <div ref={ref}>
        <EmojiPicker
          lazyLoadEmojis
          onEmojiClick={onEmojiClick}
          suggestedEmojisMode={SuggestionMode.RECENT}
          previewConfig={{ showPreview: false }}
          height={height ? height : 450}
          width={width ? width : 350}
        />
      </div>
    );
  }
);

export default Index;
