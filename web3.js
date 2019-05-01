import Web3 from 'web3';
if (typeof window.ethereum == 'undefined') {
  console.error('No Ethereum wallet provider found')
  alert('This application requires MetaMask web extension')
  alert('Please install MetaMask to continue!')
  alert('You can download it from: https://metamask.io/')
}
const web3 =  new Web3(window.web3.currentProvider);

export default web3;
