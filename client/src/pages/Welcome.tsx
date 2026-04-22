import React from 'react';
import { actions, AppPage } from '../state';

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-center my-8 text-4xl">Welcome to EasyVote</h1>
      <p className="text-center mb-12 max-w-sm text-gray-600">
        Make group decisions simple. Create a poll, share the code, and let everyone rank their choices.
      </p>
      <div className="my-4 flex flex-col justify-center">
        <button
          className="box btn-orange my-2 w-64"
          onClick={() => actions.setPage(AppPage.Create)}
        >
          Start a New Poll
        </button>
        <button
          className="box btn-purple my-2 w-64"
          onClick={() => actions.setPage(AppPage.Join)}
        >
          Join with a Code
        </button>
      </div>
    </div>
  );
};

export default Welcome;
