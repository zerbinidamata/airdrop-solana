import  {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const getWalletBalance = async (connection: Connection, publicKey: PublicKey) => {
  try {
    const balance = await connection.getBalance(publicKey);
    console.log(`Wallet ballance is: ${balance}`);
  } catch (error) {
    console.log(error);
  }
}

const airDrop = async (connection: Connection, publicKey: PublicKey) => {
  try {
    const signature = await connection.requestAirdrop(publicKey, 1 * LAMPORTS_PER_SOL);
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature
    });
  }
  catch (error) {
    console.log(error);
  }
}
 
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const wallet =  Keypair.generate();

const { publicKey } = wallet;

const publicKeyObj = new PublicKey(publicKey);

function main() {
  getWalletBalance(connection, publicKeyObj);
  airDrop(connection, publicKeyObj);
  getWalletBalance(connection, publicKeyObj);
}

main();
