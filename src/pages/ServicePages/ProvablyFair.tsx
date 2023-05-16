/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ServicePageContainer from '../../components/containers/ServicePage'
import { games } from '../../constants/provably-fair'

const ProvablyFair = () => {
  const { hash, pathname } = useLocation()
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hash && anchorRef.current) {
      const article = anchorRef.current.querySelector(hash)
      article?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [hash, pathname])

  return (
    <ServicePageContainer
    title='Provably Fair'
    renderHeaderDescription={() => (
        <>
          <p className='mb-5'>We are laser-focused on providing our users with a fun and fair gambling experience. As such, we have developed state-of-the-art Provably Fair algorithms to prove that our games are fair.</p>
          <p>{' The Provably Fair algorithm for each game is slightly different, but in essence, they all seek to provide you with confidence that the round was not tampered with as a result of you joining (in other words, we aren\'t rigging a game for or against any players). Each game\'s algorithm is described in detail below.'}</p>
        </>
    )}>
      <div ref={anchorRef}>
        {games.map((game) => (<React.Fragment key={game.id}>
            <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{game.title}</h2>
            <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
              <p className='mb-5'>In Plinko, our system generates a ticket based on your server seed, client seed and nonce. </p>
              <div id={game.id} className='ml-1 mb-5'>
                <p>1. Server seed ― a SHA-256 hash of 16 cryptographically secure random bytes. This seed can be cycled by the user at any time.</p>
                <p>2.  Client seed ― a seed that each user can customize at any time.</p>
                <p>3.  Nonce ― The round number that increments with each bet.</p>
              </div>
              <p>{'A hashed version of your current and next server seed is available at any time on the plinko page, and can be cycled at any time. You can only unhash a game\'s server seed when you cycle your seeds, and the game\'s used server seed is no longer in use.'}</p>
            </div>
            <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
              <p>{'const crypto = require(\'crypto\'); const hashString = (string) =>'}</p>
              <p>{'crypto.createHash(\'sha256\').update(string).digest(\'hex\'); const generateDiceTicket = \n(serverSeed, publicSeed, nonce) => { const hash = '}</p>
              <p>{'hashString(`${serverSeed}:${publicSeed}:${nonce}`); return parseInt(hash.substring\n(0, 8), 16) % 10000; }; const SERVER_SEED ='}</p>
              <p>{'\'04093dcb0d2790612ecd6d9837e2e3c6144f30f16bf560357ecc14ac0f0236e3\'; const \n CLIENT_SEED = \'my client seed\'; const NONCE = 1; '}</p>
              <p>console.log(generateDiceTicket(SERVER_SEED, CLIENT_SEED, NONCE));</p>
            </div>
          </React.Fragment>))}
        </div>
    </ServicePageContainer>
  )
}

export default ProvablyFair
