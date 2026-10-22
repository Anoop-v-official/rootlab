'use client';

import { AppShell } from '../components/AppShell';
import { FeedView } from '../components/FeedView';
import { WatercoolerChat } from '../components/WatercoolerChat';
import { DevChatRooms } from '../components/DevChatRooms';
import { NetworkDirectory } from '../components/NetworkDirectory';

export default function HomePage() {
  return (
    <AppShell>
      {({ currentUser, posts, activeTab, onUpvote, onAddComment, onOpenVerifyModal }) => {
        if (activeTab === 'watercooler') {
          return (
            <WatercoolerChat
              currentUser={currentUser}
              onOpenVerifyModal={onOpenVerifyModal}
            />
          );
        }

        if (activeTab === 'chat') {
          return <DevChatRooms currentUser={currentUser} />;
        }

        if (activeTab === 'network') {
          return <NetworkDirectory currentUser={currentUser} />;
        }

        return (
          <FeedView
            posts={posts}
            currentUser={currentUser}
            onUpvote={onUpvote}
            onAddComment={onAddComment}
            onOpenVerifyModal={onOpenVerifyModal}
          />
        );
      }}
    </AppShell>
  );
}

