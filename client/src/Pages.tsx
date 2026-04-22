import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSnapshot } from 'valtio';
import Create from './pages/Create';
import Join from './pages/Join';
import { Results } from './pages/Results';
import { Voting } from './pages/Voting';
import { WaitingRoom } from './pages/WaitingRoom';
import Welcome from './pages/Welcome';
import { actions, AppPage, state } from './state';
import { MdContentCopy } from 'react-icons/md';
import { useCopyToClipboard } from 'react-use';
import { colorizeText } from './util';
import SnackBar from './components/ui/SnackBar';

const routeConfig = {
  [AppPage.Welcome]: Welcome,
  [AppPage.Create]: Create,
  [AppPage.Join]: Join,
  [AppPage.WaitingRoom]: WaitingRoom,
  [AppPage.Voting]: Voting,
  [AppPage.Results]: Results,
};

const Pages: React.FC = () => {
  const currentState = useSnapshot(state);

  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const [showCopySuccess, setShowCopySuccess] = React.useState(false);

  const handleCopy = () => {
    if (currentState.poll?.id) {
      copyToClipboard(currentState.poll.id);
      setShowCopySuccess(true);
    }
  };

  useEffect(() => {
    if (
      currentState.me?.id &&
      currentState.poll &&
      !currentState.poll?.hasStarted
    ) {
      actions.setPage(AppPage.WaitingRoom);
    }

    if (currentState.me?.id && currentState.poll?.hasStarted) {
      actions.setPage(AppPage.Voting);
    }

    if (currentState.me?.id && currentState.hasVoted) {
      actions.setPage(AppPage.Results);
    }
  }, [
    currentState.me?.id,
    currentState.poll?.hasStarted,
    currentState.hasVoted,
  ]);

  return (
    <>
      <SnackBar
        show={showCopySuccess}
        message="Poll ID copied to clipboard!"
        onClose={() => setShowCopySuccess(false)}
        autoCloseDuration={2000}
      />
      {currentState.poll && (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 px-4 py-3 flex justify-between items-center shadow-sm max-w-screen-sm mx-auto rounded-b-2xl">
          <div className="flex items-center space-x-2">
            <span className="font-black text-green-700 tracking-tighter text-xl">EasyVote</span>
          </div>
          <div 
            onClick={handleCopy}
            className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100 group"
          >
            <span className="text-[10px] font-bold text-gray-400 uppercase">Poll ID</span>
            <span className="font-mono font-bold text-sm">
              {colorizeText(currentState.poll.id)}
            </span>
            <MdContentCopy size={16} className="text-gray-400 group-hover:text-green-600" />
          </div>
        </header>
      )}
      <div className={`flex flex-col h-screen overflow-hidden ${currentState.poll ? 'pt-16' : ''}`}>
        {Object.entries(routeConfig).map(([page, Component]) => (
          <CSSTransition
            key={page}
            in={page === currentState.currentPage}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <div className="flex-1 overflow-y-auto max-w-screen-sm mx-auto w-full py-6 px-4">
              <Component />
            </div>
          </CSSTransition>
        ))}
      </div>
    </>
  );
};

export default Pages;
