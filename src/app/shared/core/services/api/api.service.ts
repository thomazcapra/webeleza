import { Injectable } from '@angular/core';

export interface IAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  addicionalInfo: string;
}

export interface ICardInfo {
  name: string;
  area: string;
  description: string;
  age: number;
  address: IAddress;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data: ICardInfo[];

  constructor() {
    this.data = [
      {
        name: 'Nome da cliente',
        age: 19,
        description: 'Uma descrição das atividades',
        area: 'Area de Atuação',
        address: {
          state: 'São Paulo',
          street: 'Rua da Cliente',
          city: 'Cidade da Cliente',
          number: '228',
          addicionalInfo: 'Complemento'
        }
      },
      {
        name: 'Nome da cliente',
        age: 19,
        description: 'Uma descrição das atividades',
        area: 'Area de Atuação',
        address: {
          state: 'São Paulo',
          street: 'Rua da Cliente',
          city: 'Cidade da Cliente',
          number: '228',
          addicionalInfo: 'Complemento'
        }
      },
      {
        name: 'Nome da cliente',
        age: 19,
        description: 'Uma descrição das atividades',
        area: 'Area de Atuação',
        address: {
          state: 'São Paulo',
          street: 'Rua da Cliente',
          city: 'Cidade da Cliente',
          number: '228',
          addicionalInfo: 'Complemento'
        }
      },
      {
        name: 'Nome da cliente',
        age: 19,
        description: 'Uma descrição das atividades',
        area: 'Area de Atuação',
        address: {
          state: 'São Paulo',
          street: 'Rua da Cliente',
          city: 'Cidade da Cliente',
          number: '228',
          addicionalInfo: 'Complemento'
        }
      },
      {
        name: 'Nome da cliente',
        age: 19,
        description: 'Uma descrição das atividades',
        area: 'Area de Atuação',
        address: {
          state: 'São Paulo',
          street: 'Rua da Cliente',
          city: 'Cidade da Cliente',
          number: '228',
          addicionalInfo: 'Complemento'
        }
      }
    ];
  }
}
