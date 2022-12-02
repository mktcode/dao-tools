import Dexie, { Table } from 'dexie'

export interface Proposal {
  id?: string
  from: string
  to: string
  title: string
  body: string
}

export interface Vote {
  id?: string
  proposalId: string
  choice: boolean
}

export class Database extends Dexie {
  proposals!: Table<Proposal>
  votes!: Table<Vote>

  constructor() {
    super('dao-tools')
    this.version(1).stores({
      proposals: '++id, from, to',
      votes: '++id, proposalId, choice',
    });
  }
}

export const db = new Database()