

export interface IEntry{
    _id : string;
    description: string;
    status: 'paid' | 'toPay';
    date: Date;
    price: number;
}

export interface ICreateEntry{
    description: string;
    status: 'paid' | 'toPay';
    date: Date;
    price: number;
}