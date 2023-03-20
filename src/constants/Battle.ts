export const gameSettings: Array<{ label: string, name: string, tabs: Array<{ variant: string, requiredPlayers?: number }> }> = [
  {
    label: 'Players :',
    name: 'mode',
    tabs: [
      { variant: '1v1', requiredPlayers: 2 },
      { variant: '1v1v1', requiredPlayers: 3 },
      { variant: '1v1v1v1', requiredPlayers: 4 },
      { variant: '2v2', requiredPlayers: 4 }
    ]
  },
  {
    label: 'Game modes :',
    name: 'typeGame',
    tabs: [
      { variant: 'Standard' },
      { variant: 'Crazy' },
      { variant: 'Group' }
    ]
  },
  {
    label: 'Privacy :',
    name: 'privacy',
    tabs: [
      { variant: 'Public' },
      { variant: 'Private' }
    ]
  }
]
