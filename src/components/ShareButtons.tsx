import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';

const ShareButton: React.FC<{
  icon: React.ReactNode;
  url: string;
  label: string;
  className?: string;
}> = ({ icon, url, label, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={className}
            onClick={() => window.open(url, '_blank')}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Compartilhar no {label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ShareButtons: React.FC = () => {
  const shareUrl = 'https://www.example.com/sorteio';

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4 items-center">
          <ShareButton
            icon={<MessageCircle className="h-4 w-4" />}
            url={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            label="WhatsApp"
            className="hover:bg-green-100 hover:text-green-600"
          />
          <ShareButton
            icon={<Facebook className="h-4 w-4" />}
            url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            label="Facebook"
            className="hover:bg-blue-100 hover:text-blue-600"
          />
          <ShareButton
            icon={<Twitter className="h-4 w-4" />}
            url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            label="Twitter"
            className="hover:bg-sky-100 hover:text-sky-500"
          />
          <ShareButton
            icon={<Instagram className="h-4 w-4" />}
            url={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
            label="Instagram"
            className="hover:bg-pink-100 hover:text-pink-600"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareButtons;