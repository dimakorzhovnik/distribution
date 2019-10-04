/** ******************************************************************************
 *  (c) 2019 ZondaX GmbH
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ******************************************************************************* */

const DEFAULT_DENOM = "cyb";
const DEFAULT_GAS = 200000;
const DEFAULT_GAS_PRICE = 0.025;
const DEFAULT_MEMO = '';

function canonicalizeJson(jsonTx) {
  if (Array.isArray(jsonTx)) {
    return jsonTx.map(canonicalizeJson);
  }
  if (typeof jsonTx !== 'object') {
    return jsonTx;
  }
  const tmp = {};
  Object.keys(jsonTx)
    .sort()
    .forEach(key => {
      // eslint-disable-next-line no-unused-expressions
      jsonTx[key] != null && (tmp[key] = jsonTx[key]);
    });

  return tmp;
}

function getBytesToSign(tx, txContext) {
  if (typeof txContext === 'undefined') {
    throw new Error('txContext is not defined');
  }
  if (typeof txContext.chainId === 'undefined') {
    throw new Error('txContext does not contain the chainId');
  }
  if (typeof txContext.accountNumber === 'undefined') {
    throw new Error('txContext does not contain the accountNumber');
  }
  if (typeof txContext.sequence === 'undefined') {
    throw new Error('txContext does not contain the sequence value');
  }

  const txFieldsToSign = {
    account_number: txContext.accountNumber.toString(),
    chain_id: txContext.chainId,
    fee: tx.value.fee,
    memo: tx.value.memo,
    msgs: tx.value.msg,
    sequence: txContext.sequence.toString()
  };

  return JSON.stringify(canonicalizeJson(txFieldsToSign));
}

function applyGas(unsignedTx, gas) {
  if (typeof unsignedTx === 'undefined') {
    throw new Error('undefined unsignedTx');
  }
  if (typeof gas === 'undefined') {
    throw new Error('undefined gas');
  }

  // eslint-disable-next-line no-param-reassign
  unsignedTx.value.fee = {
    // amount: [{
    //     amount: (gas * DEFAULT_GAS_PRICE).toString(),
    //     denom: DEFAULT_DENOM,
    // }],
    amount: [],
    gas: gas.toString()
  };

  return unsignedTx;
}

// Creates a new tx skeleton
function createSkeleton(txContext) {
  if (typeof txContext === 'undefined') {
    throw new Error('undefined txContext');
  }
  if (typeof txContext.accountNumber === 'undefined') {
    throw new Error('txContext does not contain the accountNumber');
  }
  if (typeof txContext.sequence === 'undefined') {
    throw new Error('txContext does not contain the sequence value');
  }
  const txSkeleton = {
    type: 'auth/StdTx',
    value: {
      msg: [], // messages
      fee: '',
      memo: DEFAULT_MEMO,
      signatures: [
        {
          signature: 'N/A',
          account_number: txContext.accountNumber.toString(),
          sequence: txContext.sequence.toString(),
          pub_key: {
            type: 'tendermint/PubKeySecp256k1',
            value: 'PK'
          }
        }
      ]
    }
  };
  return applyGas(txSkeleton, DEFAULT_GAS);
}

function applySignature(unsignedTx, txContext, secp256k1Sig) {
  if (typeof unsignedTx === 'undefined') {
    throw new Error('undefined unsignedTx');
  }
  if (typeof txContext === 'undefined') {
    throw new Error('undefined txContext');
  }
  if (typeof txContext.pk === 'undefined') {
    throw new Error('txContext does not contain the public key (pk)');
  }
  if (typeof txContext.accountNumber === 'undefined') {
    throw new Error('txContext does not contain the accountNumber');
  }
  if (typeof txContext.sequence === 'undefined') {
    throw new Error('txContext does not contain the sequence value');
  }

  const tmpCopy = Object.assign({}, unsignedTx, {});

  tmpCopy.value.signatures = [
    {
      signature: secp256k1Sig.toString('base64'),
      account_number: txContext.accountNumber.toString(),
      sequence: txContext.sequence.toString(),
      pub_key: {
        type: 'tendermint/PubKeySecp256k1',
        value: Buffer.from(txContext.pk, 'hex').toString('base64')
      }
    }
  ];
  return tmpCopy;
}

// Creates a new delegation tx based on the input parameters
// the function expects a complete txContext
function createDelegate(txContext, validatorBech32, uatomAmount, memo) {
  const txSkeleton = createSkeleton(txContext);

  const txMsg = {
    type: 'cosmos-sdk/MsgDelegate',
    value: {
      amount: {
        amount: uatomAmount.toString(),
        denom: DEFAULT_DENOM
      },
      delegator_address: txContext.bech32,
      validator_address: validatorBech32
    }
  };

  txSkeleton.value.msg = [txMsg];
  txSkeleton.value.memo = memo || '';

  return txSkeleton;
}

function createSend(txContext, validatorBech32, uatomAmount, memo) {
  const txSkeleton = createSkeleton(txContext);

  const txMsg = {
    type: 'cosmos-sdk/MsgSend',
    value: {
      amount: {
        amount: uatomAmount.toString(),
        denom: DEFAULT_DENOM
      },
      delegator_address: txContext.bech32,
      validator_address: validatorBech32
    }
  };

  txSkeleton.value.msg = [txMsg];
  txSkeleton.value.memo = memo || '';

  return txSkeleton;
}

// Creates a new undelegation tx based on the input parameters
// the function expects a complete txContext
function createUndelegate(txContext, validatorBech32, uatomAmount, memo) {
  const txSkeleton = createSkeleton(txContext);

  const txMsg = {
    type: 'cosmos-sdk/MsgUndelegate',
    value: {
      amount: {
        amount: uatomAmount.toString(),
        denom: DEFAULT_DENOM
      },
      delegator_address: txContext.bech32,
      validator_address: validatorBech32
    }
  };

  txSkeleton.value.msg = [txMsg];
  txSkeleton.value.memo = memo || '';

  return txSkeleton;
}

// Creates a new redelegation tx based on the input parameters
// the function expects a complete txContext
function createRedelegate(
  txContext,
  validatorSourceBech32,
  validatorDestBech32,
  uatomAmount,
  memo
) {
  const txSkeleton = createSkeleton(txContext);

  const txMsg = {
    type: 'cosmos-sdk/MsgBeginRedelegate',
    value: {
      amount: {
        amount: uatomAmount.toString(),
        denom: DEFAULT_DENOM
      },
      delegator_address: txContext.bech32,
      validator_dst_address: validatorDestBech32,
      validator_src_address: validatorSourceBech32
    }
  };

  txSkeleton.value.msg = [txMsg];
  txSkeleton.value.memo = memo || '';

  return txSkeleton;
}

export default {
  DEFAULT_DENOM,
  createSkeleton,
  createDelegate,
  createRedelegate,
  createUndelegate,
  getBytesToSign,
  applySignature,
  createSend
};
