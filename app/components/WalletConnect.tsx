'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';

export function WalletConnect() {
  return (
    <div className="flex justify-center">
      <Wallet>
        <ConnectWallet>
          <div className="flex items-center space-x-3 px-4 py-2 bg-surface/60 rounded-xl border border-white/10 hover:bg-surface/80 transition-all duration-200">
            <Avatar className="w-8 h-8" />
            <div className="flex flex-col">
              <Name className="text-sm font-medium text-text-primary" />
              <span className="text-xs text-text-secondary">Connect Wallet</span>
            </div>
          </div>
        </ConnectWallet>
      </Wallet>
    </div>
  );
}
