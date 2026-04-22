import React, { useEffect, useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { MdContentCopy, MdPeopleOutline } from 'react-icons/md';
import { useCopyToClipboard } from 'react-use';
import { useSnapshot } from 'valtio';
import NominationForm from '../components/NominationForm';
import ParticipantList from '../components/ParticipantList';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';
import { actions, state } from '../state';
import { colorizeText } from '../util';

export const WaitingRoom: React.FC = () => {
  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const [nominationText, setNominationText] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [participantToRemove, setParticipantToRemove] = useState<string>();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const currentState = useSnapshot(state);

  const confirmRemoveParticipant = (id: string) => {
    setConfirmationMessage(
      `Remove ${currentState.poll?.participants[id]} from poll?`
    );
    setParticipantToRemove(id);
    setIsConfirmationOpen(true);
  };

  const submitRemoveParticipant = () => {
    participantToRemove && actions.removeParticipant(participantToRemove);
    setIsConfirmationOpen(false);
  };

  useEffect(() => {
    console.log('Waiting room useEffect');
    actions.initializeSocket();
  }, []);
  return (
    <>
      <div className="flex flex-col w-full justify-between items-center h-full">
        <div>
          <h2 className="text-center">Poll Topic</h2>
          <p className="italic text-center mb-4">{currentState.poll?.topic}</p>
        </div>
        <div className="flex flex-col w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-center mb-4">Add a Choice</h3>
          <div className="flex items-center space-x-2">
            <input
              maxLength={100}
              className="box info flex-1 !rounded-xl"
              placeholder="Type a choice..."
              value={nominationText}
              onChange={(e) => setNominationText(e.target.value)}
            />
            <button
              className="box btn-orange !py-3 !px-4 !rounded-xl disabled:opacity-50"
              disabled={!nominationText.length || nominationText.length > 100}
              onClick={() => {
                actions.nominate(nominationText);
                setNominationText('');
              }}
            >
              Add
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Current Choices ({currentState.nominationCount})</h3>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
              {Object.entries(currentState.poll?.nominations || {}).map(([id, nom]) => (
                <div key={id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-gray-700 font-medium">{nom.text}</span>
                  {currentState.isAdmin && (
                    <BsTrash 
                      className="text-red-400 hover:text-red-600 cursor-pointer transition-colors"
                      onClick={() => actions.removeNomination(id)}
                    />
                  )}
                </div>
              ))}
              {currentState.nominationCount === 0 && (
                <p className="text-center text-gray-400 italic text-sm py-4">No choices added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="box btn-purple mx-2 flex items-center space-x-2 !py-2 !px-4"
            onClick={() => setIsParticipantListOpen(true)}
          >
            <MdPeopleOutline size={20} />
            <span className="font-bold">{currentState.participantCount}</span>
            <span className="text-xs opacity-70">Participants</span>
          </button>
        </div>
        <div className="flex flex-col justify-center">
          {currentState.isAdmin ? (
            <>
              <div className="my-2 italic">
                {currentState.poll?.votesPerVoter} Nominations Required to
                Start!
              </div>
              <button
                className="box btn-orange my-2"
                disabled={!currentState.canStartVote}
                onClick={() => actions.startVote()}
              >
                Start Voting
              </button>
            </>
          ) : (
            <div className="my-2 italic">
              Waiting for Admin,{' '}
              <span className="font-semibold">
                {currentState.poll?.participants[currentState.poll?.adminID]}
              </span>
              , to start the voting.
            </div>
          )}
          <button
            className="box btn-purple my-2"
            onClick={() => setShowConfirmation(true)}
          >
            Leave Poll
          </button>
          <ConfirmationDialog
            message="You'll be kicked out of the poll"
            showDialog={showConfirmation}
            onCancel={() => setShowConfirmation(false)}
            onConfirm={() => actions.startOver()}
          />
        </div>
      </div>
      <ParticipantList
        isOpen={isParticipantListOpen}
        onClose={() => setIsParticipantListOpen(false)}
        participants={currentState.poll?.participants}
        onRemoveParticipant={confirmRemoveParticipant}
        isAdmin={currentState.isAdmin || false}
        userID={currentState.me?.id}
      />

      <ConfirmationDialog
        showDialog={isConfirmationOpen}
        message={confirmationMessage}
        onConfirm={() => submitRemoveParticipant()}
        onCancel={() => setIsConfirmationOpen(false)}
      />
    </>
  );
};
