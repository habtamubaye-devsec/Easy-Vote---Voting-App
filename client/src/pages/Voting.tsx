import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import RankedCheckBox from '../components/ui/RankedCheckBox';
import { state, actions } from '../state';

export const Voting: React.FC = () => {
  const currentState = useSnapshot(state);
  const [rankings, setRankings] = useState<string[]>([]);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmVotes, setConfirmVotes] = useState(false);

  const toggleNomination = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);
    const hasVotesRemaining =
      (currentState.poll?.votesPerVoter || 0) - rankings.length > 0;

    if (position < 0 && hasVotesRemaining) {
      setRankings([...rankings, id]);
    } else {
      setRankings([
        ...rankings.slice(0, position),
        ...rankings.slice(position + 1, rankings.length),
      ]);
    }
  };

  const getRank = (id: string) => {
    const position = rankings.findIndex((ranking) => ranking === id);

    return position < 0 ? undefined : position + 1;
  };

  return (
    <div className="mx-auto flex flex-col w-full justify-between items-center h-full max-w-sm min-h-[80vh]">
      <div className="w-full flex-shrink-0">
        <h1 className="text-center mt-4">Vote for your favorites</h1>
      </div>
      <div className="w-full flex-1 py-4">
        {currentState.poll && (
          <>
            <div className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex justify-center items-center space-x-4">
              <span>Rank your Top {currentState.poll?.votesPerVoter}</span>
              {rankings.length > 0 && (
                <button 
                  className="text-[10px] text-red-500 hover:text-red-700 font-black border border-red-200 px-2 py-0.5 rounded-lg transition-colors bg-white shadow-sm"
                  onClick={() => setRankings([])}
                >
                  CLEAR ALL
                </button>
              )}
            </div>
            <div className="text-center text-2xl font-black mb-8 text-green-700">
              {currentState.poll.votesPerVoter - rankings.length} Votes remaining
            </div>
          </>
        )}
        <div className="px-2">
          {Object.entries(currentState.poll?.nominations || {}).map(
            ([id, nomination]) => (
              <RankedCheckBox
                key={id}
                value={nomination.text}
                rank={getRank(id)}
                onSelect={() => toggleNomination(id)}
              />
            )
          )}
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center">
        <button
          disabled={rankings.length < (currentState.poll?.votesPerVoter ?? 100)}
          className="box btn-orange my-2 w-48 shadow-lg transition-all"
          onClick={() => setConfirmVotes(true)}
        >
          Submit My Ballot
        </button>
        <ConfirmationDialog
          message="You cannot change your vote after submitting"
          showDialog={confirmVotes}
          onCancel={() => setConfirmVotes(false)}
          onConfirm={() => actions.submitRankings(rankings)}
        />
        {currentState.isAdmin && (
          <>
            <button
              className="box btn-orange my-2 w-36"
              onClick={() => setConfirmCancel(true)}
            >
              Cancel Poll
            </button>
            <ConfirmationDialog
              message="This will cancel the poll and remove all users"
              showDialog={confirmCancel}
              onCancel={() => setConfirmCancel(false)}
              onConfirm={() => actions.cancelPoll()}
            />
          </>
        )}
      </div>
    </div>
  );
};
