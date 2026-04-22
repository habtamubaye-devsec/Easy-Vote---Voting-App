import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import ResultCard from '../components/ui/ResultCard';
import { actions, state } from '../state';

export const Results: React.FC = () => {
  const { poll, isAdmin, participantCount, rankingsCount } = useSnapshot(state);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLeavePollOpen, setIsLeavePollOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex flex-col w-full justify-between items-center h-full max-w-sm">
        <div className="w-full flex-1">
          <h1 className="text-center mt-4 mb-2 text-2xl font-black text-gray-800 tracking-tight">Results</h1>
          {poll?.results.length ? (
            <ResultCard results={poll?.results} />
          ) : (
            <p className="text-center text-xl">
              <span className="text-orange-600">{rankingsCount}</span> of{' '}
              <span className="text-purple-600">{participantCount}</span>{' '}
              participants have voted
            </p>
          )}
        </div>
        <div className="flex flex-col justify-center">
          {isAdmin && !poll?.results.length && (
            <>
              <button
                className="box btn-orange my-2"
                onClick={() => setIsConfirmationOpen(true)}
              >
                End Poll
              </button>
            </>
          )}
          {!isAdmin && !poll?.results.length && (
            <div className="my-2 italic">
              Waiting for Admin,{' '}
              <span className="font-semibold">
                {poll?.participants[poll?.adminID]}
              </span>
              , to finalize the poll.
            </div>
          )}
          {!!poll?.results.length && (
            <div className="flex flex-col items-center pb-12 w-full">
              {isAdmin && (
                <button
                  className="box btn-orange my-2 w-48 shadow-lg"
                  onClick={() => actions.startOver()}
                >
                  Start New Poll
                </button>
              )}
              <button
                className="box btn-purple my-2 w-48 opacity-80 hover:opacity-100"
                onClick={() => setIsLeavePollOpen(true)}
              >
                Leave Poll
              </button>
            </div>
          )}
        </div>
      </div>
      {isAdmin && (
        <ConfirmationDialog
          message="Are you sure close the poll and calculate the results?"
          showDialog={isConfirmationOpen}
          onCancel={() => setIsConfirmationOpen(false)}
          onConfirm={() => {
            actions.closePoll();
            setIsConfirmationOpen(false);
          }}
        />
      )}
      {isLeavePollOpen && (
        <ConfirmationDialog
          message="You'll lose ya results. Dat alright?"
          showDialog={isLeavePollOpen}
          onCancel={() => setIsLeavePollOpen(false)}
          onConfirm={() => actions.startOver()}
        />
      )}
    </>
  );
};
