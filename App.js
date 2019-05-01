import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';


class App extends Component {

    state = {
      manager: '',
      players: '',
      balance: '',
      value:'',
      message: '',
      price: '',
      numerodeboletos:'',
      players_till_game: '',
      winnerLength:'',
      winners:''
      // winners2:'',
      // winners3:'',
      // winners4:'',

    };

    async  componentDidMount() {
        const manager = '0xF8CcedC0F4298BEa79aEa0Fca3178d84C4d48338';
        const players = await lottery.methods.get_players().call();
        const players_till_game = await lottery.methods.Tikets_till_game().call();
        const balance = await lottery.methods.get_balance().call();
        const price = await lottery.methods.get_price().call();
        const coinName = await lottery.methods.name().call();
        const coins = await lottery.methods.totalSupply().call();
        const winnerLength = await lottery.methods.get_winners_length().call();

        const winners = await lottery.methods.get_winners(this.state.winnerLength).call();

        // const winners2 = await lottery.methods.get_winners(4).call();
        // const winners3 = await lottery.methods.get_winners(3).call();
        // const winners4 = await lottery.methods.get_winners(2).call();

        // const balance = await web3.eth.get_balance(lottery.options.address);


        this.setState({ manager, players, balance, price, players_till_game, winnerLength, winners});
      }

      onBla = async (event) => {
            event.preventDefault();
            this.setState({ message: 'Remember to use your Metamask extension to get your Lotto Coins!'});

          };


      onSubmit = async (event) => {
        event.preventDefault();

          const accounts = await web3.eth.getAccounts();

          this.setState({ message: 'Waiting on transaction success...'});

          await lottery.methods.enter(this.state.value)
            .send({
          from: accounts[0],
          value: (this.state.price)*(this.state.value)
        });

        this.setState({ message: 'You are in!'});


        if (this.state.winnerLength > 50){
          this.setState({ message: 'A winner has been picked!'});

        }else{
          window.location.reload();
        }
      };

      onClick = async () => {

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: 'Waiting on transaction successs...'});
        await lottery.methods.selectWinner().send({
          from: accounts[0]

        });
        this.setState({ message: 'A winner has been picked!'});
      };

  render() {



    return (

      <div>

        <h1>
                Forever Lottery
        </h1>
        <h3> Contract Addres: 0xF8CcedC0F4298BEa79aEa0Fca3178d84C4d48338</h3>
        <h3> Tickets remaining until next draw: {this.state.players_till_game}</h3>
        <h3> Tickets sold so far: {this.state.players}</h3>
        <p>

            To win: {web3.utils.fromWei(this.state.balance, 'ether')/2} ether!</p>
            <p>
            Current ticket price: {web3.utils.fromWei(this.state.price)} ether!

        </p>
        <hr />
          <form onSubmit={this.onBla}>
            <div><h4>How many tickets will you buy today?
            <input
              value={this.state.value}
              onChange= {event => this.setState({value: event.target.value}) }
            /></h4>
            </div>

        </form>

        <hr />
          <form onSubmit={this.onSubmit}>
            <h4>Ready to try your luck?</h4>
            <div>
            <label> Prepare to send:</label>  <button>Enter</button>
            <input
            value = {web3.utils.fromWei(this.state.value)*(this.state.price)}
            onChange={event => this.setState({value: event.target.value})}
            />
            <hr/>
            <h2>{this.state.message}</h2>
            </div>

        </form>
< hr/>
<h4>Last Winner</h4>
<h3>{this.state.winners}</h3>
<h4>Past Winners</h4>


<hr/>
<h2>NEVER STOP PLAYING :)</h2>
<hr/>
<h3>How does it work?</h3>
<li>Buy a ticket by sending the amount of ether stated on the 'enter' button.</li>
<li>The tickets you buy will be sent to the Metamask account you paid with.</li>
<li>In order to see your tickets follow the Metamask instructions to add tokens. Use the "contract address" to add them.</li>
<li>The tickets are acctual Tokens called LottoCoins built on ERC20Interface so you can send them to other accounts.</li>
<li>Whoever owns the ticket owns the right to participate in the lottery.</li>
<li>The tickets never expire so as long as you hold them they will participate in the ongoing raffles.</li>
<li>Every time 50 tickets are sold the contract will automatically run the raffle.</li>
<li>The contract holds 45% of the paid tickets in orther to increase the next pot, which means that the pot is forever increasing.</li>
<li>Every time 10 tikets are sold the ticket price will rise 0.0001 ethers so make sure to buy as many tickets in advance as you can.</li>
<li>This lottery has no owner and is automatic. It will keep on going without human interference for as long as the ethereum blockchain exists.</li>
<hr/>
<hr/>
</div>
    );

  }

}

export default App;
