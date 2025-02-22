import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareResultProps {
  savings: number;
}

export function ShareResult({ savings }: ShareResultProps) {
  const { toast } = useToast();

  const shareText = `I saved ${savings}kg of CO₂ by choosing an eco-friendly route! #EcoRoute`;
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EcoRoute Savings',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Copied to clipboard!",
      description: "Share your eco-friendly choice with others",
    });
  };

  return (
    <Button 
      onClick={handleShare}
      className="w-full"
      variant="secondary"
    >
      <Share2 className="mr-2 h-4 w-4" />
      Share Your Impact
    </Button>
  );
}
