
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Pause } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  video: string;
  date: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Tech Conference 2025 Announces Keynote Speakers',
    content: 'The highly anticipated Tech Conference 2025 has just announced its lineup of keynote speakers, featuring industry leaders from Silicon Valley and beyond. The conference, scheduled for May 15, 2025, will focus on emerging technologies in AI, blockchain, and quantum computing. Tickets are selling fast, with early-bird registration ending next month.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: 'April 10, 2025'
  },
  {
    id: '2',
    title: 'Summer Music Festival Reveals Headliners',
    content: 'The organizers of the Summer Music Festival have finally revealed this year\'s headliners, featuring a mix of established artists and up-and-coming talent. Taking place in Central Park on June 21, 2025, the festival promises to be the highlight of the summer music scene. In addition to the main stages, there will be food stalls, art installations, and interactive experiences throughout the venue.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: 'April 5, 2025'
  },
  {
    id: '3',
    title: 'International Food Fair Expands to Three-Day Event',
    content: 'Due to overwhelming demand, the International Food Fair has been extended to a three-day event for 2025. Taking place from July 8-10 in the Downtown Food District, this year\'s fair will feature cuisines from over 30 countries. New additions include cooking demonstrations, chef competitions, and tasting workshops. Early tickets include access to exclusive VIP lounges and premium tastings.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: 'March 28, 2025'
  }
];

const NewsPage = () => {
  const [speakingNewsId, setSpeakingNewsId] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const handleReadAloud = (newsId: string, content: string) => {
    if (speakingNewsId === newsId) {
      window.speechSynthesis.cancel();
      setSpeakingNewsId(null);
      return;
    }
    
    if (window.speechSynthesis) {
      // Cancel any current speaking
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.onend = () => setSpeakingNewsId(null);
      
      setSpeakingNewsId(newsId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePlayVideo = (newsId: string) => {
    setPlayingVideoId(newsId === playingVideoId ? null : newsId);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event News & Updates</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay up to date with the latest news, announcements, and stories from the events you love.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {mockNews.map((news) => (
              <div key={news.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img className="h-64 w-full object-cover md:w-56" src={news.image} alt={news.title} />
                  </div>
                  <div className="p-6 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{news.title}</h2>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500 hover:text-eventhub-primary"
                          onClick={() => handleReadAloud(news.id, news.content)}
                        >
                          <Volume2 className="h-4 w-4" />
                          {speakingNewsId === news.id && <span className="ml-1 animate-pulse">●</span>}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500 hover:text-eventhub-primary"
                          onClick={() => handlePlayVideo(news.id)}
                        >
                          {playingVideoId === news.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{news.date}</p>
                    <p className="text-gray-600 mb-4">{news.content}</p>
                    
                    {playingVideoId === news.id && (
                      <div className="mt-4 aspect-video">
                        <iframe 
                          width="100%" 
                          height="100%" 
                          src={news.video} 
                          title={news.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen 
                          className="rounded-md"
                        ></iframe>
                      </div>
                    )}
                    
                    <div className="mt-auto">
                      <Button variant="outline" className="text-eventhub-primary">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
