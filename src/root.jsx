import React, { useReducer } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { DefaultBundle, PolywrapClient } from '@polywrap/client-js';
import { PolywrapProvider, usePolywrapClient } from '@polywrap/react';
import { PolywrapClientConfigBuilder } from '@polywrap/client-config-builder-js';
import CopyIcon from './copy.svg';
import {
  wrapperURI,
  addressAlice,
  pkAlice,
  addressBob,
  pkBob,
  addressTony,
  pkTony,
  addressArcoiris,
  addressQuizMC,
  addressToken,
  addressProportional,
} from './constants.js';
import styles from './root.module.css';

export function Root() {
  const defaultConfig = DefaultBundle.getConfig();

  return (
    <Router>
      <PolywrapProvider {...defaultConfig}>
        <Routes>
          <Route index element={<Page />} />
        </Routes>
      </PolywrapProvider>
    </Router>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'started': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'finished': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'connected': {
      return {
        ...state,
        hasConnected: true,
        // provider: action.provider,
        // signer: action.signer,
        // token: action.token,
        // arcoiris: action.arcoiris,
        // quizMC: action.quizMC,
        client: action.clientPoller,
        alice: {
          ...state.alice,
          // signer: action.signerAlice,
          balance: action.balanceAlice,
          client: action.clientAlice,
        },
        bob: {
          ...state.bob,
          // signer: action.signerBob,
          balance: action.balanceBob,
          client: action.clientBob,
        },
        tony: {
          ...state.tony,
          // signer: action.signerTony,
          balance: action.balanceTony,
          client: action.clientTony,
        },
      };
    }
    case 'generated_quiz': {
      return {
        ...state,
        gatheringID: action.gatheringID,
        ceremonyID: action.ceremonyID,
        quizID: action.quizID,
        quiz: action.quiz,
      };
    }
    case 'contributed_alice': {
      return {
        ...state,
        alice: {
          ...state.alice,
          balance: action.balanceAlice,
          contribution: 1,
        },
      };
    }
    case 'contributed_bob': {
      return {
        ...state,
        bob: {
          ...state.bob,
          balance: action.balanceBob,
          contribution: 1,
        },
      };
    }
    case 'contributed_tony': {
      return {
        ...state,
        tony: {
          ...state.tony,
          balance: action.balanceTony,
          contribution: 1,
        },
      };
    }
    case 'committed_correct': {
      return {
        ...state,
        correct: {
          ...state.correct,
          salt: action.salt,
          saltHash: action.saltHash,
          guesses: action.guesses,
          hashes: action.hashes,
          hasCommitted: true,
        },
      };
    }
    case 'ended_quiz': {
      return {
        ...state,
        hasEndedQuiz: true,
      };
    }
    case 'guessed_alice': {
      return {
        ...state,
        alice: {
          ...state.alice,
          guess: {
            ...state.alice.guess,
            [action.key]: action.value,
          },
        },
      };
    }
    case 'guessed_bob': {
      return {
        ...state,
        bob: {
          ...state.bob,
          guess: {
            ...state.bob.guess,
            [action.key]: action.value,
          },
        },
      };
    }
    case 'guessed_tony': {
      return {
        ...state,
        tony: {
          ...state.tony,
          guess: {
            ...state.tony.guess,
            [action.key]: action.value,
          },
        },
      };
    }
    case 'committed_alice': {
      return {
        ...state,
        alice: {
          ...state.alice,
          salt: action.salt,
          saltHash: action.saltHash,
          guesses: action.guesses,
          hashes: action.hashes,
          hasCommitted: true,
        },
      };
    }
    case 'committed_bob': {
      return {
        ...state,
        bob: {
          ...state.bob,
          salt: action.salt,
          saltHash: action.saltHash,
          guesses: action.guesses,
          hashes: action.hashes,
          hasCommitted: true,
        },
      };
    }
    case 'committed_tony': {
      return {
        ...state,
        tony: {
          ...state.tony,
          salt: action.salt,
          saltHash: action.saltHash,
          guesses: action.guesses,
          hashes: action.hashes,
          hasCommitted: true,
        },
      };
    }
    case 'revealed_correct': {
      return {
        ...state,
        correct: {
          ...state.correct,
          hasRevealed: true,
        },
      };
    }
    case 'revealed_alice': {
      return {
        ...state,
        alice: {
          ...state.alice,
          hasRevealed: true,
        },
      };
    }
    case 'revealed_bob': {
      return {
        ...state,
        bob: {
          ...state.bob,
          hasRevealed: true,
        },
      };
    }
    case 'revealed_tony': {
      return {
        ...state,
        tony: {
          ...state.tony,
          hasRevealed: true,
        },
      };
    }
    case 'redistributed': {
      return {
        ...state,
        hasRedistributed: true,
        alice: {
          ...state.alice,
          balance: action.balanceAlice,
        },
        bob: {
          ...state.bob,
          balance: action.balanceBob,
        },
        tony: {
          ...state.tony,
          balance: action.balanceTony,
        },
      };
    }
    case 'verified_correct': {
      return {
        ...state,
        correct: {
          ...state.correct,
          isVerified: {
            ...state.correct.isVerified,
            [action.key]: action.isVerified,
          },
        },
      };
    }
    case 'verified_alice': {
      return {
        ...state,
        alice: {
          ...state.alice,
          isVerified: {
            ...state.alice.isVerified,
            [action.key]: action.isVerified,
          },
        },
      };
    }
    case 'verified_bob': {
      return {
        ...state,
        bob: {
          ...state.bob,
          isVerified: {
            ...state.bob.isVerified,
            [action.key]: action.isVerified,
          },
        },
      };
    }
    case 'verified_tony': {
      return {
        ...state,
        tony: {
          ...state.tony,
          isVerified: {
            ...state.tony.isVerified,
            [action.key]: action.isVerified,
          },
        },
      };
    }
  }
  throw Error(`Unknown action: ${action.type}`);
}

const initialState = {
  isLoading: false,
  hasConnected: false,
  // provider: undefined,
  // signer: undefined,
  uri: wrapperURI,
  client: undefined,
  quiz: undefined,
  gatheringID: undefined,
  ceremonyID: undefined,
  quizID: undefined,
  hasEndedQuiz: false,
  hasRedistributed: false,
  correct: {
    guess: {
      0: 'banana',
      1: 'knife',
    },
    salt: undefined,
    saltHash: undefined,
    hashes: undefined,
    hasCommitted: false,
    hasRevealed: false,
    isVerified: {
      guess: undefined,
      salt: undefined,
    },
  },
  alice: {
    // signer: undefined,
    client: undefined,
    balance: undefined,
    contribution: 0,
    guess: {
      0: 'no guess',
      1: 'no guess',
    },
    salt: undefined,
    saltHash: undefined,
    hashes: undefined,
    hasCommitted: false,
    hasRevealed: false,
    isVerified: {
      guess: undefined,
      salt: undefined,
    },
  },
  bob: {
    // signer: undefined,
    client: undefined,
    balance: undefined,
    contribution: 0,
    guess: {
      0: 'no guess',
      1: 'no guess',
    },
    salt: undefined,
    saltHash: undefined,
    hashes: undefined,
    hasCommitted: false,
    hasRevealed: false,
    isVerified: {
      guess: undefined,
      salt: undefined,
    },
  },
  tony: {
    // signer: undefined,
    client: undefined,
    balance: undefined,
    contribution: 0,
    guess: {
      0: 'no guess',
      1: 'no guess',
    },
    salt: undefined,
    saltHash: undefined,
    hashes: undefined,
    hasCommitted: false,
    hasRevealed: false,
    isVerified: {
      guess: undefined,
      salt: undefined,
    },
  },
};

function Page() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function connectWallet() {
    dispatch({ type: 'started' });

    const clientPoller = usePolywrapClient();

    // TODO: figure out how to connect config to alice wallet
    const clientAlice = new PolywrapClient(
      new PolywrapClientConfigBuilder().addDefaults().build(),
    );

    const clientBob = new PolywrapClient(
      new PolywrapClientConfigBuilder().addDefaults().build(),
    );

    const clientTony = new PolywrapClient(
      new PolywrapClientConfigBuilder().addDefaults().build(),
    );

    // const provider = new ethers.BrowserProvider(window.ethereum);

    // const signer = await provider.getSigner();

    // const token = new ethers.Contract(addressToken, artifactToken.abi, signer);

    // const arcoiris = new ethers.Contract(addressArcoiris, artifactArcoiris.abi, signer);

    // const quizMC = new ethers.Contract(addressQuizMC, artifactQuizMC.abi, signer);

    // const signerAlice = new ethers.Wallet(pkAlice, provider);

    // const signerBob = new ethers.Wallet(pkBob, provider);

    // const signerTony = new ethers.Wallet(pkTony, provider);

    // const balanceAlice = await token.balanceOf(addressAlice);

    // const balanceBob = await token.balanceOf(addressBob);

    // const balanceTony = await token.balanceOf(addressTony);

    const { uri } = state;

    const { value: balanceAlice } = await clientAlice.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressAlice,
      },
    });

    const { value: balanceBob } = await clientBob.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressBob,
      },
    });

    const { value: balanceTony } = await clientTony.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressTony,
      },
    });

    dispatch({
      type: 'connected',
      // provider,
      // signer,
      // arcoiris,
      // token,
      // quizMC,
      // signerAlice,
      // signerBob,
      // signerTony,
      balanceAlice,
      balanceBob,
      balanceTony,
      clientPoller,
      clientAlice,
      clientBob,
      clientTony,
    });

    dispatch({ type: 'finished' });
  }

  async function generateQuiz() {
    dispatch({ type: 'started' });

    const { uri, clientPoller } = state;

    const { value: gatheringID } = await clientPoller.invoke({
      uri,
      method: 'createGathering',
      args: {
        arcoiris: addressArcoiris,
        collection: addressToken,
        redistribution: addressProportional,
        mc: addressQuizMC,
        isMutable: false,
      },
    });

    // const txGathering = await state.arcoiris.createGathering(
    //   state.token.target,
    //   addressProportional,
    //   state.quizMC.target,
    //   false,
    // );

    // const receiptGathering = await txGathering.wait();

    // const gatheringID = BigInt(receiptGathering.logs[0].topics[1]);

    const {
      value: { quizID, ceremonyID },
    } = await clientPoller.invoke({
      uri,
      method: 'createQuiz',
      args: { quizMC: addressQuizMC, gatheringID },
    });

    // const txQuiz = await state.quizMC.createQuiz(gatheringID);

    // const receiptQuiz = await txQuiz.wait();

    // console.log(receiptQuiz.logs);

    // const quizID = BigInt(receiptQuiz.logs[1].topics[1]);

    // const ceremonyID = BigInt(receiptQuiz.logs[1].topics[3]);

    dispatch({
      type: 'generated_quiz',
      gatheringID,
      ceremonyID,
      quizID,
      quiz: {
        tomato: window.crypto.randomUUID(),
        banana: window.crypto.randomUUID(),
        potato: window.crypto.randomUUID(),
        knife: window.crypto.randomUUID(),
        pillow: window.crypto.randomUUID(),
        finger: window.crypto.randomUUID(),
      },
    });

    dispatch({ type: 'finished' });
  }

  async function contributeAlice() {
    dispatch({ type: 'started' });

    const {
      uri, clientAlice, gatheringID, ceremonyID,
    } = state;

    // const tokenAlice = await state.token.tokenOfOwnerByIndex(addressAlice, 0);

    const { value: tokenAlice } = await clientAlice.invoke({
      uri,
      method: 'tokenOfOwnerByIndex',
      args: {
        address: addressAlice,
        index: 0,
      },
    });

    await clientAlice.invoke({
      uri,
      method: 'contribute',
      args: {
        arcoiris: addressArcoiris,
        gatheringID,
        ceremonyID,
        token: addressToken,
        tokenID: tokenAlice,
      },
    });

    // const tx = await state.arcoiris.connect(state.alice.signer).contribute(
    //   state.gatheringID,
    //   state.ceremonyID,
    //   state.token.target,
    //   tokenAlice,
    // );

    // await tx.wait();

    const { value: balanceAlice } = await clientAlice.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressAlice,
      },
    });

    // const balanceAlice = await state.token.balanceOf(addressAlice);

    dispatch({
      type: 'contributed_alice',
      balanceAlice,
    });

    dispatch({ type: 'finished' });
  }

  async function contributeBob() {
    dispatch({ type: 'started' });

    const {
      uri, clientBob, gatheringID, ceremonyID,
    } = state;

    // const tokenBob = await state.token.tokenOfOwnerByIndex(addressBob, 0);

    const { value: tokenBob } = await clientBob.invoke({
      uri,
      method: 'tokenOfOwnerByIndex',
      args: {
        address: addressBob,
        index: 0,
      },
    });

    await clientBob.invoke({
      uri,
      method: 'contribute',
      args: {
        arcoiris: addressArcoiris,
        gatheringID,
        ceremonyID,
        token: addressToken,
        tokenID: tokenBob,
      },
    });

    // const tx = await state.arcoiris.connect(state.bob.signer).contribute(
    //   state.gatheringID,
    //   state.ceremonyID,
    //   state.token.target,
    //   tokenBob,
    // );

    // await tx.wait();

    const { value: balanceBob } = await clientBob.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressBob,
      },
    });

    // const balanceBob = await state.token.balanceOf(addressBob);

    dispatch({
      type: 'contributed_bob',
      balanceBob,
    });

    dispatch({ type: 'finished' });
  }

  async function contributeTony() {
    dispatch({ type: 'started' });

    const {
      uri, clientTony, gatheringID, ceremonyID,
    } = state;

    // const tokenTony = await state.token.tokenOfOwnerByIndex(addressTony, 0);

    const { value: tokenTony } = await clientTony.invoke({
      uri,
      method: 'tokenOfOwnerByIndex',
      args: {
        address: addressTony,
        index: 0,
      },
    });

    await clientTony.invoke({
      uri,
      method: 'contribute',
      args: {
        arcoiris: addressArcoiris,
        gatheringID,
        ceremonyID,
        token: addressToken,
        tokenID: tokenTony,
      },
    });

    // const tx = await state.arcoiris.connect(state.tony.signer).contribute(
    //   state.gatheringID,
    //   state.ceremonyID,
    //   state.token.target,
    //   tokenTony,
    // );

    // await tx.wait();

    const { value: balanceTony } = await clientTony.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressTony,
      },
    });

    // const balanceTony = await state.token.balanceOf(addressTony);

    dispatch({
      type: 'contributed_tony',
      balanceTony,
    });

    dispatch({ type: 'finished' });
  }

  // function commit(answers) {
  //   const salt = ethers.id(window.crypto.randomUUID());

  //   const saltHash = ethers.keccak256(salt);

  //   const hashes = answers
  //     .map((answer) => ethers.toUtf8Bytes(state.quiz[answer]))
  //     .map((uuid) => ethers.concat([uuid, salt]))
  //     .map((guess) => ethers.keccak256(guess));

  //   return [salt, saltHash, hashes];
  // }

  async function commitCorrect() {
    dispatch({ type: 'started' });

    const {
      uri, clientPoller, quizID,
    } = state;

    const salt = window.crypto.randomUUID();

    const guesses = [state.correct.guess[0], state.correct.guess[1]];

    const { value: { saltHash, hashes } } = await clientPoller.invoke({
      uri,
      method: 'commitCorrect',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const [salt, saltHash, hashes] = commit(guesses);

    // console.log(hashes);

    // const tx = await state.quizMC.commitCorrect(state.quizID, saltHash, hashes);

    // await tx.wait();

    dispatch({
      type: 'committed_correct',
      salt,
      saltHash,
      guesses,
      hashes,
    });

    dispatch({ type: 'finished' });
  }

  function guess0Alice({ target: { value } }) {
    dispatch({ type: 'guessed_alice', key: 0, value });
  }

  function guess0Bob({ target: { value } }) {
    dispatch({ type: 'guessed_bob', key: 0, value });
  }

  function guess0Tony({ target: { value } }) {
    dispatch({ type: 'guessed_tony', key: 0, value });
  }

  function guess1Alice({ target: { value } }) {
    dispatch({ type: 'guessed_alice', key: 1, value });
  }

  function guess1Bob({ target: { value } }) {
    dispatch({ type: 'guessed_bob', key: 1, value });
  }

  function guess1Tony({ target: { value } }) {
    dispatch({ type: 'guessed_tony', key: 1, value });
  }

  async function commitAlice() {
    dispatch({ type: 'started' });

    const {
      uri, clientAlice, quizID,
    } = state;

    const guesses = [state.alice.guess[0], state.alice.guess[1]];

    const salt = window.crypto.randomUUID();

    const { value: { saltHash, hashes } } = await clientAlice.invoke({
      uri,
      method: 'commitGuess',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const [salt, saltHash, hashes] = commit(guesses);

    // const tx = await state.quizMC
    //   .connect(state.alice.signer)
    //   .commitGuess(state.quizID, saltHash, hashes);

    // await tx.wait();

    dispatch({
      type: 'committed_alice',
      salt,
      saltHash,
      guesses,
      hashes,
    });

    dispatch({ type: 'finished' });
  }

  async function commitBob() {
    dispatch({ type: 'started' });

    const {
      uri, clientBob, quizID,
    } = state;

    const guesses = [state.bob.guess[0], state.bob.guess[1]];

    const salt = window.crypto.randomUUID();

    const { value: { saltHash, hashes } } = await clientBob.invoke({
      uri,
      method: 'commitGuess',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const [salt, saltHash, hashes] = commit(guesses);

    // const tx = await state.quizMC
    //   .connect(state.bob.signer)
    //   .commitGuess(state.quizID, saltHash, hashes);

    // await tx.wait();

    dispatch({
      type: 'committed_bob',
      salt,
      saltHash,
      guesses,
      hashes,
    });

    dispatch({ type: 'finished' });
  }

  async function commitTony() {
    dispatch({ type: 'started' });

    const {
      uri, clientTony, quizID,
    } = state;

    const guesses = [state.tony.guess[0], state.tony.guess[1]];

    const salt = window.crypto.randomUUID();

    const { value: { saltHash, hashes } } = await clientTony.invoke({
      uri,
      method: 'commitGuess',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const [salt, saltHash, hashes] = commit(guesses);

    // const tx = await state.quizMC
    //   .connect(state.tony.signer)
    //   .commitGuess(state.quizID, saltHash, hashes);

    // await tx.wait();

    dispatch({
      type: 'committed_tony',
      salt,
      saltHash,
      guesses,
      hashes,
    });

    dispatch({ type: 'finished' });
  }

  async function endQuiz() {
    dispatch({ type: 'started' });

    const {
      uri, clientPoller, quizID,
    } = state;

    await clientPoller.invoke({
      uri,
      method: 'endQuiz',
      args: {
        quizMC: addressQuizMC,
        quizID,
      },
    });

    // const tx = await state.quizMC.endQuiz(state.quizID);

    // await tx.wait();

    dispatch({
      type: 'ended_quiz',
    });

    dispatch({ type: 'finished' });
  }

  async function redistribute() {
    dispatch({ type: 'started' });

    const {
      uri, clientPoller, clientAlice, clientBob, clientTony, quizID,
    } = state;

    await clientPoller.invoke({
      uri,
      method: 'redistribute',
      args: {
        quizMC: addressQuizMC,
        quizID,
      },
    });

    // const tx = await state.quizMC.redistribute(state.quizID);

    // await tx.wait();

    const { value: balanceAlice } = await clientAlice.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressAlice,
      },
    });

    const { value: balanceBob } = await clientBob.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressBob,
      },
    });

    const { value: balanceTony } = await clientTony.invoke({
      uri,
      method: 'balanceOf',
      args: {
        address: addressTony,
      },
    });

    // const balanceAlice = await state.token.balanceOf(addressAlice);

    // const balanceBob = await state.token.balanceOf(addressBob);

    // const balanceTony = await state.token.balanceOf(addressTony);

    dispatch({
      type: 'redistributed',
      balanceAlice,
      balanceBob,
      balanceTony,
    });

    dispatch({ type: 'finished' });
  }

  async function revealCorrect() {
    dispatch({ type: 'started' });

    const {
      uri, clientPoller, quizID, correct: { salt, guess },
    } = state;

    const guesses = [guess[0], guess[1]];

    await clientPoller.invoke({
      uri,
      method: 'revealCorrect',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const guesses = state.correct.guesses.map(
    //   (answer) => ethers.toUtf8Bytes(state.quiz[answer])
    // );

    // const tx = await state.quizMC.revealCorrect(
    //   state.quizID,
    //   state.correct.salt,
    //   guesses,
    // );

    // await tx.wait();

    dispatch({
      type: 'revealed_correct',
    });

    dispatch({ type: 'finished' });
  }

  async function revealAlice() {
    dispatch({ type: 'started' });

    const {
      uri, clientAlice, quizID, alice: { salt, guess },
    } = state;

    const guesses = [guess[0], guess[1]];

    await clientAlice.invoke({
      uri,
      method: 'revealCorrect',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const guesses = state.alice.guesses.map(
    //   (answer) => ethers.toUtf8Bytes(state.quiz[answer])
    // );

    // const tx = await state.quizMC.connect(state.alice.signer).revealGuess(
    //   state.quizID,
    //   state.alice.salt,
    //   guesses,
    // );

    // await tx.wait();

    dispatch({
      type: 'revealed_alice',
    });

    dispatch({ type: 'finished' });
  }

  async function revealBob() {
    dispatch({ type: 'started' });

    const {
      uri, clientBob, quizID, bob: { salt, guess },
    } = state;

    const guesses = [guess[0], guess[1]];

    await clientBob.invoke({
      uri,
      method: 'revealCorrect',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const guesses = state.bob.guesses.map(
    //   (answer) => ethers.toUtf8Bytes(state.quiz[answer])
    // );

    // const tx = await state.quizMC.connect(state.bob.signer).revealGuess(
    //   state.quizID,
    //   state.bob.salt,
    //   guesses,
    // );

    // await tx.wait();

    dispatch({
      type: 'revealed_bob',
    });

    dispatch({ type: 'finished' });
  }

  async function revealTony() {
    dispatch({ type: 'started' });

    const {
      uri, clientTony, quizID, tony: { salt, guess },
    } = state;

    const guesses = [guess[0], guess[1]];

    await clientTony.invoke({
      uri,
      method: 'revealCorrect',
      args: {
        quizMC: addressQuizMC,
        quizID,
        salt,
        guesses,
      },
    });

    // const guesses = state.tony.guesses.map(
    //   (answer) => ethers.toUtf8Bytes(state.quiz[answer])
    // );

    // const tx = await state.quizMC.connect(state.tony.signer).revealGuess(
    //   state.quizID,
    //   state.tony.salt,
    //   guesses,
    // );

    // await tx.wait();

    dispatch({
      type: 'revealed_tony',
    });

    dispatch({ type: 'finished' });
  }

  async function verifySalt(salt, saltHash) {
    const {
      uri, clientPoller,
    } = state;

    const { value: hash } = await clientPoller.invoke({
      uri,
      method: 'id',
      args: {
        value: salt,
      },
    });

    return saltHash === hash;
    // return saltHash === ethers.keccak256(salt);
  }

  async function verifySaltCorrect() {
    dispatch({ type: 'started' });

    const {
      uri, clientPoller, quizID,
    } = state;

    const { value: saltHash } = await clientPoller.invoke({
      uri,
      method: 'getSaltHash',
      args: {
        quizMC: addressQuizMC,
        quizID,
        address: addressQuizMC,
      },
    });

    // const saltHash = await state.quizMC.getSaltHash(state.quizID, state.quizMC.target);

    const isVerified = await verifySalt(state.correct.salt, saltHash);

    dispatch({ type: 'verified_correct', key: 'salt', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifySaltAlice() {
    dispatch({ type: 'started' });

    const {
      uri, clientAlice, quizID,
    } = state;

    const { value: saltHash } = await clientAlice.invoke({
      uri,
      method: 'getSaltHash',
      args: {
        quizMC: addressQuizMC,
        quizID,
        address: addressAlice,
      },
    });

    // const saltHash = await state.quizMC.getSaltHash(state.quizID, addressAlice);

    const isVerified = await verifySalt(state.alice.salt, saltHash);

    dispatch({ type: 'verified_alice', key: 'salt', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifySaltBob() {
    dispatch({ type: 'started' });

    const {
      uri, clientBob, quizID,
    } = state;

    const { value: saltHash } = await clientBob.invoke({
      uri,
      method: 'getSaltHash',
      args: {
        quizMC: addressQuizMC,
        quizID,
        address: addressBob,
      },
    });

    // const saltHash = await state.quizMC.getSaltHash(state.quizID, addressBob);

    const isVerified = await verifySalt(state.bob.salt, saltHash);

    dispatch({ type: 'verified_bob', key: 'salt', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifySaltTony() {
    dispatch({ type: 'started' });

    const {
      uri, clientTony, quizID,
    } = state;

    const { value: saltHash } = await clientTony.invoke({
      uri,
      method: 'getSaltHash',
      args: {
        quizMC: addressQuizMC,
        quizID,
        address: addressTony,
      },
    });

    // const saltHash = await state.quizMC.getSaltHash(state.quizID, addressTony);

    const isVerified = await verifySalt(state.tony.salt, saltHash);

    dispatch({ type: 'verified_tony', key: 'salt', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifyGuess(address, answers) {
    const {
      uri, clientPoller, quizID,
    } = state;

    const { value: committed } = await clientPoller.invoke({
      uri,
      method: 'getHashes',
      args: {
        quizMC: addressQuizMC,
        quizID,
        address,
      },
    });

    const { value: salt } = await clientPoller.invoke({
      uri,
      method: 'getSalt',
      args: {
        quizMC: addressQuizMC,
        quizID,
        address,
      },
    });

    const revealed = Promise.all(answers.map(
      async (answer) => {
        const { value: salted } = await clientPoller.invoke({
          uri,
          method: 'saltValue',
          args: {
            value: answer,
            ssalt: salt,
          },
        });

        const { value: hash } = await clientPoller.invoke({
          uri,
          method: 'id',
          args: {
            value: salted,
          },
        });

        return hash;
      },
    ));

    // const committed = await state.quizMC.getHashes(state.quizID, address);

    // const salt = await state.quizMC.getSalt(state.quizID, address);

    // const revealed = answers
    //   .map((answer) => ethers.toUtf8Bytes(state.quiz[answer]))
    //   .map((uuid) => ethers.concat([uuid, salt]))
    //   .map((guess) => ethers.keccak256(guess));

    // console.log(committed, revealed);

    return revealed.every((element, index) => element === committed[index]);
  }

  async function verifyGuessCorrect() {
    dispatch({ type: 'started' });

    const answers = [state.correct.guess[0], state.correct.guess[1]];

    // check that guesses match hashes
    const isVerified = await verifyGuess(addressQuizMC, answers);

    dispatch({ type: 'verified_correct', key: 'guess', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifyGuessAlice() {
    dispatch({ type: 'started' });

    const answers = [state.alice.guess[0], state.alice.guess[1]];

    const isVerified = await verifyGuess(addressAlice, answers);

    dispatch({ type: 'verified_alice', key: 'guess', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifyGuessBob() {
    dispatch({ type: 'started' });

    const answers = [state.bob.guess[0], state.bob.guess[1]];

    const isVerified = await verifyGuess(addressBob, answers);

    dispatch({ type: 'verified_bob', key: 'guess', isVerified });

    dispatch({ type: 'finished' });
  }

  async function verifyGuessTony() {
    dispatch({ type: 'started' });

    const answers = [state.tony.guess[0], state.tony.guess[1]];

    const isVerified = await verifyGuess(addressTony, answers);

    dispatch({ type: 'verified_tony', key: 'guess', isVerified });

    dispatch({ type: 'finished' });
  }

  return (
    <main className={styles.main}>
      {!state.hasConnected ? (
        <button type="button" onClick={connectWallet}>connect wallet</button>
      ) : (
        `moderator address: ${state.signer.address}`
      )}

      <br />

      {state.hasConnected && !state.quiz && (
      <button type="button" onClick={generateQuiz}>generate quiz</button>
      )}

      {state.gatheringID !== undefined && (
      <div>{`club ID: ${state.gatheringID}`}</div>
      )}

      {state.ceremonyID !== undefined && (
      <div>{`game ID: ${state.ceremonyID}`}</div>
      )}

      {state.quizID !== undefined && (
      <div>{`quiz ID: ${state.quizID}`}</div>
      )}

      {state.quiz && (
      <div>quiz generated</div>
      )}

      {state.quiz
         && state.alice.contribution === 1
         && state.bob.contribution === 1
         && state.tony.contribution === 1
         && !state.correct.hasCommitted && (
         <div>
           <button type="button" onClick={commitCorrect}>commit to correct answers</button>
         </div>
      )}

      {state.correct.saltHash && (
      <div>
        <span>
          salt hash:
          {state.correct.saltHash}
        </span>
        <Copy text={state.correct.saltHash} />
      </div>
      )}

      {state.correct.hashes && (
      <div>
        <div>
          first:
          {state.correct.hashes[0]}
        </div>
        <div>
          second:
          {state.correct.hashes[1]}
        </div>
      </div>
      )}

      {state.correct.hasCommitted && (
      <div>committed</div>
      )}

      {state.quiz
         && state.correct.hasCommitted
         && state.alice.hasCommitted
         && state.bob.hasCommitted
         && state.tony.hasCommitted
         && !state.hasEndedQuiz && (
         <button type="button" onClick={endQuiz}>end quiz</button>
      )}

      {state.hasEndedQuiz && !state.correct.hasRevealed && (
      <button type="button" onClick={revealCorrect}>reveal correct answer and salt</button>
      )}

      {state.correct.salt && state.correct.hasRevealed && (
      <div>
        <span>
          salt:
          {state.correct.salt}
        </span>
        <Copy text={state.correct.salt} />
        {state.correct.isVerified.salt === undefined && (
        <button type="button" onClick={verifySaltCorrect}>verify</button>
        )}
        {state.correct.isVerified.salt === true && (
        <div>✅️</div>
        )}
        {state.correct.isVerified.salt === false && (
        <div>❌️</div>
        )}
      </div>
      )}

      {state.correct.hasRevealed && (
      <div>
        <div>
          <span>
            first answer hash:
            {state.correct.guess[0].substring(0, 5)}
            ...
          </span>
          <Copy text={state.correct.guess[0]} />
        </div>
        <div>
          <span>
            second answer hash:
            {state.correct.guess[1].substring(0, 5)}
            ...
          </span>
          <Copy text={state.correct.guess[1]} />
        </div>
        {state.correct.isVerified.guess === undefined && (
        <button type="button" onClick={verifyGuessCorrect}>verify</button>
        )}
        {state.correct.isVerified.guess === true && (
        <div>✅️</div>
        )}
        {state.correct.isVerified.guess === false && (
        <div>❌️</div>
        )}
      </div>
      )}

      {state.correct.hasRevealed
         && state.alice.hasRevealed
         && state.bob.hasRevealed
         && state.tony.hasRevealed
         && !state.hasRedistributed && (
         <button type="button" onClick={redistribute}>redistribute</button>
      )}

      <br />

      <div>
        <div className={styles.cards}>
          <div className={styles.options}>
            <a href={`https://mumbai.polygonscan.com/address/${addressAlice}#code`}>Alice</a>
            {state.hasConnected && <div>{`balance: ${state.alice.balance}`}</div>}

            {state.ceremonyID !== undefined && state.alice.contribution === 0 && (
            <button type="button" onClick={contributeAlice}>contribute</button>
            )}

            {state.alice.contribution === 1 && (
              `contribution: ${state.alice.contribution}`
            )}

            {state.correct.hasCommitted
               && state.alice.contribution === 1
               && !state.alice.hasCommitted && (
               <button type="button" onClick={commitAlice}>commit to answers</button>
            )}

            {state.alice.saltHash && (
            <div>
              <span>
                salt hash of Alice:
                {state.alice.saltHash.substring(0, 5)}
                ...
              </span>
              <Copy text={state.alice.saltHash} />
            </div>
            )}

            {state.alice.hashes && (
            <div>
              <div>
                <span>
                  first answer hash:
                  {state.alice.hashes[0].substring(0, 5)}
                  ...
                </span>
                <Copy text={state.alice.hashes[0]} />
              </div>
              <div>
                <span>
                  second answer hash:
                  {state.alice.hashes[1].substring(0, 5)}
                  ...
                </span>
                <Copy text={state.alice.hashes[1]} />
              </div>
            </div>
            )}

            {state.alice.hasCommitted && (
            <div>committed</div>
            )}

            {state.hasEndedQuiz && !state.alice.hasRevealed && (
            <button type="button" onClick={revealAlice}>reveal salt</button>
            )}

            {state.alice.hasRevealed && (
            <div>
              <span>
                salt of Alice:
                {state.alice.salt.substring(0, 5)}
                ...
              </span>
              <Copy text={state.alice.salt} />
              {state.alice.isVerified.salt === undefined && (
              <button type="button" onClick={verifySaltAlice}>verify</button>
              )}
              {state.alice.isVerified.salt === true && (
              <div>✅️</div>
              )}
              {state.alice.isVerified.salt === false && (
              <div>❌️</div>
              )}
            </div>
            )}
          </div>
          <div className={styles.options}>
            <a href={`https://mumbai.polygonscan.com/address/${addressBob}#code`}>Bob</a>
            {state.hasConnected && <div>{`balance: ${state.bob.balance}`}</div>}

            {state.ceremonyID !== undefined && state.bob.contribution === 0 && (
            <button type="button" onClick={contributeBob}>contribute</button>
            )}

            {state.bob.contribution === 1 && (
              `contribution: ${state.bob.contribution}`
            )}

            {state.correct.hasCommitted
               && state.bob.contribution === 1
               && !state.bob.hasCommitted && (
               <button type="button" onClick={commitBob}>commit to answers</button>
            )}

            {state.bob.saltHash && (
            <div>
              <span>
                salt hash of Bob:
                {state.bob.saltHash.substring(0, 5)}
                ...
              </span>
              <Copy text={state.bob.saltHash} />
            </div>
            )}

            {state.bob.hashes && (
            <div>
              <div>
                <span>
                  first answer hash:
                  {state.bob.hashes[0].substring(0, 5)}
                  ...
                </span>
                <Copy text={state.bob.hashes[0]} />
              </div>
              <div>
                <span>
                  second answer hash:
                  {state.bob.hashes[1].substring(0, 5)}
                  ...
                </span>
                <Copy text={state.bob.hashes[1]} />
              </div>
            </div>
            )}

            {state.bob.hasCommitted && (
            <div>committed</div>
            )}

            {state.hasEndedQuiz && !state.bob.hasRevealed && (
            <button type="button" onClick={revealBob}>reveal salt</button>
            )}

            {state.bob.hasRevealed && (
            <div>
              <span>
                salt of Bob:
                {state.bob.salt.substring(0, 5)}
                ...
              </span>
              <Copy text={state.bob.salt} />
              {state.bob.isVerified.salt === undefined && (
              <button type="button" onClick={verifySaltBob}>verify</button>
              )}
              {state.bob.isVerified.salt === true && (
              <div>✅️</div>
              )}
              {state.bob.isVerified.salt === false && (
              <div>❌️</div>
              )}
            </div>
            )}
          </div>
          <div className={styles.options}>
            <a href={`https://mumbai.polygonscan.com/address/${addressTony}#code`}>Tony</a>
            {state.hasConnected && <div>{`balance: ${state.tony.balance}`}</div>}

            {state.ceremonyID !== undefined && state.tony.contribution === 0 && (
            <button type="button" onClick={contributeTony}>contribute</button>
            )}

            {state.tony.contribution === 1 && (
              `contribution: ${state.tony.contribution}`
            )}

            {state.correct.hasCommitted
               && state.tony.contribution === 1
               && !state.tony.hasCommitted && (
               <button type="button" onClick={commitTony}>commit to answers</button>
            )}

            {state.tony.saltHash && (
            <div>
              <span>
                salt hash of Tony:
                {state.tony.saltHash.substring(0, 5)}
                ...
              </span>
              <Copy text={state.tony.saltHash} />
            </div>
            )}

            {state.tony.hashes && (
            <div>
              <div>
                <span>
                  first answer hash:
                  {state.tony.hashes[0].substring(0, 5)}
                  ...
                </span>
                <Copy text={state.tony.hashes[0]} />
              </div>
              <div>
                <span>
                  second answer hash:
                  {state.tony.hashes[1].substring(0, 5)}
                  ...
                </span>
                <Copy text={state.tony.hashes[1]} />
              </div>
            </div>
            )}

            {state.tony.hasCommitted && (
            <div>committed</div>
            )}

            {state.hasEndedQuiz && !state.tony.hasRevealed && (
            <button type="button" onClick={revealTony}>reveal salt</button>
            )}

            {state.tony.hasRevealed && (
            <div>
              <span>
                salt of Tony:
                {state.tony.salt.substring(0, 5)}
                ...
              </span>
              <Copy text={state.tony.salt} />
              {state.tony.isVerified.salt === undefined && (
              <button type="button" onClick={verifySaltTony}>verify</button>
              )}
              {state.tony.isVerified.salt === true && (
              <div>✅️</div>
              )}
              {state.tony.isVerified.salt === false && (
              <div>❌️</div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>

      <br />

      {state.quiz && state.correct.hasCommitted && (
      <div>
        <div>Question: Yellow long fruit</div>
        <br />
        <div className={styles.cards}>
          <div>
            {state.alice.hasCommitted && (
            <div>
              <div>{state.alice.guess[0]}</div>
            </div>
            )}
            {state.alice.contribution === 1 && !state.alice.hasCommitted && (
            <div className={styles.options}>
              <input type="radio" onChange={guess0Alice} value="tomato" name="alice0" />
              {' '}
              Tomato
              <input type="radio" onChange={guess0Alice} value="banana" name="alice0" />
              {' '}
              Banana
              <input type="radio" onChange={guess0Alice} value="potato" name="alice0" />
              {' '}
              Potato
            </div>
            )}
          </div>
          <div>
            {state.bob.hasCommitted && (
            <div>
              <div>{state.bob.guess[0]}</div>
            </div>
            )}
            {state.bob.contribution === 1 && !state.bob.hasCommitted && (
            <div className={styles.options}>
              <input type="radio" onChange={guess0Bob} value="tomato" name="bob0" />
              {' '}
              Tomato
              <input type="radio" onChange={guess0Bob} value="banana" name="bob0" />
              {' '}
              Banana
              <input type="radio" onChange={guess0Bob} value="potato" name="bob0" />
              {' '}
              Potato
            </div>
            )}
          </div>
          <div>
            {state.tony.hasCommitted && (
            <div>
              <div>{state.tony.guess[0]}</div>
            </div>
            )}
            {state.tony.contribution === 1 && !state.tony.hasCommitted && (
            <div className={styles.options}>
              <input type="radio" onChange={guess0Tony} value="tomato" name="tony0" />
              {' '}
              Tomato
              <input type="radio" onChange={guess0Tony} value="banana" name="tony0" />
              {' '}
              Banana
              <input type="radio" onChange={guess0Tony} value="potato" name="tony0" />
              {' '}
              Potato
            </div>
            )}
          </div>
        </div>

        <br />

        <div>Question: Best tool to cut vegetables</div>
        <br />
        <div className={styles.cards}>
          <div>
            {state.alice.hasCommitted && (
            <div>
              <div>{state.alice.guess[1]}</div>
              {state.hasEndedQuiz
                     && state.alice.hasRevealed
                     && state.alice.isVerified.guess === undefined && (
                     <button type="button" onClick={verifyGuessAlice}>verify</button>
              )}
              {state.alice.isVerified.guess === true && (
              <div>✅️</div>
              )}
              {state.alice.isVerified.guess === false && (
              <div>❌️</div>
              )}
            </div>
            )}
            {state.alice.contribution === 1 && !state.alice.hasCommitted && (
            <div className={styles.options}>
              <input type="radio" onChange={guess1Alice} value="knife" name="alice1" />
              {' '}
              Knife
              <input type="radio" onChange={guess1Alice} value="pillow" name="alice1" />
              {' '}
              Pillow
              <input type="radio" onChange={guess1Alice} value="finger" name="alice1" />
              {' '}
              Finger
            </div>
            )}
          </div>
          <div>
            {state.bob.hasCommitted && (
            <div>
              <div>{state.bob.guess[1]}</div>
              {state.hasEndedQuiz
                     && state.bob.hasRevealed
                     && state.bob.isVerified.guess === undefined && (
                     <button type="button" onClick={verifyGuessBob}>verify</button>
              )}
              {state.bob.isVerified.guess === true && (
              <div>✅️</div>
              )}
              {state.bob.isVerified.guess === false && (
              <div>❌️</div>
              )}
            </div>
            )}
            {state.bob.contribution === 1 && !state.bob.hasCommitted && (
            <div className={styles.options}>
              <input type="radio" onChange={guess1Bob} value="knife" name="bob1" />
              {' '}
              Knife
              <input type="radio" onChange={guess1Bob} value="pillow" name="bob1" />
              {' '}
              Pillow
              <input type="radio" onChange={guess1Bob} value="finger" name="bob1" />
              {' '}
              Finger
            </div>
            )}
          </div>
          <div>
            {state.tony.hasCommitted && (
            <div>
              <div>{state.tony.guess[1]}</div>
              {state.hasEndedQuiz
                     && state.tony.hasRevealed
                     && state.tony.isVerified.guess === undefined && (
                     <button type="button" onClick={verifyGuessTony}>verify</button>
              )}
              {state.tony.isVerified.guess === true && (
              <div>✅️</div>
              )}
              {state.tony.isVerified.guess === false && (
              <div>❌️</div>
              )}
            </div>
            )}
            {state.tony.contribution === 1 && !state.tony.hasCommitted && (
            <div className={styles.options}>
              <input type="radio" onChange={guess1Tony} value="knife" name="tony1" />
              {' '}
              Knife
              <input type="radio" onChange={guess1Tony} value="pillow" name="tony1" />
              {' '}
              Pillow
              <input type="radio" onChange={guess1Tony} value="finger" name="tony1" />
              {' '}
              Finger
            </div>
            )}
          </div>
        </div>
      </div>
      )}

      {state.isLoading ? <LoadingIndicator key={state.isLoading} /> : null}
    </main>
  );
}

function LoadingIndicator() {
  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 16);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="loading">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
      {time > 200 && (
        <div className="time">
          {(time / 1000).toFixed(2)}
          s
        </div>
      )}
    </div>
  );
}

function Copy({ text }) {
  return (
    <button type="button" onClick={() => navigator.clipboard.writeText(text)}>
      <img src={CopyIcon} alt="copy to clipboard" />
    </button>
  );
}
