
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ServicePageContainer from '../../components/containers/ServicePage'
import { games } from '../../constants/provably-fair'
import SearchGame from '../../components/provably-fair/SearchGame'

const ProvablyFair = () => {
  const { hash, pathname } = useLocation()
  const anchorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hash && anchorRef.current) {
      const article = anchorRef.current.querySelector(hash)
      article?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [hash, pathname])

  return (<>
    <SearchGame />
    <ServicePageContainer
    title='Provably Fair'
    renderHeaderDescription={() => (
        <>
          <p className='mb-5'>We are laser-focused on providing our users with a fun and fair gambling experience. As such, we have developed state-of-the-art Provably Fair algorithms to prove that our games are fair.</p>
          <p>{' The Provably Fair algorithm for each game is slightly different, but in essence, they all seek to provide you with confidence that the round was not tampered with as a result of you joining (in other words, we aren\'t rigging a game for or against any players). Each game\'s algorithm is described in detail below.'}</p>
        </>
    )}>
      <div ref={anchorRef}>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{games.plinko.title}</h2>
          <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
            <p className='mb-5'>On Plinko and Case Opening, we use a Random.ORG Generated Server Seed and a nonce system to generate the outcome.</p>
            <div id={games.plinko.id} className='ml-1 mb-5'>
              <p>1: We reach out to Random.ORG to generate your Server Seed. You can change this with a Click of a Button above after a few games.</p>
              <p>2: Nonce: A number that is increased by each Plinko you play or each Case you open.</p>
            </div>
            <p>We make a Generation String with these valuables and use Chance.JS to get the result.</p>
          </div>
          <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
            <p>{'Seed Generation String: random_org_seed+i;'}</p>
            <p>{'const generation=new chance(seed); // random_org_seed+i; '}</p>
            <p>{'Example:mowltkdlmvnhk4a1'}</p>
            <p>{'const roll=generation.floating({min: 0, max: 100, fixed: 9});'}</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{games.wheel.title}</h2>
          <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
            <p className='mb-5'>On Wheel, we generate a Server Seed before the timer starts and a Random.ORG Seed is generated when it ends.</p>
            <div id={games.wheel.id} className='ml-1 mb-5'>
              <p>{'If the Wheel has no active users we don\'t reach out to Random.ORG, we replace their seed with "empty_game" for the generation to save resources.'}</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
            <p>{'Seed Generation String: server_seed; // If the round had no users'}</p>
            <p>{'Seed Generation String: server_seed+random_org_seed; // If the round had any wagers'}</p>
            <p>{'const generation=new chance(seed);'}</p>
            <p>{'const roll=generation.integer({ min: 0, max: 53 });'}</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{games.jackpot.title}</h2>
          <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
            <p className='mb-5'>On Jackpot, we generate a Server Seed before the timer starts and a Random.ORG Seed is generated when it ends.</p>
            <div id={games.jackpot.id} className='ml-1 mb-5'/>
          </div>
          <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
            <p>{'Seed Generation String: server_seed+random_org_seed;'}</p>
            <p>{'const generation=new chance(seed);'}</p>
            <p>{'const roll=generation.floating({min: 0, max: 100, fixed: 6});'}</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{games.coinflip.title}</h2>
          <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
            <p className='mb-5'>{'On Coinflip, we generate a Server Seed when it\'s created and a Random.ORG Seed is generated after the Challenger joins.'}</p>
            <div id={games.coinflip.id} className='ml-1 mb-5'/>
          </div>
          <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
            <p>{'Seed Generation String: server_seed+random_org_seed;'}</p>
            <p>{'const generation=new chance(seed); '}</p>
            <p>{'const roll=generation.floating({min: 0, max: 100, fixed: 6});'}</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{games.cases.title}</h2>
          <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
            <p className='mb-5'>On Plinko and Case Opening, we use a Random.ORG Generated Server Seed and a nonce system to generate the outcome.</p>
            <div id={games.cases.id} className='ml-1 mb-5'>
              <p>1: We reach out to Random.ORG to generate your Server Seed. You can change this with a Click of a Button above after a few games.</p>
              <p>2: Nonce: A number that is increased by each Plinko you play or each Case you open.</p>
            </div>
            <p>We make a Generation String with these valuables and use Chance.JS to get the result.</p>
          </div>
          <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
            <p>{'Seed Generation String: random_org_seed+i;'}</p>
            <p>{'const generation=new chance(seed); // random_org_seed+i; '}</p>
            <p>{'Example:mowltkdlmvnhk4a1'}</p>
            <p>{'const roll=generation.integer({min: 0, max: 100000}); // We then compare this to the Odds on the Cases'}</p>
          </div>
          <h2 className='text-xl font-bold text-blue-golf mt-10 mb-6'>{games.battle.title}</h2>
          <div className='text-base leading-5 font-normal opacity-60 max-w-[850px]'>
            <p className='mb-5'>On Case Battles, we use a Random.ORG Generated Server Seed once the Game is full to generate the outcome.</p>
            <p className='mb-5'>Each Case for Each User gets a new Roll, in Player Order.</p>
            <div id={games.battle.id} className='ml-1 mb-5'/>
          </div>
          <div className='flex flex-col gap-5 p-8 bg-black/40 w-full text-blue-text-secondary text-base my-5 whitespace-pre'>
            <p>{'Seed Generation String: random_org_seed+i;'}</p>
            <p>{'const generation=new chance(seed); // random_org_seed+i; '}</p>
            <p>{'Example:mowltkdlmvnhk4a1'}</p>
            <p>{'const roll=generation.integer({min: 0, max: 100000}); // We then compare this to the Odds on the Cases'}</p>
          </div>
        </div>
    </ServicePageContainer>
    </>
  )
}

export default ProvablyFair
